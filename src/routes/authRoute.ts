import type { Context } from "hono";
import { OpenAPIHono } from "@hono/zod-openapi";
import * as authService from "@/services/authService";
import * as authSchema from "@/schemas/authSchema";
import { validateToken } from "@/libs/jwt";

const authRoute = new OpenAPIHono();
const API_TAGS = ["Auth"];

// Register Route
authRoute.openapi(
  {
    method: "post",
    path: "/register",
    summary: "Register a new user",
    description:
      "Register a new user with name, email, password, and confirm password.",
    request: {
      body: {
        content: {
          "application/json": {
            schema: authSchema.registerSchema,
          },
        },
      },
    },
    responses: {
      201: {
        description: "User successfully registered",
      },
      400: {
        description: "Invalid input or registration failed",
      },
    },
    tags: API_TAGS,
  },
  async (c: Context) => {
    const body = await c.req.json();

    try {
      const user = await authService.register(body);
      return c.json({ status: "success", data: user }, 201);
    } catch (error: Error | any) {
      return c.json(
        { status: "failed", error: error.message || "Registration failed!" },
        400
      );
    }
  }
);

// Login Route
authRoute.openapi(
  {
    method: "post",
    path: "/login",
    summary: "Log in a user",
    description: "Log in a user with email and password.",
    request: {
      body: {
        content: {
          "application/json": {
            schema: authSchema.loginSchema,
          },
        },
      },
    },
    responses: {
      200: {
        description: "Login successful",
      },
      401: {
        description: "Invalid email or password",
      },
    },
    tags: API_TAGS,
  },
  async (c: Context) => {
    const body = await c.req.json();

    try {
      const token = await authService.login(body);
      return c.json(
        {
          status: "success",
          token,
        },
        200
      );
    } catch (error: Error | any) {
      return c.json(
        { status: "failed", error: error.message || "Login failed!" },
        401
      );
    }
  }
);

// Profile Route
authRoute.openapi(
  {
    method: "get",
    path: "/me",
    summary: "Get user profile",
    security: [{ AuthorizationBearer: [] }],
    responses: {
      200: {
        description: "User profile retrieved successfully",
      },
      401: {
        description: "Unauthorized",
      },
    },
    tags: API_TAGS,
  },
  async (c: Context) => {
    const jwt = c.req.header("Authorization")?.replace("Bearer ", "");
    if (!jwt) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    try {
      const user = await authService.profile(jwt);
      return c.json({ status: "success", data: user }, 200);
    } catch (error: Error | any) {
      return c.json({ message: error.message || "Failed to get profile" }, 401);
    }
  }
);

// Refresh Token Route
authRoute.openapi(
  {
    method: "post",
    path: "/refresh-token",
    summary: "Refresh access token",
    description: "Refresh the access token using the refresh token.",
    request: {
      body: {
        content: {
          "application/json": {
            schema: authSchema.refreshTokenSchema,
          },
        },
      },
    },
    responses: {
      200: {
        description: "Token successfully refreshed",
      },
      401: {
        description: "Refresh token is missing or invalid",
      },
    },
    tags: API_TAGS,
  },
  async (c: Context) => {
    const { refreshToken } = await c.req.json();

    if (!refreshToken) {
      return c.json({ message: "Refresh token is required!" }, 401);
    }

    try {
      const token = await authService.regenToken(refreshToken);
      return c.json(
        {
          status: "success",
          token,
        },
        200
      );
    } catch (error: Error | any) {
      return c.json(
        { message: error.message || "Failed to refresh token" },
        401
      );
    }
  }
);

// Logout Route
authRoute.openapi(
  {
    method: "post",
    path: "/logout",
    summary: "Log out a user",
    description: "Log out a user by invalidating the refresh token.",
    request: {
      body: {
        content: {
          "application/json": {
            schema: authSchema.refreshTokenSchema,
          },
        },
      },
    },
    responses: {
      200: {
        description: "Logout successful",
      },
      401: {
        description: "Refresh token is missing or invalid",
      },
      500: {
        description: "Failed to log out",
      },
    },
    tags: API_TAGS,
  },
  async (c: Context) => {
    const { refreshToken } = await c.req.json();

    if (!refreshToken) {
      return c.json({ message: "Refresh token is required!" }, 401);
    }

    try {
      await authService.logout(refreshToken);
      return c.json({ message: "Logout successful" }, 200);
    } catch (error: Error | any) {
      return c.json({ message: error.message || "Failed to log out!" }, 500);
    }
  }
);

export default authRoute;
