import Link from 'next/link';

export default function Footer() {
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
              The world's premier digital marketplace for architectural furniture and artisan-led interior masterpieces. Based in Damietta, Shipping Globally.
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
