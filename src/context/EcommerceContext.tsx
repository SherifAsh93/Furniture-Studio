'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { addToWishlist as apiAddToWishlist, removeFromWishlist as apiRemoveFromWishlist, getWishlist as apiGetWishlist, createMultiItemOrder } from '@/app/actions/data';

type CartItem = {
  id: string;
  productId: string;
  title: string;
  price: number;
  quantity: number;
  image?: string;
};

type EcommerceContextType = {
  cart: CartItem[];
  wishlist: any[];
  addToCart: (product: any) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: any) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  checkout: () => Promise<{ success: boolean; error?: string }>;
};

const EcommerceContext = createContext<EcommerceContextType | undefined>(undefined);

export function EcommerceProvider({ children }: { children: React.ReactNode }) {
  const { user, openModal } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Persistence: Load from LocalStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('studio_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart');
      }
    }
  }, []);

  // Save to LocalStorage on change
  useEffect(() => {
    localStorage.setItem('studio_cart', JSON.stringify(cart));
  }, [cart]);

  // Load Wishlist if user is logged in
  useEffect(() => {
    async function fetchWishlist() {
      if (user) {
        try {
          const res = await apiGetWishlist(user.id);
          if (res.success) {
            setWishlist(res.wishlist || []);
          }
        } catch (e) {
          console.error('Failed to fetch wishlist', e);
        }
      } else {
        const savedWishlist = localStorage.getItem('studio_wishlist');
        if (savedWishlist) {
          try {
            setWishlist(JSON.parse(savedWishlist));
          } catch (e) {
            console.error('Failed to parse wishlist');
          }
        }
      }
    }
    fetchWishlist();
  }, [user]);

  // Save ephemeral wishlist
  useEffect(() => {
    if (!user) {
      localStorage.setItem('studio_wishlist', JSON.stringify(wishlist));
    }
  }, [wishlist, user]);

  const addToCart = (product: any) => {
    if (!product?.id) return;
    if (!user) {
      openModal('login', 'USER');
      return;
    }
    
    setCart(prev => {
      const existing = prev.find(item => item.productId === product.id);
      if (existing) {
        return prev.map(item => 
          item.productId === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, {
        id: Math.random().toString(36).substr(2, 9),
        productId: product.id,
        title: product.title || 'Studio Piece',
        price: parseFloat(product.price as any) || 0,
        quantity: 1,
        image: product.images?.[0] || product.imageUrl
      }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.productId !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    setCart(prev => prev.map(item => 
      item.productId === productId ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = async (product: any) => {
    if (!product?.id) return;
    if (!user) {
      openModal('login', 'USER');
      return;
    }
    
    const exists = wishlist.some(item => item.productId === product.id);
    if (exists) {
      const res = await apiRemoveFromWishlist(user.id, product.id);
      if (res.success) {
        setWishlist(prev => prev.filter(item => item.productId !== product.id));
      } else {
        console.error(res.error);
        alert(res.error || 'Failed to remove from wishlist');
      }
    } else {
      const res = await apiAddToWishlist(user.id, product.id);
      if (res.success) {
        setWishlist(prev => [...prev, { productId: product.id, product }]);
      } else {
        console.error(res.error);
        alert(res.error || 'Failed to add to wishlist');
      }
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(item => item.productId === productId);
  };

  const checkout = async () => {
    if (!user) {
      openModal('login', 'USER');
      return { success: false, error: 'Please login to checkout' };
    }
    if (cart.length === 0) return { success: false, error: 'Cart is empty' };

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const res = await createMultiItemOrder({
      customerId: user.id,
      total,
      items: cart.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price
      }))
    });

    if (res.success) {
      clearCart();
      setIsCartOpen(false);
      return { success: true };
    }
    return { success: false, error: res.error || 'Checkout failed' };
  };

  return (
    <EcommerceContext.Provider value={{
      cart, wishlist, addToCart, removeFromCart, updateCartQuantity, clearCart,
      toggleWishlist, isInWishlist, isCartOpen, setIsCartOpen, isWishlistOpen, setIsWishlistOpen,
      checkout
    }}>
      {children}
    </EcommerceContext.Provider>
  );
}

export function useEcommerce() {
  const context = useContext(EcommerceContext);
  if (context === undefined) {
    throw new Error('useEcommerce must be used within an EcommerceProvider');
  }
  return context;
}
