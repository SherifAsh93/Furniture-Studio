'use client';

import React, { useState } from 'react';
import { useEcommerce } from '@/context/EcommerceContext';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function EcommerceSidebar() {
  const { 
    cart, 
    wishlist, 
    removeFromCart, 
    updateCartQuantity, 
    toggleWishlist, 
    isCartOpen, 
    setIsCartOpen,
    isWishlistOpen,
    setIsWishlistOpen,
    checkout,
    addToCart
  } = useEcommerce();
  const { user, openModal } = useAuth();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'cart' | 'wishlist'>('cart');

  const isOpen = isCartOpen || isWishlistOpen;
  
  // Sync internal tab with external open state
  React.useEffect(() => {
    if (isCartOpen) setActiveTab('cart');
    if (isWishlistOpen) setActiveTab('wishlist');
  }, [isCartOpen, isWishlistOpen]);

  const closeAll = () => {
    setIsCartOpen(false);
    setIsWishlistOpen(false);
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = async () => {
    setLoading(true);
    const res = await checkout();
    if (res.success) {
      alert('Your Studio procurement has been initiated. Curators will reach out shortly.');
    } else {
      alert(res.error || 'Checkout failed');
    }
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={closeAll}
      ></div>

      {/* Sidebar Content */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="p-8 border-b border-black/5 flex justify-between items-center bg-[#fcf9f4]">
          <div className="flex gap-8">
            <button 
              onClick={() => setActiveTab('cart')}
              className={`font-label text-[10px] tracking-[0.3em] uppercase font-bold transition-colors ${activeTab === 'cart' ? 'text-black' : 'text-on-surface-variant/40 hover:text-black'}`}
            >
              The Cart ({cart.length})
            </button>
            <button 
              onClick={() => setActiveTab('wishlist')}
              className={`font-label text-[10px] tracking-[0.3em] uppercase font-bold transition-colors ${activeTab === 'wishlist' ? 'text-black' : 'text-on-surface-variant/40 hover:text-black'}`}
            >
              Wishlist ({wishlist.length})
            </button>
          </div>
          <button onClick={closeAll} className="text-black/40 hover:text-black transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        {/* List Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {activeTab === 'cart' ? (
            <div className="space-y-8">
              {cart.length === 0 ? (
                <div className="py-20 text-center space-y-4 opacity-30">
                  <svg className="mx-auto" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                  <p className="font-body text-sm italic uppercase tracking-widest font-bold">Your cart is unoccupied</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-6 group">
                    <div className="w-24 h-24 bg-[#fcf9f4] overflow-hidden rounded-lg border border-black/5">
                      <img src={item.image || "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=200&auto=format&fit=crop"} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-headline font-bold text-sm uppercase">{item.title}</h4>
                        <button onClick={() => removeFromCart(item.productId)} className="text-secondary hover:text-red-600 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                        </button>
                      </div>
                      <p className="font-label text-xs font-bold text-[#735c00]">${new Intl.NumberFormat().format(item.price)}</p>
                      <div className="pt-2 flex items-center gap-4">
                        <div className="flex items-center border border-black/5 rounded bg-[#fcf9f4]">
                          <button 
                            onClick={() => updateCartQuantity(item.productId, item.quantity - 1)}
                            className="px-2 py-1 hover:bg-black/5"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                          </button>
                          <span className="px-4 font-label text-[10px] font-bold">{item.quantity}</span>
                          <button 
                            onClick={() => updateCartQuantity(item.productId, item.quantity + 1)}
                            className="px-2 py-1 hover:bg-black/5"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            <div className="space-y-8">
              {wishlist.length === 0 ? (
                <div className="py-20 text-center space-y-4 opacity-30">
                  <svg className="mx-auto" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.04-8.04 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                  <p className="font-body text-sm italic uppercase tracking-widest font-bold">Your wishlist is empty</p>
                </div>
              ) : (
                wishlist.map(item => (
                  <div key={item.productId} className="flex gap-6 group items-center">
                    <div className="w-20 h-20 bg-[#fcf9f4] overflow-hidden rounded-lg border border-black/5">
                      <img src={item.product?.images?.[0] || item.product?.imageUrl || "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=200&auto=format&fit=crop"} alt={item.product?.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-headline font-bold text-sm uppercase">{item.product?.title}</h4>
                      <p className="font-label text-xs font-bold text-[#735c00]">${new Intl.NumberFormat().format(item.product?.price)}</p>
                    </div>
                    <div className="flex gap-2">
                       <button onClick={() => addToCart(item.product)} className="p-2 border border-black/5 hover:bg-black hover:text-white transition-all rounded">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                       </button>
                       <button onClick={() => toggleWishlist(item.product)} className="p-2 border border-black/5 hover:bg-black hover:text-white transition-all rounded text-secondary">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6l3 18h12l3-18H3z"></path><path d="M19 6V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v1"></path></svg>
                       </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Footer actions */}
        {activeTab === 'cart' && cart.length > 0 && (
          <div className="p-8 border-t border-black/5 bg-[#fcf9f4] space-y-6">
            <div className="flex justify-between items-end">
              <span className="font-label text-[10px] tracking-widest uppercase font-bold text-on-surface-variant/40">Procurement Total</span>
              <span className="font-headline text-3xl font-bold">${new Intl.NumberFormat().format(cartTotal)}</span>
            </div>
            <button 
              onClick={handleCheckout}
              disabled={loading}
              className="w-full bg-black text-white py-5 font-label text-xs tracking-widest uppercase hover:bg-[#735c00] transition-all disabled:opacity-50 font-bold active:scale-[0.98]"
            >
              {loading ? 'Processing...' : 'Complete Procurement'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
