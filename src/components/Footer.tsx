import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-surface-container-highest border-t border-black/5 pt-24 pb-8 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-24 cursor-default">
        <div className="md:col-span-2 relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-white overflow-hidden w-6 h-6 rounded flex items-center justify-center border border-black/10">
              <img alt="Furniture Studio Logo" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYzwpRTmQxUU1zbZR1afOETDBbBv0B_OTy3uSZi1M-zr3D4OJhAdZ0rdtuJJVMreSJlhnXVbub7ICKPYtOIzIlBG9k9G0KaWgp5bzWDrziAUAXbS75sIc3Sa16PXvXkieA209VMEJWQLh75Mx7kidMOOdwBqHjOv2WfUJmMX9ythFYjuEt9oemiO96XkY7XFbPGpzOadEvAVB0kaJ83HKjGXKjarlpsAFZuyYWNGqW9BTJorDxFA9LYqQLpix6hr6C5-ehOtP7Soa7" />
            </div>
            <span className="font-headline text-lg tracking-tight font-extrabold text-black uppercase leading-none">FURNITURE STUDIO</span>
          </div>
          <p className="font-body text-sm text-on-surface-variant max-w-sm leading-relaxed mb-8">
            The world's premier digital marketplace for architectural furniture and artisan-led interior masterpieces. Based in Milan, Shipping Globally.
          </p>
          <div className="flex gap-4">
            <button className="text-black/40 hover:text-black transition-colors cursor-pointer" aria-label="Globe">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
            </button>
            <button className="text-black/40 hover:text-black transition-colors cursor-pointer" aria-label="Email">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"></path><path d="M22 2 11 13"></path></svg>
            </button>
          </div>
        </div>
        <div>
          <h4 className="font-label text-[10px] font-bold tracking-[0.2em] text-black uppercase mb-6">Collections</h4>
          <ul className="space-y-4 font-body text-sm text-on-surface-variant">
            <li><Link className="hover:text-black transition-colors" href="/collections">Dressing Room</Link></li>
            <li><Link className="hover:text-black transition-colors" href="/collections">Master Suite</Link></li>
            <li><Link className="hover:text-black transition-colors" href="/collections">Public Spaces</Link></li>
            <li><Link className="hover:text-black transition-colors" href="/collections">Architectural Detail</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-label text-[10px] font-bold tracking-[0.2em] text-black uppercase mb-6">Company</h4>
          <ul className="space-y-4 font-body text-sm text-on-surface-variant">
            <li><Link className="hover:text-black transition-colors" href="/artisans">The Collective Vision</Link></li>
            <li><Link className="hover:text-black transition-colors" href="/vendor">Vendor Inquiries</Link></li>
            <li><Link className="hover:text-black transition-colors" href="/journal">Press & Media</Link></li>
            <li><Link className="hover:text-black transition-colors" href="/privacy">Privacy & Terms</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-black/10">
        <p className="font-label text-[9px] font-bold tracking-[0.1em] text-black/40 uppercase">© 2024 FURNITURE STUDIO. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-8">
          <span className="font-label text-[9px] font-bold tracking-[0.1em] text-black/40 uppercase">GLOBAL CURATION COLLECTIVE</span>
          <span className="font-label text-[9px] font-bold tracking-[0.1em] text-black/40 uppercase">ENGINEERED FOR EXCELLENCE</span>
        </div>
      </div>
    </footer>
  );
}
