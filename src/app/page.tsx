import ProductCard from "./ProductCard";
import { products } from "./data";

export default function Home() {
  const handleViewMore = () => {
    console.log("View more clicked");
  };

  const handleAddToCart = (productId: number) => {
    console.log(`Added product ${productId} to cart`);
  };
  return (
    <main className="container mx-auto px-4 py-8">
      <ProductCard
        title="Featured Products"
        products={products}
        onViewMore={handleViewMore}
        onAddToCart={handleAddToCart}
      />
    </main>
  );
}
