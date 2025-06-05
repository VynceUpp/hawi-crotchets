"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Quote, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { testimonials } from "@/data/AllData";

interface Testimonial {
  id: number;
  text: string;
  rating: number;
  name: string;
  location: string;
  product: string;
  verified: boolean;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial, isActive = false }: { testimonial: Testimonial; isActive?: boolean }) {
  return (
    <Card className={`p-6 bg-white/90 backdrop-blur-sm border-2 transition-all duration-300 hover:shadow-xl group ${
      isActive ? "border-pink-300 shadow-lg scale-105" : "border-pink-100 hover:border-pink-300"
    }`}>
      <CardContent className="p-0">
        {/* Quote Icon */}
        <div className="flex justify-between items-start mb-4">
          <Quote className="w-8 h-8 text-pink-300 opacity-50" />
          {testimonial.verified && (
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
              <Sparkles className="w-3 h-3 mr-1" />
              Verified
            </Badge>
          )}
        </div>

        {/* Testimonial Text */}
        <blockquote className="text-gray-700 leading-relaxed mb-6 italic">
          "{testimonial.text}"
        </blockquote>

        {/* Product Badge */}
        <Badge className="mb-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white">
          {testimonial.product}
        </Badge>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <StarRating rating={testimonial.rating} />
          <span className="text-sm text-gray-500">({testimonial.rating}/5)</span>
        </div>

        {/* Customer Info */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full flex items-center justify-center">
            <span className="text-pink-700 font-semibold text-lg">
              {testimonial.name.split(' ').map((n: string) => n[0]).join('')}
            </span>
          </div>
          <div>
            <div className="font-semibold text-gray-900">{testimonial.name}</div>
            <div className="text-sm text-gray-500">{testimonial.location}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = React.useState(true);

  // Auto-rotation effect
  React.useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  // Calculate visible testimonials for different screen sizes
  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % testimonials.length;
      visible.push({ ...testimonials[index], isActive: i === 1 });
    }
    return visible;
  };

  return (
    <section className="py-16 bg-gradient-to-b from-purple-50 via-white to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 logo">
            What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">Customers Say</span>
          </h2>
          <p className="text-sm md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Don't just take our word for it - hear from the amazing people who have made Hawi Crotchets part of their story.
          </p>
        </div>

        {/* Featured Testimonial (Mobile) */}
        <div className="block lg:hidden mb-12">
          <TestimonialCard testimonial={testimonials[currentIndex]} isActive={true} />
          
          {/* Mobile Navigation */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <Button
              variant="outline"
              size="sm"
              onClick={prevTestimonial}
              className="rounded-full p-2"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "bg-pink-500 w-6" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={nextTestimonial}
              className="rounded-full p-2"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Desktop Three-Column Layout */}
        <div className="hidden lg:block mb-12">
          <div className="grid lg:grid-cols-3 gap-6">
            {getVisibleTestimonials().map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                isActive={testimonial.isActive}
              />
            ))}
          </div>
          
          {/* Desktop Navigation */}
          <div className="flex justify-center items-center gap-6 mt-8">
            <Button
              variant="outline"
              onClick={prevTestimonial}
              className="rounded-full p-3 hover:bg-pink-50"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "bg-pink-500 w-8" : "bg-gray-300 hover:bg-pink-300"
                  }`}
                />
              ))}
            </div>
            
            <Button
              variant="outline"
              onClick={nextTestimonial}
              className="rounded-full p-3 hover:bg-pink-50"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          <div className="text-center">
            <div className="text-3xl font-bold text-pink-600 mb-2">4.9★</div>
            <div className="text-sm text-gray-600">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
            <div className="text-sm text-gray-600">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-pink-600 mb-2">100%</div>
            <div className="text-sm text-gray-600">Satisfaction Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
}