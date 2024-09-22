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

  let cart = await db.cart.findFirst({ where: { userId } });
  if (!cart) {
    cart = await db.cart.create({ data: { userId } });
  }

  const existingItem = await db.cartItem.findUnique({
    where: { cartId_productId: { cartId: cart.id, productId } },
  });

  if (existingItem) {
    return await db.cartItem.update({
      where: { id: existingItem.id },
      data: {
        quantity: existingItem.quantity + quantity,
      },
    });
  } else {
    return await db.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity,
      },
    });
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
  const { quantity } = itemData;

  const existingItem = await db.cartItem.findUnique({
    where: { id: itemId },
    include: { cart: true },
  });

  if (!existingItem || existingItem.cart.userId !== userId) {
    throw new Error("Item not found in the user's cart.");
  }

  return await db.cartItem.update({
    where: { id: itemId },
    data: { quantity },
  });
};

/**
 * Removes an item from the user's cart.
 *
 * @param {string} userId - The ID of the user.
 * @param {string} itemId - The ID of the cart item.
 * @returns {Promise<void>}
 */
export const removeItemFromCart = async (userId: string, itemId: string) => {
  const existingItem = await db.cartItem.findUnique({
    where: { id: itemId },
    include: { cart: true },
  });

  if (!existingItem || existingItem.cart.userId !== userId) {
    throw new Error("Item not found in the user's cart.");
  }

  await db.cartItem.delete({
    where: { id: itemId },
  });
};
