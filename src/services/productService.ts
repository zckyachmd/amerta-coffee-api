import { z } from "@hono/zod-openapi";
import { productSchema } from "@/schemas/productSchema";
import db from "@/libs/db";
import slugify from "@/utils/slugifyUtils";
import parseFilters from "@/utils/filterUtils";
import parseSorts from "@/utils/sortUtils";

/**
 * Retrieves a list of products with pagination.
 *
 * @param page The page number to retrieve. Defaults to 1.
 * @param limit The number of products to retrieve per page. Defaults to 10.
 * @param filters The search term to filter products by. Case-insensitive.
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
  } catch (error) {
    throw new Error("Failed to fetch products");
  } finally {
    await db.$disconnect();
  }
};

/**
 * Retrieves a product by its ID.
 * @param id The ID of the product to retrieve.
 * @param count Whether to count the number of products.
 * @returns The retrieved product, or throws an error if the product is not found.
 */
export const getById = async (id: string, count = false) => {
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
  id: string,
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
export const deleteById = async (id: string) => {
  const isExist = await getById(id, true);
  if (!isExist) {
    throw new Error("Product not found!");
  }

  return await db.product.delete({ where: { id } });
};
