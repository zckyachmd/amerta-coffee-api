import { z } from "@hono/zod-openapi";
import db from "@/libs/db";
import * as cartSchema from "@/schemas/cartSchema";

/**
 * Retrieves the cart for a user, including total price.
 *
 * @param {string} userId - The ID of the user.
 * @returns {Promise<{ cart: Cart | null; total: number }>}
 */
export const getCart = async (userId: string) => {
  try {
    let cart = await db.cart.findFirst({
      where: { userId },
      include: {
        items: {
          include: { product: true },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!cart) {
      cart = await db.cart.create({
        data: {
          userId,
          items: {
            create: [],
          },
        },
        include: {
          items: {
            include: { product: true },
          },
        },
      });
    }

    const total = cart.items.reduce((acc, item) => {
      return acc + item.quantity * item.product.price;
    }, 0);

    return { cart, total };
  } catch (error: Error | any) {
    throw new Error(error.message || "Failed to retrieve cart.");
  } finally {
    await db.$disconnect();
  }
};

/**
 * Adds an item to the user's cart.
 *
 * @param {string} userId - The ID of the user.
 * @param {z.infer<typeof cartSchema.addItemSchema>} itemData - The data for the cart item.
 * @returns {Promise<CartItem>}
 */
export const addItemToCart = async (
  userId: string,
  itemData: z.infer<typeof cartSchema.addItemSchema>
) => {
  const { productId, quantity } = itemData;

  try {
    return await db.$transaction(async (tx) => {
      let cart = await tx.cart.findFirst({ where: { userId } });

      if (!cart) {
        cart = await tx.cart.create({ data: { userId } });
      }

      const existingItem = await tx.cartItem.findFirst({
        where: { cartId: cart.id, productId },
      });

      const product = await tx.product.findUnique({
        where: { id: productId },
      });

      const totalQuantity =
        (existingItem ? existingItem.quantity : 0) + quantity;

      if (!product) {
        throw new Error("Product not found.");
      }

      if (totalQuantity > product.stock_qty) {
        throw new Error(
          `Insufficient stock for product: ${product?.name || "Unknown"}.`
        );
      }

      if (existingItem) {
        return await tx.cartItem.update({
          where: { id: existingItem.id },
          data: {
            quantity: existingItem.quantity + quantity,
          },
        });
      } else {
        return await tx.cartItem.create({
          data: {
            cartId: cart.id,
            productId,
            quantity,
          },
        });
      }
    });
  } catch (error: Error | any) {
    throw new Error(error.message || "Failed to add product to the cart.");
  } finally {
    await db.$disconnect();
  }
};

/**
 * Updates an item in the user's cart.
 *
 * @param {string} userId - The ID of the user.
 * @param {string} itemId - The ID of the cart item.
 * @param {z.infer<typeof cartSchema.updateItemSchema>} itemData - The new data for the cart item.
 * @returns {Promise<CartItem>}
 */
export const updateItemInCart = async (
  userId: string,
  itemId: string,
  itemData: z.infer<typeof cartSchema.updateItemSchema>
) => {
  try {
    return await db.$transaction(async (tx) => {
      const { quantity } = itemData;

      const existingItem = await tx.cartItem.findUnique({
        where: { id: itemId },
        include: { cart: true, product: true },
      });

      if (!existingItem || existingItem.cart.userId !== userId) {
        throw new Error("Product not found in the user cart.");
      }

      const product = await tx.product.findUnique({
        where: { id: existingItem.productId },
      });

      if (!product || !product.isAvailable) {
        throw new Error(
          `Product ${existingItem.product.name} is not available.`
        );
      }

      if (quantity > product.stock_qty) {
        throw new Error("Not enough stock available.");
      }

      return await tx.cartItem.update({
        where: { id: itemId },
        data: { quantity },
      });
    });
  } catch (error: Error | any) {
    throw new Error(error.message || "Failed to update product in the cart.");
  } finally {
    await db.$disconnect();
  }
};

/**
 * Removes an item from the user's cart.
 *
 * @param {string} userId - The ID of the user.
 * @param {string} itemId - The ID of the cart item.
 * @returns {Promise<void>}
 */
export const removeItemFromCart = async (userId: string, itemId: string) => {
  try {
    await db.$transaction(async (tx) => {
      const existingItem = await tx.cartItem.findUnique({
        where: { id: itemId },
        include: { cart: true },
      });

      if (!existingItem || existingItem.cart.userId !== userId) {
        throw new Error("Product not found in the user cart.");
      }

      await tx.cartItem.delete({
        where: { id: itemId },
      });
    });
  } catch (error: Error | any) {
    throw new Error(error.message || "Failed to remove product from the cart.");
  } finally {
    await db.$disconnect();
  }
};

/**
 * Checkout the user's cart.
 *
 * This will mark all items in the user's cart as unavailable and then delete the cart.
 *
 * @param {string} userId - The ID of the user.
 * @throws {Error} If the cart is not found.
 * @returns {Promise<void>}
 */
export const checkoutCart = async (userId: string) => {
  try {
    return await db.$transaction(async (tx) => {
      const cart = await tx.cart.findFirst({
        where: { userId },
        include: { items: { include: { product: true } } },
      });

      if (!cart || cart.items.length === 0) {
        throw new Error("Cart is empty or not found.");
      }

      for (const item of cart.items) {
        const product = await tx.product.findUnique({
          where: { id: item.productId },
        });

        if (!product || !product.isAvailable) {
          throw new Error(
            `Product ${item.product.name} is no longer available.`
          );
        }
      }

      const totalAmount = cart.items.reduce((total, item) => {
        return total + item.quantity * item.product.price;
      }, 0);

      const order = await tx.order.create({
        data: {
          userId,
          totalAmount,
          items: {
            create: cart.items.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.product.price,
            })),
          },
        },
      });

      for (const item of cart.items) {
        const product = await tx.product.findUnique({
          where: { id: item.productId },
        });

        if (product) {
          const newStock = product.stock_qty - item.quantity;

          await tx.product.update({
            where: { id: item.productId },
            data: {
              stock_qty: newStock,
              isAvailable: newStock > 0,
            },
          });
        }
      }

      await tx.cart.delete({
        where: { id: cart.id },
      });

      return order;
    });
  } catch (error: Error | any) {
    throw new Error(error.message || "Failed to checkout cart.");
  } finally {
    await db.$disconnect();
  }
};
