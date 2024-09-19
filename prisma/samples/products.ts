type Product = {
  name: string;
  description: string;
  price: number;
  stock_qty: number;
  sku: string;
  image_url: string;
};

const products: Product[] = [
  {
    name: "Kopi Arabika",
    description: "Kopi Arabika dengan kualitas terbaik.",
    price: 100000,
    stock_qty: 50,
    sku: "KA001",
    image_url: "https://placehold.co/500x500?text=Kopi%20Arabika",
  },
  {
    name: "Kopi Robusta",
    description: "Kopi Robusta dengan aroma khas.",
    price: 85000,
    stock_qty: 30,
    sku: "KR001",
    image_url: "https://placehold.co/500x500?text=Kopi%20Robusta",
  },
  {
    name: "Kopi Luwak",
    description: "Kopi Luwak yang langka dan istimewa.",
    price: 300000,
    stock_qty: 10,
    sku: "KL001",
    image_url: "https://placehold.co/500x500?text=Kopi%20Luwak",
  },
  {
    name: "Kopi Toraja",
    description: "Kopi Toraja dengan rasa khas nusantara.",
    price: 120000,
    stock_qty: 25,
    sku: "KT001",
    image_url: "https://placehold.co/500x500?text=Kopi%20Toraja",
  },
  {
    name: "Kopi Gayo",
    description: "Kopi Gayo dari Aceh, terkenal akan cita rasanya.",
    price: 110000,
    stock_qty: 40,
    sku: "KG001",
    image_url: "https://placehold.co/500x500?text=Kopi%20Gayo",
  },
  {
    name: "Kopi Bali",
    description: "Kopi Bali dengan rasa yang kuat dan aromatik.",
    price: 95000,
    stock_qty: 35,
    sku: "KB002",
    image_url: "https://placehold.co/500x500?text=Kopi%20Bali",
  },
  {
    name: "Kopi Mandheling",
    description:
      "Kopi Mandheling dari Sumatera, dengan karakteristik yang unik.",
    price: 105000,
    stock_qty: 20,
    sku: "KM002",
    image_url: "https://placehold.co/500x500?text=Kopi%20Mandheling",
  },
  {
    name: "Kopi Kintamani",
    description: "Kopi Kintamani dengan aroma citrus yang segar.",
    price: 115000,
    stock_qty: 28,
    sku: "KK003",
    image_url: "https://placehold.co/500x500?text=Kopi%20Kintamani",
  },
  {
    name: "Kopi Jember",
    description: "Kopi Jember dengan cita rasa yang seimbang dan lembut.",
    price: 90000,
    stock_qty: 50,
    sku: "KJ003",
    image_url: "https://placehold.co/500x500?text=Kopi%20Jember",
  },
  {
    name: "Kopi Sidikalang",
    description: "Kopi Sidikalang dengan rasa yang kuat dan aroma khas.",
    price: 95000,
    stock_qty: 22,
    sku: "KS004",
    image_url: "https://placehold.co/500x500?text=Kopi%20Sidikalang",
  },
  {
    name: "Kopi Bajawa",
    description: "Kopi Bajawa dengan rasa yang intens dan kompleks.",
    price: 125000,
    stock_qty: 18,
    sku: "KB004",
    image_url: "https://placehold.co/500x500?text=Kopi%20Bajawa",
  },
  {
    name: "Kopi Manggarai",
    description: "Kopi Manggarai dengan karakteristik yang halus dan aromatik.",
    price: 110000,
    stock_qty: 30,
    sku: "KM005",
    image_url: "https://placehold.co/500x500?text=Kopi%20Manggarai",
  },
  {
    name: "Kopi Bener Meriah",
    description: "Kopi Bener Meriah dengan rasa yang kuat dan body yang penuh.",
    price: 98000,
    stock_qty: 45,
    sku: "KB005",
    image_url: "https://placehold.co/500x500?text=Kopi%20Bener%20Meriah",
  },
  {
    name: "Kopi Sumatera",
    description: "Kopi Sumatera dengan rasa yang bervariasi dan unik.",
    price: 98000,
    stock_qty: 50,
    sku: "KS006",
    image_url: "https://placehold.co/500x500?text=Kopi%20Sumatera",
  },
];

export default products;
