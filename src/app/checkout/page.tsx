'use client';
import React, { useState } from 'react';
import { ShoppingBag, Trash2, Plus, Minus, Phone, MapPin, User, Lock, ChevronDown, ChevronUp } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
  color?: string;
}

const CheckoutPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Handmade Baby Blanket",
      price: 2500,
      quantity: 1,
      image: "/api/placeholder/100/100",
      size: "Medium",
      color: "Soft Pink"
    },
    {
      id: 2,
      name: "Crochet Handbag",
      price: 1800,
      quantity: 2,
      image: "/api/placeholder/100/100",
      size: "Large",
      color: "Cream"
    },
    {
      id: 3,
      name: "Cotton Pot Holders Set",
      price: 800,
      quantity: 1,
      image: "/api/placeholder/100/100",
      color: "Multi-color"
    }
  ]);

  const [customerInfo, setCustomerInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    notes: ''
  });

  const [mpesaPhone, setMpesaPhone] = useState('');
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCartDetails, setShowCartDetails] = useState(true);
  const router = useRouter();

  const updateQuantity = (id: number, change: number) => {
    setCartItems(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 200;
  const total = subtotal + deliveryFee;

  const handleInputChange = (field: string, value: string) => {
    setCustomerInfo(prev => ({ ...prev, [field]: value }));
  };

  const handlePayWithMpesa = () => {
    setShowPaymentForm(true);
  };

  const handleMpesaPayment = async () => {
    if (!mpesaPhone || mpesaPhone.length < 10) {
      alert('Please enter a valid M-Pesa phone number');
      return;
    }

    const isFormValid = customerInfo.fullName && customerInfo.email && customerInfo.phone && customerInfo.address;
    if (!isFormValid) {
      alert('Please fill in all required customer information');
      return;
    }

    setIsProcessing(true);

    // Simulate M-Pesa payment process
    setTimeout(() => {
      alert(`M-Pesa payment request sent to ${mpesaPhone}. Please complete the payment on your phone.`);
      setIsProcessing(false);
      router.push('/checkout/success/');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7d6c5] via-[#ffffff] to-[#ffffff] py-4 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 bg-clip-text text-transparent mb-1">
            Checkout
          </h1>
          <p className="text-sm md:text-base text-gray-600">Complete your order from Hawi Crotchets</p>
        </div>

        {/* Cart Items - Prominent Display */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg border border-orange-100 mb-4">
          <div 
            className="flex items-center justify-between cursor-pointer md:cursor-default mb-4"
            onClick={() => setShowCartDetails(!showCartDetails)}
          >
            <h2 className="text-lg md:text-2xl font-semibold text-gray-800 flex items-center gap-2">
              <ShoppingBag className="text-orange-500" size={20} />
              Your Items ({cartItems.length})
            </h2>
            <div className="md:hidden">
              {showCartDetails ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
          </div>
          
          <div className={`space-y-3 ${showCartDetails ? 'block' : 'hidden md:block'}`}>
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-3 p-3 md:p-4 bg-white/60 rounded-xl border border-orange-50">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <ShoppingBag className="text-orange-500" size={16} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm md:text-base font-semibold text-gray-800 truncate">{item.name}</h3>
                  {item.size && <p className="text-xs md:text-sm text-gray-600">Size: {item.size}</p>}
                  {item.color && <p className="text-xs md:text-sm text-gray-600">Color: {item.color}</p>}
                  <p className="text-sm md:text-lg font-bold text-orange-600">KSh {item.price.toLocaleString()}</p>
                </div>
                
                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700 transition-colors p-1"
                  >
                    <Trash2 size={14} />
                  </button>
                  
                  <div className="flex items-center gap-1 bg-white rounded-lg border text-xs">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-1 hover:bg-gray-100 rounded-l-lg transition-colors"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="px-2 py-1 font-semibold min-w-[24px] text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-1 hover:bg-gray-100 rounded-r-lg transition-colors"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary - Very Prominent */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg border border-orange-100 mb-4">
          <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">Order Summary</h3>
          
          <div className="space-y-2 md:space-y-3">
            <div className="flex justify-between text-sm md:text-base text-gray-600">
              <span>Subtotal</span>
              <span>KSh {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm md:text-base text-gray-600">
              <span>Delivery Fee</span>
              <span>KSh {deliveryFee.toLocaleString()}</span>
            </div>
            <div className="border-t border-gray-200 pt-3">
              <div className="flex justify-between text-xl md:text-2xl font-bold text-gray-800">
                <span>Total</span>
                <span className="text-orange-600">KSh {total.toLocaleString()}</span>
              </div>
            </div>
          </div>
          
          {/* M-Pesa Payment Button */}
          {!showPaymentForm && (
            <button
              onClick={handlePayWithMpesa}
              className="w-full mt-6 bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold py-4 px-6 rounded-xl hover:from-green-700 hover:to-green-600 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <Phone size={20} />
              Pay KSh {total.toLocaleString()} with M-Pesa
            </button>
          )}
        </div>

        {/* Payment Form - Appears after clicking M-Pesa */}
        {showPaymentForm && (
          <div className="space-y-4">
            {/* Customer Information */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg border border-orange-100">
              <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <User className="text-orange-500" size={20} />
                Customer Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={customerInfo.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">Email *</label>
                  <input
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    value={customerInfo.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-colors"
                    placeholder="0700 000 000"
                  />
                </div>
                
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">City *</label>
                  <input
                    type="text"
                    value={customerInfo.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-colors"
                    placeholder="Nairobi"
                  />
                </div>
              </div>
              
              <div className="mt-3 md:mt-4">
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">Delivery Address *</label>
                <textarea
                  value={customerInfo.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-colors"
                  rows={2}
                  placeholder="Enter your delivery address"
                />
              </div>
              
              <div className="mt-3 md:mt-4">
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">Special Notes (Optional)</label>
                <textarea
                  value={customerInfo.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-colors"
                  rows={2}
                  placeholder="Any special delivery instructions..."
                />
              </div>
            </div>

            {/* M-Pesa Payment Details */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg border border-orange-100">
              <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Phone className="text-green-600" size={20} />
                M-Pesa Payment
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 md:p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="text-white" size={16} />
                  </div>
                  <div>
                    <h3 className="text-sm md:text-base font-semibold text-green-800">M-Pesa Payment</h3>
                    <p className="text-xs md:text-sm text-green-600">Pay securely with your mobile money</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                    M-Pesa Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={mpesaPhone}
                    onChange={(e) => setMpesaPhone(e.target.value)}
                    className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-colors"
                    placeholder="254700000000"
                  />
                  <p className="text-xs md:text-sm text-gray-500 mt-1">
                    Enter the phone number registered with M-Pesa
                  </p>
                </div>
                
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 md:p-4">
                  <h4 className="text-sm md:text-base font-semibold text-amber-800 mb-1">Payment Amount</h4>
                  <p className="text-xl md:text-2xl font-bold text-amber-900">KSh {total.toLocaleString()}</p>
                </div>

                <button
                  onClick={handleMpesaPayment}
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold py-3 md:py-4 px-6 rounded-xl hover:from-green-700 hover:to-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </span>
                  ) : (
                    `Complete Payment - KSh ${total.toLocaleString()}`
                  )}
                </button>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg border border-orange-100">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="space-y-2">
                  <Lock className="text-green-600 mx-auto" size={20} />
                  <p className="text-xs md:text-sm font-semibold text-gray-800">Secure Payment</p>
                  <p className="text-xs text-gray-600">Protected by M-Pesa</p>
                </div>
                <div className="space-y-2">
                  <MapPin className="text-blue-600 mx-auto" size={20} />
                  <p className="text-xs md:text-sm font-semibold text-gray-800">Fast Delivery</p>
                  <p className="text-xs text-gray-600">2-3 business days</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Processing State */}
        {isProcessing && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Phone className="text-green-600 animate-pulse" size={32} />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-800">Processing Payment...</h3>
                <p className="text-sm md:text-base text-gray-600">
                  Please check your phone for the M-Pesa prompt and enter your PIN to complete the payment.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-xs md:text-sm text-blue-800">
                    <strong>Amount:</strong> KSh {total.toLocaleString()}<br/>
                    <strong>To:</strong> {mpesaPhone}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;