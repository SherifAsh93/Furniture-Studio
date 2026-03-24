'use client';
import { useState } from 'react';
import AuthModal from '@/components/AuthModal';

export default function VendorWorkspace() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <div className="bg-background text-on-background min-h-screen flex font-body">
      <aside className="hidden md:flex flex-col h-screen w-64 bg-[#f6f3ee] py-8 px-4 fixed left-0 top-0 z-40 border-r border-outline-variant/10">
        <div className="px-4 flex items-center gap-3 group cursor-pointer mb-8">
          <div className="flex items-center gap-3">
            <img alt="Furniture Studio Logo" className="h-6 w-6 object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYzwpRTmQxUU1zbZR1afOETDBbBv0B_OTy3uSZi1M-zr3D4OJhAdZ0rdtuJJVMreSJlhnXVbub7ICKPYtOIzIlBG9k9G0KaWgp5bzWDrziAUAXbS75sIc3Sa16PXvXkieA209VMEJWQLh75Mx7kidMOOdwBqHjOv2WfUJmMX9ythFYjuEt9oemiO96XkY7XFbPGpzOadEvAVB0kaJ83HKjGXKjarlpsAFZuyYWNGqW9BTJorDxFA9LYqQLpix6hr6C5-ehOtP7Soa7" />
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-black font-headline leading-[0.9] uppercase">FURNITURE</span>
              <span className="text-xl font-light tracking-tighter text-black/60 font-headline leading-[0.9] uppercase">STUDIO</span>
            </div>
          </div>
        </div>
        <nav className="flex-1 space-y-1">
          <a className="flex items-center gap-3 px-4 py-3 bg-white text-[#735c00] font-bold transition-transform translate-x-1" href="#">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>
            <span className="font-label text-xs tracking-wide">DASHBOARD</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-black/70 hover:bg-white/50 transition-all" href="#">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 6V3c0-1.1.9-2 2-2h6a2 2 0 0 1 2 2v3"></path><path d="M5 8h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2z"></path><path d="M15 13a3 3 0 0 1-6 0"></path></svg>
            <span className="font-label text-xs tracking-wide">PRODUCTS</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-black/70 hover:bg-white/50 transition-all" href="#">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m11 17 2 2 4-4"></path><path d="m8.5 2-3.5 3.5 3.5 3.5"></path><path d="M12 2 8.5 5.5 12 9"></path><path d="M18 7H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Z"></path></svg>
            <span className="font-label text-xs tracking-wide">NEGOTIATIONS</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-black/70 hover:bg-white/50 transition-all" href="#">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
            <span className="font-label text-xs tracking-wide">SUBSCRIPTION</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-black/70 hover:bg-white/50 transition-all" href="#">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
            <span className="font-label text-xs tracking-wide">SYSTEM SETTINGS</span>
          </a>
        </nav>
        <div className="mt-auto px-4 py-6 border-t border-outline-variant/10">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setIsAuthOpen(true)}>
            <div className="w-10 h-10 bg-primary-container flex items-center justify-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </div>
            <div>
              <p className="text-xs font-bold font-label text-black">ALEXANDER V.</p>
              <p className="text-[10px] text-on-surface-variant">Lead Curator</p>
            </div>
          </div>
        </div>
      </aside>

      <header className="md:hidden fixed top-0 w-full z-50 bg-[#fcf9f4]/80 backdrop-blur-xl border-b border-black/5 flex justify-between items-center px-6 py-4 max-w-full transition-colors duration-300">
        <div className="flex items-center gap-6">
          <button className="text-[#1c1c19] cursor-pointer" aria-label="Menu">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="18" x2="20" y2="18"></line></svg>
          </button>
          <div className="flex items-center gap-3">
            <img alt="Furniture Studio Logo" className="h-6 w-6 object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYzwpRTmQxUU1zbZR1afOETDBbBv0B_OTy3uSZi1M-zr3D4OJhAdZ0rdtuJJVMreSJlhnXVbub7ICKPYtOIzIlBG9k9G0KaWgp5bzWDrziAUAXbS75sIc3Sa16PXvXkieA209VMEJWQLh75Mx7kidMOOdwBqHjOv2WfUJmMX9ythFYjuEt9oemiO96XkY7XFbPGpzOadEvAVB0kaJ83HKjGXKjarlpsAFZuyYWNGqW9BTJorDxFA9LYqQLpix6hr6C5-ehOtP7Soa7" />
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-black font-headline leading-[0.9] uppercase">FURNITURE</span>
              <span className="text-xl font-light tracking-tighter text-black/60 font-headline leading-[0.9] uppercase">STUDIO</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <span className="font-label text-[9px] font-bold tracking-[0.2em] cursor-pointer uppercase text-black/60" onClick={() => setIsAuthOpen(true)}>LOGIN</span>
        </div>
      </header>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

      <main className="flex-1 md:ml-64 p-6 md:p-12 mt-16 md:mt-0">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-label text-[10px] font-bold tracking-[0.2em] text-secondary uppercase">Management Portal</span>
            <h2 className="font-headline text-4xl font-bold mt-2 tracking-tight">Vendor Workspace</h2>
          </div>
          <div className="flex gap-4">
            <div className="px-6 py-3 bg-surface-container-low flex flex-col justify-center border-l-2 border-secondary">
              <p className="text-[10px] font-bold text-on-surface-variant tracking-widest uppercase">System Status</p>
              <p className="text-sm font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-600"></span>
                OPERATIONAL
              </p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <section className="lg:col-span-1 bg-surface-container-lowest p-8 flex flex-col justify-between relative overflow-hidden group shadow-sm rounded">
            <div className="relative z-10">
              <h3 className="font-label text-[11px] font-extrabold tracking-[0.2em] text-on-surface-variant uppercase mb-6">Profile Information</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-1">Company Name</p>
                  <p className="text-lg font-headline font-medium">Studio d'Artistes Ltd.</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-1">Point of Contact</p>
                  <p className="text-sm font-semibold">Alexander Van der Berg</p>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-on-surface-variant">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"></path><path d="M22 2 11 13"></path></svg>
                    </span>
                    <span>curator@studiodartistes.eu</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-on-surface-variant">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    </span>
                    <span>+31 20 555 0192</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <button className="w-full bg-primary text-white py-4 font-label text-[10px] font-bold tracking-[0.15em] hover:opacity-90 transition-opacity rounded">
                EDIT PROFILE
              </button>
            </div>
          </section>

          <section className="lg:col-span-2 bg-primary-container text-white p-8 relative overflow-hidden rounded">
            <div className="absolute right-[-20px] top-[-20px] opacity-10">
              <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
            </div>
            <div className="relative z-10 h-full flex flex-col">
              <div className="flex justify-between items-start mb-12">
                <div>
                  <h3 className="font-label text-[11px] font-extrabold tracking-[0.2em] text-white/60 uppercase mb-2">Membership Plan</h3>
                  <div className="flex items-center gap-4">
                    <p className="text-3xl font-headline font-bold">Elite Curator Tier</p>
                    <span className="px-3 py-1 bg-secondary text-[10px] font-bold tracking-widest uppercase rounded">Active</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-white/60 tracking-widest uppercase mb-1">Monthly Cost</p>
                  <p className="text-2xl font-headline font-medium">€ 10,000.00</p>
                </div>
              </div>
              <div className="mt-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="flex flex-col">
                  <p className="text-[10px] font-bold text-white/60 tracking-widest uppercase mb-4">Next Billing Cycle</p>
                  <div className="flex items-center gap-3">
                    <span className="text-secondary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    </span>
                    <p className="text-lg font-label font-medium">October 14, 2026</p>
                  </div>
                </div>
                <div className="flex flex-col justify-end gap-3">
                  <button className="border border-outline-variant/30 py-4 font-label text-[10px] font-bold tracking-[0.15em] hover:bg-white/5 transition-colors rounded">
                    VIEW BILLING HISTORY
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <section className="lg:col-span-5 bg-surface-container-low p-8 rounded">
            <div className="flex justify-between items-center mb-10">
              <h3 className="font-label text-[11px] font-extrabold tracking-[0.2em] uppercase">Negotiation Inbox</h3>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-secondary"></span>
                <span className="text-[10px] font-bold tracking-widest">3 NEW REQUESTS</span>
              </div>
            </div>
            <div className="space-y-px bg-outline-variant/10">
              <div className="bg-surface-container-lowest p-6 hover:bg-surface-bright transition-colors cursor-pointer group rounded">
                <div className="flex justify-between mb-3">
                  <span className="text-[10px] font-bold text-secondary tracking-widest uppercase">Master Bedroom</span>
                  <span className="text-[10px] font-bold text-on-surface-variant">2h ago</span>
                </div>
                <h4 className="font-headline font-bold text-lg mb-1 group-hover:text-secondary transition-colors">Obsidian Oak Bedstead</h4>
                <p className="text-sm text-on-surface-variant line-clamp-1 mb-4">Request for custom width (220cm) and velvet upholstery.</p>
                <div className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-surface-container border border-surface-container-lowest flex items-center justify-center text-[10px] font-bold">JD</div>
                  <span className="text-[11px] font-bold tracking-tight">Johnathan D.</span>
                  <span className="ml-auto text-on-surface-variant">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                  </span>
                </div>
              </div>
              <div className="bg-surface-container-lowest p-6 hover:bg-surface-bright transition-colors cursor-pointer group rounded mt-px">
                <div className="flex justify-between mb-3">
                  <span className="text-[10px] font-bold text-secondary tracking-widest uppercase">Dressing Room</span>
                  <span className="text-[10px] font-bold text-on-surface-variant">5h ago</span>
                </div>
                <h4 className="font-headline font-bold text-lg mb-1 group-hover:text-secondary transition-colors">Carrara Marble Vanity</h4>
                <p className="text-sm text-on-surface-variant line-clamp-1 mb-4">Quoting for multi-unit installation in boutique hotel project.</p>
                <div className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-secondary text-white flex items-center justify-center text-[10px] font-bold">MK</div>
                  <span className="text-[11px] font-bold tracking-tight">M. K. Interiors</span>
                  <span className="ml-auto text-on-surface-variant">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                  </span>
                </div>
              </div>
              <div className="bg-surface-container-lowest p-6 hover:bg-surface-bright transition-colors cursor-pointer group rounded mt-px">
                <div className="flex justify-between mb-3">
                  <span className="text-[10px] font-bold text-secondary tracking-widest uppercase">Living Gallery</span>
                  <span className="text-[10px] font-bold text-on-surface-variant">Yesterday</span>
                </div>
                <h4 className="font-headline font-bold text-lg mb-1 group-hover:text-secondary transition-colors">Sovereign Lounge Chair</h4>
                <p className="text-sm text-on-surface-variant line-clamp-1 mb-4">Trade discount inquiry for recurrent client.</p>
                <div className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-surface-container border border-surface-container-lowest flex items-center justify-center text-[10px] font-bold">ES</div>
                  <span className="text-[11px] font-bold tracking-tight">Elena S.</span>
                  <span className="ml-auto text-on-surface-variant">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                  </span>
                </div>
              </div>
            </div>
            <button className="w-full mt-6 py-4 text-[10px] font-bold tracking-[0.2em] border border-outline-variant/20 hover:bg-white transition-colors uppercase rounded">
              View All Conversations
            </button>
          </section>

          <section className="lg:col-span-7">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h3 className="font-label text-[11px] font-extrabold tracking-[0.2em] uppercase mb-1">Product Inventory</h3>
                <p className="text-sm text-on-surface-variant">Manage your curated collection of 14 items.</p>
              </div>
              <button className="bg-primary text-white px-8 py-3 font-label text-[10px] font-bold tracking-[0.15em] flex items-center gap-2 rounded hover:bg-[#cf6317] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                NEW PRODUCT
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-outline-variant/10">
              <div className="bg-surface-container-lowest p-6 group rounded">
                <div className="aspect-[4/5] bg-surface-container mb-6 overflow-hidden text-center rounded">
                  <img alt="Nordic Spine Chair" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFcPgLqDsW7aRmEjI276UgO03VbS9KGyTi3RPJ_f4Q27HuZEXX-uY1ann2CQukzGzWsX447fRLb9PKGECF0GiXPlpyTfjimylKGQWmAnXD9OeE5Umz9PwAAKoWtO1mYuX8WviRRvT_ARGQ2GssDwzHSXQTFX3DFRTgLdoM90mSR1Ob43jmOPwcn0gB0I5RctSBfcW3pKR8lwjb659_qwMyvtLqGAc8QZVkHsuzqI6PUhS15oxPG9pdQRR4MfkdMwvFmYPt5SPK0CoZ" />
                </div>
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-headline font-bold text-xl">The Nordic Spine Chair</h4>
                  <p className="text-sm font-bold font-body">€2,450</p>
                </div>
                <p className="text-[10px] font-bold text-on-surface-variant tracking-widest uppercase mb-6">In Stock: 8 Units</p>
                <div className="flex gap-2">
                  <button className="flex-1 py-3 text-[9px] font-bold tracking-widest border border-outline-variant/30 hover:bg-surface-container transition-colors uppercase rounded">Update</button>
                  <button className="px-4 py-3 text-error border border-error/20 hover:bg-error/5 transition-colors rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                  </button>
                </div>
              </div>
              <div className="bg-surface-container-lowest p-6 group rounded">
                <div className="aspect-[4/5] bg-surface-container mb-6 overflow-hidden text-center rounded">
                  <img alt="Venera Marble Table" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDI-NRmZPNvKCcMM1DCSK8uz56DBqPXY6DFn1mZB-Y7C7ekx2Arh-PbdIW1lG4mOjK0EwxSMArrQh2B69BBOGhRKFrNrTwPN_RuYFXPkmZyESbHaFmTMnptgC6cR106fAZ8knHUZZp5bnebr-EsN1VSWXTL4qQOu9ooVCmZNBRn4ezp0E7SCJlMAgtyI2dgZ2o8kwgZJCQwSNtqvKqu9KrYl_71YeJ3mslQNHv0FdB-UrzTqZ8BULrmox_R0XX0MozZsAehUaF073P" />
                </div>
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-headline font-bold text-xl">Venera Marble Table</h4>
                  <p className="text-sm font-bold font-body">€4,100</p>
                </div>
                <p className="text-[10px] font-bold text-on-surface-variant tracking-widest uppercase mb-6">In Stock: 2 Units</p>
                <div className="flex gap-2">
                  <button className="flex-1 py-3 text-[9px] font-bold tracking-widest border border-outline-variant/30 hover:bg-surface-container transition-colors uppercase rounded">Update</button>
                  <button className="px-4 py-3 text-error border border-error/20 hover:bg-error/5 transition-colors rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-center">
              <button className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-secondary group uppercase">
                Load Complete Inventory
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </button>
            </div>
          </section>
        </div>

        <section className="mt-20 py-16 border-t border-outline-variant/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div>
              <p className="text-[10px] font-bold text-on-surface-variant tracking-[0.2em] uppercase mb-2">Monthly Traffic</p>
              <p className="text-3xl font-headline font-bold">12.4K</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-on-surface-variant tracking-[0.2em] uppercase mb-2">Conversion</p>
              <p className="text-3xl font-headline font-bold">4.2%</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-on-surface-variant tracking-[0.2em] uppercase mb-2">Quote Requests</p>
              <p className="text-3xl font-headline font-bold">88</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-on-surface-variant tracking-[0.2em] uppercase mb-2">Avg. Response</p>
              <p className="text-3xl font-headline font-bold">4h</p>
            </div>
          </div>
        </section>
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-safe bg-[#fcf9f4] border-t border-[#c4c7c7]/15 z-50 h-16 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <a className="flex flex-col items-center justify-center text-black/40 pt-2 active:scale-95 transition-transform" href="/">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          <span className="font-label text-[10px] uppercase tracking-[0.1em] font-bold">HOME</span>
        </a>
        <a className="flex flex-col items-center justify-center text-black/40 pt-2 active:scale-95 transition-transform" href="/collections">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
          <span className="font-label text-[10px] uppercase tracking-[0.1em] font-bold">COLLECTIONS</span>
        </a>
        <a className="flex flex-col items-center justify-center text-black/40 pt-2 active:scale-95 transition-transform" href="/#custom-request">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
          <span className="font-label text-[10px] uppercase tracking-[0.1em] font-bold">CUSTOM</span>
        </a>
        <a className="flex flex-col items-center justify-center text-[#735c00] border-t-2 border-[#735c00] pt-2 active:scale-95 transition-transform" href="#">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          <span className="font-label text-[10px] uppercase tracking-[0.1em] font-bold">PROFILE</span>
        </a>
      </nav>
    </div>
  );
}
