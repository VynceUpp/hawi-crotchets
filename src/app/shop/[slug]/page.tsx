"use client"; 
import * as React from "react";
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
    ArrowLeft,
    Star,
    Heart,
    Share2,
    ShoppingCart,
    Truck,
    Shield,
    RotateCcw,
    Check,
    Minus,
    Plus,
    ChevronLeft,
    ChevronRight,
    X,
    Package,
    Clock,
    Award,
    MessageCircle
} from 'lucide-react';
import { sampleProduct } from "@/data/AllData";

// Utility Components
type ButtonVariant = 'default' | 'primary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

const Button = ({ 
    children, 
    className = "", 
    variant = "default" as ButtonVariant, 
    size = "md" as ButtonSize, 
    disabled = false, 
    onClick, 
    ...props 
}: {
    children: React.ReactNode;
    className?: string;
    variant?: ButtonVariant;
    size?: ButtonSize;
    disabled?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    [key: string]: any;
}) => {
    const baseClasses = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        default: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-lg hover:shadow-xl",
        primary: "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 focus:ring-purple-500 shadow-lg hover:shadow-xl",
        outline: "border-2 border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400 focus:ring-blue-500",
        ghost: "text-gray-600 hover:bg-gray-100 focus:ring-gray-500"
    };

    const sizes = {
        sm: "px-3 py-2 text-sm",
        md: "px-4 py-3 text-sm",
        lg: "px-6 py-4 text-lg"
    };

    return (
        <button
            className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
            disabled={disabled}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};

