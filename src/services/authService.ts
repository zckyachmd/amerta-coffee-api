import { z } from "@hono/zod-openapi";
import { registerSchema, loginSchema } from "@/schemas/authSchema";
import * as jwt from "@/libs/jwt";
import * as crypto from "@/libs/crypto";
import db from "@/libs/db";

/**
 * Registers a new user.
 *
 * @param data - The data for registering a new user.
 * @returns The newly registered user.
 * @throws {Error} If the email is already registered.
 */
export const register = async (data: z.infer<typeof registerSchema>) => {
  return await db.$transaction(async (tx) => {
    const existingUser = await tx.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new Error("Email already registered!");
    }

    const hashedPassword = await crypto.hashValue(data.password);
    const initials = data?.name
      .split(" ")
      .map((part) => part.charAt(0).toUpperCase())
      .join("");
    const avatar = `https://placehold.co/300x300/FFFFFF/000000/?text=${initials}`;

    const user = await tx.user.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data?.phone,
        address: data?.address,
        avatar_url: data?.avatar_url || avatar,
        password: hashedPassword,
      },
      select: {
        name: true,
        email: true,
      },
    });

    return user;
  });
};

/**
 * Logs in an existing user.
 *
 * @param data - The data for logging in an existing user.
 * @returns The access token and refresh token for the user.
 * @throws {Error} If the email or password is incorrect.
 */
export const login = async (data: z.infer<typeof loginSchema>) => {
  return await db.$transaction(async (tx) => {
    const user = await tx.user.findUnique({
      where: { email: data.email },
    });

    if (!user || !(await crypto.verifyValue(data.password, user.password))) {
      throw new Error("Email or password is incorrect!");
    }

    const userId = user.id.toString();
    const [accessToken, refreshToken] = await Promise.all([
      jwt.createAccessToken(userId),
      jwt.createRefreshToken(userId),
    ]);

    return { accessToken, refreshToken };
  });
};

/**
 * Retrieves the user profile associated with the given access token.
 *
 * @param token - The access token.
 * @returns The user profile.
 * @throws {Error} If the access token is invalid or expired.
 */
export const profile = async (token: string) => {
  const decodedToken = await jwt.validateToken(token);
  if (!decodedToken?.subject) {
    throw new Error("Invalid or expired access token");
  }

  return await db.user.findUnique({
    where: { id: decodedToken.subject },
    select: {
      name: true,
      email: true,
      avatar_url: true,
      phone: true,
      address: true,
      createdAt: true,
    },
  });
};

/**
 * Processes a refresh token, either revoking it or regenerating a new one.
 *
 * @param refreshToken - The refresh token to process.
 * @param action - The action to take, either "REVOKE" or "REGENERATE".
 *
 * @returns If revoking, true is returned. If regenerating, the new access and
 *   refresh tokens are returned.
 *
 * @throws {Error} If the refresh token is invalid or already revoked.
 */
const processToken = async (
  refreshToken: string,
  action: "REVOKE" | "REGENERATE"
) => {
  return await db.$transaction(async (tx) => {
    const decodedToken = await jwt.validateToken(refreshToken);
    if (!decodedToken?.subject) {
      throw new Error("Invalid or expired refresh token");
    }

    const userId = decodedToken.subject;
    const tokenRecords = await tx.userToken.findMany({
      where: {
        userId,
        revoked: false,
        expiresAt: { gte: new Date() },
      },
    });

    const validTokenRecord = await Promise.all(
      tokenRecords.map(async (tokenRecord) => {
        const isValidToken = await crypto.verifyValue(
          refreshToken,
          tokenRecord.token
        );
        return isValidToken ? tokenRecord : null;
      })
    ).then((results) => results.find((record) => record !== null));

    if (!validTokenRecord) {
      throw new Error("Refresh token is invalid or already revoked");
    }

    await tx.userToken.update({
      where: { id: validTokenRecord.id },
      data: { revoked: true },
    });

    if (action === "REGENERATE") {
      const [newAccessToken, newRefreshToken] = await Promise.all([
        jwt.createAccessToken(userId.toString()),
        jwt.createRefreshToken(userId.toString()),
      ]);
      return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    }

    return true;
  });
};

/**
 * Regenerates a new access and refresh token using the given refresh token.
 *
 * @param refreshToken - The refresh token to use to regenerate a new token.
 * @returns An object containing the new access and refresh tokens.
 * @throws {Error} If the refresh token is invalid or already revoked.
 */
export const regenToken = async (refreshToken: string): Promise<any> => {
  return await processToken(refreshToken, "REGENERATE");
};

/**
 * Revokes a refresh token and makes it invalid for authentication.
 *
 * @param refreshToken - The refresh token to revoke.
 * @returns A boolean indicating whether the token was revoked successfully.
 * @throws {Error} If the refresh token is invalid or already revoked.
 */
export const logout = async (refreshToken: string) => {
  return await processToken(refreshToken, "REVOKE");
};
