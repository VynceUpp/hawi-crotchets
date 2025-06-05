"use client";
import * as React from "react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart, Star, ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { products } from "@/data/AllData";

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

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  colors: string[];
  image: string;
  category: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isSale?: boolean;
}

function ProductCard({ product, onSelect, isSelected, onImageClick }: { 
  product: Product; 
  onSelect: (product: Product) => void; 
  isSelected: boolean; 
  onImageClick: (product: Product) => void; 
}) {
  const [isFavorited, setIsFavorited] = useState(false);

  return (
    <Card 
      className={`group cursor-pointer transition-all duration-300 hover:shadow-xl border-2 ${
        isSelected ? 'border-pink-400 shadow-lg' : 'border-gray-100 hover:border-pink-200'
      } bg-white overflow-hidden flex-shrink-0 w-72`}
      onClick={() => onSelect(product)}
    >
      <CardContent className="p-0">
        {/* Image Container */}
        <div className="relative overflow-hidden">
          {/* Badges */}
          <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
            {product.isNew && (
              <Badge className="bg-green-500 hover:bg-green-600 text-white text-xs px-2 py-1">
                New
              </Badge>
            )}
            {product.isSale && (
              <Badge className="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1">
                Sale
              </Badge>
            )}
          </div>

          {/* Favorite Button */}
          <button
            className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-colors duration-200"
            onClick={(e) => {
              e.stopPropagation();
              setIsFavorited(!isFavorited);
            }}
          >
            <Heart 
              className={`w-4 h-4 ${
                isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-600'
              } transition-colors duration-200`}
            />
          </button>

          {/* Zoom Icon Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 z-5">
            <div className="p-3 rounded-full bg-white/90 backdrop-blur-sm">
              <ZoomIn className="w-6 h-6 text-gray-700" />
            </div>
          </div>

          {/* Product Image */}
          <div 
            className="relative overflow-hidden bg-gradient-to-br from-pink-50 to-purple-50 cursor-zoom-in"
            style={{
              clipPath: "polygon(0% 0%, 100% 0%, 95% 85%, 5% 100%)",
              paddingBottom: "2px",
            }}
            onClick={(e) => {
              e.stopPropagation();
              onImageClick(product);
            }}
          >
            <div 
              className="bg-white overflow-hidden group-hover:scale-105 transition-transform duration-500"
              style={{
                clipPath: "polygon(0% 0%, 100% 0%, 95% 85%, 5% 100%)",
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover"
              />
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="p-4 space-y-3">
          {/* Category */}
          <div className="text-xs text-gray-500 uppercase tracking-wide font-medium">
            {product.category}
          </div>

          {/* Product Name */}
          <h3 className="font-semibold text-gray-800 text-lg leading-tight group-hover:text-pink-600 transition-colors duration-200">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium text-gray-700 ml-1">
                {product.rating}
              </span>
            </div>
            <span className="text-sm text-gray-500">
              ({product.reviews} reviews)
            </span>
          </div>

          {/* Colors */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Colors:</span>
            <div className="flex gap-1">
              {product.colors.slice(0, 3).map((color, index: number) => (
                <div
                  key={index}
                  className="w-4 h-4 rounded-full border border-gray-200"
                  style={{
                    backgroundColor: color.toLowerCase() === 'natural' ? '#F5F5DC' :
                                   color.toLowerCase() === 'sage' ? '#9CAF88' :
                                   color.toLowerCase() === 'terracotta' ? '#E2725B' :
                                   color.toLowerCase() === 'oatmeal' ? '#F7F3E9' :
                                   color.toLowerCase() === 'dusty pink' ? '#D4A5A5' :
                                   color.toLowerCase()
                  }}
                  title={color}
                />
              ))}
              {product.colors.length > 3 && (
                <span className="text-xs text-gray-500 ml-1">
                  +{product.colors.length - 3}
                </span>
              )}
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-gray-900">
                KES {product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  KES {product.originalPrice}
                </span>
              )}
            </div>
            {product.originalPrice && (
              <span className="text-xs font-medium text-green-600">
                Save {product.originalPrice - product.price}Ksh
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <Button 
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-medium transition-all duration-300 transform group-hover:scale-[1.02]"
            onClick={(e) => {
              e.stopPropagation();
              // Add to cart logic here
              console.log('Added to cart:', product.name);
            }}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Products() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [previewProduct, setPreviewProduct] = useState<Product | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const scrollContainerRef = React.useRef<HTMLDivElement | null>(null);

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