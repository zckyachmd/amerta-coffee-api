import { z } from "@hono/zod-openapi";
import { productSchema } from "@/schemas/productSchema";
import db from "@/libs/db";
import slugify from "@/utils/slugifyUtils";
import parseFilters from "@/utils/filterUtils";
import parseSorts from "@/utils/sortUtils";

/**
 * Retrieves a list of products.
 *
 * @param {number} [page=1] - The page number to fetch.
 * @param {number} [limit=10] - The limit of products per page.
 * @param {string} [filters] - Filters to apply to the query.
 * @param {string} [sort] - Sorting to apply to the query.
 * @return {Promise<{ products: import("@prisma/client").Product[], totalData: number, pagination?: { currentPage: number, totalPages: number } }>}
 */
export const getAll = async (
  page: number = 1,
  limit: number = 10,
  filters?: string,
  sort?: string
) => {
  const whereConditions = parseFilters(filters);
  const orderBy = parseSorts(sort);
  const skip = Math.max((page - 1) * limit, 0);
  const take = limit > 0 ? limit : 10;

  try {
    const [products, total] = await Promise.all([
      db.product.findMany({
        where: whereConditions,
        skip,
        take,
        orderBy,
      }),
      db.product.count({
        where: whereConditions,
      }),
    ]);

    return {
      products,
      totalData: total,
      pagination: page
        ? {
            currentPage: page,
            totalPages: Math.ceil(total / take),
          }
        : undefined,
    };
  } catch (error: Error | any) {
    throw new Error("Failed to fetch products", { cause: error });
  }
};

/**
 * Retrieves a product by its ID.
 *
 * If `count` is set to `true`, it will only return an object with `exists` key
 * indicating whether the product exists or not.
 *
 * If `count` is set to `false` or not provided, it will return the product data.
 *
 * @throws {Error} If product not found
 * @returns {Promise<{exists: boolean} | Product>}
 */
export const getById = async (id: string, count = false) => {
  try {
    if (count) {
      const productExists = await db.product.count({
        where: { id },
      });

      if (!productExists) {
        throw new Error("Product not found!");
      }

      return { exists: true };
    }

    const product = await db.product.findUniqueOrThrow({
      where: { id },
    });

    return product;
  } catch (error: Error | any) {
    throw new Error("Failed to retrieve product", { cause: error });
  }
};

/**
 * Retrieves a product by its slug.
 *
 * @throws {Error} If product not found
 * @returns {Promise<Product>}
 */
export const getBySlug = async (slug: string) => {
  try {
    const product = await db.product.findUnique({
      where: { slug },
    });

    if (!product) {
      throw new Error("Product not found!");
    }

    return product;
  } catch (error: Error | any) {
    throw new Error("Failed to retrieve product by slug", { cause: error });
  }
};

/**
 * Creates a new product.
 *
 * @throws {Error} If product with same name already exists
 * @returns {Promise<Product>}
 */
export const create = async (data: z.infer<typeof productSchema>) => {
  const {
    name,
    description = "",
    price,
    stock,
    sku = null,
    images = ["https://placehold.co/500x500?text=No%20Image"],
  } = data;

  try {
    const isExist = await db.product.findUnique({
      where: { name },
    });

    if (isExist) {
      throw new Error("Product already exists!");
    }

    return await db.product.create({
      data: {
        name,
        description,
        price,
        stock_qty: stock,
        slug: slugify(name),
        sku,
        image_url: Array.isArray(images) ? images : [images],
      },
    });
  } catch (error: Error | any) {
    throw new Error("Failed to create product", { cause: error });
  }
};

/**
 * Updates a product.
 *
 * @throws {Error} If product with given id not found
 * @returns {Promise<Product>}
 */
export const update = async (
  id: string,
  data: z.infer<typeof productSchema>
) => {
  const {
    name,
    description = "",
    price,
    stock,
    sku = null,
    images = ["https://placehold.co/500x500?text=No%20Image"],
  } = data;

  try {
    const isExist = await db.product.findUnique({
      where: { id },
    });

    if (!isExist) {
      throw new Error("Product not found!");
    }

    return await db.product.update({
      where: { id },
      data: {
        name,
        description,
        price,
        stock_qty: stock,
        slug: slugify(name),
        sku,
        image_url: Array.isArray(images) ? images : [images],
      },
    });
  } catch (error: Error | any) {
    throw new Error("Failed to update product", { cause: error });
  }
};

/**
 * Deletes a product by its id.
 *
 * @throws {Error} If product with given id not found
 * @returns {Promise<void>}
 */
export const deleteById = async (id: string) => {
  try {
    const isExist = await db.product.findUnique({
      where: { id },
    });

    if (!isExist) {
      throw new Error("Product not found!");
    }

    await db.product.delete({ where: { id } });
  } catch (error: Error | any) {
    throw new Error("Failed to delete product", { cause: error });
  }
};
