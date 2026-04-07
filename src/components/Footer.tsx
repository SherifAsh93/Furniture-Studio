'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Footer() {
  const { user, openModal } = useAuth();
  const router = useRouter();

  const handleOrdersClick = () => {
    if (!user) {
      openModal('login', 'USER');
    } else {
      router.push('/orders');
    }
  };

  return (
    <footer className="bg-[#1c1c19] text-white pt-24 pb-12 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-white overflow-hidden w-8 h-8 rounded flex items-center justify-center">
                 <img alt="Furniture Studio Logo" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=100&auto=format&fit=crop" />
              </div>
              <span className="font-headline text-xl tracking-tight font-extrabold text-white uppercase">FURNITURE STUDIO</span>
            </div>
            <p className="font-body text-white/60 max-w-sm leading-relaxed mb-8">
              The world's premier digital marketplace for architectural furniture and artisan-led interior masterpieces.<br />
              <span className="text-white/80 font-semibold">Based in Damietta,</span> Shipping Globally.
            </p>
          </div>
          <div>
            <h4 className="font-label text-[10px] font-bold tracking-[0.2em] text-white uppercase mb-8">Collections</h4>
            <ul className="space-y-4 font-body text-white/40">
              <li><Link className="hover:text-white transition-colors" href="/collections">Dressing Room</Link></li>
              <li><Link className="hover:text-white transition-colors" href="/collections">Master Suite</Link></li>
              <li><Link className="hover:text-white transition-colors" href="/collections">Public Spaces</Link></li>
              <li><Link className="hover:text-white transition-colors" href="/collections">Architectural Detail</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-label text-[10px] font-bold tracking-[0.2em] text-white uppercase mb-8">Company</h4>
            <ul className="space-y-4 font-body text-white/40">
              <li><Link className="hover:text-white transition-colors" href="/artisans">The Collective Vision</Link></li>
              <li><Link className="hover:text-white transition-colors" href="/vendor">Vendor Inquiries</Link></li>
              <li>
                <button onClick={handleOrdersClick} className="hover:text-white transition-colors text-left">
                  My Orders
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-white/5">
          <p className="font-label text-[9px] font-bold tracking-[0.2em] text-white/20 uppercase">© 2025 FURNITURE STUDIO. ALL RIGHTS RESERVED. BASED IN DAMIETTA.</p>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4 hidden sm:flex">
                <span className="font-label text-[9px] font-bold tracking-[0.2em] text-white/20 uppercase">GLOBAL CURATION COLLECTIVE</span>
                <span className="font-label text-[9px] font-bold tracking-[0.2em] text-white/20 uppercase">ENGINEERED FOR EXCELLENCE</span>
            </div>
            <a href="https://www.instagram.com/furniturestudiio?igsh=eWdlbnBmamUzdng=" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              <span className="font-label text-[9px] font-bold tracking-[0.2em] uppercase">Instagram</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
