type Product = {
  name: string;
  price: number;
  stock_qty: number;
  sku: string;
  description: string;
  image_url?: Array<string>;
  specifications?: Object;
  grinding?: Object;
};

const products: Product[] = [
  {
    name: "Golden Crem",
    price: 130000,
    stock_qty: 23,
    sku: "KA001",
    description:
      "Kopi Houseblend Golden Crema akan membuat Anda terkesima mulai dari crema espresso yang tercipta dan karakter rasa yang menampilkan kesan mendalam melekat lama di sensori Anda. Otten Coffee antusias memperkenalkannya pada Anda sebuah racikan biji kopi yang diproses secara khusus oleh roaster ahli kami, dengan Golden Crema penyajian menu kopi apa pun menjadi berkualitas.",
    image_url: [
      "https://d8g5mz6srwlcs.cloudfront.net/original/66cd748317ec6509990493.jpg",
      "https://d8g5mz6srwlcs.cloudfront.net/original/66cd74832db7d956487899.jpg",
    ],
    specifications: {
      weight: "500gr",
      roast: "Medium Dark",
      cupping: "Chocolate, Brown Spice, Orange, Malt",
    },
    grinding: {
      "super-fine": "Turkish coffee",
      fine: "Espresso",
      "medium-fine": "Mokapot",
      medium: "Pour over (V60, Chemex, Kalita) syphon, Aeropress, Vietnam Drip",
      "medium-coarse": "French press",
      coarse: "Cold drip, Cold brew​​​",
    },
  },
  {
    name: "Sidikalang",
    price: 94000,
    stock_qty: 54,
    sku: "KA002",
    description:
      "Kopi Arabika Sidikalang memiliki aroma yang khas memikat dengan perpaduan cita rasa teh hitam, cokelat dan rasa yang alami. Biji kopi yang berasal dari ketinggian 1350 mdpl di wilayah Sidikalang kabupaten Dairi provinsi Sumatera Utara ini setelah panen diproses giling basah (semi washed). Kemudian disangrai dengan sempurna pada level medium dark untuk mengoptimalkan cita rasa paling istimewa.",
    image_url: [
      "https://d8g5mz6srwlcs.cloudfront.net/original/66c8364ddfdf6877085661.jpg",
    ],
    specifications: {
      weight: "200gr",
      roast: "Medium Dark",
    },
    grinding: {
      "super-fine": "Turkish coffee",
      fine: "Espresso",
      "medium-fine": "Mokapot",
      medium: "Pour over (V60, Chemex, Kalita) syphon, Aeropress, Vietnam Drip",
      "medium-coarse": "French press",
      coarse: "Cold drip, Cold brew​​​",
    },
  },
  {
    name: "Crema Espresso",
    price: 124000,
    stock_qty: 41,
    sku: "KA003",
    description:
      "Kopi Crema Espresso menemani perjalanan banyak orang dalam jelajah cita rasa meracik menu cappuccino favorit, eksplorasi sajian kopi espresso rumahan bahkan hingga bisnis kopi.​ Otten Coffee sangat memahami gairah Anda ketika membuat minuman kopi, oleh karenanya kami memilih dengan teliti biji kopi kualitas terbaik untuk menghadirkan Crema Espresso pada Anda.",
    image_url: [
      "https://d8g5mz6srwlcs.cloudfront.net/original/65e685e7a0999323455035.jpg",
      "https://d8g5mz6srwlcs.cloudfront.net/original/65e685e7a0999634591501.jpg",
    ],
    specifications: {
      weight: "500gr",
      roast: "Medium Dark",
      planting: "1500mdpl (Arabica), 800 - 900mdpl (Robusta)",
    },
    grinding: {
      "super-fine": "Turkish coffee",
      fine: "Espresso",
      "medium-fine": "Mokapot",
      medium: "Pour over (V60, Chemex, Kalita) syphon, Aeropress, Vietnam Drip",
      "medium-coarse": "French press",
      coarse: "Cold drip, Cold brew​​​",
    },
  },
  {
    name: "Toraja Sapan",
    price: 128000,
    stock_qty: 15,
    sku: "KA004",
    description:
      "Tanah Toraja adalah daerah yang diberkahi dengan tanah tempat tanaman kopi tumbuh subur dengan kualitas yang tak kalah baik dari kopi di daerah-daerah lain. Rasa yang kuat dan kadar asam yang unik menjadikan kopi Toraja diminati pasar yang memang menyukai kopi nikmat dengan kadar asam tertentu. Meskipun sering disebut-sebut bercita rasa mirip dengan kopi Sumatera, tapi kopi Toraja memiliki ciri sendiri yakni beraroma earthy. Kopi Toraja memiliki bentuk biji yang lebih kecil dan lebih mengkilap dan licin pada kulit bijinya.",
    image_url: [
      "https://d8g5mz6srwlcs.cloudfront.net/original/66c835187addc271470098.jpg",
    ],
    specifications: {
      weight: "200gr",
      roast: "Medium Roast",
      planting: "1600mdpl",
      variety: "Lini S",
    },
    grinding: {
      "super-fine": "Turkish coffee",
      fine: "Espresso",
      "medium-fine": "Mokapot",
      medium: "Pour over (V60, Chemex, Kalita) syphon, Aeropress, Vietnam Drip",
      "medium-coarse": "French press",
      coarse: "Cold drip, Cold brew​​​",
    },
  },
  {
    name: "Premium Arabica",
    price: 124000,
    stock_qty: 10,
    sku: "KA005",
    description:
      "Kopi Houseblend Premium Arabica diracik menggunakan biji kopi arabika kualitas terbaik sehingga menghadirkan pengalaman klasik elegan layaknya jatuh hati pertama kali minum kopi. Otten Coffee mengerti dedikasi Anda pada racikan minuman kopi berkualitas, kami merekomendasikan Premium Arabica untuk semakin menyempurnakan karakter minuman kopi Anda.",
    image_url: [
      "https://d8g5mz6srwlcs.cloudfront.net/original/66cd743335c73792695344.jpg",
      "https://d8g5mz6srwlcs.cloudfront.net/original/66cd74324a1e7768189995.jpg",
    ],
    specifications: {
      weight: "500gr",
      roast: "Medium Roast",
      region: "Gayo Benar Meriah",
      planting: "1500mdpl",
      variety: "Ateng / Catimor",
      cupping:
        "Syrupy body, low acidity with chocolate, black cherry and rich, earthy flavour",
    },
    grinding: {
      "super-fine": "Turkish coffee",
      fine: "Espresso",
      "medium-fine": "Mokapot",
      medium: "Pour over (V60, Chemex, Kalita) syphon, Aeropress, Vietnam Drip",
      "medium-coarse": "French press",
      coarse: "Cold drip, Cold brew​​​",
    },
  },
  {
    name: "Aceh Gayo Atu Lintang",
    price: 88000,
    stock_qty: 24,
    sku: "KA006",
    description:
      "Kopi Arabika Aceh Gayo Atu Lintang menyimpan cita rasa gula merah, sensasi kulit jeruk, jahe dan buah pala, temukan perpaduan khas ini di setiap seduhan kopi Anda. Biji kopi yang berasal dari ketinggian 1.500 mdpl gampong Atu Lintang wilayah Gayo kabupaten Aceh Tengah provinsi Aceh, hasil panennya diproses giling basah (semi washed) yang kemudian disangrai sempurna level medium roast untuk memaksimalkan cita rasa.",
    image_url: [
      "https://d8g5mz6srwlcs.cloudfront.net/original/66c83915b6de8936360590.jpg",
    ],
    specifications: {
      weight: "200gr",
      roast: "Medium Roast",
      planting: "1500mdpl",
      variety: "Ateng / Catimor",
    },
    grinding: {
      "super-fine": "Turkish coffee",
      fine: "Espresso",
      "medium-fine": "Mokapot",
      medium: "Pour over (V60, Chemex, Kalita) syphon, Aeropress, Vietnam Drip",
      "medium-coarse": "French press",
      coarse: "Cold drip, Cold brew​​​",
    },
  },
  {
    name: "Cappuccino Del Italiano",
    price: 47500,
    stock_qty: 12,
    sku: "KA007",
    description:
      "Kopi Houseblend 'Cappuccino Del Italiano' memudahkan Anda menemukan kelembutan elegan kopi susu klasik khas cita rasa Italia sebagai pelopor minuman kopi cappuccino di dunia. Otten Coffee antusias memperkenalkannya pada Anda sebuah racikan biji kopi yang diproses secara khusus oleh roaster ahli kami, dengan Cappuccino Del Italiano penyajian menu kopi apa pun menjadi berkualitas.",
    image_url: [
      "https://d8g5mz6srwlcs.cloudfront.net/original/66c84a17d2d0e912579793.jpg",
      "https://d8g5mz6srwlcs.cloudfront.net/original/66c84a18124da306798075.jpg",
    ],
    specifications: {
      weight: "200gr",
      roast: "Medium Dark Roast",
    },
    grinding: {
      "super-fine": "Turkish coffee",
      fine: "Espresso",
      "medium-fine": "Mokapot",
      medium: "Pour over (V60, Chemex, Kalita) syphon, Aeropress, Vietnam Drip",
      "medium-coarse": "French press",
      coarse: "Cold drip, Cold brew​​​",
    },
  },
  {
    name: "Aceh Gayo Atu Lintang",
    price: 88000,
    stock_qty: 51,
    sku: "KA008",
    description:
      "Kopi Arabika Aceh Gayo Atu Lintang menyimpan cita rasa gula merah, sensasi kulit jeruk, jahe dan buah pala, temukan perpaduan khas ini di setiap seduhan kopi Anda. Biji kopi yang berasal dari ketinggian 1.500 mdpl gampong Atu Lintang wilayah Gayo kabupaten Aceh Tengah provinsi Aceh, hasil panennya diproses giling basah (semi washed) yang kemudian disangrai sempurna level medium roast untuk memaksimalkan cita rasa.",
    image_url: [
      "https://d8g5mz6srwlcs.cloudfront.net/original/66c83915b6de8936360590.jpg",
    ],
    specifications: {
      weight: "200gr",
      roast: "Medium Roast",
      planting: "1500mdpl",
      variety: "Ateng / Catimor",
    },
    grinding: {
      "super-fine": "Turkish coffee",
      fine: "Espresso",
      "medium-fine": "Mokapot",
      medium: "Pour over (V60, Chemex, Kalita) syphon, Aeropress, Vietnam Drip",
      "medium-coarse": "French press",
      coarse: "Cold drip, Cold brew​​​",
    },
  },
  {
    name: "Cappuccino Del Italiano",
    price: 47500,
    stock_qty: 3,
    sku: "KA009",
    description:
      "Kopi Houseblend 'Cappuccino Del Italiano' memudahkan Anda menemukan kelembutan elegan kopi susu klasik khas cita rasa Italia sebagai pelopor minuman kopi cappuccino di dunia. Otten Coffee antusias memperkenalkannya pada Anda sebuah racikan biji kopi yang diproses secara khusus oleh roaster ahli kami, dengan Cappuccino Del Italiano penyajian menu kopi apa pun menjadi berkualitas.",
    image_url: [
      "https://d8g5mz6srwlcs.cloudfront.net/original/66c84a18124da306798075.jpg",
    ],
    specifications: {
      weight: "200gr",
      roast: "Medium Dark Roast",
    },
    grinding: {
      "super-fine": "Turkish coffee",
      fine: "Espresso",
      "medium-fine": "Mokapot",
      medium: "Pour over (V60, Chemex, Kalita) syphon, Aeropress, Vietnam Drip",
      "medium-coarse": "French press",
      coarse: "Cold drip, Cold brew​​​",
    },
  },
  {
    name: "Wanoja Kamojang Natural Process",
    price: 144000,
    stock_qty: 1,
    sku: "KA010",
    description:
      "Java Kamojang Natural Process 200g Kopi Arabica Untuk setiap bubuk kopi single origin dan commercial coffee yang dijual di Otten Coffee, semuanya digiling dengan memakai mesin penggiling Mahlkonig VTA 6S. Mesin ini memiliki conical burr yang terkenal dengan hasil gilingan yang presisi di setiap partikel gilingannya. Karenanya, kini para pelanggan setia Otten Coffee bisa memilih berbagai rentang pilihan level gilingan sesuai dengan kebutuhan masing-masing, mulai dari super fine hingga coarse.",
    image_url: [
      "https://d8g5mz6srwlcs.cloudfront.net/original/623832e222103943375647.jpg",
    ],
    specifications: {
      weight: "200gr",
      roast: "Light Roast",
      planting: "1300 - 1500mdpl",
      varieties: "Lini S, Sigararutang, Kartika, Typica",
    },
    grinding: {
      "super-fine": "Turkish coffee",
      fine: "Espresso",
      "medium-fine": "Mokapot",
      medium: "Pour over (V60, Chemex, Kalita) syphon, Aeropress, Vietnam Drip",
      "medium-coarse": "French press",
      coarse: "Cold drip, Cold brew​​​",
    },
  },
  {
    name: "Papandayan Honey Process",
    price: 104000,
    stock_qty: 45,
    sku: "KA011",
    description:
      "Kopi Papandayan berasal dari kebun kopi di wilayah kabupaten Garut, Jawa Barat tepatnya di kecamatan Cisurupan, biji kopi ini dipanen dari tanaman kopi yang tumbuh subur di Gunung Papandayan.",
    image_url: [
      "https://d8g5mz6srwlcs.cloudfront.net/original/6641dc60827e1203838200.jpg",
    ],
    specifications: {
      weight: "200gr",
      roast: "Light Roast",
      planting: "1300-1500 mdpl",
      variety: "Kartika, Lini S, Ateng, Bourbon",
    },
    grinding: {
      "super-fine": "Turkish coffee",
      fine: "Espresso",
      "medium-fine": "Mokapot",
      medium: "Pour over (V60, Chemex, Kalita) syphon, Aeropress, Vietnam Drip",
      "medium-coarse": "French press",
      coarse: "Cold drip, Cold brew​​​",
    },
  },
];

export default products;
