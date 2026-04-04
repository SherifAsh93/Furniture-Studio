import { prisma } from "@/lib/prisma";
import Link from 'next/link';
import RegisterArtisanButton from '@/components/artisans/RegisterArtisanButton';

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
    <main className="pt-24 md:pt-32 pb-32 px-6 md:px-12 max-w-[1400px] mx-auto min-h-screen cursor-default">
      <div className="flex flex-col lg:flex-row justify-between items-end mb-32 gap-16 border-b border-black/5 pb-20">
        <div className="max-w-3xl">
          <span className="font-label text-[10px] font-bold tracking-[0.4em] text-[#a1824a] uppercase mb-8 block animate-fade-up opacity-0" style={{ animationDelay: '0.1s' }}>THE COLLECTIVE</span>
          <h1 className="font-headline text-5xl md:text-8xl font-extrabold uppercase tracking-tighter leading-[0.85] mb-10 animate-fade-up opacity-0" style={{ animationDelay: '0.2s' }}>
            The<br/><span className="text-black/10 italic font-light">Artisans</span>
          </h1>
          <p className="font-body text-base md:text-lg text-on-surface-variant leading-relaxed max-w-xl animate-fade-up opacity-0" style={{ animationDelay: '0.3s' }}>
            A global circle of master craftspeople. We don't just manufacture; we curate a lineage of expertise that translates raw earth into architectural punctuation.
          </p>
        </div>
        <div className="w-full lg:w-96 aspect-video rounded-3xl overflow-hidden shadow-2xl animate-fade-up opacity-0 relative group" style={{ animationDelay: '0.4s' }}>
           <img 
              src="https://images.unsplash.com/photo-1581428982868-e410dd047a90?q=80&w=1000&auto=format&fit=crop"
              className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110"
              alt="Artisan Workspace"
           />
           <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-32">
        {vendors.map(vendor => {
          const name = vendor.companyName || vendor.name || 'Artisan Studio';
          const location = vendor.city || 'Global';
          const image = vendor.products.length > 0 && vendor.products[0].images.length > 0 
            ? vendor.products[0].images[0] 
            : 'https://images.unsplash.com/photo-1605371924599-2d0365da26f5?auto=format&w=800&q=80';
          const categories = Array.from(new Set(vendor.products.map(p => p.category)));
          const specialty = categories.length > 0 ? categories.join(' & ') : 'General Craftsmanship';
          
          return (
            <div key={vendor.id} className="group animate-fade-up opacity-0" style={{ animationDelay: '0.5s' }}>
              <div className="aspect-[3/4] overflow-hidden bg-[#e5e2dd] mb-10 relative rounded-2xl shadow-sm premium-shadow">
                <img 
                  alt={name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" 
                  src={image} 
                />
                <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-xl p-3 rounded-full border border-white/20 text-white">
                  {getIcon('box')}
                </div>
              </div>
              <div className="space-y-6 px-2">
                <div className="flex justify-between items-start">
                  <h3 className="font-headline text-3xl font-bold uppercase tracking-tight group-hover:text-[#a1824a] transition-colors leading-none">{name}</h3>
                  <span className="font-label text-[10px] font-bold tracking-[0.3em] text-[#a1824a] uppercase pt-1 shrink-0">{location}</span>
                </div>
                <p className="font-label text-[10px] font-bold tracking-[0.2em] text-black/40 uppercase border-b border-black/5 pb-6">{specialty}</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
                  {vendor.products.slice(0, 6).map(product => (
                    <Link key={product.id} href={`/?category=${product.category?.replace(' ', '+')}#marketplace`} className="group/card relative aspect-square overflow-hidden bg-[#f6f3ee] border border-black/5 rounded-xl">
                      <img 
                        src={product.images?.[0] || 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&q=60'} 
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover/card:bg-black/60 transition-all duration-300 flex items-end">
                        <div className="w-full p-2 translate-y-full group-hover/card:translate-y-0 transition-transform duration-300 backdrop-blur-sm bg-black/10">
                          <p className="text-white text-[9px] font-label font-bold uppercase tracking-widest truncate">{product.title}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="pt-8">
                  <Link href={`/?category=ALL#marketplace`} className="inline-block font-label text-[10px] font-bold tracking-[0.3em] text-black border-b-2 border-black/10 pb-2 hover:border-[#a1824a] hover:text-[#a1824a] transition-all uppercase group/link">
                    View Collective Works
                    <span className="inline-block ml-2 group-hover/link:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <section className="mt-48 bg-black text-white p-12 md:p-24 relative overflow-hidden rounded-3xl premium-shadow">
        <div className="absolute top-0 right-0 p-12 opacity-5 translate-x-1/4 -translate-y-1/4 text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
        </div>
        <div className="relative z-10 max-w-2xl px-4 md:px-0">
          <h2 className="font-headline text-3xl md:text-6xl font-extrabold uppercase mb-8 leading-none tracking-tighter">Apply to the<br className="hidden md:block"/>Artisan Circle</h2>
          <p className="font-body text-sm md:text-base text-white/60 mb-12 italic border-l-2 border-[#a1824a] pl-6">
            Are you a master of your craft? Join our global directory and showcase your work to the world's most discerning architectural visionaries.
          </p>
          <RegisterArtisanButton />
        </div>
      </section>
    </main>
  );
}

