import { z } from "@hono/zod-openapi";

export const productSchema = z.object({
  name: z.string().min(5).max(100).openapi({ example: "Kopi Arabika" }),
  description: z.string().max(500).optional().default(""),
  price: z.coerce.number().min(1).openapi({ example: 10000 }),
  stock: z.coerce.number().min(1).openapi({ example: 10 }),
  sku: z.string().optional().openapi({ example: "KC001" }),
  images: z
    .array(z.string().url())
    .optional()
    .openapi({ example: ["https://placehold.co/500x500?text=No%20Image"] }),
  specifications: z.record(z.string(), z.any()).optional(),
  grinding: z.record(z.string(), z.any()).optional(),
});

export const productQuerySchema = z.object({
  page: z.coerce.number().min(1).optional().openapi({ example: 1 }),
  limit: z.coerce.number().min(1).optional().openapi({ example: 10 }),
  filters: z.string().optional().openapi({ example: '{"name": "Arabika"}' }),
  sorts: z.string().optional().openapi({ example: '{"name": "asc"}' }),
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
    .openapi({ example: "kopi-arabika" }),
});
