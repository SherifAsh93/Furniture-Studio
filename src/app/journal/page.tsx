'use client';

export default function JournalPage() {
  const articles = [
    {
      id: 1,
      category: "ESSAY",
      title: "The Weight of Silence: Minimalism in 2024",
      excerpt: "Exploring why high-end residential spaces are moving toward monolithic forms and rejecting ornamentation in favor of absolute material presence.",
      date: "MARCH 20, 2024",
      icon: "menu_book",
      image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 2,
      category: "CRAFT",
      title: "The Alchemy of Hand-Charred Oak",
      excerpt: "A look into the ancient techniques used in the Obsidian collection, translating fire into a permanent architectural finish that is as durable as it is beautiful.",
      date: "MARCH 15, 2024",
      icon: "local_fire_department",
      image: "https://images.unsplash.com/photo-1541123437809-9fd12bd01057?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 3,
      category: "INTERIOR",
      title: "Curating the Master Suite",
      excerpt: "Five principles for balancing luxury and intimacy in private spaces, featuring selecting pieces from the newly launched Nocturne series for maximum impact.",
      date: "MARCH 10, 2024",
      icon: "bedroom_parent",
      image: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?q=80&w=1000&auto=format&fit=crop"
    }
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'menu_book':
        return <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>;
      case 'local_fire_department':
        return <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3 1.07.56 2 1.56 2 3a2.5 2.5 0 0 1-5 0c0-1.5 1.31-2.32 2-3 1.53 1.17 2.25 2.12 3 3 1.62 1.89 2.5 3.91 2.5 6a7 7 0 1 1-14 0c0-3.01.2-5.79 3-8 0 2.22 2.14 4 4.5 4Z"></path></svg>;
      case 'bedroom_parent':
        return <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 4v16"></path><path d="M2 8h18a2 2 0 0 1 2 2v10"></path><path d="M2 17h20"></path><path d="M6 8v9"></path></svg>;
      default:
        return null;
    }
  };

  return (
    <main className="pt-24 md:pt-32 pb-32 px-6 md:px-12 max-w-[1400px] mx-auto min-h-screen">
      <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-12 border-b border-black/5 pb-16">
        <div className="max-w-3xl">
          <span className="font-label text-[10px] font-bold tracking-[0.4em] text-[#a1824a] uppercase mb-8 block animate-fade-up opacity-0" style={{ animationDelay: '0.1s' }}>EDITORIAL ARTIFACTS</span>
          <h1 className="font-headline text-5xl md:text-8xl font-extrabold uppercase tracking-tighter leading-[0.85] mb-10 animate-fade-up opacity-0" style={{ animationDelay: '0.2s' }}>
            The<br/><span className="text-black/10 italic font-light">Narrative Archive</span>
          </h1>
          <p className="font-body text-base md:text-lg text-on-surface-variant leading-relaxed max-w-2xl animate-fade-up opacity-0" style={{ animationDelay: '0.3s' }}>
            Exploring the intersection of material, form, and philosophy. Our editorial platform provides a deeper look into the architectural intent behind everything we curate.
          </p>
        </div>
        <div className="flex gap-4">
          <button className="text-black/10 hover:text-[#cf6317] transition-colors" aria-label="Feed">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><path d="M12 11h5"></path><path d="M12 15h5"></path><path d="M7 11h1"></path><path d="M7 15h1"></path></svg>
          </button>
          <button className="text-black/10 hover:text-[#cf6317] transition-colors" aria-label="Stories">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
        {articles.map((article, idx) => (
          <article key={article.id} className="group cursor-pointer animate-fade-up opacity-0" style={{ animationDelay: `${0.4 + idx * 0.1}s` }}>
            <div className="aspect-[16/10] overflow-hidden bg-[#e5e2dd] mb-8 relative rounded-2xl shadow-sm transition-all hover:shadow-xl hover:shadow-black/5">
              <img 
                alt={article.title} 
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" 
                src={article.image} 
              />
              <div className="absolute top-6 left-6 bg-white/20 backdrop-blur-xl px-4 py-2 rounded-full border border-white/20">
                <span className="font-label text-[8px] font-bold tracking-[0.3em] text-white uppercase">{article.category}</span>
              </div>
            </div>
            <div className="space-y-5 px-2">
              <div className="flex items-center gap-3">
                <span className="text-[#a1824a]">
                  {getIcon(article.icon)}
                </span>
                <span className="font-label text-[9px] font-bold tracking-[0.2em] text-black/40 uppercase">{article.date}</span>
              </div>
              <h2 className="font-headline text-3xl font-bold uppercase tracking-tight group-hover:text-[#a1824a] transition-colors leading-[1.1]">
                {article.title}
              </h2>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed line-clamp-3 italic opacity-80">
                {article.excerpt}
              </p>
              <button className="font-label text-[10px] font-bold tracking-[0.3em] text-black border-b border-black/10 pb-2 hover:border-[#a1824a] hover:text-[#a1824a] transition-all uppercase pt-6 inline-flex items-center gap-3 group/btn">
                Read Narrative
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover/btn:translate-x-2 transition-all"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-48 py-24 border-t border-black/5 flex flex-col lg:flex-row justify-between items-center gap-16 text-center lg:text-left">
        <div className="max-w-xl">
          <h3 className="font-headline text-4xl font-bold uppercase mb-4 tracking-tighter">Stay Curated</h3>
          <p className="font-body text-xs text-black/40 uppercase tracking-[0.3em] font-bold leading-loose">Receive our weekly editorial dispatch directly into your archive.</p>
        </div>
        <div className="flex flex-col sm:flex-row w-full lg:w-auto max-w-xl bg-white rounded-2xl overflow-hidden premium-shadow border border-black/5">
          <div className="flex flex-1 items-center bg-surface-variant/30">
            <div className="p-5 text-black/20">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            </div>
            <input 
              type="email" 
              placeholder="COLLECTOR@TYPOLOGY.EG" 
              className="bg-transparent border-0 py-5 px-2 text-[10px] font-label font-bold tracking-[0.3em] outline-none flex-1 uppercase"
            />
          </div>
          <button className="bg-black text-white px-12 py-5 font-label text-[10px] font-bold tracking-[0.4em] uppercase hover:bg-[#a1824a] transition-all active:scale-[0.98]">
            Subscribe
          </button>
        </div>
      </div>
    </main>
  );
}
