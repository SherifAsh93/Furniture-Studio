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
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDOLHrQHpP15CHRIIQXaEQP-HEnQyEyxMUzlukgGVPzHvc1kgUSOs0WrkhlYWD_Z0M9iEwqF_3nZ_mh6sQdbQ3qJkSER3zzqH2_VzrFO_8xH5xNYstuxxfrnd4lw4lIMgbFiz03C-18RQS96JZhgafZQ5h16U_qTc0wYVUk3Sf67JVne39tzgI-19WdqrSi6rHA5GhXyC5GDso42i0SaLL67oMuH336PxvThk4uGvGgpwVPgoHYPfPbDmyEQNTxNb__DWwG4vZeuVMl"
    },
    {
      id: 2,
      category: "CRAFT",
      title: "The Alchemy of Hand-Charred Oak",
      excerpt: "A look into the ancient techniques used in the Obsidian collection, translating fire into a permanent architectural finish that is as durable as it is beautiful.",
      date: "MARCH 15, 2024",
      icon: "local_fire_department",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDfZMhs4icujLnFuggbQBVMGdZkeOH05TWHc2aeuNOLC84jyLEOsInwLTjnTm-_6qs32yJg66Bh9GYJW2YTX5aiq_DNWUNcW5wkWLGp5HhLsbBUh6eGeORLdEb08Z7b19WIBeeLR2M71_q6ViHm6bW9K2vqP4n2bsbnEVX4JuWC_RX28Oo7EkNKPiCBAqPwlU_FABtuFOH3LGL0XuM4M5RdecgN_QP-p_HkDCi1ieNGkbmYwwDwTxaDxy7oZDH_22IPHoO7i0rsfTBA"
    },
    {
      id: 3,
      category: "INTERIOR",
      title: "Curating the Master Suite",
      excerpt: "Five principles for balancing luxury and intimacy in private spaces, featuring selecting pieces from the newly launched Nocturne series for maximum impact.",
      date: "MARCH 10, 2024",
      icon: "bedroom_parent",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCTS2WvWXL1c76QlfWJLrIrTRc2SaaVSFKUC1HQ1TsfBEt54ZtLxyprF5KZH1shlnPc1DuBcuFnK85KfViAHDBW0LJJKKOiGRu0_qpzWRDBnwOK7nYkVT7yvkBNVB_F1167VGLCR3RzSlAw7BOrUB30hDXaEjq8hyk9ZEZpwIeQSdzSMX5kAueynlW3A2A-lk5t_hLu510vshNAS4l8yLgvny2RTCNA4gxnnzGNWPDTCAssBIr7EHZAuYHseHy0XEgMkDBnzZjmF1T7"
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
    <main className="pt-32 pb-32 px-6 md:px-12 max-w-[1400px] mx-auto min-h-screen">
      <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-8 border-b border-black/5 pb-12">
        <div className="max-w-3xl">
          <span className="font-label text-[10px] font-bold tracking-[0.3em] text-[#cf6317] uppercase mb-6 block">EDITORIAL INTENT</span>
          <h1 className="font-headline text-5xl md:text-8xl font-extrabold uppercase tracking-tight leading-[0.85] mb-8">
            The<br/><span className="text-black/20 italic font-light">Journal</span>
          </h1>
          <p className="font-body text-base md:text-lg text-on-surface-variant leading-relaxed">
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
        {articles.map((article) => (
          <article key={article.id} className="group cursor-pointer">
            <div className="aspect-[16/10] overflow-hidden bg-[#e5e2dd] mb-8 relative">
              <img 
                alt={article.title} 
                className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" 
                src={article.image} 
              />
              <div className="absolute top-6 left-6 bg-white/20 backdrop-blur-md px-3 py-1 rounded-none border border-white/20">
                <span className="font-label text-[8px] font-bold tracking-[0.2em] text-white uppercase">{article.category}</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-[#cf6317]">
                  {getIcon(article.icon)}
                </span>
                <span className="font-label text-[9px] font-bold tracking-[0.2em] text-black/40 uppercase">{article.date}</span>
              </div>
              <h2 className="font-headline text-3xl font-bold uppercase tracking-tight group-hover:text-[#cf6317] transition-colors leading-tight">
                {article.title}
              </h2>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed line-clamp-3">
                {article.excerpt}
              </p>
              <button className="font-label text-[10px] font-bold tracking-[0.2em] text-black border-b border-black/20 pb-1 hover:border-[#cf6317] hover:text-[#cf6317] transition-all uppercase pt-4 inline-flex items-center gap-2 group/btn">
                Read Narrative
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover/btn:translate-x-1 transition-transform"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-48 py-24 border-t border-black/10 flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
        <div>
          <h3 className="font-headline text-3xl font-bold uppercase mb-4 tracking-tight">Stay Curated</h3>
          <p className="font-body text-sm text-on-surface-variant uppercase tracking-widest">Receive our weekly editorial dispatch directly.</p>
        </div>
        <div className="flex w-full md:w-auto max-w-md bg-[#f6f3ee] border-b-2 border-transparent focus-within:border-[#cf6317] transition-colors group">
          <div className="p-4 text-black/40 group-focus-within:text-[#cf6317]">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
          </div>
          <input 
            type="email" 
            placeholder="COLLECTOR@TYPOLOGY.EU" 
            className="bg-transparent border-0 py-4 px-2 text-xs font-label font-bold tracking-[0.2em] outline-none flex-1 uppercase"
          />
          <button className="bg-primary text-white px-8 py-4 font-label text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-[#cf6317] transition-all active:scale-[0.98]">
            Subscribe
          </button>
        </div>
      </div>
    </main>
  );
}
