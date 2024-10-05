import type { Context } from "hono";
import { OpenAPIHono, z } from "@hono/zod-openapi";
import * as orderService from "@/services/orderService";
import authMiddleware from "@/middlewares/authMiddleware";

const orderRoute = new OpenAPIHono();
const API_TAGS = ["Orders"];

// Register security scheme
orderRoute.openAPIRegistry.registerComponent(
  "securitySchemes",
  "AuthorizationBearer",
  {
    type: "http",
    scheme: "bearer",
    in: "header",
    description: "Bearer token",
  }
);

// Get Orders
orderRoute.openapi(
  {
    method: "get",
    path: "/",
    summary: "Get Orders",
    middleware: authMiddleware,
    security: [{ AuthorizationBearer: [] }],
    responses: {
      200: {
        description: "Get Orders",
      },
      400: {
        description: "Get Orders Failed",
      },
    },
    tags: API_TAGS,
  },
  async (c: Context) => {
    const userId = c.get("user").id as string;

    try {
      const orders = await orderService.getOrders(userId);
      return c.json({ status: "success", data: orders }, 200);
    } catch (error: Error | any) {
      return c.json(
        {
          status: "failed",
          error: error.message || "Get Orders Failed!",
        },
        400
      );
    }
  }
);

// Get Order
orderRoute.openapi(
  {
    method: "get",
    path: "/{orderId}",
    summary: "Get Order",
    middleware: authMiddleware,
    security: [{ AuthorizationBearer: [] }],
    request: {
      params: z.object({ orderId: z.string() }),
    },
    responses: {
      200: {
        description: "Get Order",
      },
      400: {
        description: "Get Order Failed",
      },
    },
    tags: API_TAGS,
  },
  async (c: Context) => {
    const userId = c.get("user").id as string;

    try {
      const { orderId } = c.req.param();
      const order = await orderService.getOrder(orderId, userId);

      return c.json({ status: "success", data: order }, 200);
    } catch (error: Error | any) {
      return c.json(
        {
          status: "failed",
          error: error.message || "Get Order Failed!",
        },
        400
      );
    }
  }
);

export default orderRoute;
