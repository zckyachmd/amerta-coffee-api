import { z } from "zod";

export const cartSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number().min(1),
    })
  ),
  totalPrice: z.number(),
});

export const addItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().min(1),
});

export const updateItemSchema = z.object({
  quantity: z.number().min(1),
});

export const itemIdSchema = z.object({
  itemId: z.string(),
});
