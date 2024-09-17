import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import slugify from "../src/utils/slugifyUtils";

const prisma = new PrismaClient();

async function main() {
  const filePath = path.join(__dirname, "sample.json");
  const rawData = fs.readFileSync(filePath, "utf-8");
  const samples = JSON.parse(rawData);

  for (const product of samples) {
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
