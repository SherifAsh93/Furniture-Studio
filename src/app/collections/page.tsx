'use client';

export default function CollectionsPage() {
  const collections = [
    {
      id: 1,
      title: "The Obsidian Series",
      subtitle: "Material Alchemy",
      description: "A meditation on shadow and surface. Hand-charred timber and antique brass hardware create a presence that is felt before it is seen.",
      icon: "nights_stay",
      image: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "The Nocturne Suite",
      subtitle: "Intimate Geometry",
      description: "Sculptural forms for the private residence. Deep walnut and brushed limestone combine to offer a tactile refuge from the external world.",
      icon: "bed",
      image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Alabaster Halls",
      subtitle: "Light & Proportion",
      description: "A celebration of transparency. Fluted glass and light-washed ash highlight the mathematical purity of contemporary living spaces.",
      icon: "light_mode",
      image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1000&auto=format&fit=crop"
    }
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'nights_stay':
        return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>;
      case 'bed':
        return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 4v16"></path><path d="M2 8h18a2 2 0 0 1 2 2v10"></path><path d="M2 17h20"></path><path d="M6 8v9"></path></svg>;
      case 'light_mode':
        return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>;
      default:
        return null;
    }
  };

  return (
    <main className="pt-24 md:pt-32 pb-32 px-6 md:px-12 max-w-[1400px] mx-auto min-h-screen">
      <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-12 border-b border-black/5 pb-16">
        <div className="max-w-3xl">
          <span className="font-label text-[10px] font-bold tracking-[0.4em] text-[#a1824a] uppercase mb-8 block animate-fade-up opacity-0" style={{ animationDelay: '0.1s' }}>ARCHITECTURE & TYPOLOGY</span>
          <h1 className="font-headline text-5xl md:text-8xl font-extrabold uppercase tracking-tighter leading-[0.85] mb-10 animate-fade-up opacity-0" style={{ animationDelay: '0.2s' }}>
            The<br/><span className="text-black/10 italic font-light">Series</span>
          </h1>
          <p className="font-body text-base md:text-lg text-on-surface-variant leading-relaxed max-w-xl animate-fade-up opacity-0" style={{ animationDelay: '0.3s' }}>
            Every series is a cohesive architectural statement. Curated by typological function and material intent, these collections represent our definitive vision for contemporary living.
          </p>
        </div>
        <div className="flex gap-4 animate-fade-up opacity-0" style={{ animationDelay: '0.4s' }}>
          <div className="text-black/10">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3z"></path><path d="M9 3v18"></path><path d="M3 15h6"></path><path d="M15 3v18"></path><path d="M15 9h6"></path></svg>
          </div>
          <div className="text-black/10">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"></path><path d="M2 12h20"></path><path d="M12 12 2.1 21.9"></path><path d="m12 12 9.9 9.9"></path><path d="m12 12-9.9-9.9"></path><path d="m12 12 9.9-9.9"></path></svg>
          </div>
        </div>
      </div>

      <div className="space-y-32 md:space-y-48">
        {collections.map((collection, index) => (
          <section key={collection.id} className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 lg:gap-24 items-center group animate-fade-up opacity-0`} style={{ animationDelay: `${0.2 + index * 0.1}s` }}>
            <div className="w-full md:w-3/5 aspect-[16/10] overflow-hidden bg-[#e5e2dd] relative rounded-2xl shadow-sm premium-shadow">
              <img 
                alt={collection.title} 
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" 
                src={collection.image} 
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-700"></div>
            </div>
            <div className="w-full md:w-2/5 space-y-8">
              <div className="flex items-center gap-4">
                <span className="text-[#a1824a]">
                  {getIcon(collection.icon)}
                </span>
                <span className="font-label text-[10px] font-bold tracking-[0.4em] text-[#a1824a] uppercase">{collection.subtitle}</span>
              </div>
              <h2 className="font-headline text-4xl lg:text-6xl font-extrabold uppercase tracking-tighter leading-none">{collection.title}</h2>
              <p className="font-body text-base text-on-surface-variant leading-relaxed italic pr-6 border-l-2 border-black/10 pl-6">
                {collection.description}
              </p>
              <div className="pt-8 flex flex-col sm:flex-row gap-8 items-center border-t border-black/5">
                <button className="bg-black text-white px-10 py-5 font-label text-[10px] font-bold tracking-[0.3em] hover:bg-[#a1824a] transition-all uppercase w-full sm:w-auto text-center active:scale-[0.98]">
                  Explore Series
                </button>
                <button className="font-label text-[10px] font-bold tracking-[0.3em] border-b border-black/20 pb-1 hover:text-[#a1824a] hover:border-[#a1824a] transition-colors uppercase h-max self-center sm:self-auto text-black text-center">
                  Download Catalog
                </button>
              </div>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
