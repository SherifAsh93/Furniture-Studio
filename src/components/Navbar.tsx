'use client';
import Link from 'next/link';
import { useState } from 'react';
import AuthModal from './AuthModal';

export default function Navbar() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-black/5 flex justify-between items-center px-6 py-4 transition-colors duration-300">
        <div className="flex items-center gap-6">
          <button className="text-on-background cursor-pointer hover:text-secondary transition-colors" aria-label="Menu">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="18" x2="20" y2="18"></line></svg>
          </button>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/collections" className="font-label text-[10px] font-bold tracking-[0.2em] hover:text-secondary transition-colors uppercase">Collections</Link>
            <Link href="/artisans" className="font-label text-[10px] font-bold tracking-[0.2em] hover:text-secondary transition-colors uppercase">Artisans</Link>
            <Link href="/journal" className="font-label text-[10px] font-bold tracking-[0.2em] hover:text-secondary transition-colors uppercase">Journal</Link>
          </div>
        </div>
        <Link href="/" className="flex items-center gap-3 absolute left-1/2 -translate-x-1/2 group">
          <div className="bg-white overflow-hidden w-10 h-10 rounded-lg flex items-center justify-center border border-outline-variant/30 transition-transform group-hover:scale-105">
            <img alt="Furniture Studio Logo" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYzwpRTmQxUU1zbZR1afOETDBbBv0B_OTy3uSZi1M-zr3D4OJhAdZ0rdtuJJVMreSJlhnXVbub7ICKPYtOIzIlBG9k9G0KaWgp5bzWDrziAUAXbS75sIc3Sa16PXvXkieA209VMEJWQLh75Mx7kidMOOdwBqHjOv2WfUJmMX9ythFYjuEt9oemiO96XkY7XFbPGpzOadEvAVB0kaJ83HKjGXKjarlpsAFZuyYWNGqW9BTJorDxFA9LYqQLpix6hr6C5-ehOtP7Soa7" />
          </div>
          <div className="hidden sm:flex flex-col leading-none">
            <span className="font-headline text-xl tracking-tight font-extrabold text-black uppercase leading-[0.9]">FURNITURE</span>
            <span className="font-headline text-xl tracking-tighter font-light text-black/60 uppercase leading-[0.9]">STUDIO</span>
          </div>
        </Link>
        <div className="flex items-center gap-6">
          <button className="text-on-background cursor-pointer hover:text-secondary transition-colors" aria-label="Search">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </button>
          <button className="text-on-background cursor-pointer hover:text-secondary transition-colors" aria-label="Account" onClick={() => setIsAuthOpen(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          </button>
          <button className="text-on-background cursor-pointer hover:text-secondary transition-colors" aria-label="Cart">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
          </button>
        </div>
      </header>
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      
      {/* Mobile Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-safe bg-background border-t border-black/5 z-50 h-16 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <Link href="/" className="flex flex-col items-center justify-center text-secondary border-t-2 border-secondary pt-2 active:scale-95 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          <span className="font-label text-[10px] uppercase tracking-[0.1em] font-bold">HOME</span>
        </Link>
        <Link href="/collections" className="flex flex-col items-center justify-center text-black/40 pt-2 active:scale-95 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
          <span className="font-label text-[10px] uppercase tracking-[0.1em] font-bold">COLLECTIONS</span>
        </Link>
        <Link href="/#custom-request" className="flex flex-col items-center justify-center text-black/40 pt-2 active:scale-95 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
          <span className="font-label text-[10px] uppercase tracking-[0.1em] font-bold">CUSTOM</span>
        </Link>
        <span className="flex flex-col items-center justify-center text-black/40 pt-2 active:scale-95 transition-transform cursor-pointer" onClick={() => setIsAuthOpen(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          <span className="font-label text-[10px] uppercase tracking-[0.1em] font-bold">PROFILE</span>
        </span>
      </nav>
    </>
  );
}
