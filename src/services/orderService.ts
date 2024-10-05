import db from "@/libs/db";

/**
 * Retrieves all orders for a given user.
 *
 * @param {string} userId - The ID of the user.
 * @returns {Promise<import("@prisma/client").Order[]>} - The list of orders.
 * @throws {Error} If the orders cannot be retrieved.
 */
export const getOrders = async (userId: string) => {
  try {
    const orders = await db.order.findMany({
      where: { userId },
      include: { items: { include: { product: true } } },
      orderBy: { createdAt: "desc" },
    });

    if (!orders) {
      throw new Error("Orders not found!");
    }

    return orders;
  } catch (error: Error | any) {
    throw new Error(error.message || "Failed to get orders.");
  }
};

/**
 * Retrieves an order by ID.
 *
 * @param {string} orderId - The ID of the order.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<import('prisma').Order & { items: import('prisma').OrderItem[] }>}
 * @throws {Error}
 */
export const getOrder = async (orderId: string, userId: string) => {
  try {
    const order = await db.order.findFirst({
      where: { id: orderId, userId },
      include: { items: { include: { product: true } } },
      orderBy: { createdAt: "desc" },
    });

    if (!order) {
      throw new Error("Order not found!");
    }

    return order;
  } catch (error: Error | any) {
    throw new Error(error.message || "Failed to get order.");
  }
};
