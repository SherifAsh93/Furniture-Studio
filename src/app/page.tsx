'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useEcommerce } from '@/context/EcommerceContext';
import { useSearchParams } from 'next/navigation';
import { getMarketplaceData, getVendors, createCustomRequest } from '@/app/actions/data';

export default function Home() {
  const { user, openModal } = useAuth();
  const { addToCart, toggleWishlist, isInWishlist } = useEcommerce();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [vendors, setVendors] = useState<any[]>([]);
  
  // Marketplace Filter State
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const marketplaceCategories = ['ALL', 'Dressing room', 'Master bedroom', 'Kids room', 'Sofas tables', 'Sofas', 'Dining', 'Lighting', 'Decor', 'Kitchens'];

  React.useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat.replace('+', ' '));
  }, [searchParams]);

  React.useEffect(() => {
    async function loadData() {
      try {
        const pRes = await getMarketplaceData();
        if (pRes?.products) setProducts(pRes.products);
        const vRes = await getVendors();
        if (vRes?.length) setVendors(vRes);
      } catch (err) {
        console.error('Failed to load data:', err);
      }
    }
    loadData();
  }, []);

  const handleAddToCart = (product: any) => {
    if (!user) {
      openModal('login', 'USER');
      return;
    }
    addToCart(product);
  };

  const handleToggleWishlist = (product: any) => {
    if (!user) {
      openModal('login', 'USER');
      return;
    }
    toggleWishlist(product);
  };

  // Custom Request Form State
  const [category, setCategory] = useState('Dressing room');
  const [vendorId, setVendorId] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [material, setMaterial] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [message, setMessage] = useState('');
  const [sampleProductId, setSampleProductId] = useState('');

  const filteredSamples = products.filter(p => p.category === category);

  const handleSampleChange = (id: string) => {
    setSampleProductId(id);
    const sample = filteredSamples.find(p => p.id === id);
    if (sample) {
       setLength(sample.length?.toString() || '');
       setWidth(sample.width?.toString() || '');
       setHeight(sample.height?.toString() || '');
    }
  };

  const handleCustomSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      openModal('login', 'USER');
      return;
    }

    if (!vendorId) {
      alert('Please select an exclusive artisan first.');
      return;
    }

    setLoading(true);
    try {
      const res = await createCustomRequest({
        customerId: user.id,
        vendorId,
        category,
        length,
        width,
        height,
        material,
        quantity,
        message,
      });

      if (res.error) throw new Error(res.error);
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Failed to submit request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="pt-20 pb-32 bg-[#faf9f6] min-h-screen">
      {/* PART 1: Ready Made Products in Grid */}
      <section className="px-4 mb-20" id="marketplace">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 px-2">
          <div className="flex flex-col gap-1">
            <span className="text-[#a1824a] font-label text-[9px] tracking-[0.4em] uppercase font-bold">The Catalog</span>
            <h1 className="font-headline text-4xl font-bold uppercase tracking-tight">Ready Made</h1>
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-4 md:pb-0 scrollbar-none">
            {marketplaceCategories.map(cat => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all border ${selectedCategory === cat ? 'bg-black text-white border-black shadow-lg shadow-black/10' : 'bg-white text-black/40 border-black/5 hover:border-black/20'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {products
            .filter(p => selectedCategory === 'ALL' || p.category === selectedCategory)
            .map((item) => (
            <div 
              key={item.id} 
              className="bg-white rounded-3xl overflow-hidden shadow-sm border border-black/5 flex flex-col group active:scale-95 transition-transform"
              onClick={() => setSelectedProduct(item)}
            >
              <div className="relative aspect-[1/1] overflow-hidden">
                <img 
                  id={`grid-img-${item.id}`}
                  src={item.images?.[0] || item.imageUrl || "https://images.unsplash.com/photo-1581539250439-c96689b516dd?q=80&w=1000&auto=format&fit=crop"} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  alt={item.title}
                />
                
                {item.images?.length > 1 && (
                  <div className="absolute bottom-2 left-2 right-2 flex gap-1.5 overflow-x-auto pb-1 scrollbar-none z-10">
                    {item.images.slice(0, 4).map((img: string, idx: number) => (
                      <div 
                        key={idx} 
                        onClick={(e) => {
                          e.stopPropagation();
                          const target = document.getElementById(`grid-img-${item.id}`) as HTMLImageElement;
                          if (target) target.src = img;
                        }}
                        className="w-7 h-7 md:w-10 md:h-10 rounded-lg overflow-hidden border border-white/80 shadow-md flex-shrink-0 cursor-pointer active:scale-90 transition-transform"
                      >
                        <img src={img} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}

                <button 
                  onClick={(e) => { e.stopPropagation(); handleToggleWishlist(item); }}
                  className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md shadow-xl transition-all z-20 ${isInWishlist(item.id) ? 'bg-[#735c00] text-white' : 'bg-white/80 text-black'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={isInWishlist(item.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.04-8.04 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                </button>
              </div>

              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-headline text-sm font-bold uppercase mb-1 truncate">{item.title}</h3>
                <span className="font-headline text-xs font-bold text-[#735c00] mb-3">EGP {new Intl.NumberFormat().format(item.price)}</span>
                
                <button 
                  onClick={(e) => { e.stopPropagation(); handleAddToCart(item); }}
                  className="mt-auto w-full bg-black text-white py-3 rounded-xl font-label text-[8px] tracking-[0.2em] font-bold uppercase transition-all hover:bg-[#735c00] active:scale-95"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
          {products.length === 0 && (
            <div className="col-span-full text-center py-20 opacity-30">
              <p className="font-body italic text-xs uppercase tracking-widest">Collecting discovering items...</p>
            </div>
          )}
        </div>
      </section>

      {/* PART 2: Custom Product Form */}
      <section className="px-4" id="custom-fabrication">
        <div className="bg-white p-8 md:p-16 rounded-[2.5rem] shadow-2xl border border-black/5 premium-shadow">
          <div className="flex flex-col gap-4 mb-10 text-center">
            <span className="text-[#a1824a] font-label text-[9px] tracking-[0.4em] uppercase font-bold">Bespoke Originals</span>
            <h2 className="font-headline text-3xl font-bold uppercase leading-none">Custom Creation</h2>
          </div>

          <form onSubmit={handleCustomSubmit} className="space-y-8">
            {success && (
              <div className="p-4 bg-[#735c00] text-white text-[10px] font-bold uppercase tracking-widest text-center animate-pulse rounded-2xl">
                Request Sent
              </div>
            )}
            
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-label text-[9px] uppercase text-black/40 font-bold tracking-widest">Artisan Hub</label>
                <select 
                  value={vendorId}
                  onChange={(e) => setVendorId(e.target.value)}
                  className="bg-[#faf9f6] border-b border-black/10 py-3 font-body text-base focus:outline-none focus:border-[#a1824a] transition-colors"
                >
                  <option value="">Select Atelier</option>
                  {vendors.map(v => (
                    <option key={v.id} value={v.id}>{v.companyName || v.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-4">
                <label className="font-label text-[9px] uppercase text-black/40 font-bold tracking-widest">Category</label>
                <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-none">
                  {['Dressing room', 'Master bedroom', 'Kids room', 'Sofas tables', 'Sofas', 'Kitchens'].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`px-4 md:px-8 py-2 md:py-3 rounded-full font-label text-[8px] md:text-[10px] uppercase tracking-widest font-bold whitespace-nowrap transition-all border-2 ${category === cat ? 'bg-black text-white border-black shadow-lg scale-105' : 'bg-[#faf9f6] text-black border-black/5 hover:border-black/20'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {filteredSamples.length > 0 && (
                <div className="flex flex-col gap-4">
                  <label className="font-label text-[9px] uppercase text-black/40 font-bold tracking-widest">Reference Sample (Visual Selection)</label>
                  <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-none snap-x h-[120px] md:h-[180px]">
                    {/* "None" Option Card */}
                    <div 
                      onClick={() => handleSampleChange('')}
                      className={`flex-shrink-0 w-24 md:w-40 h-full rounded-2xl border-2 flex flex-col items-center justify-center cursor-pointer transition-all snap-start ${sampleProductId === '' ? 'border-[#735c00] bg-[#bcaf6a]/5' : 'border-black/5 bg-white'}`}
                    >
                      <div className="w-10 h-10 md:w-16 md:h-16 rounded-full border-2 border-dashed border-black/10 flex items-center justify-center mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-8 md:h-8"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                      </div>
                      <span className="font-label text-[8px] md:text-[10px] uppercase font-bold text-center">Scratch</span>
                    </div>

                    {filteredSamples.map(p => (
                      <div 
                        key={p.id}
                        onClick={() => handleSampleChange(p.id)}
                        className={`flex-shrink-0 w-24 md:w-40 h-full rounded-2xl border-2 overflow-hidden flex flex-col cursor-pointer transition-all snap-start shadow-sm ${sampleProductId === p.id ? 'border-[#735c00] bg-[#bcaf6a]/5 scale-105' : 'border-black/5 bg-white opacity-60 hover:opacity-100'}`}
                      >
                        <div className="h-14 md:h-24 w-full bg-surface-variant overflow-hidden">
                          <img src={p.images?.[0] || p.imageUrl} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-2 md:p-4 flex-1 flex items-center justify-center">
                          <span className="font-label text-[8px] md:text-[10px] uppercase font-bold text-center leading-tight line-clamp-2">{p.title}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-4 gap-4">
                <div className="flex flex-col gap-1 text-center">
                  <label className="font-label text-[8px] uppercase text-black/40 font-bold">L</label>
                  <input type="number" placeholder="0" value={length} onChange={(e) => setLength(e.target.value)} className="bg-[#faf9f6] border-b border-black/10 py-2 text-center text-base" />
                </div>
                <div className="flex flex-col gap-1 text-center">
                  <label className="font-label text-[8px] uppercase text-black/40 font-bold">W</label>
                  <input type="number" placeholder="0" value={width} onChange={(e) => setWidth(e.target.value)} className="bg-[#faf9f6] border-b border-black/10 py-2 text-center text-base" />
                </div>
                <div className="flex flex-col gap-1 text-center">
                  <label className="font-label text-[8px] uppercase text-black/40 font-bold">H</label>
                  <input type="number" placeholder="0" value={height} onChange={(e) => setHeight(e.target.value)} className="bg-[#faf9f6] border-b border-black/10 py-2 text-center text-base" />
                </div>
                <div className="flex flex-col gap-1 text-center">
                  <label className="font-label text-[8px] uppercase text-black/40 font-bold">QTY</label>
                  <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="bg-[#bcaf6a]/10 border-b border-black/10 py-2 text-center text-base font-bold" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-label text-[9px] uppercase text-black/40 font-bold tracking-widest">Spatial Specificities</label>
                <textarea 
                  placeholder="Describe your vision..." 
                  className="bg-[#faf9f6] border-b border-black/10 py-3 font-body text-base min-h-[100px]"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>
            </div>

            <button 
              disabled={loading}
              className="w-full bg-black text-white py-6 rounded-2xl font-label text-xs tracking-widest uppercase font-bold hover:bg-[#735c00] active:scale-95 transition-all shadow-2xl shadow-black/20 disabled:opacity-50"
            >
              {loading ? 'Transmitting...' : 'Submit Custom Request'}
            </button>
          </form>
        </div>
      </section>

      {/* PART 3: Product Popup / Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/95 backdrop-blur-xl" onClick={() => setSelectedProduct(null)}>
          <div className="relative w-full max-w-lg bg-white rounded-t-[3rem] sm:rounded-[3rem] shadow-2xl overflow-hidden animate-slide-up" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button 
              className="absolute top-6 right-6 z-[110] p-4 bg-white/90 backdrop-blur rounded-full shadow-xl active:scale-90"
              onClick={() => setSelectedProduct(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            <div className="max-h-[90vh] overflow-y-auto scrollbar-none">
              {/* Product Gallery (Large) */}
              <div className="relative aspect-square bg-[#fcf9f4]">
                <img 
                  id="expanded-image"
                  src={selectedProduct.images?.[0] || selectedProduct.imageUrl || "https://images.unsplash.com/photo-1581539250439-c96689b516dd?q=80&w=1000&auto=format&fit=crop"} 
                  className="w-full h-full object-cover transition-all duration-500"
                />
                
                {selectedProduct.images?.length > 1 && (
                  <div className="absolute bottom-6 left-6 right-6 flex gap-3 overflow-x-auto pb-2 scrollbar-none z-[110]">
                    {selectedProduct.images.map((img: string, idx: number) => (
                      <div 
                        key={idx} 
                        className="w-16 h-16 rounded-xl overflow-hidden border-2 border-white/80 flex-shrink-0 cursor-pointer shadow-2xl active:scale-90 transition-all hover:border-[#735c00]"
                        onClick={() => {
                          const target = document.getElementById('expanded-image') as HTMLImageElement;
                          if (target) target.src = img;
                        }}
                      >
                        <img src={img} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="p-10 pb-16">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-[#a1824a] font-label text-[9px] tracking-[0.4em] uppercase font-bold block mb-2">{selectedProduct.category || 'Atelier Selection'}</span>
                    <h2 className="font-headline text-3xl font-bold uppercase">{selectedProduct.title}</h2>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-label text-[9px] uppercase text-black/40 font-bold mb-1">Investment</span>
                    <span className="font-headline text-2xl font-bold text-[#735c00]">EGP {new Intl.NumberFormat().format(selectedProduct.price)}</span>
                  </div>
                </div>

                <p className="font-body text-on-surface-variant leading-relaxed italic mb-10 text-lg">
                  "{selectedProduct.description}"
                </p>

                {/* Specs */}
                {(Number(selectedProduct.height) > 0 || Number(selectedProduct.width) > 0 || Number(selectedProduct.length) > 0) && (
                  <div className="grid grid-cols-3 gap-6 py-8 border-y border-black/5 mb-10">
                    {Number(selectedProduct.length) > 0 && <div><span className="block text-[10px] uppercase text-black/40 font-bold mb-2">Length</span><span className="text-lg font-bold">{selectedProduct.length}cm</span></div>}
                    {Number(selectedProduct.width) > 0 && <div><span className="block text-[10px] uppercase text-black/40 font-bold mb-2">Width</span><span className="text-lg font-bold">{selectedProduct.width}cm</span></div>}
                    {Number(selectedProduct.height) > 0 && <div><span className="block text-[10px] uppercase text-black/40 font-bold mb-2">Height</span><span className="text-lg font-bold">{selectedProduct.height}cm</span></div>}
                  </div>
                )}

                <div className="flex gap-4">
                  <button 
                    onClick={() => { handleAddToCart(selectedProduct); setSelectedProduct(null); }}
                    className="flex-1 bg-black text-white py-6 rounded-2xl font-label text-xs tracking-widest uppercase font-bold hover:bg-[#735c00] active:scale-95 transition-all shadow-2xl shadow-black/20"
                  >
                    ADD TO CART
                  </button>
                  <button 
                    onClick={() => handleToggleWishlist(selectedProduct)}
                    className={`p-6 rounded-2xl border border-black/5 transition-all shadow-lg ${isInWishlist(selectedProduct.id) ? 'bg-[#735c00] text-white' : 'bg-white hover:bg-black hover:text-white'}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={isInWishlist(selectedProduct.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.04-8.04 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
