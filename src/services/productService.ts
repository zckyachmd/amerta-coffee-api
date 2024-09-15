import { z } from "@hono/zod-openapi";
import { productSchema } from "@/schemas/productSchema";
import db from "@/libs/db";

const slugify = (name: string) => {
  return name
    .trim()
    .toLowerCase()
    .replace(/ /g, "-")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

/**
 * Retrieves a list of products with pagination.
 *
 * @param page The page number to retrieve. Defaults to 1.
 * @param limit The number of products to retrieve per page. Defaults to 10.
 * @param params The search term to filter products by. Case-insensitive.
 * @returns An object with the following properties:
 *   - products: An array of product objects.
 *   - pagination: An object with the following properties:
 *     - currentPage: The current page number.
 *     - totalPages: The total number of pages.
 *     - total: The total number of products.
 */
export const getAll = async (
  page: number = 1,
  limit: number = 10,
  search?: string
) => {
  const [products, total] = await Promise.all([
    db.product.findMany({
      where: {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
      skip: (page - 1) * limit,
      take: limit,
    }),
    db.product.count({
      where: {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
    }),
  ]);

  if (!products || products.length === 0) {
    throw new Error("Products not found!");
  }

  return {
    products,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(total / limit) || 1,
      total,
    },
  };
};

/**
 * Retrieves a product by its ID.
 * @param id The ID of the product to retrieve.
 * @param count Whether to count the number of products.
 * @returns The retrieved product, or throws an error if the product is not found.
 */
export const getById = async (id: number, count = false) => {
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
};

/**
 * Retrieves a product by its slug.
 *
 * @param slug The slug of the product to retrieve.
 * @returns The retrieved product, or throws an error if the product is not found.
 */
export const getBySlug = async (slug: string) => {
  const product = await db.product.findUnique({
    where: { slug },
  });

  if (!product) {
    throw new Error("Product not found!");
  }

  return product;
};

/**
 * Creates a new product.
 *
 * @param data The product data to create.
 * @returns The created product, or throws an error if the product is not created.
 */
export const create = async (data: z.infer<typeof productSchema>) => {
  const {
    name,
    description = "",
    price,
    stock,
    sku = null,
    image = "https://placehold.co/500x500?text=No%20Image",
  } = data;

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
      image_url: image,
    },
  });
};

/**
 * Updates a product.
 *
 * @param id The ID of the product to update.
 * @param data The product data to update.
 * @returns The updated product, or throws an error if the product is not updated.
 */
export const update = async (
  id: number,
  data: z.infer<typeof productSchema>
) => {
  const {
    name,
    description = "",
    price,
    stock,
    sku = null,
    image = "https://placehold.co/500x500?text=No%20Image",
  } = data;

  const isExist = await getById(id, true);
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
      image_url: image,
    },
  });
};

/**
 * Deletes a product by its ID.
 *
 * @param id The ID of the product to delete.
 * @returns The deleted product, or throws an error if the product is not found.
 */
export const deleteById = async (id: number) => {
  const isExist = await getById(id, true);
  if (!isExist) {
    throw new Error("Product not found!");
  }

  return await db.product.delete({ where: { id } });
};
