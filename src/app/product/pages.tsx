"use client";

import { products } from "./data";
import ProductCard from "./ProductCard";

export default function ProductPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <ProductCard
        title="Featured Products"
        products={products}
        onViewMore={() => console.log("View more clicked")}
        onAddToCart={(productId) =>
          console.log(`Added product ${productId} to cart`)
        }
      />
    </main>
  );
}
