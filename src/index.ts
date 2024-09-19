import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import authRoute from "@/routes/authRoute";
import productRoute from "@/routes/productRoute";

const app = new OpenAPIHono();

// Web routes
app.use(logger());
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
app.use("*", cors());
app.route("/auth", authRoute);
app.route("/products", productRoute);

export default app;
