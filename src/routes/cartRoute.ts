import type { Context } from "hono";
import { OpenAPIHono, z } from "@hono/zod-openapi";
import * as cartService from "@/services/cartService";
import * as cartSchema from "@/schemas/cartSchema";
import authMiddleware from "@/middlewares/authMiddleware";

const cartRoute = new OpenAPIHono();
const API_TAGS = ["Carts"];

// Register security scheme
cartRoute.openAPIRegistry.registerComponent(
  "securitySchemes",
  "AuthorizationBearer",
  {
    type: "http",
    scheme: "bearer",
    in: "header",
    description: "Bearer token",
  }
);

// Get Cart
cartRoute.openapi(
  {
    method: "get",
    path: "/",
    summary: "Get Cart",
    middleware: authMiddleware(),
    security: [{ AuthorizationBearer: [] }],
    responses: {
      200: {
        description: "Get Cart",
      },
      400: {
        description: "Get Cart Failed",
      },
    },
    tags: API_TAGS,
  },
  async (c: Context) => {
    const userId = c.get("user").id as string;

    try {
      const cart = await cartService.getCart(userId);
      return c.json({ status: "success", data: cart }, 200);
    } catch (error: any) {
      return c.json(
        {
          status: "failed",
          error: error.message || "Get Cart Failed!",
        },
        400
      );
    }
  }
);

// Add Item to Cart
cartRoute.openapi(
  {
    method: "post",
    path: "/items",
    summary: "Add Item to Cart",
    middleware: authMiddleware(),
    security: [{ AuthorizationBearer: [] }],
    request: {
      body: {
        content: {
          "application/json": {
            schema: cartSchema.addItemSchema,
          },
        },
      },
    },
    responses: {
      201: {
        description: "Add Item to Cart",
      },
      400: {
        description: "Add Item to Cart Failed",
      },
      401: {
        description: "Unauthorized",
      },
    },
    tags: API_TAGS,
  },
  async (c: Context) => {
    const userId = c.get("user").id as string;
    const body: z.infer<typeof cartSchema.addItemSchema> = await c.req.json();

    try {
      const cartItem = await cartService.addItemToCart(userId, body);
      return c.json({ status: "success", data: cartItem }, 201);
    } catch (error: any) {
      return c.json(
        {
          status: "failed",
          error: error.message || "Add Item to Cart Failed!",
        },
        400
      );
    }
  }
);

// Update Item in Cart
cartRoute.openapi(
  {
    method: "patch",
    path: "/items/{itemId}",
    summary: "Update Item in Cart",
    middleware: authMiddleware(),
    security: [{ AuthorizationBearer: [] }],
    request: {
      params: cartSchema.itemIdSchema,
      body: {
        content: {
          "application/json": {
            schema: cartSchema.updateItemSchema,
          },
        },
      },
    },
    responses: {
      200: {
        description: "Update Item in Cart",
      },
      400: {
        description: "Update Item in Cart Failed",
      },
      401: {
        description: "Unauthorized",
      },
    },
    tags: API_TAGS,
  },
  async (c: Context) => {
    const userId = c.get("user").id as string;
    const itemId = c.req.param("itemId");
    const body: z.infer<typeof cartSchema.updateItemSchema> =
      await c.req.json();

    try {
      const updatedItem = await cartService.updateItemInCart(
        userId,
        itemId,
        body
      );
      return c.json({ status: "success", data: updatedItem }, 200);
    } catch (error: any) {
      return c.json(
        {
          status: "failed",
          error: error.message || "Update Item in Cart Failed!",
        },
        400
      );
    }
  }
);

// Remove Item from Cart
cartRoute.openapi(
  {
    method: "delete",
    path: "/items/{itemId}",
    summary: "Remove Item from Cart",
    middleware: authMiddleware(),
    security: [{ AuthorizationBearer: [] }],
    request: {
      params: cartSchema.itemIdSchema,
    },
    responses: {
      200: {
        description: "Remove Item from Cart",
      },
      400: {
        description: "Remove Item from Cart Failed",
      },
      401: {
        description: "Unauthorized",
      },
    },
    tags: API_TAGS,
  },
  async (c: Context) => {
    const userId = c.get("user").id as string;
    const itemId = c.req.param("itemId");

    try {
      await cartService.removeItemFromCart(userId, itemId);
      return c.json(
        { status: "success", message: "Item removed from cart" },
        200
      );
    } catch (error: any) {
      return c.json(
        {
          status: "failed",
          error: error.message || "Remove Item from Cart Failed!",
        },
        400
      );
    }
  }
);

export default cartRoute;
