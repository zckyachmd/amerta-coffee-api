import { faker } from "@faker-js/faker";

type Product = {
  name: string;
  price: number;
  stock_qty: number;
  sku: string;
  description: string;
  image_url?: Array<string>;
  specifications?: {
    weight: string;
    roast: string;
    cupping: string;
  };
  grinding?: {
    "super-fine": string;
    fine: string;
    "medium-fine": string;
    medium: string;
    "medium-coarse": string;
    coarse: string;
  };
};

const toTitleCase = (str: string): string => {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const generateProduct = (): Product => {
  const adjective = faker.word.adjective();
  const noun = faker.word.noun();
  const name = toTitleCase(`${adjective} ${noun} Coffee`);

  const descriptions = [
    `Rasakan kelezatan ${name}, kopi yang terbuat dari biji kopi premium. Diproses dengan teknik terbaik, setiap cangkir ${adjective} ${noun} Coffee menyajikan rasa yang seimbang, dengan aroma yang menggoda.`,
    `Kopi ${name} adalah pilihan sempurna untuk para pecinta kopi. Dengan karakter rasa yang unik dan aroma yang menggugah selera, nikmati pengalaman ngopi yang tak terlupakan.`,
    `Dapatkan pengalaman baru dengan ${adjective} ${noun} Coffee. Kombinasi rasa yang kaya dan aroma yang memikat akan membuat setiap cangkir menjadi istimewa.`,
    `Kopi ini, ${name}, diolah dengan cinta dari biji kopi terbaik. Rasakan perpaduan cita rasa yang memanjakan lidah dan membuat hari-harimu lebih berwarna.`,
    `Nikmati keunikan dari ${adjective} ${noun} Coffee, yang menyajikan rasa autentik dari biji kopi pilihan yang diproses dengan hati-hati.`,
  ];

  const imageCount = faker.number.int({ min: 1, max: 3 });
  const imageUrls = Array.from({ length: imageCount }, (_, index) => {
    const imageText = index === 0 ? name : `${name} - Variation ${index}`;
    return `https://placehold.co/500x500?text=${imageText}`;
  });

  return {
    name: name,
    price: Number(faker.commerce.price({ min: 50000, max: 300000 })),
    stock_qty: faker.number.int({ min: 0, max: 100 }),
    sku: `KA${faker.string.numeric(3)}`,
    description: faker.helpers.arrayElement(descriptions),
    image_url: imageUrls,
    specifications: {
      weight: `${faker.number.int({ min: 250, max: 1000 })}gr`,
      roast: faker.helpers.arrayElement([
        "Light",
        "Medium",
        "Medium Dark",
        "Dark",
      ]),
      cupping: faker.lorem.words(faker.number.int({ min: 1, max: 5 })),
    },
    grinding: {
      "super-fine": "Turkish coffee",
      fine: "Espresso",
      "medium-fine": "Mokapot",
      medium: "Pour over (V60, Chemex, Kalita)",
      "medium-coarse": "French press",
      coarse: "Cold drip, Cold brew",
    },
  };
};

const products: Product[] = Array.from({ length: 30 }, generateProduct);

export default products;
