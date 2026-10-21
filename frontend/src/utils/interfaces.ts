export type Product = {
  name: string;
  category: string;
  price: number;
  stock: number;
  sold: number;
  image: string;
  status: "In stock" | "Low stock" | "Out of stock";
};
export const initialProducts: Product[] = [
  {
    name: "Everyday Tote",
    category: "Accessories",
    price: 38,
    stock: 8,
    sold: 124,
    image: "photo-1590874103328-eac38a683ce7",
    status: "Low stock",
  },
  {
    name: "Stoneware Set",
    category: "Home & living",
    price: 64,
    stock: 42,
    sold: 98,
    image: "photo-1610701596007-11502861dcfa",
    status: "In stock",
  },
  {
    name: "Cloud Knit",
    category: "Apparel",
    price: 82,
    stock: 5,
    sold: 86,
    image: "photo-1576566588028-4147f3842f27",
    status: "Low stock",
  },
  {
    name: "Ridge Bottle",
    category: "Accessories",
    price: 28,
    stock: 0,
    sold: 73,
    image: "photo-1602143407151-7111542de6e8",
    status: "Out of stock",
  },
];

export const chartSets = {
  "7 days": {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    values: [38, 53, 45, 67, 56, 78, 69],
    total: "$18,420",
  },
  "30 days": {
    labels: ["1", "5", "10", "15", "20", "25", "30"],
    values: [34, 52, 43, 69, 55, 78, 88],
    total: "$84,254",
  },
  "12 months": {
    labels: ["Jan", "Mar", "May", "Jul", "Sep", "Nov", "Dec"],
    values: [28, 42, 39, 61, 56, 73, 91],
    total: "$942,680",
  },
};
export type Period = keyof typeof chartSets;
export type IconName =
  | "grid"
  | "box"
  | "bag"
  | "chart"
  | "spark"
  | "settings"
  | "search"
  | "bell"
  | "plus"
  | "arrow"
  | "more"
  | "chevron"
  | "close";
