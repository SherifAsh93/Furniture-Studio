'use client';

export default function ArtisansPage() {
  const artisans = [
    {
      id: 1,
      name: "Atelier Nord",
      location: "Copenhagen, DK",
      specialty: "Timber & Hand-Carved Forms",
      description: "Masters of the 'Dressing Room' series, specializing in hand-carved minimalist timber forms that honor the natural grain of Nordic oak.",
      icon: "carpenter",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDc2HCj08jTdfsM1eBKjNmCJ81JmeVMt_9vR_C2zxpvDi7FanJszegoLY56YSF5WkYmBG4yigRg4F4c613zywKVSleZWDw1O-pwK-1PVn_WLBJ3xAR9L9who4XH8Jh9k_7Ay5zWR1bC5c7BavIQufHEAJiQgMXMXgTlsfaq4ll42ilpnIQ4H1dWgRsK98kuJbKDxMgsRSpadbmYLqU6nNyIfES6027YnMIYVwN-8PXWbq-MM3ZRZCnr3v9hkSsB1exQ1SA8CR-QpWtT"
    },
    {
      id: 2,
      name: "Studio Marmo",
      location: "Milan, IT",
      specialty: "Marble & Architectural Stone",
      description: "Interpreting geologic history through contemporary form. Hand-finishing Carrara marble with architectural precision for the 'Obsidian' surfaces.",
      icon: "architecture",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZgqGcd0xmQxYFKa-E3zr0XlT_zm7Q4PLNKoH1SuikR03PWRHK3hEPsBrFEK4zm11zpVAImlvyeAWFjV8rGTrV7KTMBQBSaQHWyoT-i9Lg54R5F966Eq6d9I5E-A4eX4r7npZuRm8oN6osvORZupwpr8gceJ5zTo9XZnh3BQb4bW54eSqU2dWaaOhmJEvatca3NKRCfXNiPpdJBdIiaA9GJZvPGJvSbPbnjXvar36QoS-v6gQJFJNGvs58OImngkzRY3UDBglsNjwJ"
    },
    {
      id: 3,
      name: "Forge & Fire",
      location: "Berlin, DE",
      specialty: "Hand-Charred Timber & Metal",
      description: "The alchemy of the 'Obsidian' collection. Expertly charring timber to create permanent, monolithic textures for the modern interior.",
      icon: "local_fire_department",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBCMCD4HQETm-yZhc4DNlNG3kNEn0-2J8InfsYZWRvT81qcpRJe_Q6Dp1BgMCSDO7zA08NCLmeD1LylNg-HHrXmYXoYZodKjDlhcjyGqYG4w9M3_6zm_evTplXFFLYqWkI08vDiGLyzDiFU_ZUaHdJ_lti21J-9wEr-TKU2vd33w0x46JFk-JVqIFRkfCaceE-aIGnuEF-099c1-iNjlaRY6-p7h0Z5CwARKbGmIu-pEdEUKjveyjfBywRaoN9aSWvj_ywzdZejyhp"
    }
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'carpenter':
        return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 10h-3V7l-5-5L3 9v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5l-3-3Z"></path><path d="M14 14h-4"></path><path d="M14 18h-4"></path></svg>;
      case 'architecture':
        return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"></path><path d="M2 12h20"></path><path d="M12 12 2.1 21.9"></path><path d="m12 12 9.9 9.9"></path><path d="m12 12-9.9-9.9"></path><path d="m12 12 9.9-9.9"></path></svg>;
      case 'local_fire_department':
        return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3 1.07.56 2 1.56 2 3a2.5 2.5 0 0 1-5 0c0-1.5 1.31-2.32 2-3 1.53 1.17 2.25 2.12 3 3 1.62 1.89 2.5 3.91 2.5 6a7 7 0 1 1-14 0c0-3.01.2-5.79 3-8 0 2.22 2.14 4 4.5 4Z"></path></svg>;
      default:
        return null;
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
        {artisans.map(artisan => (
          <div key={artisan.id} className="group">
            <div className="aspect-[3/4] overflow-hidden bg-[#e5e2dd] mb-8 relative">
              <img 
                alt={artisan.name} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" 
                src={artisan.image} 
              />
              <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-md p-3 rounded-none border border-white/20 text-white">
                {getIcon(artisan.icon)}
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="font-headline text-2xl font-bold uppercase tracking-tight">{artisan.name}</h3>
                <span className="font-label text-[10px] font-bold tracking-[0.2em] text-[#cf6317] uppercase pt-1">{artisan.location}</span>
              </div>
              <p className="font-label text-[10px] font-bold tracking-[0.1em] text-black/40 uppercase">{artisan.specialty}</p>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed pt-2">
                {artisan.description}
              </p>
              <button className="font-label text-[10px] font-bold tracking-[0.2em] text-black border-b border-black/20 pb-1 hover:border-[#cf6317] hover:text-[#cf6317] transition-all uppercase pt-4">
                View Studio
              </button>
            </div>
          </div>
        ))}
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
