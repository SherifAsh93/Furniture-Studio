'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useEcommerce } from '@/context/EcommerceContext';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, openModal, logout } = useAuth();
  const {  
    cart, 
    wishlist, 
    setIsCartOpen, 
    setIsWishlistOpen 
  } = useEcommerce();

  const isHome = pathname === '/';
  const isVendor = pathname.startsWith('/vendor');
  const isAdmin = pathname.startsWith('/admin');

  // Common Nav items (Sidebar)
  const baseNavItems = [
    { name: 'HOME', href: '/', icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg> },
    { name: 'COLLECTIONS', href: '/collections', icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg> },
    { name: 'THE DIRECTORY', href: '/artisans', icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg> },
    { name: 'JOURNAL', href: '/journal', icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg> },
  ];

  const navItems = [...baseNavItems];
  if (user?.role === 'VENDOR') {
    navItems.push({ name: 'VENDOR HUB', href: '/vendor', icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg> });
  } else if (user?.role === 'ADMIN') {
    navItems.push({ name: 'ADMIN HUB', href: '/admin', icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg> });
  } else if (user?.role === 'USER') {
    navItems.push({ name: 'MY HUB', href: '/orders', icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> });
  }

  return (
    <>
      {/* Mobile Top Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-black/5 z-50 flex items-center justify-between px-6 lg:hidden">
        <Link href="/" className="font-headline text-xl font-bold tracking-tighter">
          FURNITURE <span className="text-[#a1824a]">STUDIO</span>
        </Link>
        <div className="flex items-center gap-4">
           <button onClick={() => { if (!user) openModal('login', 'USER'); else setIsCartOpen(true); }} className="relative pt-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
              {cart.length > 0 && <span className="absolute -top-1 -right-2 bg-black text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{cart.length}</span>}
           </button>
           <button className="text-on-background">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
           </button>
        </div>
      </header>

      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-[280px] bg-white border-r border-black/5 z-40 hidden lg:flex flex-col p-8 overflow-y-auto">
        <div className="mb-12">
          <Link href="/" className="font-headline text-2xl font-bold tracking-tighter block mb-2">
            FURNITURE <br/><span className="text-[#a1824a]">STUDIO</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#735c00]"></div>
            <span className="font-label text-[10px] tracking-[0.2em] uppercase font-bold text-on-surface-variant">Curated Since 1994</span>
          </div>
        </div>

        <nav className="space-y-12">
          <div>
            <h3 className="font-label text-[10px] tracking-[0.3em] uppercase text-on-surface-variant/40 mb-6 font-bold">NAVIGATION</h3>
            <ul className="space-y-4">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    className={`flex items-center gap-4 group transition-colors ${pathname === item.href ? 'text-black' : 'text-on-surface-variant'}`}
                  >
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${pathname === item.href ? 'bg-black text-white shrink-0 shadow-lg shadow-black/10' : 'bg-[#fcf9f4] text-on-surface-variant group-hover:bg-black group-hover:text-white shrink-0'}`}>
                      {item.icon}
                    </span>
                    <span className="font-label text-xs tracking-widest font-bold uppercase">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-label text-[10px] tracking-[0.3em] uppercase text-on-surface-variant/40 mb-6 font-bold">STUDIO ARCHIVE</h3>
            <ul className="space-y-4">
               <li>
                  <button onClick={() => { if (!user) openModal('login', 'USER'); else setIsCartOpen(true); }} className="flex items-center gap-4 group transition-colors text-on-surface-variant hover:text-black w-full text-left">
                    <span className="w-8 h-8 rounded-lg flex items-center justify-center transition-all bg-[#fcf9f4] group-hover:bg-black group-hover:text-white shrink-0 relative">
                       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                       {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-black text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center group-hover:bg-[#a1824a] border border-white">{cart.length}</span>}
                    </span>
                    <span className="font-label text-xs tracking-widest font-bold uppercase">THE CART</span>
                  </button>
               </li>
               <li>
                  <button onClick={() => { if (!user) openModal('login', 'USER'); else setIsWishlistOpen(true); }} className="flex items-center gap-4 group transition-colors text-on-surface-variant hover:text-black w-full text-left">
                    <span className="w-8 h-8 rounded-lg flex items-center justify-center transition-all bg-[#fcf9f4] group-hover:bg-black group-hover:text-white shrink-0 relative">
                       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.04-8.04 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                       {wishlist.length > 0 && <span className="absolute -top-1 -right-1 bg-black text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center group-hover:bg-[#a1824a] border border-white">{wishlist.length}</span>}
                    </span>
                    <span className="font-label text-xs tracking-widest font-bold uppercase">WISHLIST</span>
                  </button>
               </li>
               <li>
                  <button onClick={() => { if (!user) openModal('login', 'USER'); else router.push('/orders'); }} className="flex items-center gap-4 group transition-colors text-on-surface-variant hover:text-black w-full text-left">
                    <span className="w-8 h-8 rounded-lg flex items-center justify-center transition-all bg-[#fcf9f4] group-hover:bg-black group-hover:text-white shrink-0">
                       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    </span>
                    <span className="font-label text-xs tracking-widest font-bold uppercase">ORDERS</span>
                  </button>
               </li>
            </ul>
          </div>

          <div>
            <h3 className="font-label text-[10px] tracking-[0.3em] uppercase text-on-surface-variant/40 mb-6 font-bold">ACCOUNT</h3>
            <ul className="space-y-4">
              {user ? (
                <li className="space-y-4">
                  <div className="flex items-center gap-4 px-1">
                    <div className="w-8 h-8 rounded-full bg-[#735c00] flex items-center justify-center text-white font-bold text-[10px]">
                      {user.name?.[0] || user.email[0].toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label text-[10px] tracking-widest uppercase font-bold text-black truncate max-w-[150px]">
                        {user.name || user.email.split('@')[0]}
                      </span>
                      <button 
                        onClick={logout}
                        className="font-label text-[9px] tracking-widest uppercase text-secondary hover:underline font-bold text-left"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </li>
              ) : (
                <li>
                  <button 
                    onClick={() => openModal('login', 'USER')}
                    className="flex items-center gap-4 group transition-colors w-full text-left text-on-surface-variant"
                  >
                    <span className="w-8 h-8 rounded-lg flex items-center justify-center transition-all bg-[#fcf9f4] group-hover:bg-black group-hover:text-white shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    </span>
                    <span className="font-label text-xs tracking-widest font-bold uppercase">SIGN IN</span>
                  </button>
                </li>
              )}
            </ul>
          </div>
        </nav>

        <div className="mt-auto pt-12">
          <div className="bg-[#fcf9f4] rounded-xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
            </div>
            <p className="font-label text-[10px] tracking-widest uppercase mb-2 font-bold text-on-surface-variant">Concierge</p>
            <h4 className="font-headline text-lg font-bold mb-4 uppercase">Direct Assistance</h4>
            <Link href="#" className="font-label text-[10px] tracking-widest uppercase border-b border-black pb-1 font-bold">CONTACT AGENT</Link>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-black/5 px-6 py-4 flex items-center justify-between z-50 lg:hidden">
        <Link href="/" className={`p-2 transition-colors ${pathname === '/' ? 'text-black' : 'text-on-surface-variant'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
        </Link>
        <button 
          onClick={() => document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' })}
          className="p-2 text-on-surface-variant"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </button>
        <button 
          onClick={() => { if (!user) openModal('login', 'USER'); else setIsCartOpen(true); }}
          className="p-2 text-on-surface-variant relative"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
          {cart.length > 0 && <span className="absolute top-1 right-1 bg-black text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{cart.length}</span>}
        </button>
        {user ? (
          <button 
            onClick={logout}
            className="p-2 text-secondary hover:text-black transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
          </button>
        ) : (
          <button 
            onClick={() => openModal('login', 'USER')}
            className={`p-2 transition-colors ${pathname === '/login' ? 'text-black' : 'text-on-surface-variant'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          </button>
        )}
      </div>
    </>
  );
}
