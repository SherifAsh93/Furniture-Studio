'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useEcommerce } from '@/context/EcommerceContext';
import { getMarketplaceData, getJournalEntries, getVendors, createCustomRequest, getSiteSettings } from '@/app/actions/data';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { user, openModal } = useAuth();
  const { addToCart, toggleWishlist, isInWishlist } = useEcommerce();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

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
  const [products, setProducts] = useState<any[]>([]);
  const [journal, setJournal] = useState<any[]>([]);
  const [vendors, setVendors] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>({
    heroTitle: 'Living \nArt',
    heroSubtitle: 'THE CURATED GALLERY',
    heroDescription: 'Elevate your living narrative with pieces that define architectural intent.',
    heroImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop'
  });

  React.useEffect(() => {
    async function loadData() {
      try {
        const pRes = await getMarketplaceData();
        if (pRes?.products) setProducts(pRes.products);
        const jRes = await getJournalEntries();
        if (jRes?.length) setJournal(jRes);
        const vRes = await getVendors();
        if (vRes?.length) setVendors(vRes);
        const sRes = await getSiteSettings();
        if (sRes) setSettings(sRes);
      } catch (err) {
        console.error('Failed to load data:', err);
      }
    }
    loadData();
  }, []);

  React.useEffect(() => {
    // Redirection removed to allow site browsing
  }, [user, router]);
  
  // Custom Request Form State
  const [category, setCategory] = useState('Dressing room');
  const [vendorId, setVendorId] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [material, setMaterial] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [message, setMessage] = useState('');

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
    <main className="pt-0 lg:pt-0">
      {/* Hero Section: Living Art */}
      <section className="relative w-full h-[600px] md:h-[795px] flex items-center overflow-hidden bg-[#1c1b1b]">
        <div className="absolute inset-0 opacity-70">
          <img 
            alt="Hero Cinematic" 
            className="w-full h-full object-cover" 
            src={settings.heroImage || 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop'} 
          />
        </div>
        <div className="container-tight relative z-10 flex flex-col items-start text-balance">
          <span className="font-label text-xs uppercase tracking-[0.3em] text-white mb-4 animate-fade-up opacity-0" style={{ animationDelay: '0.2s' }}>{settings.heroSubtitle}</span>
          <h1 className="font-headline text-[3rem] md:text-[5rem] leading-[1.05] text-white font-bold tracking-tighter mb-8 whitespace-pre-line animate-fade-up opacity-0" style={{ animationDelay: '0.4s' }}>
            {settings.heroTitle}
          </h1>
          <p className="font-body text-base md:text-lg text-white/70 max-w-lg mb-12 leading-relaxed animate-fade-up opacity-0" style={{ animationDelay: '0.6s' }}>
            {settings.heroDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-fade-up opacity-0" style={{ animationDelay: '0.8s' }}>
            <button 
              onClick={() => document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-black px-10 py-5 font-label text-[10px] tracking-widest uppercase transition-all active:scale-95 hover:bg-[#a1824a] hover:text-white font-bold"
            >
              EXPLORE THE SERIES
            </button>
            <button 
              onClick={() => document.getElementById('directory')?.scrollIntoView({ behavior: 'smooth' })}
              className="border border-white/20 text-white px-10 py-5 font-label text-[10px] tracking-widest uppercase hover:bg-white/10 transition-all font-bold"
            >
              VIEW SPACES
            </button>
          </div>
        </div>
        <div className="absolute bottom-10 right-10 hidden md:block">
          <div className="flex flex-col gap-2 font-label text-[10px] text-white/40 tracking-widest text-center">
            <span>SCROLL TO CURATE</span>
            <div className="w-px h-20 bg-white/20 mx-auto"></div>
          </div>
        </div>
      </section>

      {/* Custom Product Request Section */}
      <section className="py-24 bg-[#f6f3ee]" id="custom-request">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <span className="text-[#a1824a] font-label text-[10px] tracking-widest uppercase block font-bold">Commissioned Original</span>
                <h2 className="font-headline text-5xl font-bold tracking-tight uppercase leading-none">Custom <br/>Fabrication</h2>
                <p className="font-body text-on-surface-variant leading-relaxed italic pr-12 text-lg">
                  Engage our master artisans for bespoke architectural elements tailored to your unique spatial narrative.
                </p>
                <div className="pt-8">
                   <Link href="/artisans" className="font-label text-[10px] tracking-widest uppercase border-b-2 border-black pb-2 font-bold hover:text-[#a1824a] hover:border-[#a1824a] transition-all">CONSULT AN AGENT</Link>
                </div>
              </div>
              <div className="bg-white p-6 md:p-16 shadow-2xl rounded-3xl border border-black/5 premium-shadow">
                <form onSubmit={handleCustomSubmit} className="space-y-8">
                  {success && (
                    <div className="p-4 bg-[#735c00] text-white text-[10px] font-bold uppercase tracking-widest text-center animate-pulse rounded-lg">
                      Request Transmitted to Artisan Registry
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-2">
                      <label className="font-label text-[10px] uppercase text-black/40 font-bold tracking-widest">Artisan Hub</label>
                      <select 
                        value={vendorId}
                        onChange={(e) => setVendorId(e.target.value)}
                        className="bg-[#fcf9f4] border-b border-black/10 py-3 font-body text-sm focus:outline-none focus:border-[#a1824a] transition-colors"
                      >
                        <option value="">Select Atelier</option>
                        {vendors.map(v => (
                          <option key={v.id} value={v.id}>{v.companyName || v.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col gap-2">
                       <label className="font-label text-[10px] uppercase text-black/40 font-bold tracking-widest">Category</label>
                       <select 
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="bg-[#fcf9f4] border-b border-black/10 py-3 font-body text-sm focus:outline-none focus:border-[#a1824a] transition-colors"
                      >
                        <option>Dressing room</option>
                        <option>Master bedroom</option>
                        <option>Kids room</option>
                        <option>Sofas tables</option>
                        <option>Sofas</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                     <div className="flex flex-col gap-2">
                        <label className="font-label text-[8px] uppercase text-black/40 font-bold text-center">L (cm)</label>
                        <input type="number" placeholder="0" value={length} onChange={(e) => setLength(e.target.value)} className="bg-[#fcf9f4] border-b border-black/10 py-2 text-center text-sm" />
                     </div>
                     <div className="flex flex-col gap-2">
                        <label className="font-label text-[8px] uppercase text-black/40 font-bold text-center">W (cm)</label>
                        <input type="number" placeholder="0" value={width} onChange={(e) => setWidth(e.target.value)} className="bg-[#fcf9f4] border-b border-black/10 py-2 text-center text-sm" />
                     </div>
                     <div className="flex flex-col gap-2">
                        <label className="font-label text-[8px] uppercase text-black/40 font-bold text-center">H (cm)</label>
                        <input type="number" placeholder="0" value={height} onChange={(e) => setHeight(e.target.value)} className="bg-[#fcf9f4] border-b border-black/10 py-2 text-center text-sm" />
                     </div>
                     <div className="flex flex-col gap-2">
                        <label className="font-label text-[8px] uppercase text-black/40 font-bold text-center">QTY</label>
                        <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="bg-[#bcaf6a]/10 border-b border-black/10 py-2 text-center text-sm font-bold" />
                     </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-label text-[10px] uppercase text-black/40 font-bold">Additional Intelligence</label>
                    <textarea 
                      placeholder="Describe your spatial specificities..." 
                      className="bg-[#fcf9f4] border-b border-black/10 py-3 font-body text-sm min-h-[100px]"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                  </div>
                  <button 
                    disabled={loading}
                    className="w-full bg-black text-white py-6 font-label text-xs tracking-widest uppercase hover:bg-[#735c00] transition-all disabled:opacity-50"
                  >
                    {loading ? 'Transmitting...' : 'Submit Portfolio Proposal'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Directory Section: Archetypes */}
      <section className="py-24 bg-white" id="directory">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-16">
            <h2 className="font-headline text-4xl font-bold tracking-tight uppercase">The <br/>Directory</h2>
            <Link href="/collections" className="font-label text-[10px] tracking-widest uppercase border-b border-black transition-all hover:text-[#a1824a] hover:border-[#a1824a] font-bold">ARCHIVE FULL COLLECTION</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-0">
            {[
              { title: "Dressing room", img: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?q=80&w=1000&auto=format&fit=crop" },
              { title: "Master bedroom", img: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=1000&auto=format&fit=crop" },
              { title: "Kids room", img: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1000&auto=format&fit=crop" },
              { title: "Sofas tables", img: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=1000&auto=format&fit=crop" },
              { title: "Sofas", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1000&auto=format&fit=crop" }
            ].map((cat, i) => (
              <div key={i} className="aspect-square relative group overflow-hidden bg-white">
                <img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" alt={cat.title} src={cat.img} />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-500"></div>
                <div className="absolute bottom-6 left-6">
                  <h3 className="font-label text-[10px] tracking-[0.2em] text-white uppercase bg-black/40 px-3 py-1 backdrop-blur-sm font-bold">{cat.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Highlight (Latest Arrival) */}
      <section className="py-32 bg-[#f6f3ee] overflow-hidden">
        <div className="container mx-auto px-6">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
              <div className="md:col-span-7 relative">
                <div className="relative z-10 w-full aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl">
                  <img 
                    className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105" 
                    alt={products[0].title} 
                    src={products[0].images?.[0] || products[0].imageUrl || "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=2000&auto=format&fit=crop"} 
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 md:-bottom-12 md:-left-12 w-2/3 aspect-square bg-black/5 -z-0"></div>
              </div>
              <div className="md:col-span-5">
                <span className="text-[#735c00] font-label text-[10px] tracking-widest uppercase mb-4 block font-bold">LATEST DISCOVERY</span>
                <h2 className="font-headline text-4xl md:text-5xl font-bold mb-8 leading-tight uppercase">{products[0].title}</h2>
                <p className="font-body text-on-surface-variant leading-loose mb-10 italic">
                  "{products[0].description}"
                </p>
                <div className="p-8 bg-white border border-black/5 mb-12">
                   <div className="flex justify-between items-center mb-4">
                      <span className="font-label text-[10px] tracking-widest uppercase font-bold text-on-surface-variant/40">Specifications</span>
                      <span className="font-label text-[10px] tracking-widest uppercase font-bold text-black">Artisan Collection</span>
                   </div>
                   <div className="grid grid-cols-3 gap-8 py-6 border-y border-black/5">
                      <div className="flex flex-col">
                         <span className="font-label text-[8px] uppercase text-black/40 mb-1">Height</span>
                         <span className="font-headline text-lg">{products[0].height || '--'} <small className="text-[8px] md:text-[10px]">cm</small></span>
                      </div>
                      <div className="flex flex-col">
                         <span className="font-label text-[8px] uppercase text-black/40 mb-1">Width</span>
                         <span className="font-headline text-lg">{products[0].width || '--'} <small className="text-[8px] md:text-[10px]">cm</small></span>
                      </div>
                      <div className="flex flex-col">
                         <span className="font-label text-[8px] uppercase text-black/40 mb-1">Length</span>
                         <span className="font-headline text-lg">{products[0].length || '--'} <small className="text-[8px] md:text-[10px]">cm</small></span>
                      </div>
                   </div>
                   <div className="mt-8 flex justify-between items-end">
                      <div className="flex flex-col">
                         <span className="font-label text-[10px] uppercase text-black/40 mb-1">Investment Value</span>
                         <span className="font-headline text-2xl font-bold text-[#735c00]">EGP <br className="md:hidden"/> {new Intl.NumberFormat().format(products[0].price)}</span>
                      </div>
                      <div className="flex gap-4">
                         <button 
                            onClick={() => handleToggleWishlist(products[0])}
                            className={`p-4 border border-black/5 rounded-full transition-all ${isInWishlist(products[0].id) ? 'bg-secondary text-white' : 'bg-[#fcf9f4] hover:bg-black hover:text-white'}`}
                         >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={isInWishlist(products[0].id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.04-8.04 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                         </button>
                      </div>
                   </div>
                </div>
                <button 
                  onClick={() => handleAddToCart(products[0])}
                  className="w-full bg-black text-white py-6 font-label text-xs tracking-widest uppercase transition-all hover:bg-[#735c00] active:scale-[0.98] font-bold"
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-20 opacity-30">
               <span className="font-label text-xs tracking-widest uppercase mb-4 block font-bold">Inaugurating Catalog</span>
               <h2 className="font-headline text-3xl font-light italic">Curating original discoveries...</h2>
            </div>
          )}
        </div>
      </section>

      {/* Featured Collections (Inventory Grid) */}
      <section className="py-32 bg-white" id="showcase">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-16">
            <div>
              <span className="text-[#a1824a] font-label text-[10px] tracking-widest uppercase mb-4 block font-bold">Global Archive</span>
              <h2 className="font-headline text-4xl font-bold tracking-tight uppercase">Product <br/>Showcase</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-12">
            {products.map((item: any, idx: number) => (
              <div key={item.id} className="group cursor-pointer bg-white p-5 rounded-3xl shadow-lg border border-black/5 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col" onClick={() => setSelectedProduct(item)}>
                <div className="aspect-[4/5] overflow-hidden mb-6 bg-[#fcf9f4] rounded-2xl relative w-full">
                  <img 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    alt={item.title} 
                    src={item.images?.[0] || item.imageUrl || "https://images.unsplash.com/photo-1581539250439-c96689b516dd?q=80&w=1000&auto=format&fit=crop"} 
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
                   <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">

                    <button 
                      onClick={(e) => { e.stopPropagation(); handleToggleWishlist(item); }} 
                      className={`p-4 rounded-full shadow-xl transition-all ${isInWishlist(item.id) ? 'bg-secondary text-white' : 'bg-white text-secondary hover:bg-secondary hover:text-white'}`}
                    >
                       <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill={isInWishlist(item.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.04-8.04 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                    </button>
                  </div>
                </div>
                <div className="space-y-3 px-2 pb-2 mt-auto">
                  <div className="flex justify-between items-start">
                    <h3 className="font-headline text-lg font-bold group-hover:text-[#a1824a] transition-colors">{item.title}</h3>
                    <span className="font-label text-sm font-bold text-[#735c00]">EGP {new Intl.NumberFormat().format(item.price)}</span>
                  </div>
                  <div className="pt-2">
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleAddToCart(item); }} 
                      className="w-full bg-black text-white py-3 rounded-xl font-label text-[10px] tracking-widest uppercase flex items-center justify-center hover:bg-[#735c00] transition-colors font-bold shadow-md shadow-black/10 active:scale-95"
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {products.length === 0 && (
              <div className="col-span-full py-20 bg-[#fcf9f4] rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-black/5">
                <p className="font-body text-sm text-on-surface-variant/40 italic">Waiting for artisan discoveries...</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Subscription / Vendor Section */}
      <section className="py-32 bg-[#1c1b1b] text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-[#735c00] font-label text-xs tracking-[0.4em] uppercase mb-8 block font-bold">THE FURNITURE STUDIO PARTNERSHIP</span>
            <h2 className="font-headline text-4xl md:text-6xl font-bold mb-10 leading-tight uppercase">Showcase Your Craft to the World's Most <span className="italic font-normal">Discerning Eyes.</span></h2>
            <p className="font-body text-lg text-white/60 mb-16 max-w-2xl mx-auto leading-relaxed">
              Join an elite circle of artisans and manufacturers. Gain access to our global distribution network and premium customer base.
            </p>
            <div className="bg-[#f6f3ee] p-8 md:p-20 text-black relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 1 0-7.65 7.65L12 21l8.42-8.77a5.4 5.4 0 0 0 0-7.65z"></path></svg>
              </div>
              <div className="relative z-10 text-left">
                <h3 className="font-headline text-3xl mb-4 uppercase font-bold">Join the Studio</h3>
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="font-headline text-5xl font-bold">10,000 EGP</span>
                  <span className="font-label text-sm text-[#444748] uppercase tracking-widest font-bold">/ MONTHLY SUBSCRIPTION</span>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 font-body text-sm text-[#444748]">
                  <li className="flex items-center gap-3 font-bold uppercase tracking-tight text-[11px]">
                    <svg className="text-[#735c00]" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Global Logistics & Fulfillment Integration
                  </li>
                  <li className="flex items-center gap-3 font-bold uppercase tracking-tight text-[11px]">
                    <svg className="text-[#735c00]" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Exclusive "Editorial Spotlight" Features
                  </li>
                  <li className="flex items-center gap-3 font-bold uppercase tracking-tight text-[11px]">
                    <svg className="text-[#735c00]" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Direct High-Net-Worth Lead Generation
                  </li>
                  <li className="flex items-center gap-3 font-bold uppercase tracking-tight text-[11px]">
                    <svg className="text-[#735c00]" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Strategic Retail Gallery Placement
                  </li>
                </ul>
                <button 
                  onClick={() => openModal('register', 'VENDOR')}
                  className="bg-black text-white px-10 py-5 font-label text-xs tracking-widest uppercase hover:bg-secondary transition-all font-bold"
                >
                  APPLY FOR ARTISAN CREDENTIALS
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Product Details Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/95 backdrop-blur-md" onClick={() => setSelectedProduct(null)}>
          <div className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-y-auto sm:overflow-hidden border border-white/10" onClick={(e) => e.stopPropagation()}>
            <button 
              className="absolute top-4 right-4 z-10 p-4 bg-white/90 backdrop-blur shadow-xl hover:bg-black hover:text-white transition-all duration-300 rounded-full active:scale-95" 
              onClick={() => setSelectedProduct(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            <div className="w-full md:w-1/2 bg-[#fcf9f4] p-6 md:p-12 lg:p-16 flex items-center justify-center border-b md:border-b-0 md:border-r border-black/5">
              <img 
                src={selectedProduct.images?.[0] || selectedProduct.imageUrl || "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=2000&auto=format&fit=crop"} 
                className="w-full h-auto max-h-[60vh] object-contain rounded-2xl shadow-xl border border-black/5"
              />
            </div>
            <div className="w-full md:w-1/2 p-6 md:p-12 lg:p-16 flex flex-col overflow-y-auto custom-scrollbar">
              <span className="text-[#a1824a] font-label text-[10px] tracking-widest uppercase mb-4 block font-bold">DISCOVERY VIEWER</span>
              <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl font-bold uppercase mb-6 leading-tight">{selectedProduct.title}</h2>
              <p className="font-body text-on-surface-variant leading-relaxed text-sm lg:text-base italic mb-8">
                "{selectedProduct.description}"
              </p>
              <div className="grid grid-cols-2 gap-6 py-6 border-y border-black/5 mb-8">
                <div className="flex flex-col">
                  <span className="font-label text-[8px] uppercase text-black/40 mb-1">Dimensions</span>
                  <span className="font-headline text-lg">{selectedProduct.length || '--'} x {selectedProduct.width || '--'} x {selectedProduct.height || '--'} <small className="text-[10px]">cm</small></span>
                </div>
                <div className="flex flex-col">
                    <span className="font-label text-[8px] uppercase text-black/40 mb-1">Category</span>
                    <span className="font-headline text-lg uppercase">{selectedProduct.category || '--'}</span>
                </div>
              </div>
              
              {selectedProduct.images && selectedProduct.images.length > 1 && (
                <div className="mb-8">
                  <span className="font-label text-[10px] uppercase tracking-widest text-[#a1824a] mb-4 block font-bold">Alternate Views</span>
                  <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
                    {selectedProduct.images.map((imgCard: string, index: number) => (
                      <div key={index} className="w-24 h-24 flex-shrink-0 cursor-pointer border border-black/5 hover:border-black transition-colors" onClick={(e) => {
                        const target = e.currentTarget.parentElement?.parentElement?.parentElement?.previousElementSibling?.querySelector('img');
                        if (target) target.src = imgCard;
                      }}>
                        <img src={imgCard} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mt-auto pt-8">
                <div className="flex justify-between items-end mb-6">
                  <div className="flex flex-col">
                    <span className="font-label text-[10px] uppercase text-black/40 mb-1">Investment Value</span>
                    <span className="font-headline text-3xl font-bold text-[#735c00]">EGP {new Intl.NumberFormat().format(selectedProduct.price)}</span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button 
                    onClick={() => { handleAddToCart(selectedProduct); setSelectedProduct(null); }}
                    className="flex-1 bg-black text-white py-6 rounded-xl font-label text-xs tracking-widest uppercase hover:bg-secondary transition-all font-bold active:scale-[0.98] shadow-lg hover:shadow-black/20"
                  >
                    ADD TO CART
                  </button>
                  <button 
                    onClick={() => handleToggleWishlist(selectedProduct)}
                    className={`p-6 border border-black/5 transition-all ${isInWishlist(selectedProduct.id) ? 'bg-[#735c00] text-white' : 'bg-white hover:bg-black hover:text-white'}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={isInWishlist(selectedProduct.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.04-8.04 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
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
