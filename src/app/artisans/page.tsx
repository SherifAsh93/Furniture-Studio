import { prisma } from "@/lib/prisma";
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function ArtisansPage() {
  const vendors = await prisma.user.findMany({
    where: { role: 'VENDOR' },
    include: {
      products: true
    }
  });

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'carpenter':
        return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 10h-3V7l-5-5L3 9v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5l-3-3Z"></path><path d="M14 14h-4"></path><path d="M14 18h-4"></path></svg>;
      case 'architecture':
        return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"></path><path d="M2 12h20"></path><path d="M12 12 2.1 21.9"></path><path d="m12 12 9.9 9.9"></path><path d="m12 12-9.9-9.9"></path><path d="m12 12 9.9-9.9"></path></svg>;
      case 'local_fire_department':
        return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3 1.07.56 2 1.56 2 3a2.5 2.5 0 0 1-5 0c0-1.5 1.31-2.32 2-3 1.53 1.17 2.25 2.12 3 3 1.62 1.89 2.5 3.91 2.5 6a7 7 0 1 1-14 0c0-3.01.2-5.79 3-8 0 2.22 2.14 4 4.5 4Z"></path></svg>;
      default:
        return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.29 7 12 12 20.71 7"></polyline><line x1="12" y1="22" x2="12" y2="12"></line></svg>;
    }
  };

  return (
    <main className="pt-32 pb-32 px-6 md:px-12 max-w-[1400px] mx-auto min-h-screen cursor-default">
      <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
        <div className="max-w-3xl">
          <span className="font-label text-[10px] font-bold tracking-[0.3em] text-[#cf6317] uppercase mb-6 block">THE COLLECTIVE</span>
          <h1 className="font-headline text-5xl md:text-8xl font-extrabold uppercase tracking-tight leading-[0.85] mb-8">
            The<br/><span className="text-black/20 italic font-light">Artisans</span>
          </h1>
          <p className="font-body text-base md:text-lg text-on-surface-variant leading-relaxed">
            A global circle of master craftspeople. We don't just manufacture; we curate a lineage of expertise that translates raw earth into architectural punctuation.
          </p>
        </div>
        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center text-black/40">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
          </div>
          <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center text-black/40">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"></path><path d="m9 12 2 2 4-4"></path></svg>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
        {vendors.map(vendor => {
          const name = vendor.companyName || vendor.name || 'Artisan Studio';
          const location = vendor.city || 'Global';
          const image = vendor.products.length > 0 && vendor.products[0].images.length > 0 
            ? vendor.products[0].images[0] 
            : 'https://images.unsplash.com/photo-1605371924599-2d0365da26f5?auto=format&w=800&q=80';
          const categories = Array.from(new Set(vendor.products.map(p => p.category)));
          const specialty = categories.length > 0 ? categories.join(' & ') : 'General Craftsmanship';
          
          return (
            <div key={vendor.id} className="group">
              <div className="aspect-[3/4] overflow-hidden bg-[#e5e2dd] mb-8 relative">
                <img 
                  alt={name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" 
                  src={image} 
                />
                <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-md p-3 rounded-none border border-white/20 text-white">
                  {getIcon('box')}
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-headline text-2xl font-bold uppercase tracking-tight">{name}</h3>
                  <span className="font-label text-[10px] font-bold tracking-[0.2em] text-[#cf6317] uppercase pt-1">{location}</span>
                </div>
                <p className="font-label text-[10px] font-bold tracking-[0.1em] text-black/40 uppercase">{specialty}</p>
                <p className="font-body text-sm text-on-surface-variant leading-relaxed pt-2">
                  {vendor.products.length} crafted piece{vendor.products.length !== 1 ? 's' : ''} available
                </p>
                <div className="grid grid-cols-3 gap-2 pt-2">
                  {vendor.products.slice(0, 6).map(product => (
                    <div key={product.id} className="group/card relative aspect-square overflow-hidden bg-[#f6f3ee] border border-black/5">
                      <img 
                        src={product.images?.[0] || 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&q=60'} 
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover/card:bg-black/40 transition-all duration-300 flex items-end">
                        <div className="w-full p-1.5 translate-y-full group-hover/card:translate-y-0 transition-transform duration-300">
                          <p className="text-white text-[8px] font-label font-bold uppercase tracking-wider truncate">{product.title}</p>
                          <p className="text-white/70 text-[7px] font-label font-bold">EGP {new Intl.NumberFormat().format(product.price)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pt-4">
                  <Link href={`#`} className="inline-block font-label text-[10px] font-bold tracking-[0.2em] text-black border-b border-black/20 pb-1 hover:border-[#cf6317] hover:text-[#cf6317] transition-all uppercase">
                    View Portfolio
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <section className="mt-48 bg-[#1c1b1b] text-white p-12 md:p-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5 translate-x-1/4 -translate-y-1/4 text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
        </div>
        <div className="relative z-10 max-w-2xl">
          <h2 className="font-headline text-3xl md:text-5xl font-bold uppercase mb-8 leading-tight">Apply to the<br/>Artisan Circle</h2>
          <p className="font-body text-base text-white/60 mb-12">
            Are you a master of your craft? Join our global directory and showcase your work to the world's most discerning architectural visionaries.
          </p>
          <button className="bg-white text-black px-10 py-5 font-label text-[10px] font-bold tracking-[0.2em] hover:bg-[#cf6317] hover:text-white transition-all uppercase">
            Submit Portfolio
          </button>
        </div>
      </section>
    </main>
  );
}

