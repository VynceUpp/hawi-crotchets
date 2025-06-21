'use client';

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  product: any; // Replace with your Product type if available
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: any, quantity?: number) => void;
  removeFromCart: (productId: string | number) => void;
  updateQuantity: (productId: string | number, quantity: number) => void;
  clearCart: () => void;
}


const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  function addToCart(product: any, quantity = 1) {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { product, quantity }];
    });
  }

  function removeFromCart(productId: string | number) {
    setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  }

  function clearCart() {
    setCartItems([]);
  }

  // New function to update quantity directly
  function updateQuantity(productId: string | number, quantity: number) {
    if (quantity <= 0) {
      // If quantity is 0 or less, remove the item
      removeFromCart(productId);
      return;
    }

   setCartItems(prevItems =>
    prevItems.map(item =>
      item.product.id === productId
        ? { ...item, quantity: Math.max(1, quantity) }
        : item
    )
  );
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
