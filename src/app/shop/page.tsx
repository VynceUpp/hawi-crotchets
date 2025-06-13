"use client";
import * as React from "react";
import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Heart,
    ShoppingCart,
    Star,
    X,
    ZoomIn,
    Search,
    Grid3X3,
    List,
    ChevronDown,
    Filter,
    ArrowUpDown,
    Eye
} from "lucide-react";
import { products } from "@/data/AllData";
import { useRouter } from "next/navigation";

// Enhanced Image Preview Modal Component
function ImagePreviewModal({ product, isOpen, onClose }: { product: any, isOpen: boolean, onClose: () => void }) {
    if (!isOpen || !product) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={onClose}
        >
            <div className="relative max-w-5xl max-h-[95vh] mx-4 animate-in zoom-in-95 duration-300">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute -top-12 right-0 p-3 text-white hover:text-gray-300 transition-colors z-20 bg-black/50 rounded-full"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Image Container */}
                <div
                    className="relative bg-white rounded-2xl overflow-hidden shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="relative">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-auto max-h-[70vh] object-contain"
                            style={{ minHeight: '400px' }}
                        />

                        {/* Product Info Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-8">
                            <div className="text-white space-y-3">
                                <div className="flex items-center gap-3 mb-2">
                                    {product.isNew && (
                                        <Badge className="bg-green-500 text-white">New</Badge>
                                    )}
                                    {product.isSale && (
                                        <Badge className="bg-red-500 text-white">Sale</Badge>
                                    )}
                                </div>

                                <h3 className="text-3xl font-bold">{product.name}</h3>
                                <p className="text-lg text-gray-200 capitalize">{product.category}</p>

                                <div className="flex items-center justify-between pt-2">
                                    <div className="flex items-center gap-4">
                                        <span className="text-2xl font-bold text-green-400">
                                            KES {product.price.toLocaleString()}
                                        </span>
                                        {product.originalPrice && (
                                            <span className="text-lg text-gray-300 line-through">
                                                KES {product.originalPrice.toLocaleString()}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="flex">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-sm">{product.rating} ({product.reviews} reviews)</span>
                                    </div>
                                </div>

                                {/* Colors */}
                                <div className="flex items-center gap-2 pt-2">
                                    <span className="text-sm text-gray-300">Available in:</span>
                                    <div className="flex gap-2">
                                        {product.colors.map((color: string, index: number) => (
                                            <div
                                                key={index}
                                                className={`w-5 h-5 rounded-full border-2 border-white/50 ${
                                                    color.toLowerCase() === 'natural' ? 'color-natural' :
                                                    color.toLowerCase() === 'sage' ? 'color-sage' :
                                                    color.toLowerCase() === 'terracotta' ? 'color-terracotta' :
                                                    color.toLowerCase() === 'oatmeal' ? 'color-oatmeal' :
                                                    color.toLowerCase() === 'dusty pink' ? 'color-dusty-pink' :
                                                    color.toLowerCase() === 'cream' ? 'color-cream' : ''
                                                }`}
                                                title={color}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Enhanced Professional Product Card Component
function ProductCard({ product, onImageClick, viewMode, router }: { 
    product: any;
    onImageClick: (product: any) => void;
    viewMode: string;
    router: any;
}) {
    const [isFavorited, setIsFavorited] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const discountPercentage = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    // Responsive classes based on view mode
    const cardClasses = viewMode === 'list'
        ? "flex flex-col h-full md:flex-row md:w-full md:p-2"
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
                            className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium text-sm py-2.5 transition-all duration-200 rounded-lg shadow-sm hover:shadow-md"
                            onClick={(e) => {
                                e.stopPropagation();
                                console.log('Added to cart:', product.name);
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

export default function ProductsPage() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortBy, setSortBy] = useState("name");
    const [viewMode, setViewMode] = useState("grid");
    const [priceRange, setPriceRange] = useState([0, 5000]);
    const [showFilters, setShowFilters] = useState(false);
    const [showMoreFilters, setShowMoreFilters] = useState(false);
    const [previewProduct, setPreviewProduct] = useState<Product | null>(null);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    // Get unique categories and price range
    const categories = ["All", ...new Set(products.map(product => product.category))];
    const maxPrice = Math.max(...products.map(p => p.price));
    const minPrice = Math.min(...products.map(p => p.price));

    // Filter and sort products
    const filteredAndSortedProducts = useMemo(() => {
        let filtered = products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.category.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
            const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
            return matchesSearch && matchesCategory && matchesPrice;
        });

        // Sort products
        filtered.sort((a, b) => {
            switch (sortBy) {
                case "name":
                    return a.name.localeCompare(b.name);
                case "price-low":
                    return a.price - b.price;
                case "price-high":
                    return b.price - a.price;
                case "rating":
                    return b.rating - a.rating;
                case "newest":
                    return Number(b.isNew) - Number(a.isNew);
                default:
                    return 0;
            }
        });

        return filtered;
    }, [searchTerm, selectedCategory, sortBy, priceRange]);

    interface Product {
        id: string | number;
        name: string;
        category: string;
        price: number;
        originalPrice?: number;
        image: string;
        rating: number;
        reviews: number;
        isNew?: boolean;
        isSale?: boolean;
        colors: string[];
        slug: string;
    }

    const handleImageClick = (product: Product): void => {
        setPreviewProduct(product);
        setIsPreviewOpen(true);
    };

    const handleClosePreview = () => {
        setIsPreviewOpen(false);
        setPreviewProduct(null);
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
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-gray-900 mb-6">
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">Collection</span>
                    </h1>
                    <p className="text-sm md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Discover our handcrafted crochet collection, where each piece tells a story of artistry, comfort, and timeless style.
                    </p>
                </div>

                {/* Search and Filters */}
                <div className="mb-10">
                    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                        {/* Mobile Layout - Search + Filter Icon */}
                        <div className="md:hidden">
                            <div className="flex items-center gap-3">
                                {/* Search Bar */}
                                <div className="flex-1">
                                    <div className="relative">
                                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="text"
                                            placeholder="Search for products..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full pl-12 pr-4 py-3 border-0 rounded-xl shadow-md focus:ring-4 focus:ring-pink-200 focus:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm"
                                        />
                                    </div>
                                </div>
                                
                                {/* Filter Icon Button */}
                                <Button
                                    onClick={() => setShowMoreFilters(!showMoreFilters)}
                                    variant="outline"
                                    className="border-pink-300 text-pink-600 hover:bg-pink-50 h-12 w-12 p-0 flex-shrink-0"
                                >
                                    <Filter className="w-5 h-5" />
                                </Button>
                            </div>

                            {/* Mobile Filters Dropdown */}
                            {showMoreFilters && (
                                <div className="mt-4 bg-white rounded-lg shadow-lg border border-gray-200 p-4">
                                    <div className="space-y-4">
                                        {/* Category Filter */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                            <div className="relative">
                                                <select
                                                    value={selectedCategory}
                                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                                    className="appearance-none bg-gray-50 border-0 rounded-lg px-4 py-2 pr-10 focus:ring-2 focus:ring-pink-300 transition-all shadow-sm w-full"
                                                >
                                                    {categories.map(category => (
                                                        <option key={category} value={category}>
                                                            {category}
                                                        </option>
                                                    ))}
                                                </select>
                                                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                            </div>
                                        </div>

                                        {/* Sort Filter */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Sort by</label>
                                            <div className="relative">
                                                <select
                                                    value={sortBy}
                                                    onChange={(e) => setSortBy(e.target.value)}
                                                    className="appearance-none bg-gray-50 border-0 rounded-lg px-4 py-2 pr-10 focus:ring-2 focus:ring-pink-300 transition-all shadow-sm w-full"
                                                >
                                                    <option value="name">Name A-Z</option>
                                                    <option value="price-low">Price: Low to High</option>
                                                    <option value="price-high">Price: High to Low</option>
                                                    <option value="rating">Highest Rated</option>
                                                    <option value="newest">Newest First</option>
                                                </select>
                                                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                            </div>
                                        </div>

                                        {/* Price Range Filter */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="number"
                                                    placeholder="Min"
                                                    value={priceRange[0]}
                                                    onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                                                    className="flex-1 px-3 py-2 border-0 rounded-lg bg-gray-50 focus:ring-2 focus:ring-pink-300 shadow-sm"
                                                />
                                                <span className="text-gray-500">-</span>
                                                <input
                                                    type="number"
                                                    placeholder="Max"
                                                    value={priceRange[1]}
                                                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 5000])}
                                                    className="flex-1 px-3 py-2 border-0 rounded-lg bg-gray-50 focus:ring-2 focus:ring-pink-300 shadow-sm"
                                                />
                                            </div>
                                        </div>

                                        {/* View Mode Toggle */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">View Mode</label>
                                            <div className="flex items-center gap-1 bg-gray-50 rounded-lg p-1">
                                                <Button
                                                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                                                    size="sm"
                                                    onClick={() => setViewMode('grid')}
                                                    className={`flex-1 ${viewMode === 'grid' ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-md' : 'hover:bg-gray-100'} transition-all duration-200`}
                                                >
                                                    <Grid3X3 className="w-4 h-4 mr-2" />
                                                    Grid
                                                </Button>
                                                <Button
                                                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                                                    size="sm"
                                                    onClick={() => setViewMode('list')}
                                                    className={`flex-1 ${viewMode === 'list' ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-md' : 'hover:bg-gray-100'} transition-all duration-200`}
                                                >
                                                    <List className="w-4 h-4 mr-2" />
                                                    List
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Desktop/Tablet Layout - Side by Side Filters */}
                        <div className="hidden md:block">
                            <div className="flex flex-wrap lg:flex-nowrap items-end gap-4 mb-4">
                                {/* Search Bar - Takes up more space */}
                                <div className="flex-1 min-w-0 lg:min-w-80">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                                    <div className="relative">
                                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="text"
                                            placeholder="Search for products..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full pl-12 pr-4 py-3 border-0 rounded-xl shadow-md focus:ring-4 focus:ring-pink-200 focus:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm"
                                        />
                                    </div>
                                </div>

                                {/* Category Filter - Always visible */}
                                <div className="relative min-w-36">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                    <select
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                        className="appearance-none bg-white/80 border-0 rounded-lg px-4 py-3 pr-10 focus:ring-2 focus:ring-pink-300 transition-all shadow-md w-full"
                                    >
                                        {categories.map(category => (
                                            <option key={category} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-11 w-4 h-4 text-gray-400 pointer-events-none" />
                                </div>

                                {/* Sort Filter - Visible on medium screens and up */}
                                <div className="relative min-w-40">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Sort by</label>
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="appearance-none bg-white/80 border-0 rounded-lg px-4 py-3 pr-10 focus:ring-2 focus:ring-pink-300 transition-all shadow-md w-full"
                                    >
                                        <option value="name">Name A-Z</option>
                                        <option value="price-low">Price: Low to High</option>
                                        <option value="price-high">Price: High to Low</option>
                                        <option value="rating">Highest Rated</option>
                                        <option value="newest">Newest First</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-11 w-4 h-4 text-gray-400 pointer-events-none" />
                                </div>

                                {/* View Mode Toggle - Visible on large screens */}
                                <div className="hidden lg:flex items-center gap-1 bg-white/80 rounded-lg p-1 shadow-md">
                                    <Button
                                        variant={viewMode === 'grid' ? 'default' : 'ghost'}
                                        size="sm"
                                        onClick={() => setViewMode('grid')}
                                        className={`${viewMode === 'grid' ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-md' : 'hover:bg-gray-100'} transition-all duration-200`}
                                    >
                                        <Grid3X3 className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        variant={viewMode === 'list' ? 'default' : 'ghost'}
                                        size="sm"
                                        onClick={() => setViewMode('list')}
                                        className={`${viewMode === 'list' ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-md' : 'hover:bg-gray-100'} transition-all duration-200`}
                                    >
                                        <List className="w-4 h-4" />
                                    </Button>
                                </div>

                                {/* More Filters Dropdown - Only for Price Range on Desktop */}
                                <div className="relative">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">More</label>
                                    <Button
                                        onClick={() => setShowMoreFilters(!showMoreFilters)}
                                        variant="outline"
                                        className="border-pink-300 text-pink-600 hover:bg-pink-50 h-12 px-4"
                                    >
                                        <Filter className="w-4 h-4 mr-2" />
                                        Filters
                                        <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showMoreFilters ? 'rotate-180' : ''}`} />
                                    </Button>

                                    {/* Desktop Dropdown Content - Only Price Range */}
                                    {showMoreFilters && (
                                        <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50 min-w-64">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                                                <div className="flex items-center gap-2">
                                                    <input
                                                        type="number"
                                                        placeholder="Min"
                                                        value={priceRange[0]}
                                                        onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                                                        className="w-24 px-3 py-2 border-0 rounded-lg bg-gray-50 focus:ring-2 focus:ring-pink-300 shadow-sm"
                                                    />
                                                    <span className="text-gray-500">-</span>
                                                    <input
                                                        type="number"
                                                        placeholder="Max"
                                                        value={priceRange[1]}
                                                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 5000])}
                                                        className="w-24 px-3 py-2 border-0 rounded-lg bg-gray-50 focus:ring-2 focus:ring-pink-300 shadow-sm"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Results Count and Clear Filters */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                            <div className="text-gray-600">
                                <span className="font-semibold">{filteredAndSortedProducts.length}</span> of <span className="font-semibold">{products.length}</span> products
                                {selectedCategory !== "All" && (
                                    <span className="ml-2 text-pink-600 font-medium">
                                        in {selectedCategory}
                                    </span>
                                )}
                            </div>
                            {(selectedCategory !== "All" || searchTerm || priceRange[0] > minPrice || priceRange[1] < maxPrice) && (
                                <Button
                                    onClick={() => {
                                        setSearchTerm("");
                                        setSelectedCategory("All");
                                        setPriceRange([minPrice, maxPrice]);
                                    }}
                                    variant="outline"
                                    size="sm"
                                    className="border-pink-300 text-pink-600 hover:bg-pink-50"
                                >
                                    Clear All Filters
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Products Grid/List */}
                <div className={`gap-2 ${viewMode === 'grid'
                    ? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
                    : 'flex flex-col space-y-6'
                    }`}>
                    {filteredAndSortedProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onImageClick={handleImageClick}
                            viewMode={viewMode}
                            router={router}
                        />
                    ))}
                </div>

                {/* No Results */}
                {filteredAndSortedProducts.length === 0 && (
                    <div className="text-center py-16">
                        <div className="text-gray-400 mb-6">
                            <Search className="w-20 h-20 mx-auto" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">No products found</h3>
                        <p className="text-gray-600 mb-6 text-lg">
                            Try adjusting your search terms or filters to find what you're looking for
                        </p>
                        <Button
                            onClick={() => {
                                setSearchTerm("");
                                setSelectedCategory("All");
                                setPriceRange([minPrice, maxPrice]);
                            }}
                            className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-3 text-lg"
                        >
                            Clear All Filters
                        </Button>
                    </div>
                )}

                {/* Image Preview Modal */}
                <ImagePreviewModal
                    product={previewProduct}
                    isOpen={isPreviewOpen}
                    onClose={handleClosePreview}
                />
            </div>
        </div>
    );
}