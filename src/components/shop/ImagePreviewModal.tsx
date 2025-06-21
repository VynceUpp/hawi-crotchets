import { Star, X } from "lucide-react";
import { Badge } from "../ui/badge";

export default function ImagePreviewModal({ product, isOpen, onClose }: { product: any, isOpen: boolean, onClose: () => void }) {
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
                    aria-label="Close image preview"
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
                            className="w-full h-auto max-h-[70vh] object-contain min-h-img-preview"
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
