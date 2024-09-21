import type { Context } from "hono";
import { OpenAPIHono, z } from "@hono/zod-openapi";
import * as productService from "@/services/productService";
import * as productSchema from "@/schemas/productSchema";
import authMiddleware from "@/middlewares/authMiddleware";

const productRoute = new OpenAPIHono();
const API_TAGS = ["Products"];

// Register security scheme
productRoute.openAPIRegistry.registerComponent(
  "securitySchemes",
  "AuthorizationBearer",
  {
    type: "http",
    scheme: "bearer",
    in: "header",
    description: "Bearer token",
  }
);

// Get Products
productRoute.openapi(
  {
    method: "get",
    path: "/",
    summary: "Get Products",
    request: {
      query: productSchema.productQuerySchema,
    },
    responses: {
      200: {
        description: "Get Products",
      },
      400: {
        description: "Get Products Failed",
      },
    },
    tags: API_TAGS,
  },
  async (c: Context) => {
    const { page = "0", limit = "0", filters = "", sorts = "" } = c.req.query();

    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    try {
      const products = await productService.getAll(
        pageNumber,
        limitNumber,
        filters,
        sorts
      );
      return c.json({ status: "success", data: products }, 200);
    } catch (error: Error | any) {
      return c.json(
        {
          status: "failed",
          error: error.message || "Get Products Failed!",
        },
        400
      );
    }
  }
);

// Get Product By Slug
productRoute.openapi(
  {
    method: "get",
    path: "/{slug}",
    summary: "Get Product By Slug",
    request: {
      params: productSchema.productSlugSchema,
    },
    responses: {
      200: {
        description: "Get Product By Slug",
      },
      400: {
        description: "Get Product By Slug Failed",
      },
    },
    tags: API_TAGS,
  },
  async (c: Context) => {
    const { slug } = c.req.param();

    try {
      const product = await productService.getBySlug(slug);
      return c.json({ status: "success", data: product }, 200);
    } catch (error: Error | any) {
      return c.json(
        {
          status: "failed",
          error: error.message || "Get Product By Product ID Failed!",
        },
        400
      );
    }
  }
);

// Create Product
productRoute.openapi(
  {
    method: "post",
    path: "/",
    summary: "Create Product",
    middleware: authMiddleware(),
    security: [{ AuthorizationBearer: [] }],
    request: {
      body: {
        content: {
          "application/json": {
            schema: productSchema,
          },
        },
      },
    },
    responses: {
      201: {
        description: "Create Product",
      },
      400: {
        description: "Create Product Failed",
      },
      401: {
        description: "Unauthorized",
      },
    },
    tags: API_TAGS,
  },
  async (c: Context) => {
    const body: z.infer<typeof productSchema.productSchema> =
      await c.req.json();

    try {
      const product = await productService.create(body);
      return c.json({ status: "success", data: product }, 201);
    } catch (error: Error | any) {
      return c.json(
        {
          status: "failed",
          error: error.message || "Create Product Failed!",
        },
        400
      );
    }
  }
);

// Update Product
productRoute.openapi(
  {
    method: "patch",
    path: "/{productId}",
    summary: "Update Product By Product ID",
    middleware: authMiddleware(),
    security: [{ AuthorizationBearer: [] }],
    request: {
      params: productSchema.productIdSchema,
      body: {
        content: {
          "application/json": {
            schema: productSchema.productSchema.partial(),
          },
        },
      },
    },
    responses: {
      200: {
        description: "Update Product",
      },
      400: {
        description: "Update Product Failed",
      },
      401: {
        description: "Unauthorized",
      },
    },
    tags: API_TAGS,
  },
  async (c: Context) => {
    const productId = c.req.param("productId");
    const body: z.infer<typeof productSchema.productSchema> =
      await c.req.json();

    try {
      const product = await productService.update(productId, body);
      return c.json({ status: "success", data: product }, 200);
    } catch (error: Error | any) {
      return c.json(
        {
          status: "failed",
          error: error.message || "Update Product Failed!",
        },
        400
      );
    }
  }
);

// Delete Product
productRoute.openapi(
  {
    method: "delete",
    path: "/{productId}",
    summary: "Delete Product By Product ID",
    middleware: authMiddleware(),
    security: [{ AuthorizationBearer: [] }],
    request: {
      params: productSchema.productIdSchema,
    },
    responses: {
      200: {
        description: "Delete Product",
      },
      400: {
        description: "Delete Product Failed",
      },
      401: {
        description: "Unauthorized",
      },
    },
    tags: API_TAGS,
  },
  async (c: Context) => {
    const productId = c.req.param("productId");

    try {
      const product = await productService.deleteById(productId);
      return c.json({ status: "success", data: product }, 200);
    } catch (error: Error | any) {
      return c.json(
        {
          status: "failed",
          error: error.message || "Delete Product Failed!",
        },
        400
      );
    }
  }
);

export default productRoute;
