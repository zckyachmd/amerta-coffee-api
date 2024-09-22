import { z } from "@hono/zod-openapi";

export const loginSchema = z.object({
  email: z.string().email().min(1, "Email is required").max(255).openapi({
    description: "The email of the user.",
    example: "user@mail.com",
  }),
  password: z.string().min(1, "Password is required").max(255).openapi({
    description: "The password of the user.",
    example: "secret",
  }),
});

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .max(255, "Password must not exceed 255 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(
    /[^A-Za-z0-9]/,
    "Password must contain at least one special character (e.g., @, #, $, %)"
  )
  .openapi({
    description: "The password for the user.",
    example: "Password123!",
  });

export const registerSchema = loginSchema
  .extend({
    name: z.string().min(3, "Name is required").max(255).openapi({
      description: "The name of the user.",
      example: "User",
    }),
    phone: z.string().max(255).optional().openapi({
      description: "The phone of the user.",
      example: "081234567890",
    }),
    address: z.string().max(255).optional().openapi({
      description: "The address of the user.",
      example: "Jl. Sama Dia No. 1 Jakarta",
    }),
    avatar_url: z
      .string()
      .min(10, "Avatar URL is required")
      .max(255)
      .optional()
      .openapi({
        description: "The avatar URL of the user.",
        example: "https://placehold.co/500x500?text=No%20Image",
      }),
    password: passwordSchema,
    confirmPassword: z
      .string()
      .min(1, "Password confirmation is required")
      .max(255)
      .openapi({
        description: "The password confirmation of the user.",
        example: "Password123!",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const refreshTokenSchema = z.object({
  refreshToken: z
    .string()
    .min(1, "Refresh token is required!")
    .max(255)
    .openapi({
      description: "The refresh token of the user.",
    }),
});
