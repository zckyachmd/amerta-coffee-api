import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import authRoute from "@/routes/authRoute";
import productRoute from "@/routes/productRoute";
import cartRoute from "@/routes/cartRoute";

const allowedOrigins = process.env.CORS_ALLOWS_ORIGINS?.split(",") || [];
const app = new OpenAPIHono();

// Middleware
app.use("*", logger());
app.use(
  "*",
  cors({
    origin: (origin) => {
      if (!origin) {
        console.log("Origin not found!");
        return null;
      }

      const validOrigin = allowedOrigins.some((allowedOrigin) => {
        return (
          origin === `http://${allowedOrigin}` ||
          origin === `https://${allowedOrigin}`
        );
      });

      if (validOrigin) {
        console.log(`Origin accepted: ${origin}`);
        return origin;
      }

      console.log(`Origin blocked: ${origin}`);
      return null;
    },
    credentials: true,
    maxAge: 3600,
  })
);

// Web routes
app.get("/", (c) => {
  return c.json(
    {
      description:
        "Amerta Coffee API - A premium Indonesian coffee online store.",
      ui: `/ui`,
    },
    200
  );
});
app.get("/ui", swaggerUI({ url: "/spec.json" }));
app.doc("/spec.json", {
  openapi: "3.1.0",
  info: {
    version: "1.0.0",
    title: "Amerta Coffee API",
    description:
      "API for Amerta Coffee, a premium Indonesian coffee online store.",
  },
});

// API routes
app.route("/auth", authRoute);
app.route("/products", productRoute);
app.route("/cart", cartRoute);

export default app;
