'use client'

import {
  ArrowUpRight,
  Check,
  ChevronRight,
  Eye,
  Heart,
  ShoppingCart,
  Star,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { ProductPreview } from "./IProduct";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@radix-ui/react-tooltip";

interface ProductSectionProps {
  title: string;
  products: ProductPreview[];
  onAddToCart?: (productId: number) => void;
  onViewMore?: () => void;
}

function ProductCard({
  title,
  products,
  onAddToCart = () => {},
  onViewMore = () => {},
}: Readonly<ProductSectionProps>) {
  const [previewProduct, setPreviewProduct] = useState<ProductPreview | null>(
    null
  );
  const [activeBrand, setActiveBrand] = useState("all");
  const [showAllBrands, setShowAllBrands] = useState(false);

  // Extract unique brands from products
  const extractBrands = (): string[] => {
    const brandSet = new Set<string>();

    // Add "all" as the first option
    brandSet.add("all");

    // Extract brands from products
    products.forEach((product) => {
      if (product.brand && Array.isArray(product.brand)) {
        // If brand is an array, add each brand
        product.brand.forEach((b) => {
          if (b) brandSet.add(b);
        });
      } else if (product.brand) {
        // If brand is a string
        brandSet.add(product.brand);
      }
    });

    return Array.from(brandSet);
  };

  const brands = extractBrands();

  // Display only first 5 brands, or all if showAllBrands is true
  const displayedBrands = showAllBrands ? brands : brands.slice(0, 5);

  // Filter products by selected brand
  const filteredProducts =
    activeBrand === "all"
      ? products
      : products.filter((product) => {
          if (Array.isArray(product.brand)) {
            return product.brand.includes(activeBrand);
          }
          return product.brand === activeBrand;
        });

  const handlePreview = (product: ProductPreview) => {
    setPreviewProduct(product);
  };

  return (
    <section className="mb-12">
      <div className="flex flex-col space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold pb-2 border-b-2 border-primary">
            {title}
          </h2>

          <Button
            variant="outline"
            size="sm"
            className="hover:bg-primary hover:text-primary-foreground transition-colors hidden sm:flex"
            onClick={onViewMore}
          >
            <span className="hidden md:inline">View More</span>
            <span className="inline md:hidden">More</span>
            <ArrowUpRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <div className="overflow-x-auto pb-1 sm:pb-2 -mx-1 scrollbar-hide w-full sm:w-auto">
            <Tabs defaultValue="all" value={activeBrand} onValueChange={setActiveBrand} className="w-full">
              <TabsList className="h-7 sm:h-9 bg-muted/50 min-w-full sm:min-w-0">
                {displayedBrands.map((brand) => (
                  <TabsTrigger
                    key={brand}
                    value={brand}
                    className="text-xs sm:text-sm capitalize px-2 sm:px-3 py-1 sm:py-1.5 whitespace-nowrap"
                  >
                    {brand}
                  </TabsTrigger>
                ))}

                {brands.length > 5 && !showAllBrands && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowAllBrands(true)}
                    className="text-xs sm:text-sm h-6 sm:h-7 px-1 sm:px-2 whitespace-nowrap"
                  >
                    More +
                  </Button>
                )}
              </TabsList>
            </Tabs>
          </div>

          <Button
            variant="outline"
            className="hover:bg-primary hover:text-primary-foreground transition-colors sm:hidden ml-2 flex-shrink-0"
            size="sm"
            onClick={onViewMore}
          >
            <span className="sr-only sm:not-sr-only">View All</span>
            <ChevronRight className="sm:ml-1 h-3 w-3" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredProducts.slice(0, 6).map((product) => (
          <Card
            key={product.productId}
            className="overflow-hidden h-full flex flex-col group hover:shadow-xl transition-shadow duration-300"
          >
            <CardHeader className="p-0">
              <div className="relative overflow-hidden">
                <div className="relative h-40 w-full transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                    priority
                    quality={80}
                  />
                </div>
                <div className="absolute top-0 right-0 p-1 flex flex-col gap-1">
                  {product.isNew && (
                    <Badge className="text-xs bg-primary text-primary-foreground">
                      New
                    </Badge>
                  )}
                  {product.discount ? (
                    <Badge className="text-xs bg-red-500 text-white">
                      {product.discount}% Off
                    </Badge>
                  ) : null}
                </div>
                <div className="absolute top-1 left-1 flex gap-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7 rounded-full bg-white/80 hover:bg-white text-gray-600 hover:text-red-500"
                  >
                    <Heart className="h-4 w-4" />
                    <span className="sr-only">Add to wishlist</span>
                  </Button>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7 rounded-full bg-white/80 hover:bg-white text-gray-600 hover:text-primary"
                        onClick={() => handlePreview(product)}
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">Quick preview</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[625px]">
                      {previewProduct && (
                        <DetailProductPreview
                          product={product}
                          onAddToCart={onAddToCart}
                        />
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-3 flex-grow">
              <CardTitle className="text-sm mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                {product.name}
              </CardTitle>
              <p className="text-xs text-muted-foreground mb-2 line-clamp-1">
                {product.specs}
              </p>
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={`star-${index + 1}`}
                    className={`w-3 h-3 ${
                      index < Math.floor(product.rating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-1 text-xs text-gray-600">
                  {product.rating.toFixed(1)}
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <p className="text-sm font-bold text-primary">
                  ${product.price.toFixed(2)}
                </p>
                {product.discount ? (
                  <p className="text-xs line-through text-muted-foreground">
                    ${(product.price * (1 + product.discount / 100)).toFixed(2)}
                  </p>
                ) : null}
              </div>
            </CardContent>
            <CardFooter className="p-2 bg-secondary/50 flex justify-center items-center">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="sm"
                      className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary focus:outline-none focus:ring-4 focus:ring-primary/30 w-full transition-colors"
                      onClick={() => onAddToCart(product.productId)}
                    >
                      <ShoppingCart className="mr-1 h-3 w-3" /> Add to Cart
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add {product.name} to your cart</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-6 flex justify-center sm:hidden">
        <Button
          variant="outline"
          className="hover:bg-primary hover:text-primary-foreground transition-colors"
          onClick={onViewMore}
        >
          View More Products <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </section>
  );
}

function DetailProductPreview({
  product,
  onAddToCart,
}: Readonly<{
  product: ProductPreview;
  onAddToCart: (productId: number) => void;
}>) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="relative aspect-square overflow-hidden rounded-md">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          priority
          quality={80}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 300px"
        />
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          {product.isNew && (
            <Badge className="bg-primary text-primary-foreground">New</Badge>
          )}
          {product.discount ? (
            <Badge className="bg-red-500 text-white">
              {product.discount}% Off
            </Badge>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {product.name}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {product.specs}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <Tabs defaultValue="details">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="mt-3">
              <p className="text-sm">
                {product.description ||
                  "No detailed description available for this product."}
              </p>

              <div className="mt-4 flex items-center gap-2">
                <span className="text-sm font-medium">Availability:</span>
                <span className="flex items-center text-sm">
                  {product.inStock ? (
                    <>
                      <Check className="mr-1 h-4 w-4 text-green-500" /> In Stock
                    </>
                  ) : (
                    "Out of Stock"
                  )}
                </span>
              </div>

              {product.category === "EarBuds" &&
                product.colors &&
                product.colors.length > 0 && (
                  <div className="mt-3">
                    <span className="text-sm font-medium">
                      Available Colors:
                    </span>
                    <div className="flex gap-2 mt-1">
                      {product.colors.map((color) => (
                        <div
                          key={color}
                          className="w-6 h-6 rounded-full border border-gray-200"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                )}
            </TabsContent>
            <TabsContent value="features" className="mt-3">
              {product.features && product.features.length > 0 ? (
                <ul className="list-disc pl-5 space-y-1">
                  {product.features.map((feature) => (
                    <li key={feature} className="text-sm">
                      {feature}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm">
                  No feature details available for this product.
                </p>
              )}
            </TabsContent>
          </Tabs>
        </div>

        <div className="mt-6 flex items-baseline gap-2">
          <p className="text-xl font-bold text-primary">
            ${product.price.toFixed(2)}
          </p>
          {product.discount && product.discount > 0 ? (
            <p className="text-sm line-through text-muted-foreground">
              ${(product.price * (1 + product.discount / 100)).toFixed(2)}
            </p>
          ) : null}
        </div>

        <div className="flex items-center gap-2 mt-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <Star
                key={`preview-star-${index + 1}`}
                className={`w-4 h-4 ${
                  index < Math.floor(product.rating)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-1 text-sm text-gray-600">
              {product.rating.toFixed(1)}
            </span>
          </div>
        </div>

        <div className="mt-6">
          <Button
            className="w-full"
            onClick={() => onAddToCart(product.productId)}
          >
            <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
