import { PrismaClient } from "@prisma/client";
import { hashValue } from "../src/libs/crypto";
import slugify from "../src/utils/slugifyUtils";
import users from "./samples/users";
import products from "./samples/products";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding users...");
  for (const user of users) {
    const userData = {
      name: user.name,
      email: user.email,
      password: await hashValue(user.password),
      address: user.address,
      phone: user.phone,
      avatar_url: user.avatar_url,
    };

    await prisma.user.upsert({
      where: { email: user.email },
      update: userData,
      create: {
        ...userData,
      },
    });

    console.log(`🆕 User: ${user.name}`);
  }

  console.log("Seeding products...");
  for (const product of products) {
    const productData = {
      name: product.name,
      description: product.description,
      price: product.price,
      stock_qty: product.stock_qty,
      sku: product.sku,
      image_url: product.image_url,
    };

    await prisma.product.upsert({
      where: { slug: slugify(product.name) },
      update: productData,
      create: {
        ...productData,
        slug: slugify(product.name),
      },
    });

    console.log(`🆕 Product: ${product.name}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    console.log("Seeding finished. Disconnecting...");
    await prisma.$disconnect();
    process.exit(0);
  });
