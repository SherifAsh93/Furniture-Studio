'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function AuthModal() {
  const { isOpen, view, closeModal, setView, setUser, initialRole } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isVendor, setIsVendor] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (initialRole) {
      setIsVendor(initialRole === 'VENDOR');
    }
  }, [initialRole]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const endpoint = view === 'login' ? '/api/auth/login' : '/api/auth/register';
      const body = view === 'login'
        ? { email, password }
        : { email, password, name, role: isVendor ? 'VENDOR' : 'USER', companyName, phone, address };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      setUser(data);
      closeModal();

      if (data.role === 'VENDOR') {
        router.push('/vendor');
      } else if (data.role === 'ADMIN') {
        router.push('/admin');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-6 font-body antialiased transition-all duration-500">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-primary/20 backdrop-blur-xl transition-opacity animate-in fade-in duration-500"
        onClick={closeModal}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full h-full sm:h-auto sm:max-w-4xl bg-white shadow-[0px_32px_64px_rgba(0,0,0,0.12)] flex flex-col md:flex-row overflow-y-auto sm:overflow-hidden border border-black/5 animate-in zoom-in-95 fade-in duration-300 sm:min-h-[600px]">
        {/* Left Side: Editorial Image/Identity */}
        <div className="hidden md:block w-5/12 bg-primary-container relative">
          <img
            className="absolute inset-0 w-full h-full object-cover opacity-60"
            alt="High-end leather sofa in a concrete loft"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBH4NdqW3bCb7VslahwtLJwCGO02H4IpBI4oBGLpUaEFuIJIbEwjmUkBLSDFbiamkbEgUakA2D4AW4zzAeIVxvZEXs7RnsxndMJcV99mYgMUqk3gG4_W5CowMIVanjzit6XU-LuHJOh6kTgIOLK-RbyjmKkMs94pGWSV04fwZylvISGoX9XaUEI--TpZvFyenZVETh2MuDZLXjBKqDvISuwv6FTG2jpownitF6QoQDlYQ3T3qtr6GQ1JvNewCedykrPNPSbzK5BO7f6"
          />
          <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-primary to-transparent">
            <span className="font-label text-[10px] tracking-[0.2em] text-on-primary/60 uppercase mb-2">Curated Spaces</span>
            <h2 className="font-headline text-2xl text-on-primary leading-tight font-bold">Elevate your living narrative.</h2>
          </div>
        </div>

        {/* Right Side: The Form */}
        <div className="flex-1 p-8 md:p-16 flex flex-col bg-white">
          {/* Branding Header */}
          <div className="flex flex-col mb-6">
            <Link href="/" onClick={closeModal} className="flex items-center gap-3 group cursor-pointer mb-2">
              <div className="bg-white overflow-hidden w-10 h-10 rounded-lg flex items-center justify-center border border-outline-variant/30">
                <img alt="Furniture Studio Logo" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYzwpRTmQxUU1zbZR1afOETDBbBv0B_OTy3uSZi1M-zr3D4OJhAdZ0rdtuJJVMreSJlhnXVbub7ICKPYtOIzIlBG9k9G0KaWgp5bzWDrziAUAXbS75sIc3Sa16PXvXkieA209VMEJWQLh75Mx7kidMOOdwBqHjOv2WfUJmMX9ythFYjuEt9oemiO96XkY7XFbPGpzOadEvAVB0kaJ83HKjGXKjarlpsAFZuyYWNGqW9BTJorDxFA9LYqQLpix6hr6C5-ehOtP7Soa7" />
              </div>
              <div className="flex flex-col leading-none text-left">
                <span className="font-headline text-xl tracking-tight font-bold text-black uppercase">FURNITURE</span>
                <span className="font-headline text-xl tracking-tight font-light text-black/60 uppercase -mt-0.5">STUDIO</span>
              </div>
            </Link>
          </div>

          {/* Auth Toggle */}
          <div className="flex gap-8 mb-8 justify-center border-b border-outline-variant/10">
            <button
              className={`pb-3 font-label text-[11px] tracking-[0.1em] transition-all duration-300 font-bold ${view === 'login' ? 'text-secondary border-b-2 border-secondary' : 'text-on-surface/40 hover:text-on-surface border-b-2 border-transparent'
                }`}
              onClick={() => setView('login')}
            >
              LOGIN
            </button>
            <button
              className={`pb-3 font-label text-[11px] tracking-[0.1em] transition-all duration-300 font-bold ${view === 'register' ? 'text-secondary border-b-2 border-secondary' : 'text-on-surface/40 hover:text-on-surface border-b-2 border-transparent'
                }`}
              onClick={() => setView('register')}
            >
              CREATE ACCOUNT
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 p-4 font-label text-[10px] tracking-widest uppercase font-bold text-center">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {view === 'register' && (
                <>
                  <div className="col-span-full">
                    <label className="font-label text-[10px] uppercase text-black/40 tracking-widest mb-4 block font-bold">Registration Identity</label>
                    <div className="flex gap-4 p-1 bg-[#fcf9f4] rounded-xl border border-black/5">
                      <button 
                        type="button"
                        onClick={() => setIsVendor(false)}
                        className={`flex-1 py-4 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all ${!isVendor ? 'bg-black text-white shadow-lg' : 'text-black/60 hover:text-black'}`}
                      >
                        Client / Curator
                      </button>
                      <button 
                        type="button"
                        onClick={() => setIsVendor(true)}
                        className={`flex-1 py-4 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all ${isVendor ? 'bg-[#735c00] text-white shadow-lg' : 'text-black/60 hover:text-black'}`}
                      >
                        Business Artisan
                      </button>
                    </div>
                  </div>
                  
                  <div className="group">
                    <label className="font-label text-[10px] uppercase text-black/40 tracking-widest mb-1 block font-bold">Full Name</label>
                    <input
                      className="w-full bg-transparent border-0 border-b border-black/10 py-3 px-0 focus:ring-0 focus:border-black transition-colors text-black placeholder:text-black/20 font-body text-sm outline-none"
                      placeholder="WALTER BENJAMIN"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </>
              )}

              <div className="group">
                <label className="font-label text-[10px] uppercase text-black/40 tracking-widest mb-1 block font-bold">Email Address</label>
                <input
                  className="w-full bg-transparent border-0 border-b border-black/10 py-3 px-0 focus:ring-0 focus:border-black transition-colors text-black placeholder:text-black/20 font-body text-sm outline-none"
                  placeholder="archive@collective.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="group">
                <label className="font-label text-[10px] uppercase text-black/40 tracking-widest mb-1 block font-bold">Security Key</label>
                <input
                  className="w-full bg-transparent border-0 border-b border-black/10 py-3 px-0 focus:ring-0 focus:border-black transition-colors text-black placeholder:text-black/20 font-body text-sm outline-none"
                  placeholder="••••••••"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {view === 'register' && (
                <div className="group">
                  <label className="font-label text-[10px] uppercase text-black/40 tracking-widest mb-1 block font-bold">Contact Number *</label>
                  <input
                    className="w-full bg-transparent border-0 border-b border-black/10 py-3 px-0 focus:ring-0 focus:border-black transition-colors text-black placeholder:text-black/20 font-body text-sm outline-none"
                    placeholder="+1 (555) 000-0000"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
              )}
            </div>

            {view === 'register' && (
              <div className="space-y-6 animate-in slide-in-from-top-2 duration-300">
                {!isVendor ? (
                  <div className="group animate-in slide-in-from-top-2 duration-300">
                    <label className="font-label text-[10px] uppercase text-black/40 tracking-widest mb-1 block font-bold">Delivery Address *</label>
                    <input
                      className="w-full bg-transparent border-0 border-b border-black/10 py-3 px-0 focus:ring-0 focus:border-black transition-colors text-black placeholder:text-black/20 font-body text-sm outline-none"
                      placeholder="123 GALLERY WAY, SUITE 4"
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required={!isVendor}
                    />
                  </div>
                ) : (
                  <div className="group animate-in fade-in duration-500">
                    <label className="font-label text-[10px] uppercase text-black/40 tracking-widest mb-1 block font-bold">Company / Studio Name</label>
                    <input
                      className="w-full bg-transparent border-0 border-b border-black/10 py-3 px-0 focus:ring-0 focus:border-black transition-colors text-black placeholder:text-black/20 font-body text-sm outline-none"
                      placeholder="BENJAMIN & SONS GALLERY"
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      required={isVendor}
                    />
                  </div>
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-6 font-label text-[12px] font-bold tracking-[0.2em] uppercase hover:bg-secondary transition-all active:scale-[0.98] duration-200 mt-8 disabled:opacity-50"
            >
              {loading ? 'PROCESSING...' : (view === 'login' ? 'SIGN IN' : 'JOIN THE COLLECTIVE')}
            </button>
          </form>

          {/* Footer Options */}
          <div className="mt-10 flex flex-col items-center gap-4">
            <span className="font-label text-[9px] uppercase tracking-widest text-on-surface/30 font-bold">Or Continue With</span>
            <div className="flex gap-6">
              <button className="text-on-surface/60 hover:text-primary transition-colors">
                <span className="font-label text-[10px] tracking-widest border-b border-transparent hover:border-primary font-bold">GOOGLE</span>
              </button>
              <button className="text-on-surface/60 hover:text-primary transition-colors">
                <span className="font-label text-[10px] tracking-widest border-b border-transparent hover:border-primary font-bold">APPLE ID</span>
              </button>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <button
          className="absolute top-6 right-6 text-on-surface/40 hover:text-on-surface transition-colors p-2"
          onClick={closeModal}
        >
          <span className="material-symbols-outlined text-[20px]">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </span>
        </button>
      </div>
    </div>
  );
}
