import { Eye, Heart, ShoppingCart, ZoomIn } from "lucide-react";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

export default function ProductCard({ product, onImageClick, viewMode, router }: {
    product: any;
    onImageClick: (product: any) => void;
    viewMode: string;
    router: any;
}) {
    const [isFavorited, setIsFavorited] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const { addToCart } = useCart();

    const discountPercentage = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    // Responsive classes based on view mode
    const cardClasses = viewMode === 'list'
        ? "flex flex-col h-full md:flex-row md:w-full md:p-2 gap-3"
        : "flex flex-col h-full";

    const imageClasses = viewMode === 'list'
        ? "w-full md:w-56 h-56 flex-shrink-0"
        : "h-48 md:h-64 w-full";

    const contentClasses = viewMode === 'list'
        ? "flex-1 flex flex-col"
        : "flex-1 flex flex-col";

    return (
        <Card
            className={`group cursor-pointer transition-all duration-300 hover:shadow-xl border border-gray-100 bg-white overflow-hidden rounded-lg 
    ${cardClasses} 
    p-3 md:p-4 md:w-full`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <CardContent className={`p-0 w-full h-full ${cardClasses}`}>
                {/* Image Container */}
                <div className={`relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 ${imageClasses}`}
                    onClick={(e) => e.stopPropagation()}>
                    {/* Badges */}
                    <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                        {product.isNew && (
                            <Badge className="bg-emerald-500 text-white text-xs px-2.5 py-1 font-medium rounded-md shadow-sm">
                                NEW
                            </Badge>
                        )}
                        {product.isSale && discountPercentage > 0 && (
                            <Badge className="bg-red-500 text-white text-xs px-2.5 py-1 font-medium rounded-md shadow-sm">
                                {discountPercentage}% OFF
                            </Badge>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button
                            className="p-2 rounded-lg bg-white/95 backdrop-blur-sm hover:bg-white transition-all duration-200 shadow-md hover:shadow-lg"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsFavorited(!isFavorited);
                            }}
                            title="Add to Wishlist"
                            aria-label="Add to Wishlist"
                        >
                            <Heart
                                className={`w-4 h-4 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-600'
                                    } transition-colors duration-200`}
                            />
                        </button>

                        <button
                            className="p-2 rounded-lg bg-white/95 backdrop-blur-sm hover:bg-white transition-all duration-200 shadow-md hover:shadow-lg"
                            onClick={(e) => {
                                e.stopPropagation();
                                onImageClick(product);
                            }}
                            title="Quick View"
                            aria-label="Quick View Product"
                        >
                            <Eye className="w-4 h-4 text-gray-600" />
                        </button>
                    </div>

                    {/* Product Image */}
                    <div
                        className="relative overflow-hidden h-full cursor-pointer"
                        onClick={(e) => {
                            e.stopPropagation();
                            onImageClick(product);
                        }}
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                            <div className="transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                <div className="p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg">
                                    <ZoomIn className="w-5 h-5 text-gray-700" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Details */}
                <div className={`p-5 pl-0 ${contentClasses}`}
                    onClick={() => router.push(`/shop/${product.slug}`)}>
                    {/* Main Content */}
                    <div className="space-y-4 flex-1">
                        {/* Category & Title */}
                        <div className="space-y-2">
                            <div className="text-xs md:text-sm text-gray-500 uppercase tracking-wide font-medium">
                                {product.category}
                            </div>
                            <h3 className="font-semibold text-gray-900 text-base md:text-lg leading-snug line-clamp-2">
                                {product.name}
                            </h3>
                        </div>

                        {/* Colors */}
                        {product.colors && product.colors.length > 0 && (
                            <div className="xs:flex items-center gap-3 mb-2">
                                <span className="text-sm text-gray-600 font-medium">Colors:</span>
                                <div className="flex gap-1.5">
                                    {product.colors.slice(0, 5).map((color: string, index: number) => (
                                        <div
                                            key={index}
                                            className="w-4 h-4 rounded-full border border-gray-200 shadow-sm hover:scale-110 transition-transform cursor-pointer"
                                            style={{
                                                backgroundColor:
                                                    color.toLowerCase() === 'natural' ? '#F5F5DC' :
                                                        color.toLowerCase() === 'sage' ? '#9CAF88' :
                                                            color.toLowerCase() === 'terracotta' ? '#E2725B' :
                                                                color.toLowerCase() === 'oatmeal' ? '#F7F3E9' :
                                                                    color.toLowerCase() === 'dusty pink' ? '#D4A5A5' :
                                                                        color.toLowerCase() === 'cream' ? '#FFFDD0' :
                                                                            color.toLowerCase()
                                            }}
                                            title={color}
                                        />
                                    ))}
                                    {product.colors.length > 5 && (
                                        <span className="text-xs text-gray-500 font-medium">
                                            +{product.colors.length - 5}
                                        </span>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Price Section - Always at bottom */}
                    <div className="space-y-4 mt-auto">
                        <div className="flex items-baseline justify-between">
                            <div className="flex items-baseline gap-2">
                                <span className="text-sm md:text-lg font-bold text-gray-900">
                                    KES {product.price.toLocaleString()}
                                </span>
                                {product.originalPrice && (
                                    <span className="text-xs text-gray-500 line-through">
                                        KES {product.originalPrice.toLocaleString()}
                                    </span>
                                )}
                            </div>
                            {product.originalPrice && (
                                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                                    Save KES {(product.originalPrice - product.price).toLocaleString()}
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
                </div>
            </CardContent>
        </Card>
    );
}