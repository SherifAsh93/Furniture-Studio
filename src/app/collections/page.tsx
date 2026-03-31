'use client';

export default function CollectionsPage() {
  const collections = [
    {
      id: 1,
      title: "The Obsidian Series",
      subtitle: "Material Alchemy",
      description: "A meditation on shadow and surface. Hand-charred timber and antique brass hardware create a presence that is felt before it is seen.",
      icon: "nights_stay",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBCMCD4HQETm-yZhc4DNlNG3kNEn0-2J8InfsYZWRvT81qcpRJe_Q6Dp1BgMCSDO7zA08NCLmeD1LylNg-HHrXmYXoYZodKjDlhcjyGqYG4w9M3_6zm_evTplXFFLYqWkI08vDiGLyzDiFU_ZUaHdJ_lti21J-9wEr-TKU2vd33w0x46JFk-JVqIFRkfCaceE-aIGnuEF-099c1-iNjlaRY6-p7h0Z5CwARKbGmIu-pEdEUKjveyjfBywRaoN9aSWvj_ywzdZejyhp"
    },
    {
      id: 2,
      title: "The Nocturne Suite",
      subtitle: "Intimate Geometry",
      description: "Sculptural forms for the private residence. Deep walnut and brushed limestone combine to offer a tactile refuge from the external world.",
      icon: "bed",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCwRof9ZZAxaEcYlN3dMISLNGfAQk9Usxo64tw1EOVF5LoKfiIos1JSskqyLrsRIjHmEfwpJX5tRIl8DNqaWKlEfGYevZPPY1xuKQhilKJJI205c7CGOF6qoGYIiRx0lgFr07Uhh1Go9BdAaF4b2ctcCE4zutk4LfVaUpm2xX4y3IzUqtcGMcKw5LIcHfcGCpbK7X62FRHx-c9TB_iglYZLEWUDSlkdIQOQ_i_hvEbuvsQl7btH1XPi6w4VGjJ1fIf5Q0E0I7YXIhK0"
    },
    {
      id: 3,
      title: "Alabaster Halls",
      subtitle: "Light & Proportion",
      description: "A celebration of transparency. Fluted glass and light-washed ash highlight the mathematical purity of contemporary living spaces.",
      icon: "light_mode",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDQsqo9B-bOepx60Xvf1-U161YyF1S2O4_wgrJ3m-Y9J6sxce8E3vhOz1hVVkXbMKIYXf_peVdFqnd4b99ekSHv2CyBQe7bDRoUyeSrkR4syyj2VP_hMMvVmQUcdd4Ojdd40VRjvj3LCeZEWdA3uiN_hpH9AdmgHh8jXxRIHCZg5cnXXpkFtf0gm7XxECGvWtUQ5I5r47bHN7e17XUmyvCVYZxd8Rdd4y-gGuDP-kZNq7CYnJGRK94R_NaH_IHgRXy7PlzT_fRfAzI"
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
    <main className="pt-32 pb-32 px-6 md:px-12 max-w-[1400px] mx-auto min-h-screen">
      <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-8">
        <div className="max-w-3xl">
          <span className="font-label text-[10px] font-bold tracking-[0.3em] text-[#cf6317] uppercase mb-6 block">ARCHITECTURE & TYPOLOGY</span>
          <h1 className="font-headline text-5xl md:text-8xl font-extrabold uppercase tracking-tight leading-[0.85] mb-8">
            The<br/><span className="text-black/20 italic font-light">Series</span>
          </h1>
          <p className="font-body text-base md:text-lg text-on-surface-variant leading-relaxed">
            Every series is a cohesive architectural statement. Curated by typological function and material intent, these collections represent our definitive vision for contemporary living.
          </p>
        </div>
        <div className="flex gap-4">
          <div className="text-black/10">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3z"></path><path d="M9 3v18"></path><path d="M3 15h6"></path><path d="M15 3v18"></path><path d="M15 9h6"></path></svg>
          </div>
          <div className="text-black/10">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"></path><path d="M2 12h20"></path><path d="M12 12 2.1 21.9"></path><path d="m12 12 9.9 9.9"></path><path d="m12 12-9.9-9.9"></path><path d="m12 12 9.9-9.9"></path></svg>
          </div>
        </div>
      </div>

      <div className="space-y-48">
        {collections.map((collection, index) => (
          <section key={collection.id} className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 lg:gap-24 items-center group`}>
            <div className="w-full md:w-3/5 aspect-[16/10] overflow-hidden bg-[#e5e2dd] relative">
              <img 
                alt={collection.title} 
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" 
                src={collection.image} 
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-700"></div>
            </div>
            <div className="w-full md:w-2/5 space-y-8">
              <div className="flex items-center gap-4">
                <span className="text-[#cf6317]">
                  {getIcon(collection.icon)}
                </span>
                <span className="font-label text-[10px] font-bold tracking-[0.4em] text-[#cf6317] uppercase whitespace-nowrap">{collection.subtitle}</span>
              </div>
              <h2 className="font-headline text-4xl lg:text-5xl font-extrabold uppercase tracking-tight">{collection.title}</h2>
              <p className="font-body text-base text-on-surface-variant leading-relaxed">
                {collection.description}
              </p>
              <div className="pt-4 flex flex-col sm:flex-row gap-6">
                <button className="bg-primary text-white px-10 py-5 font-label text-[10px] font-bold tracking-[0.2em] hover:bg-[#cf6317] transition-all uppercase whitespace-nowrap">
                  Explore Series
                </button>
                <button className="font-label text-[10px] font-bold tracking-[0.2em] border-b border-black pb-1 hover:text-[#cf6317] hover:border-[#cf6317] transition-colors uppercase h-max self-center">
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