const Badge = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${className}`}>
        {children}
    </span>
);

const Card = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <div className={`bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl border border-white/20 ${className}`}>
        {children}
    </div>
);

const CardContent = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <div className={className}>
        {children}
    </div>
);

// Product Gallery Component
interface ProductGalleryProps {
    images: string[];
    productName: string;
}

const ProductGallery = ({ images, productName }: ProductGalleryProps) => {
    const [currentImage, setCurrentImage] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);

    const nextImage = () => {
        setCurrentImage((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="space-y-4">
            {/* Main image */}
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl group">
                <div
                    className="relative cursor-zoom-in"
                    onClick={() => setIsZoomed(true)}
                >
                    <img
                        src={images[currentImage]}
                        alt={`${productName} - Image ${currentImage + 1}`}
                        className="w-full h-96 md:h-[550px] object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* Zoom indicator */}
                    <div className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <Package className="w-4 h-4" />
                    </div>
                </div>

                {/* Navigation arrows */}
                <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>

                {/* Image counter */}
                <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                    {currentImage + 1} / {images.length}
                </div>
            </div>

            {/* Thumbnail images */}
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {images.map((image, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentImage(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-3 transition-all ${index === currentImage
                                ? 'border-purple-500 ring-4 ring-purple-200 shadow-lg'
                                : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                            }`}
                    >
                        <img
                            src={image}
                            alt={`${productName} thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                    </button>
                ))}
            </div>

            {/* Zoom Modal */}
            {isZoomed && (
                <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
                    <button
                        onClick={() => setIsZoomed(false)}
                        className="absolute top-4 right-4 text-white p-2 hover:bg-white/20 rounded-full"
                    >
                        <X className="w-6 h-6" />
                    </button>
                    <img
                        src={images[currentImage]}
                        alt={productName}
                        className="max-w-full max-h-full object-contain"
                    />
                </div>
            )}
        </div>
    );
};

// Cart Modal Component
interface CartModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: any; // Replace 'any' with your product type if available
    selectedColor: string;
    selectedSize: string;
    quantity: number;
    totalPrice: number;
}

const CartModal = ({ isOpen, onClose, product, selectedColor, selectedSize, quantity, totalPrice }: CartModalProps) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const router = useRouter();

    const handleAddToCart = () => {
        setIsProcessing(true);
        // Simulate API call
        setTimeout(() => {
            setIsProcessing(false);
            alert('Product added to cart successfully!');
            onClose();
        }, 1500);
    };

    const handleBuyNow = () => {
        setIsProcessing(true);
        router.push("/checkout")
        // Simulate checkout process
        setTimeout(() => {
            setIsProcessing(false); 
            onClose();
        }, 0);

    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-gray-900">Add to Cart</h3>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 p-1"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Product Summary */}
                    <div className="flex gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                        <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{product.name}</h4>
                            <p className="text-sm text-gray-600">Color: {selectedColor}</p>
                            {selectedSize !== "One Size" && (
                                <p className="text-sm text-gray-600">Size: {selectedSize}</p>
                            )}
                            <p className="text-sm text-gray-600">Quantity: {quantity}</p>   
                        </div>
                        <div className="text-right">
                            <p className="font-bold text-lg text-gray-900">
                                KES {totalPrice.toLocaleString()}
                            </p>
                            {product.originalPrice && (
                                <p className="text-sm text-gray-500 line-through">
                                    KES {(product.originalPrice * quantity).toLocaleString()}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                        <Button
                            onClick={handleAddToCart}
                            disabled={isProcessing}
                            className="w-full"
                            variant="outline"
                        >
                            {isProcessing ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                                    Adding to Cart...
                                </div>
                            ) : (
                                <>
                                    <ShoppingCart className="w-5 h-5 mr-2" />
                                    Add to Cart
                                </>
                            )}
                        </Button>

                        <Button
                            onClick={handleBuyNow}
                            disabled={isProcessing}
                            className="w-full"
                            variant="primary"
                        >
                            {isProcessing ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Processing...
                                </div>
                            ) : (
                                'Buy Now'
                            )}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

// Reviews Component
interface ProductReviewsProps {
    reviews: Array<{
        id: string | number;
        name: string;
        rating: number;
        date: string;
        comment: string;
    }>;
    rating: number;
    totalReviews: number;
}

const ProductReviews = ({ reviews, rating, totalReviews }: ProductReviewsProps) => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900">Customer Reviews</h3>
                <div className="flex items-center gap-2">
                    <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`w-5 h-5 ${i < Math.floor(rating)
                                        ? 'fill-yellow-400 text-yellow-400'
                                        : 'text-gray-300'
                                    }`}
                            />
                        ))}
                    </div>
                    <span className="text-lg font-semibold">{rating}</span>
                    <span className="text-gray-600">({totalReviews} reviews)</span>
                </div>
            </div>

            <div className="space-y-4">
                {reviews.map((review) => (
                    <Card key={review.id} className="p-4">
                        <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                                    {review.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">{review.name}</p>
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-4 h-4 ${i < review.rating
                                                        ? 'fill-yellow-400 text-yellow-400'
                                                        : 'text-gray-300'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                    </Card>
                ))}
            </div>
        </div>
    );
};

// Main Product Detail Component
export default function ProductDetailPage() {
    const params = useParams();
    const slug = params.slug;
    const [selectedColor, setSelectedColor] = useState(sampleProduct.colors[0]);
    const [selectedSize, setSelectedSize] = useState(sampleProduct.sizes[0]);
    const [quantity, setQuantity] = useState(1);
    const [isFavorited, setIsFavorited] = useState(false);
    const [showCartModal, setShowCartModal] = useState(false);
    const [activeTab, setActiveTab] = useState('description');

    const product = sampleProduct;
    const discountPercentage = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    const totalPrice = product.price * quantity;

    const handleQuantityChange = (change: number) => {
        setQuantity(prev => Math.max(1, Math.min(product.stockCount, prev + change)));
    };

    const getColorStyle = (color: string) => {
        const colorMap: { [key: string]: string } = {
            'midnight black': '#000000',
            'pure white': '#FFFFFF',
            'rose gold': '#E8B4A5',
            'space gray': '#8E8E93',
            'natural': '#F5F5DC',
            'sage': '#9CAF88',
            'terracotta': '#E2725B'
        };
        return colorMap[color.toLowerCase()] || '#6B7280';
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: product.name,
                text: product.description,
                url: window.location.href
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Product link copied to clipboard!');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Back Button */}
                <Button
                    variant="ghost"
                    className="mb-8 hover:bg-white/50"
                    onClick={() => window.history.back()}
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Products
                </Button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Product Gallery */}
                    <div>
                        <ProductGallery images={product.images} productName={product.name} />
                    </div>

                    {/* Product Details */}
                    <div className="space-y-8">
                        {/* Product Header */}
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                {product.isNew && (
                                    <Badge className="bg-emerald-500 text-white">NEW</Badge>
                                )}
                                {product.isSale && discountPercentage > 0 && (
                                    <Badge className="bg-red-500 text-white">{discountPercentage}% OFF</Badge>
                                )}
                                <div className="text-sm text-gray-500 uppercase tracking-wide">
                                    {product.category}
                                </div>
                            </div>

                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                                {product.name}
                            </h1>

                            <p className="text-lg text-gray-600 mb-4">{product.brand}</p>

                            {/* Rating */}
                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-5 h-5 ${i < Math.floor(product.rating)
                                                    ? 'fill-yellow-400 text-yellow-400'
                                                    : 'text-gray-300'
                                                }`}
                                        />
                                    ))}
                                </div>
                                <span className="text-gray-600 font-medium">
                                    {product.rating} ({product.reviews.length} reviews)
                                </span>
                            </div>

                            {/* Price */}
                            <div className="flex items-baseline gap-4 mb-8">
                                <span className="text-4xl font-bold text-gray-900">
                                    KES {product.price.toLocaleString()}
                                </span>
                                {product.originalPrice && (
                                    <span className="text-xl text-gray-500 line-through">
                                        KES {product.originalPrice.toLocaleString()}
                                    </span>
                                )}
                                {product.originalPrice && (
                                    <Badge className="bg-emerald-100 text-emerald-800">
                                        Save KES {(product.originalPrice - product.price).toLocaleString()}
                                    </Badge>
                                )}
                            </div>
                        </div>

                        {/* Product Options */}
                        <div className="space-y-6">
                            {/* Color Selection */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                    Color: {selectedColor}
                                </h3>
                                <div className="flex gap-3">
                                    {product.colors.map((color) => (
                                        <button
                                            key={color}
                                            onClick={() => setSelectedColor(color)}
                                            className={`w-12 h-12 rounded-full border-4 transition-all shadow-md ${selectedColor === color
                                                    ? 'border-purple-500 ring-4 ring-purple-200 scale-110'
                                                    : 'border-gray-200 hover:border-gray-300 hover:scale-105'
                                                }`}
                                            style={{ backgroundColor: getColorStyle(color) }}
                                            title={color}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Size Selection */}
                            {product.sizes.length > 1 && (
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Size</h3>
                                    <div className="grid grid-cols-1 gap-2">
                                        {product.sizes.map((size) => (
                                            <button
                                                key={size}
                                                onClick={() => setSelectedSize(size)}
                                                className={`px-4 py-3 border-2 rounded-lg text-left transition-all ${selectedSize === size
                                                        ? 'border-purple-500 bg-purple-50 text-purple-700'
                                                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                                    }`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Quantity */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Quantity</h3>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden">
                                        <button
                                            onClick={() => handleQuantityChange(-1)}
                                            disabled={quantity <= 1}
                                            className="p-3 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="px-6 py-3 font-semibold text-lg border-x-2 border-gray-200">
                                            {quantity}
                                        </span>
                                        <button
                                            onClick={() => handleQuantityChange(1)}
                                            disabled={quantity >= product.stockCount}
                                            className="p-3 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <span className="text-sm text-gray-600">
                                        {product.stockCount} available
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Total Price */}
                        <Card className="p-4 bg-gradient-to-r from-purple-50 to-pink-50">
                            <div className="flex items-center justify-between">
                                <span className="text-lg font-semibold text-gray-900">Total:</span>
                                <span className="text-2xl font-bold text-purple-600">
                                    KES {totalPrice.toLocaleString()}
                                </span>
                            </div>
                        </Card>

                        {/* Action Buttons */}
                        <div className="space-y-4">
                            <Button
                                onClick={() => setShowCartModal(true)}
                                className="w-full"
                                variant="primary"
                                size="lg"
                                disabled={!product.inStock}
                            >
                                <ShoppingCart className="w-5 h-5 mr-2" />
                                {product.inStock ? 'Add to Cart & Buy Now' : 'Out of Stock'}
                            </Button>
                        </div>

                        {/* Delivery Info */}
                        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-4 mb-4">
                                    <Truck className="w-6 h-6 text-blue-600" />
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Delivery</h3>
                                        <p className="text-sm text-gray-600">
                                            Estimated delivery: {product.estimatedDelivery}
                                        </p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Shield className="w-4 h-4 text-green-600" />
                                        <span>Quality Guaranteed</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <RotateCcw className="w-4 h-4 text-orange-600" />
                                        <span>Easy Returns</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Award className="w-4 h-4 text-purple-600" />
                                        <span>Premium Quality</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Product Information Tabs */}
                <div className="mt-16">
                    <Card className="overflow-hidden">
                        <div className="border-b border-gray-200">
                            <nav className="flex">
                                {[
                                    { id: 'description', label: 'Description', icon: MessageCircle },
                                    { id: 'specifications', label: 'Specifications', icon: Package },
                                    { id: 'care', label: 'Care Instructions', icon: Shield },
                                    { id: 'reviews', label: 'Reviews', icon: Star }
                                ].map((tab) => {
                                    const Icon = tab.icon;
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors ${activeTab === tab.id
                                                    ? 'border-b-2 border-purple-500 text-purple-600 bg-purple-50'
                                                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                                }`}
                                        >
                                            <Icon className="w-4 h-4" />
                                            {tab.label}
                                        </button>
                                    );
                                })}
                            </nav>
                        </div>

                        <CardContent className="p-8">
                            {activeTab === 'description' && (
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Product Description</h3>
                                        <p className="text-gray-700 leading-relaxed text-sm md:text-lg mb-8">
                                            {product.description}
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="text-xl font-semibold text-gray-900 mb-4">Key Features</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {product.features.map((feature, index) => (
                                                <div key={index} className="flex items-center gap-3">
                                                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                                                    <span className="text-gray-700 text-sm md:text:lg">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'specifications' && (
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Technical Specifications</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {Object.entries(product.specifications).map(([key, value]) => (
                                            <div key={key} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                                                <span className="font-medium text-gray-900">{key}:</span>
                                                <span className="text-gray-700">{value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'care' && (
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Care Instructions</h3>
                                    <div className="space-y-4">
                                        {product.careInstructions.map((instruction, index) => (
                                            <div key={index} className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
                                                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                                                    {index + 1}
                                                </div>
                                                <span className="text-gray-700 leading-relaxed">{instruction}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'reviews' && (
                                <ProductReviews
                                    reviews={product.reviews}
                                    rating={product.rating}
                                    totalReviews={product.TotalReviews}
                                />
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Related Products Section */}
                <div className="mt-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">You Might Also Like</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((item) => (
                            <Card key={item} className="group cursor-pointer overflow-hidden hover:shadow-2xl transition-all duration-300">
                                <div className="aspect-square bg-gray-200 overflow-hidden">
                                    <img
                                        src={`https://images.unsplash.com/photo-${1505740420928 + item}-5e560c06d30e?w=400&h=400&fit=crop`}
                                        alt={`Related product ${item}`}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                </div>
                                <CardContent className="p-4">
                                    <h3 className="font-semibold text-gray-900 mb-2">Related Product {item}</h3>
                                    <div className="flex items-center justify-between">
                                        <span className="text-lg font-bold text-purple-600">KES 8,500</span>
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                            <span className="text-sm text-gray-600">4.5</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Trust Badges */}
                <div className="mt-16">
                    <Card className="bg-gradient-to-r from-green-50 to-blue-50">
                        <CardContent className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                                <div className="flex flex-col items-center">
                                    <Shield className="w-12 h-12 text-green-600 mb-3" />
                                    <h3 className="font-semibold text-gray-900 mb-2">Secure Shopping</h3>
                                    <p className="text-sm text-gray-600">Your data is protected with SSL encryption</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <Truck className="w-12 h-12 text-blue-600 mb-3" />
                                    <h3 className="font-semibold text-gray-900 mb-2">Fast Delivery</h3>
                                    <p className="text-sm text-gray-600">Free shipping on orders over KES 5,000</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <RotateCcw className="w-12 h-12 text-orange-600 mb-3" />
                                    <h3 className="font-semibold text-gray-900 mb-2">Easy Returns</h3>
                                    <p className="text-sm text-gray-600">30-day hassle-free return policy</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <Award className="w-12 h-12 text-purple-600 mb-3" />
                                    <h3 className="font-semibold text-gray-900 mb-2">Quality Assured</h3>
                                    <p className="text-sm text-gray-600">Premium products with warranty</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Cart Modal */}
            <CartModal
                isOpen={showCartModal}
                onClose={() => setShowCartModal(false)}
                product={product}
                selectedColor={selectedColor}
                selectedSize={selectedSize}
                quantity={quantity}
                totalPrice={totalPrice}
            />

            {/* Floating Action Button for Mobile */}
            <div className="fixed bottom-4 right-4 lg:hidden">
                <Button
                    onClick={() => setShowCartModal(true)}
                    className="rounded-full p-4 shadow-2xl"
                    variant="primary"
                    disabled={!product.inStock}
                >
                    <ShoppingCart className="w-6 h-6" />
                </Button>
            </div>

            {/* Sticky Bottom Bar for Mobile */}
            <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 p-4 lg:hidden">
                <div className="flex items-center justify-between mb-2">
                    <div>
                        <p className="text-sm text-gray-600">Total</p>
                        <p className="text-xl font-bold text-purple-600">
                            KES {totalPrice.toLocaleString()}
                        </p>
                    </div>
                    <Button
                        onClick={() => setShowCartModal(true)}
                        variant="primary"
                        disabled={!product.inStock}
                        className="px-8"
                    >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        {product.inStock ? 'Buy Now' : 'Out of Stock'}
                    </Button>
                </div>
            </div>
        </div>
    );
}