import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#1c1c19] text-white pt-24 pb-12 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-white overflow-hidden w-8 h-8 rounded flex items-center justify-center">
                 <img alt="Furniture Studio Logo" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYzwpRTmQxUU1zbZR1afOETDBbBv0B_OTy3uSZi1M-zr3D4OJhAdZ0rdtuJJVMreSJlhnXVbub7ICKPYtOIzIlBG9k9G0KaWgp5bzWDrziAUAXbS75sIc3Sa16PXvXkieA209VMEJWQLh75Mx7kidMOOdwBqHjOv2WfUJmMX9ythFYjuEt9oemiO96XkY7XFbPGpzOadEvAVB0kaJ83HKjGXKjarlpsAFZuyYWNGqW9BTJorDxFA9LYqQLpix6hr6C5-ehOtP7Soa7" />
              </div>
              <span className="font-headline text-xl tracking-tight font-extrabold text-white uppercase">FURNITURE STUDIO</span>
            </div>
            <p className="font-body text-white/60 max-w-sm leading-relaxed mb-8">
              The world's premier digital marketplace for architectural furniture and artisan-led interior masterpieces. Based in Milan, Shipping Globally.
            </p>
            <div className="flex gap-4">
              <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white transition-all cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
              </button>
              <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white transition-all cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"></path><path d="M22 2 11 13"></path></svg>
              </button>
            </div>
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
              <li><Link className="hover:text-white transition-colors" href="/journal">Press & Media</Link></li>
              <li><Link className="hover:text-white transition-colors" href="/privacy">Privacy & Terms</Link></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-white/5">
          <p className="font-label text-[9px] font-bold tracking-[0.2em] text-white/20 uppercase">© 2024 FURNITURE STUDIO. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <span className="font-label text-[9px] font-bold tracking-[0.2em] text-white/20 uppercase">GLOBAL CURATION COLLECTIVE</span>
            <span className="font-label text-[9px] font-bold tracking-[0.2em] text-white/20 uppercase">ENGINEERED FOR EXCELLENCE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
