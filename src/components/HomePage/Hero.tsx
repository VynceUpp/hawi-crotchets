"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const productImages = [
    { id: 1, src: "/hawi.jpg", alt: "Handmade Scarf", name: "Baby Fashion" },
    { id: 2, src: "/loise.jpg", alt: "Loise", name: "Cardigan" },
    { id: 3, src: "/fringes.jpg", alt: "Fringes", name: "Perfection fringes" },
    { id: 4, src: "/bag.jpg", alt: "Bag", name: "Yarn Bag" },
    { id: 5, src: "/hats.jpg", alt: "Crochet Hat", name: "Warm Beanie Hat" },
];

function ProductCarousel() {
    const plugin = React.useRef(
        Autoplay({ delay: 3000, stopOnInteraction: true })
    );

    return (
        <div className="flex items-center justify-center w-full">
            <Carousel
                plugins={[plugin.current]}
                className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl"
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
            >

                <CarouselContent>
                    {productImages.map((product) => (
                        <CarouselItem key={product.id}>
                            <div className="px-2 sm:px-4 py-2 sm:py-4">
                                <Card className="border-0 bg-transparent">
                                    <CardContent className="p-0">
                                        <div className="relative">
                                            {/* Playful splash border using CSS */}
                                            <div
                                                className="relative overflow-hidden rounded-2xl sm:rounded-3xl"
                                                style={{
                                                    clipPath: "polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)",
                                                    background: "linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57)",
                                                    padding: "3px",
                                                }}
                                            >
                                                <div
                                                    className="relative overflow-hidden bg-white"
                                                    style={{
                                                        clipPath: "polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)",
                                                    }}
                                                >
                                                    <img
                                                        src={product.src}
                                                        alt={product.alt}
                                                        className="w-full h-auto max-h-[280px] sm:max-h-[320px] md:max-h-[360px] lg:max-h-[420px] xl:max-h-[480px] object-cover rounded-xl"
                                                    />

                                                </div>
                                            </div>
                                            {/* Product name overlay */}
                                            <div className="absolute bottom-3 left-3 right-3">
                                                <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-center">
                                                    <p className="text-xs sm:text-sm font-medium text-gray-800">
                                                        {product.name}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="left-2 sm:left-4 bg-white/80 hover:bg-white border-2 border-pink-200" />
                <CarouselNext className="right-2 sm:right-4 bg-white/80 hover:bg-white border-2 border-pink-200" />
            </Carousel>
        </div>
    );
}

export default function Hero() {
    const router = useRouter();
    return (
        <section className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-[#f7d6c5] via-[#ffffff] to-[#ffffff]">
            {/* Left Side - Welcome Message */}
            <section className="flex-1 flex items-center justify-center p-6 md:p-10 lg:p-16">
                <div className="max-w-xl text-center lg:text-left">
                    <div className="mb-6 md:mt-0 mt-10">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 leading-tight">
                            <span className="hidden lg:block text-2xl text-gray-600 mb-2">Crafted with Heart,</span>
                            <span className="block text-5xl lg:text-6xl xl:text-7xl logo text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                                Made to Cherish
                            </span>
                        </h2>

                        <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-purple-500 mx-auto lg:mx-0 mb-6"></div>
                    </div>

                    <p className="text-sm md:text-xl text-gray-700 mb-8 leading-relaxed">
                        Discover handcrafted treasures made with love, care, and years of passion.
                        Each piece tells a story of warmth, comfort, and timeless beauty.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <Button
                             onClick={() => router.push("/shop")}
                            size="lg"
                            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            See Collection
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            className="border-2 border-pink-300 text-pink-600 hover:bg-pink-50 px-8 py-3 rounded-full font-semibold transition-all duration-300"
                        >
                            Learn More
                        </Button>
                    </div>

                    <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                            <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                            Handmade Quality
                        </div>
                        <div className="flex items-center">
                            <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                            Custom Orders
                        </div>
                        <div className="flex items-center">
                            <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                            Local Artisan
                        </div>
                    </div>
                </div>
            </section>

            {/* Right Side - Product Carousel */}
            <section className="flex-1 flex items-center justify-center p-6 md:p-10 lg:p-16">
                <ProductCarousel />
            </section>
        </section>
    );
}
