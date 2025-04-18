export interface IProduct {
    productId: number;
    name: string;
    description: string;
    features: string[];
    image: string;
    releaseDate: string;
    hype?: number; // Optional property for hype
    daysLeft?: number; // Optional property for days left
    title: string;
    rating: number;
    price: number;
    specs: string;
    category: string; // Category of the product (e.g., "Laptop", "Mouse", etc.)
    inStock: boolean; // Availability of the product
    discount: number;
    isNew: boolean;
    colors: string[];
    brand: string[];
  }
  
  export type ProductPreview = Pick<
    IProduct,
    | "productId"
    | "name"
    | "image"
    | "price"
    | "rating"
    | "specs"
    | "category"
    | "inStock"
    | "isNew"
    | "discount"
    | "colors"
    | "daysLeft"
    | "hype"
    | "description"
    | "features"
    | "brand"
  >;
  
  export type UpComingProductPreview = Pick<
    IProduct,
    "productId" | "name" | "description" | "image" | "releaseDate" | "daysLeft" | "hype"
  >;
  