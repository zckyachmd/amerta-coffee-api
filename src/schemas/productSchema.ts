import { z } from "@hono/zod-openapi";

export const productSchema = z.object({
  name: z.string().min(5).max(100).openapi({ example: "Kopi Arabica" }),
  description: z.string().max(500).optional().default(""),
  price: z.coerce.number().min(1).openapi({ example: 10000 }),
  stock: z.coerce.number().min(1).openapi({ example: 10 }),
  sku: z.string().optional().openapi({ example: "KC001" }),
  image: z
    .string()
    .url()
    .or(z.literal(""))
    .or(z.null())
    .openapi({ example: "https://placehold.co/500x500?text=No%20Image" }),
});

export const productQuerySchema = z.object({
  page: z.coerce.number().min(1).optional().openapi({ example: 1 }),
  limit: z.coerce.number().min(1).optional().openapi({ example: 10 }),
  search: z.string().optional().openapi({ example: "arabica" }),
});

export const productIdSchema = z.object({
  productId: z.coerce
    .number()
    .int()
    .min(1)
    .openapi({
      param: {
        required: true,
        in: "path",
      },
    }),
});

export const productSlugSchema = z.object({
  slug: z
    .string()
    .min(5)
    .regex(/^[a-z0-9-]+$/, { message: "Invalid slug!" })
    .openapi({ example: "kopi-arabica" }),
});
