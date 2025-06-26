'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent } from "@/components/ui/card";
import { Heart, ShoppingCart, Star, ZoomIn } from "lucide-react";
import { useState } from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { useCart } from '@/context/CartContext';

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

export default function ProductCard({ product, onSelect, isSelected, onImageClick }: {
    product: Product;
    onSelect: (product: Product) => void;
    isSelected: boolean;
    onImageClick: (product: Product) => void;
}) {
    const [isFavorited, setIsFavorited] = useState(false);
    const router = useRouter();
    const {addToCart} = useCart();

    return (
        <Card
            className={`group cursor-pointer transition-all duration-300 hover:shadow-xl border-2 ${isSelected ? 'border-pink-400 shadow-lg' : 'border-gray-100 hover:border-pink-200'
                } bg-white overflow-hidden flex-shrink-0 w-72`}
            onClick={() => router.push(`/shop/${product.slug}`)}
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
                            e.stopPropagation(); // Prevent routing
                            setIsFavorited(!isFavorited);
                        }}
                    >
                        <Heart
                            className={`w-4 h-4 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-600'} transition-colors duration-200`}
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
                        style={{ clipPath: "polygon(0% 0%, 100% 0%, 95% 85%, 5% 100%)", paddingBottom: "2px" }}
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent routing
                            onImageClick(product); // Call image click
                        }}
                    >
                        <div
                            className="bg-white overflow-hidden group-hover:scale-105 transition-transform duration-500"
                            style={{ clipPath: "polygon(0% 0%, 100% 0%, 95% 85%, 5% 100%)" }}
                        >
                            <img
                                src={product.images[0]}
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
                            <span className="text-sm font-medium text-gray-700 ml-1">{product.rating}</span>
                        </div>
                        <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
                    </div>

                    {/* Colors */}
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">Colors:</span>
                        <div className="flex gap-1">
                            {product.colors.slice(0, 3).map((color, index) => (
                                <div
                                    key={index}
                                    className="w-4 h-4 rounded-full border border-gray-200"
                                    style={{
                                        backgroundColor:
                                            color.toLowerCase() === 'natural' ? '#F5F5DC' :
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
                            <span className="text-xl font-bold text-gray-900">KES {product.price}</span>
                            {product.originalPrice && (
                                <span className="text-sm text-gray-500 line-through">KES {product.originalPrice}</span>
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
                        className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium text-sm py-2.5 transition-all duration-200 rounded-lg shadow-sm hover:shadow-md cursor-pointer"
                        onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product, 1);
                            toast.success(`${product.name} added to cart!`, {
                                duration: 3000,
                                position: "bottom-right",
                                style: { backgroundColor: "#44DB67FF", color: "#fff" },
                                icon: <ShoppingCart className="w-5 h-5 text-white" />,
                            });
                        }}
                    >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Cart
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
