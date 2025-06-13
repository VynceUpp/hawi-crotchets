'use client';

import React, { useState, FormEvent } from 'react';
import { Mail, Phone, Clock, Twitter, Instagram, ChevronDown, Youtube, MessageCircle } from 'lucide-react';

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  isOpen: boolean;
}

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const [faqItems, setFaqItems] = useState<FAQItem[]>([
    {
      id: 1,
      question: "How long does it take to complete a custom order?",
      answer: "Custom orders typically take 2-4 weeks to complete, depending on the complexity and size of the item. During peak seasons (holidays), please allow extra time. We'll provide you with an estimated completion date when you place your order.",
      isOpen: false
    },
    {
      id: 2,
      question: "What materials do you use for your crochet items?",
      answer: "We use high-quality yarn including cotton, wool, acrylic, and specialty fibers. All materials are carefully selected for durability, comfort, and appearance. We can accommodate specific material requests for custom orders, including organic and hypoallergenic options.",
      isOpen: false
    },
    {
      id: 3,
      question: "Do you offer care instructions for your items?",
      answer: "Yes! Every item comes with detailed care instructions tailored to the specific materials used. We provide information on washing, drying, and storing your crochet items to ensure they maintain their beauty and quality for years to come.",
      isOpen: false
    },
    {
      id: 4,
      question: "Can I request color changes for existing designs?",
      answer: "Absolutely! We're happy to customize colors for any of our existing designs. Simply contact us with your color preferences, and we'll work with you to create the perfect piece. We can also provide color swatches to help you make your decision.",
      isOpen: false
    },
    {
      id: 5,
      question: "What is your return and exchange policy?",
      answer: "We accept returns within 14 days of delivery for ready-made items in original condition. Custom orders are final sale unless there's a defect. We offer exchanges for sizing issues when possible. Please contact us immediately if you have any concerns with your order.",
      isOpen: false
    },
    {
      id: 6,
      question: "Do you offer wholesale pricing for bulk orders?",
      answer: "Yes, we offer wholesale pricing for bulk orders of 10 or more items. This is perfect for boutiques, gift shops, or special events. Contact us with your requirements, and we'll provide a custom quote with wholesale pricing and delivery timeline.",
      isOpen: false
    }
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Here you would typically send the data to your API
      console.log('Form submitted:', formData);
      
      setSubmitStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
      });
      
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleFAQ = (id: number) => {
    setFaqItems(prev => prev.map(item => ({
      ...item,
      isOpen: item.id === id ? !item.isOpen : false
    })));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7d6c5] via-[#ffffff] to-[#ffffff]">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#f7d6c5]/20 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="inline-block mb-6 animate-bounce">
              <div className="w-16 h-16 bg-gradient-to-br from-[#f7d6c5] to-[#e8c4b0] rounded-full flex items-center justify-center mx-auto shadow-lg">
                <Mail className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-gray-800 mb-4">
              Get In Touch
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Have questions about our handmade creations? We'd love to hear from you and help bring your crochet dreams to life.
            </p>
          </div>
        </div>
      </header>

      {/* Contact Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <div className="bg-gradient-to-br from-[#f7d6c5]/10 to-transparent p-2 rounded-xl">
              <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <h2 className="font-serif text-2xl font-semibold text-gray-800 mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#f7d6c5] focus:border-transparent outline-none transition-all duration-300 hover:-translate-y-1"
                        placeholder="Your first name"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#f7d6c5] focus:border-transparent outline-none transition-all duration-300 hover:-translate-y-1"
                        placeholder="Your last name"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#f7d6c5] focus:border-transparent outline-none transition-all duration-300 hover:-translate-y-1"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#f7d6c5] focus:border-transparent outline-none transition-all duration-300 hover:-translate-y-1"
                      required
                    >
                      <option value="">Select a topic</option>
                      <option value="custom-order">Custom Order Inquiry</option>
                      <option value="product-question">Product Question</option>
                      <option value="shipping">Shipping & Returns</option>
                      <option value="wholesale">Wholesale Opportunities</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#f7d6c5] focus:border-transparent outline-none resize-none transition-all duration-300 hover:-translate-y-1"
                      placeholder="Tell us about your project or question..."
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 px-6 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                      submitStatus === 'success'
                        ? 'bg-green-500 text-white'
                        : submitStatus === 'error'
                        ? 'bg-red-500 text-white'
                        : 'bg-gradient-to-r from-[#f7d6c5] to-[#e8c4b0] text-white hover:from-[#e8c4b0] hover:to-[#d9b5a5]'
                    }`}
                  >
                    {isSubmitting 
                      ? 'Sending...' 
                      : submitStatus === 'success' 
                      ? 'Message Sent!' 
                      : submitStatus === 'error'
                      ? 'Error - Try Again'
                      : 'Send Message'
                    }
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-[#f7d6c5]/10 to-transparent p-2 rounded-xl">
                <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <h3 className="font-serif text-xl font-semibold text-gray-800 mb-6">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-[#f7d6c5] rounded-full flex items-center justify-center">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Email</p>
                        <p className="text-gray-600">hello@handmadetreasures.com</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-[#f7d6c5] rounded-full flex items-center justify-center">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Phone</p>
                        <p className="text-gray-600">+254 72894143</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-[#f7d6c5] rounded-full flex items-center justify-center">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Response Time</p>
                        <p className="text-gray-600">Within 24 hours</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#f7d6c5]/10 to-transparent p-2 rounded-xl">
                <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <h3 className="font-serif text-xl font-semibold text-gray-800 mb-6">Follow Us</h3>
                  <div className="flex space-x-4">
                    <a
                      href="https://www.youtube.com/@HawiCrochets"
                      className="w-12 h-12 bg-gradient-to-br from-[#f7d6c5] to-[#e8c4b0] rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200"
                      title="Visit our YouTube channel"
                      aria-label="Visit Hawi Crochets on YouTube"
                    >
                      <Youtube className="w-6 h-6 text-white" />
                    </a>
                    <a
                      href="https://www.pinterest.com/hawi_crochets/"
                      className="w-12 h-12 bg-gradient-to-br from-[#f7d6c5] to-[#e8c4b0] rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200"
                      title="Follow us on Pinterest"
                      aria-label="Follow Hawi Crochets on Pinterest"
                    >
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.745.099.12.112.225.085.347-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.749-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.017 0z"/>
                      </svg>
                    </a>
                    <a
                      href="https://www.instagram.com/hawi_crochets/"
                      className="w-12 h-12 bg-gradient-to-br from-[#f7d6c5] to-[#e8c4b0] rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200"
                      title="Follow us on Instagram"
                      aria-label="Follow Hawi Crochets on Instagram"
                    >
                      <Instagram className="w-6 h-6 text-white" />
                    </a>
                    <a
                      href="https://wa.me/c/254728984143"
                      className="w-12 h-12 bg-gradient-to-br from-[#f7d6c5] to-[#e8c4b0] rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200"
                      title="Contact us on WhatsApp"
                      aria-label="Contact Hawi Crochets on WhatsApp"
                    >
                      <MessageCircle className="w-6 h-6 text-white" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 text-lg">
              Find answers to common questions about our handmade crochet items
            </p>
          </div>

          <div className="space-y-4">
            {faqItems.map((item) => (
              <div
                key={item.id}
                className="bg-gradient-to-br from-[#f7d6c5]/10 to-transparent p-2 rounded-xl"
              >
                <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <button
                    onClick={() => toggleFAQ(item.id)}
                    className="w-full p-6 text-left focus:outline-none"
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-gray-800 text-lg pr-4">
                        {item.question}
                      </h3>
                      <ChevronDown
                        className={`w-6 h-6 text-gray-400 transition-transform duration-200 flex-shrink-0 ${
                          item.isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                    <div
                      className={`mt-4 text-gray-600 transition-all duration-300 overflow-hidden ${
                        item.isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <p>{item.answer}</p>
                    </div>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="font-serif text-2xl font-semibold mb-4">Hawi Crotchets</h3>
            <p className="text-gray-400 mb-6">Creating beautiful, handcrafted crochet items with love and care</p>
            <div className="flex justify-center space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Shipping Info</a>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-700">
              <p className="text-gray-400">© 2024 Handmade Treasures. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactPage;