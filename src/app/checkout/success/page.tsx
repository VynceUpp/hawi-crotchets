'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle, Heart, Package, Mail, ArrowLeft, Star, Gift } from 'lucide-react';
import Loading from '@/app/loading';

interface OrderDetails {
  orderNumber: string;
  customerName: string;
  email: string;
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
    image?: string;
  }>;
  total: number;
  estimatedDelivery: string;
}

const CheckoutSuccessPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams?.get('session_id');
  const [isAnimating, setIsAnimating] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrder() {
      if (!sessionId) return;
      try {
        console.log('Fetching order with session ID:', sessionId);
        const res = await fetch(`/api/order/${sessionId}`);
        console.log('Response status:', res.status);
        const data = await res.json();
        console.log('Order data received:', data);
        setOrderDetails(data);
      } catch (err) {
        console.error('Error fetching order:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchOrder();
  }, [sessionId]);

  // Trigger animations only after orderDetails is set (data loaded)
  useEffect(() => {
    if (orderDetails) {
      const timer = setTimeout(() => {
        setIsAnimating(true);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [orderDetails]);

  const handleContinueShopping = () => {
    router.push('/shop');
  };

  const handleViewOrder = () => {
    if (orderDetails) {
      router.push(`/checkout/order-details/${orderDetails.orderNumber}`);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!orderDetails) {
    return <div className="text-center p-10 text-red-500">Order not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7d6c5] via-[#ffffff] to-[#ffffff] relative overflow-hidden">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            >
              <div
                className={`w-2 h-2 rounded-full ${i % 4 === 0
                    ? 'bg-[#f7d6c5]'
                    : i % 4 === 1
                      ? 'bg-pink-300'
                      : i % 4 === 2
                        ? 'bg-yellow-300'
                        : 'bg-green-300'
                  }`}
              />
            </div>
          ))}
        </div>
      )}

      {/* Decorative Background Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-[#f7d6c5]/20 rounded-full animate-pulse" />
      <div
        className="absolute top-32 right-20 w-16 h-16 bg-pink-200/30 rounded-full animate-bounce"
        style={{ animationDelay: '1s' }}
      />
      <div
        className="absolute bottom-20 left-32 w-12 h-12 bg-yellow-200/40 rounded-full animate-pulse"
        style={{ animationDelay: '2s' }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Header */}
        <div
          className={`text-center mb-12 transform transition-all duration-1000 ${isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
        >
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6 animate-bounce">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>

          <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-800 mb-4 animate-fade-in">
            Order Confirmed! 🎉
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Thank you,{' '}
            <span className="font-semibold text-[#8B4513]">{orderDetails.customerName}</span>!
            Your handmade treasures are being lovingly prepared just for you.
          </p>

          <div className="flex items-center justify-center mt-6 space-x-2 text-[#8B4513]">
            <Heart className="w-5 h-5 fill-current animate-pulse" />
            <span className="text-sm font-medium">Made with Love & Care</span>
            <Heart className="w-5 h-5 fill-current animate-pulse" />
          </div>
        </div>

        {/* Order Details Card */}
        <div
          className={`bg-white rounded-2xl shadow-xl p-8 mb-8 transform transition-all duration-1000 ${isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          style={{ transitionDelay: '0.3s' }}
        >
          <div className="border-b border-gray-200 pb-6 mb-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="max-w-full">
                <h2
                  className="font-serif text-2xl font-semibold text-gray-800 mb-2 truncate"
                  title={orderDetails.orderNumber}
                  style={{ maxWidth: '100vw' }} // ensure truncation on mobile
                >
                  Order #{orderDetails.orderNumber}
                </h2>
                <p className="text-gray-600">
                  Confirmation sent to:{' '}
                  <span className="font-medium">{orderDetails.email}</span>
                </p>
              </div>
              <div className="flex items-center space-x-2 bg-green-50 px-4 py-2 rounded-full whitespace-nowrap">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-green-700 font-medium text-sm">Processing</span>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
              <Package className="w-5 h-5 mr-2 text-[#f7d6c5]" />
              Your Items
            </h3>
            <div className="space-y-4">
              {orderDetails.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
                >
                  <div className="w-16 h-16 bg-[#f7d6c5]/20 rounded-lg flex items-center justify-center">
                    <Gift className="w-8 h-8 text-[#8B4513]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">{item.name}</h4>
                    <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-800">
                      KES {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Total */}
          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between items-center">
              <span className="font-serif text-lg font-semibold text-gray-800">Total</span>
              <span className="font-serif text-2xl font-bold text-[#8B4513]">
                KES {orderDetails.total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Delivery Information */}
        <div
          className={`bg-gradient-to-r from-[#f7d6c5]/10 to-pink-50 rounded-2xl p-8 mb-8 transform transition-all duration-1000 ${isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          style={{ transitionDelay: '0.6s' }}
        >
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-[#f7d6c5] rounded-full flex items-center justify-center flex-shrink-0">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-semibold text-gray-800 mb-2">
                What happens next?
              </h3>
              <div className="space-y-3 text-gray-600">
                <p className="flex items-center">
                  <span className="w-2 h-2 bg-[#f7d6c5] rounded-full mr-3" />
                  We'll start crafting your items with love and attention to detail
                </p>
                <p className="flex items-center">
                  <span className="w-2 h-2 bg-[#f7d6c5] rounded-full mr-3" />
                  You'll receive tracking information once your order ships
                </p>
                <p className="flex items-center">
                  <span className="w-2 h-2 bg-[#f7d6c5] rounded-full mr-3" />
                  <span>
                    <strong>Estimated delivery:</strong> {orderDetails.estimatedDelivery}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Review Prompt */}
        <div
          className={`bg-white rounded-2xl shadow-lg p-8 mb-8 transform transition-all duration-1000 ${isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          style={{ transitionDelay: '0.9s' }}
        >
          <div className="text-center">
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
            </div>
            <h3 className="font-serif text-xl font-semibold text-gray-800 mb-2">
              We'd love to hear from you!
            </h3>
            <p className="text-gray-600 mb-4">
              Once you receive your handmade treasures, we'd be grateful for your review.
              Your feedback helps us continue creating beautiful, quality items.
            </p>
            <div className="flex items-center justify-center space-x-2 text-[#8B4513]">
              <Heart className="w-4 h-4 fill-current" />
              <span className="text-sm">Your satisfaction is our greatest reward</span>
              <Heart className="w-4 h-4 fill-current" />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center transform transition-all duration-1000 ${isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          style={{ transitionDelay: '1.2s' }}
        >
          <button
            onClick={handleContinueShopping}
            className="flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#f7d6c5] to-[#e8c4b0] text-white font-semibold rounded-xl hover:from-[#e8c4b0] hover:to-[#d9b5a5] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Continue Shopping
          </button>

          <button
            onClick={handleViewOrder}
            className="flex items-center justify-center px-8 py-4 bg-white text-[#8B4513] font-semibold rounded-xl border-2 border-[#f7d6c5] hover:bg-[#f7d6c5] hover:text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Package className="w-5 h-5 mr-2" />
            View Order Details
          </button>
        </div>

        {/* Footer Message */}
        <div
          className={`text-center mt-12 transform transition-all duration-1000 ${isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          style={{ transitionDelay: '1.5s' }}
        >
          <p className="text-gray-600 italic">
            "Every stitch tells a story, and yours is just beginning..."
          </p>
          <p className="text-[#8B4513] font-semibold mt-2">- The Handmade Treasures Team ✨</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

export default CheckoutSuccessPage;
