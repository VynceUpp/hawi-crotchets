"use client";
import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Star, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useProducts } from "@/data/Products";
import ProductCard from "./ProductCard";
import Loading from "@/app/loading";

interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  images: string[];
  inStock: boolean;
  stockCount: number;
  category: string;
  rating: number;
  isNew: boolean;
  colors: string[];
  reviews: number;
  originalPrice?: number;
  isSale?: boolean;
};

// Image Preview Modal Component
function ImagePreviewModal({ product, isOpen, onClose }: { product: any, isOpen: boolean, onClose: () => void }) {
  if (!isOpen || !product) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="relative max-w-4xl max-h-[90vh] mx-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 p-2 text-white hover:text-gray-300 transition-colors z-10"
        >
          <X className="w-8 h-8" />
        </button>

        {/* Image Container */}
        <div
          className="relative bg-white rounded-lg overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto max-h-[80vh] object-contain"
          />

          {/* Product Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
            <div className="text-white">
              <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-xl font-semibold">KES {product.price}</span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-300 line-through">
                      KES {product.originalPrice}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{product.rating} ({product.reviews} reviews)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Products() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [previewProduct, setPreviewProduct] = useState<Product | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const scrollContainerRef = React.useRef<HTMLDivElement | null>(null);
  const { products, loading } = useProducts();

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(selectedProduct?.id === product.id ? null : product);
  };

  const handleImageClick = (product: Product) => {
    setPreviewProduct(product);
    setIsPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
    setPreviewProduct(null);
  };

  const handleBuySelected = () => {
    if (selectedProduct) {
      console.log('Buying product:', selectedProduct.name);
      // Handle purchase logic here
      alert(`Proceeding to checkout with ${selectedProduct.name}`);
    }
  };

  // Close modal on Escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isPreviewOpen) {
        handleClosePreview();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isPreviewOpen]);

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="py-12 bg-gradient-to-b from-white to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">Products</span>
          </h2>
          <p className="text-sm md:text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our handcrafted collection of beautiful crochet pieces, each made with love and attention to detail.
          </p>
        </div>

        {/* Scroll Navigation */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-sm text-gray-500">
            {selectedProduct && (
              <span className="text-pink-600 font-medium">
                Selected: {selectedProduct.name}
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('left')}
              className="border-pink-200 hover:bg-pink-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('right')}
              className="border-pink-200 hover:bg-pink-50"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Products Scroll Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={handleProductSelect}
              onImageClick={handleImageClick}
              isSelected={selectedProduct?.id === product.id}
            />
          ))}
        </div>

        {/* Selected Product Actions */}
        {selectedProduct && (
          <div className="mt-8 p-6 bg-white rounded-xl border-2 border-pink-200 shadow-lg">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <h3 className="text-xl font-semibold text-gray-900">
                  Ready to purchase {selectedProduct.name}?
                </h3>
                <p className="text-gray-600">
                  Price: <span className="font-bold text-2xl text-green-600">KES {selectedProduct.price}</span>
                  {selectedProduct.originalPrice && (
                    <span className="text-sm text-gray-500 line-through ml-2">
                      KES {selectedProduct.originalPrice}
                    </span>
                  )}
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setSelectedProduct(null)}
                  className="border-gray-300 hover:bg-gray-50"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleBuySelected}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8"
                >
                  Buy Now - KES {selectedProduct.price}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Image Preview Modal */}
        <ImagePreviewModal
          product={previewProduct}
          isOpen={isPreviewOpen}
          onClose={handleClosePreview}
        />

        {/* Custom CSS for hiding scrollbar */}
        <style jsx>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </section>
  );
}