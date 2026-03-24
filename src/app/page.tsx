'use client';

export default function Home() {
  return (
    <>
      <main className="pb-32">
        <section className="relative w-full h-[85vh] bg-[#f0ede8] overflow-hidden">
          <div className="absolute inset-0">
            <img alt="Architectural living room with brutalist furniture elements" className="w-full h-full object-cover opacity-90 mix-blend-multiply" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDQsqo9B-bOepx60Xvf1-U161YyF1S2O4_wgrJ3m-Y9J6sxce8E3vhOz1hVVkXbMKIYXf_peVdFqnd4b99ekSHv2CyBQe7bDRoUyeSrkR4syyj2VP_hMMvVmQUcdd4Ojdd40VRjvj3LCeZEWdA3uiN_hpH9AdmgHh8jXxRIHCZg5cnXXpkFtf0gm7XxECGvWtUQ5I5r47bHN7e17XUmyvCVYZxd8Rdd4y-gGuDP-kZNq7CYnJGRK94R_NaH_IHgRXy7PlzT_fRfAzI" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c19]/40 to-transparent"></div>
          </div>
          <div className="relative h-full flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto">
            <span className="font-label text-[10px] font-bold tracking-[0.3em] text-[#cf6317] uppercase mb-8 bg-white/10 px-4 py-2 backdrop-blur-md rounded-full border border-white/20">THE CURATED GALLERY</span>
            <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl text-white font-extrabold tracking-tight leading-[0.9] mb-8 uppercase text-shadow-xl drop-shadow-2xl">
              Living<br/><span className="font-light italic tracking-tighter opacity-90">Art</span>
            </h1>
            <p className="font-body text-sm md:text-base text-white/90 max-w-2xl mb-12 font-medium leading-relaxed drop-shadow-md">
              Functional masterpieces curated for the modern intellectual. Our furniture transcends utility, becoming the definitive punctuation of your architecture.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-primary text-on-primary px-10 py-5 font-label text-[10px] font-bold tracking-[0.2em] hover:bg-[#cf6317] transition-all uppercase">
                Explore the Series
              </button>
              <button className="bg-transparent border border-white text-white px-10 py-5 font-label text-[10px] font-bold tracking-[0.2em] hover:bg-white hover:text-black transition-all uppercase">
                View Spaces
              </button>
            </div>
          </div>
        </section>

        <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 border-b border-black/5 pb-8">
            <div>
              <h2 className="font-headline text-4xl text-black font-extrabold uppercase tracking-tight">THE DIRECTORY</h2>
              <p className="font-body text-sm text-black/60 mt-2">Browse by architectural intent and room typology.</p>
            </div>
            <a className="font-label text-[10px] font-bold tracking-[0.2em] text-[#cf6317] uppercase border-b border-[#cf6317] pb-1 hover:text-black hover:border-black transition-colors" href="#">VIEW ALL DEPTS</a>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-outline-variant/20 border border-outline-variant/20">
            <a className="group bg-surface hover:bg-surface-container-low p-8 flex flex-col items-center justify-center text-center aspect-square transition-colors" href="#">
              <div className="w-16 h-16 md:w-24 md:h-24 mb-6 rounded-full overflow-hidden border border-outline-variant/10 group-hover:scale-105 transition-transform">
                <img alt="Dressing room" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDc2HCj08jTdfsM1eBKjNmCJ81JmeVMt_9vR_C2zxpvDi7FanJszegoLY56YSF5WkYmBG4yigRg4F4c613zywKVSleZWDw1O-pwK-1PVn_WLBJ3xAR9L9who4XH8Jh9k_7Ay5zWR1bC5c7BavIQufHEAJiQgMXMXgTlsfaq4ll42ilpnIQ4H1dWgRsK98kuJbKDxMgsRSpadbmYLqU6nNyIfES6027YnMIYVwN-8PXWbq-MM3ZRZCnr3v9hkSsB1exQ1SA8CR-QpWtT" />
              </div>
              <span className="font-body text-xs font-bold uppercase tracking-widest text-[#cf6317] group-hover:text-black transition-colors">Dressing room</span>
            </a>
            <a className="group bg-surface hover:bg-surface-container-low p-8 flex flex-col items-center justify-center text-center aspect-square transition-colors" href="#">
              <div className="w-16 h-16 md:w-24 md:h-24 mb-6 rounded-full overflow-hidden border border-outline-variant/10 group-hover:scale-105 transition-transform">
                <img alt="Master bedroom" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZgqGcd0xmQxYFKa-E3zr0XlT_zm7Q4PLNKoH1SuikR03PWRHK3hEPsBrFEK4zm11zpVAImlvyeAWFjV8rGTrV7KTMBQBSaQHWyoT-i9Lg54R5F966Eq6d9I5E-A4eX4r7npZuRm8oN6osvORZupwpr8gceJ5zTo9XZnh3BQb4bW54eSqU2dWaaOhmJEvatca3NKRCfXNiPpdJBdIiaA9GJZvPGJvSbPbnjXvar36QoS-v6gQJFJNGvs58OImngkzRY3UDBglsNjwJ" />
              </div>
              <span className="font-body text-xs font-bold uppercase tracking-widest text-black group-hover:text-[#cf6317] transition-colors">Master bedroom</span>
            </a>
            <a className="group bg-surface hover:bg-surface-container-low p-8 flex flex-col items-center justify-center text-center aspect-square transition-colors" href="#">
              <div className="w-16 h-16 md:w-24 md:h-24 mb-6 rounded-full overflow-hidden border border-outline-variant/10 group-hover:scale-105 transition-transform">
                <img alt="Kids room" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBft2VI1LvnJAc7KhTkOk_sb6f-eqwKZRe830Uk6dkKENOSis2LHPhWfCZg1bu0P21GxgxfR_am-9lw5YsOpaH2mzzWZ19qmzpT0Y835DBow12WMj9FP9mbmUtzv-X8wzHZEmpohLCtmS_aor9_x4T9FP8Pw64YE6_j13kGujByVXEFH7lQvzyMd5I198z0ZzWVcx9GSlWAChnUThGAOquEPBHy0O5BG7eyUDeWX3ZQMrdi8KebdaJjKkfoWCED5YNO_gkjFUGUT2tp" />
              </div>
              <span className="font-body text-xs font-bold uppercase tracking-widest text-[#cf6317] group-hover:text-black transition-colors">Kids room</span>
            </a>
            <a className="group bg-surface hover:bg-surface-container-low p-8 flex flex-col items-center justify-center text-center aspect-square transition-colors" href="#">
              <div className="w-16 h-16 md:w-24 md:h-24 mb-6 rounded-full overflow-hidden border border-outline-variant/10 group-hover:scale-105 transition-transform">
                <img alt="Sofas tables" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPBfGUTPksSq2a4nsrCx-PTmDklfJFeNLgtNmO-5U0mBMVA0A1vl9D9QfHn8SkDiP3G-FJWMDrSfJv3JVAVJlqfnj7QlnAz6yVyv5kwPaoeQyTn3lXkvVOjtlyD4dLjVNlsXk3Kw2itFKE1W8K5A_2x631uKWmtsFF-kRK6IFrvHWUr5Ca12nJiDpt0Lq6gzxFfGVz1JPDBEb1c7hfY-g7qG1fwnfeOb-8iBnMUpVD_DwsNZb-ojfYigSSQHauOH_TAC6gn3dpRYB1" />
              </div>
              <span className="font-body text-xs font-bold uppercase tracking-widest text-black group-hover:text-[#cf6317] transition-colors">Sofas tables</span>
            </a>
            <a className="group bg-surface hover:bg-surface-container-low p-8 flex flex-col items-center justify-center text-center aspect-square transition-colors col-span-2 md:col-span-1" href="#">
              <div className="w-16 h-16 md:w-24 md:h-24 mb-6 rounded-full overflow-hidden border border-outline-variant/10 group-hover:scale-105 transition-transform">
                <img alt="Sofas" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUFRBWdGabsSSbhRlsGqPYZHgAyFuev1AqtmAVg1J0o0yVeTBIxf5jRQ76qyHlGGxJh1KpTib68dk184LvDD1yOLFtvFTxGSJOlqTi__6K0mkW4wki8EWA0DCivBwPGc7VrKm0PY62TuIbOScOaa1gS7Y8R74o6JHwwG0h3IYBNrrsCx7Gi1YkMI41wp0UuzLxATaMnADq3I3lJiZqeZQUdRpivXVxq3Cs4quZWBx4nnsJgp76drZdYfVwQPzRzI5Xi1Flq3qMgmtN" />
              </div>
              <span className="font-body text-xs font-bold uppercase tracking-widest text-[#cf6317] group-hover:text-black transition-colors">Sofas</span>
            </a>
          </div>
        </section>

        <section className="bg-white border-y border-outline-variant/10">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="h-[60vh] lg:h-[800px] overflow-hidden">
              <img alt="Obsidian series mood image" className="w-full h-full object-cover hover:scale-105 transition-transform duration-[2s]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCMCD4HQETm-yZhc4DNlNG3kNEn0-2J8InfsYZWRvT81qcpRJe_Q6Dp1BgMCSDO7zA08NCLmeD1LylNg-HHrXmYXoYZodKjDlhcjyGqYG4w9M3_6zm_evTplXFFLYqWkI08vDiGLyzDiFU_ZUaHdJ_lti21J-9wEr-TKU2vd33w0x46JFk-JVqIFRkfCaceE-aIGnuEF-099c1-iNjlaRY6-p7h0Z5CwARKbGmIu-pEdEUKjveyjfBywRaoN9aSWvj_ywzdZejyhp" />
            </div>
            <div className="flex flex-col justify-center p-12 lg:p-24 bg-[#1c1b1b] text-[#fcf9f4]">
              <span className="font-label text-[10px] font-bold tracking-[0.3em] text-[#e9c176] uppercase mb-6 hidden md:block">NEW ARRIVALS</span>
              <h2 className="font-headline text-5xl md:text-6xl font-extrabold tracking-tight mb-8 uppercase leading-[0.9]">
                The Obsidian<br/><span className="text-[#e9c176] italic font-light">Dressing Suite</span>
              </h2>
              <p className="font-body text-sm text-[#c8c6c5] mb-12 max-w-md leading-relaxed">
                "A meditation on shadow and surface. The Obsidian series utilizes hand-charred timber and antique brass hardware to create a presence that is felt before it is seen."
              </p>
              <div className="space-y-6 mb-16 max-w-md border-t border-white/10 pt-8">
                <div className="flex justify-between items-center group cursor-pointer border-b border-white/5 pb-6">
                  <div>
                    <span className="font-label text-[10px] tracking-widest uppercase text-[#c8c6c5] block mb-1">Dressing Table</span>
                    <h4 className="font-headline text-lg font-bold">Master Suite No. 04</h4>
                  </div>
                  <span className="font-body text-sm font-bold text-[#e9c176]">$12,400.00</span>
                </div>
                <div className="flex justify-between items-center group cursor-pointer border-b border-white/5 pb-6">
                  <div>
                    <span className="font-label text-[10px] tracking-widest uppercase text-[#c8c6c5] block mb-1">Full Length</span>
                    <h4 className="font-headline text-lg font-bold">Obsidian Side Mirror</h4>
                  </div>
                  <span className="font-body text-sm font-bold text-[#e9c176]">$2,100.00</span>
                </div>
              </div>
              <button className="bg-white text-black py-5 font-label text-[10px] font-extrabold tracking-[0.2em] hover:bg-[#e9c176] transition-colors uppercase w-full max-w-md">
                Purchase Collection
              </button>
            </div>
          </div>
        </section>

        <section className="py-32 px-6 md:px-12 bg-surface-container-low" id="custom-request">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div className="sticky top-32">
              <div className="flex items-center gap-3 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#cf6317" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                <span className="font-label text-[10px] font-bold tracking-[0.3em] text-[#cf6317] uppercase">Bespoke Design</span>
              </div>
              <h2 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tight uppercase mb-8">Custom Product Request</h2>
              <p className="font-body text-sm text-black/60 leading-relaxed mb-12 max-w-sm">
                Cannot find the exact piece for your vision? Our master artisans are available for individual commissions. Specify your requirements below for a curated quote.
              </p>
            </div>
            <div className="bg-white p-8 md:p-12 border border-outline-variant/20 shadow-[0px_20px_40px_rgba(28,28,25,0.04)]">
              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-[10px] font-bold text-[#cf6317] uppercase tracking-widest mb-3">Select Category</label>
                  <select className="w-full bg-[#f6f3ee] border-0 border-b-2 border-transparent focus:border-[#cf6317] px-4 py-4 text-sm font-body transition-colors cursor-pointer appearance-none">
                    <option>Dressing room</option>
                    <option>Master bedroom</option>
                    <option>Kids room</option>
                    <option>Sofas tables</option>
                    <option>Sofas</option>
                  </select>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-[#cf6317] uppercase tracking-widest mb-3">Length</label>
                    <div className="relative">
                      <input className="w-full bg-[#f6f3ee] border-0 border-b-2 border-transparent focus:border-[#cf6317] px-4 py-4 text-sm font-body transition-colors" placeholder="00" type="number" />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-black/40">CM</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-[#cf6317] uppercase tracking-widest mb-3">Width</label>
                    <div className="relative">
                      <input className="w-full bg-[#f6f3ee] border-0 border-b-2 border-transparent focus:border-[#cf6317] px-4 py-4 text-sm font-body transition-colors" placeholder="00" type="number" />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-black/40">CM</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-[#cf6317] uppercase tracking-widest mb-3">Height</label>
                    <div className="relative">
                      <input className="w-full bg-[#f6f3ee] border-0 border-b-2 border-transparent focus:border-[#cf6317] px-4 py-4 text-sm font-body transition-colors" placeholder="00" type="number" />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-black/40">CM</span>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-[#cf6317] uppercase tracking-widest mb-3">Additional Notes</label>
                  <textarea className="w-full bg-[#f6f3ee] border-0 border-b-2 border-transparent focus:border-[#cf6317] px-4 py-4 text-sm font-body transition-colors resize-none h-32" placeholder="Specify materials, finishes, or architectural constraints..."></textarea>
                </div>
                <button className="w-full bg-primary text-white py-5 font-label text-[10px] font-bold tracking-[0.2em] hover:bg-[#cf6317] transition-colors uppercase mt-4 block text-center">
                  Submit Request
                </button>
              </form>
            </div>
          </div>
        </section>

        <section className="py-32 px-4 max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-none md:grid-rows-2 h-auto md:h-[800px] gap-4">
            <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden bg-[#e5e2dd]">
              <img alt="Banquet set" className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwRof9ZZAxaEcYlN3dMISLNGfAQk9Usxo64tw1EOVF5LoKfiIos1JSskqyLrsRIjHmEfwpJX5tRIl8DNqaWKlEfGYevZPPY1xuKQhilKJJI205c7CGOF6qoGYIiRx0lgFr07Uhh1Go9BdAaF4b2ctcCE4zutk4LfVaUpm2xX4y3IzUqtcGMcKw5LIcHfcGCpbK7X62FRHx-c9TB_iglYZLEWUDSlkdIQOQ_i_hvEbuvsQl7btH1XPi6w4VGjJ1fIf5Q0E0I7YXIhK0" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-12">
                <span className="font-label text-[10px] font-bold tracking-[0.2em] text-[#cf6317] uppercase mb-2">Dining Series</span>
                <h3 className="font-headline text-3xl text-white font-bold mb-4">The Banquet Set</h3>
                <p className="font-body text-sm text-white/70 max-w-sm mb-6">Buffet + 8 Chairs in brushed limestone and walnut.</p>
                <a className="font-label text-[10px] font-bold tracking-[0.2em] text-white border-b border-white pb-1 w-max hover:text-[#cf6317] hover:border-[#cf6317] transition-colors uppercase" href="#">Buy Now</a>
              </div>
            </div>
            <div className="md:col-span-2 relative group overflow-hidden bg-[#e5e2dd] h-[400px] md:h-auto">
              <img alt="Sculptural Seating" className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBiw-mo-wWot32v4fzNGgLlYWGwRI6XgHSZcpIe8a5JWh_HrVe1ExRN58S3U2fsmOo-TCm5Vdw1DGgtBtpeSLLmDLzT8VecM25KMpToP__c00t-jiUDXQ2kxKaEIWL4MHAZT4IYPNGNEqXunEMLqyxL-COjbzZvhZUyX-4PNQ1tGPIcHEKJIPoujZahUNpw1ExI81VP9nwOJoi3P9gdwucrkbm7Xmwp59ZhGvOSja1IIt_w2XNqljzW8_F8HL3ydCLPJABdrj2WGD6J" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8">
                <h3 className="font-headline text-2xl text-white font-bold mb-4">Sculptural Seating</h3>
                <a className="font-label text-[10px] font-bold tracking-[0.2em] text-white border-b border-white pb-1 w-max hover:text-[#cf6317] transition-colors uppercase" href="#">Buy Now</a>
              </div>
            </div>
            <div className="relative group overflow-hidden bg-[#e5e2dd] h-[300px] md:h-auto flex items-center justify-center">
              <img alt="Wall cladding" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnpfRia0eCt9R1QAeuOuOts6yhOEcODJtZA6EkZZcY1Q95x01D79mTAtgFiGTwijlpDeV8fYuFXUEQQpTEy0CPSNWuwad7PU2HlOg0jNUD9MXDYCjEmElIuxGN1D9M6jqNsxynsKhajeUlLdRPD2td00i11aMu0UrADoGyZl0yYEqQwgurj2JnRA5jdZ9vdJHpLMFDb8XkNFXQwZr0TSgpuTKOGwsoVPMF32_VD66b9amh9X4c002Cn_kK8VujwP6vWdmA_Gp246J6" />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors"></div>
              <a className="relative z-10 font-headline text-xl text-white font-bold italic border-b border-white pb-1" href="#">Surfaces</a>
            </div>
            <div className="relative group overflow-hidden bg-[#e5e2dd] h-[300px] md:h-auto flex items-center justify-center">
              <img alt="Heavy doors" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnRqRAzhhpGkUjzMHgHJoYFi_Fc6HPEFl3IKl0MzI3eFXYvGCBO48MubaZMJ13uLWN53pMVQ48p5-URKSW0va4P3epAGylh8MjM7mcGkklod61iEsyOsqUD6GpdojZ4qSysyJd_WFIc6DPebIgECUaHsHtFHh17JPkqtxzFpmn9R_Und1GHlzOAuxy_eck9wq0lr_xQ0jKawnidKaDgY9EI-rst80GPDuFdAOHSgMX83pG9TRJogUTKW9OhhtJzmJNg4szwalZ8PZV" />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors"></div>
              <a className="relative z-10 font-headline text-xl text-white font-bold italic border-b border-white pb-1" href="#">Passages</a>
            </div>
          </div>
        </section>

        <section className="bg-black text-white py-32 px-6 text-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-3xl opacity-50 mix-blend-screen pointer-events-none"></div>
          <div className="max-w-4xl mx-auto relative z-10">
            <span className="font-label text-[12px] font-bold tracking-[0.4em] text-[#cf6317] uppercase mb-10 block">THE FURNITURE STUDIO PARTNERSHIP</span>
            <h2 className="font-headline text-5xl md:text-6xl font-extrabold tracking-tight mb-8 uppercase leading-[1.1]">
              Showcase Your Craft to the World's Most <span className="text-[#cf6317] italic font-light">Discerning Eyes.</span>
            </h2>
            <p className="font-body text-base md:text-lg text-white/60 mb-16 max-w-2xl mx-auto">
              Join an elite circle of artisans and manufacturers. Gain access to our global distribution network and premium customer base.
            </p>
            <div className="bg-[#1c1b1b] p-8 md:p-16 text-left max-w-3xl mx-auto border border-white/10 relative">
              <div className="absolute top-0 right-0 p-8 opacity-10 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="m11 17 2 2 4-4"></path><path d="m8.5 2-3.5 3.5 3.5 3.5"></path><path d="M12 2 8.5 5.5 12 9"></path><path d="M18 7H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Z"></path></svg>
              </div>
              <h3 className="font-headline text-3xl font-bold mb-4 relative z-10">Join the Studio</h3>
              <div className="flex items-baseline gap-3 mb-10 relative z-10">
                <span className="font-headline text-5xl font-extrabold">$10,000</span>
                <span className="font-label text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase">/ MONTHLY SUBSCRIPTION</span>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 font-body text-sm text-white/80 mb-12 relative z-10">
                <li className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#cf6317" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                  Global Logistics & Fulfillment Integration
                </li>
                <li className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#cf6317" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                  Exclusive "Editorial Spotlight" Features
                </li>
                <li className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#cf6317" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                  Direct High-Net-Worth Lead Generation
                </li>
                <li className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#cf6317" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                  Digital Showroom Architecture
                </li>
              </ul>
              <button className="bg-white text-black px-10 py-5 font-label text-[10px] font-extrabold tracking-[0.2em] hover:bg-[#cf6317] transition-all uppercase w-full sm:w-auto relative z-10">
                Apply for Vendor Access
              </button>
            </div>
          </div>
        </section>

        <section className="py-32 px-6 md:px-12 max-w-[1400px] mx-auto">
          <div className="flex items-center gap-6 w-full mb-16">
            <div className="h-px bg-black/10 flex-1"></div>
            <span className="font-label text-[10px] font-bold tracking-[0.4em] text-black/40 uppercase">THE JOURNAL</span>
            <div className="h-px bg-black/10 flex-1"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="group cursor-pointer">
              <div className="aspect-[16/9] mb-6 overflow-hidden bg-[#e5e2dd]">
                <img alt="Journal Article" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOLHrQHpP15CHRIIQXaEQP-HEnQyEyxMUzlukgGVPzHvc1kgUSOs0WrkhlYWD_Z0M9iEwqF_3nZ_mh6sQdbQ3qJkSER3zzqH2_VzrFO_8xH5xNYstuxxfrnd4lw4lIMgbFiz03C-18RQS96JZhgafZQ5h16U_qTc0wYVUk3Sf67JVne39tzgI-19WdqrSi6rHA5GhXyC5GDso42i0SaLL67oMuH336PxvThk4uGvGgpwVPgoHYPfPbDmyEQNTxNb__DWwG4vZeuVMl" />
              </div>
              <span className="font-label text-[10px] font-bold tracking-[0.2em] text-[#cf6317] uppercase mb-3 block">ESSAY</span>
              <h3 className="font-headline text-2xl font-bold mb-3 leading-tight group-hover:text-[#cf6317] transition-colors">The Weight of Silence: Minimalism in 2024</h3>
              <p className="font-body text-sm text-black/60 line-clamp-2">Exploring why high-end residential spaces are moving toward monolithic forms and rejecting ornamentation in favor of absolute material presence.</p>
            </div>
            <div className="group cursor-pointer">
              <div className="aspect-[16/9] mb-6 overflow-hidden bg-[#e5e2dd]">
                <img alt="Journal Article" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfZMhs4icujLnFuggbQBVMGdZkeOH05TWHc2aeuNOLC84jyLEOsInwLTjnTm-_6qs32yJg66Bh9GYJW2YTX5aiq_DNWUNcW5wkWLGp5HhLsbBUh6eGeORLdEb08Z7b19WIBeeLR2M71_q6ViHm6bW9K2vqP4n2bsbnEVX4JuWC_RX28Oo7EkNKPiCBAqPwlU_FABtuFOH3LGL0XuM4M5RdecgN_QP-p_HkDCi1ieNGkbmYwwDwTxaDxy7oZDH_22IPHoO7i0rsfTBA" />
              </div>
              <span className="font-label text-[10px] font-bold tracking-[0.2em] text-[#cf6317] uppercase mb-3 block">CRAFT</span>
              <h3 className="font-headline text-2xl font-bold mb-3 leading-tight group-hover:text-[#cf6317] transition-colors">The Alchemy of Hand-Charred Oak</h3>
              <p className="font-body text-sm text-black/60 line-clamp-2">A look into the ancient techniques used in the Obsidian collection, translating fire into a permanent architectural finish.</p>
            </div>
            <div className="group cursor-pointer">
              <div className="aspect-[16/9] mb-6 overflow-hidden bg-[#e5e2dd]">
                <img alt="Journal Article" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTS2WvWXL1c76QlfWJLrIrTRc2SaaVSFKUC1HQ1TsfBEt54ZtLxyprF5KZH1shlnPc1DuBcuFnK85KfViAHDBW0LJJKKOiGRu0_qpzWRDBnwOK7nYkVT7yvkBNVB_F1167VGLCR3RzSlAw7BOrUB30hDXaEjq8hyk9ZEZpwIeQSdzSMX5kAueynlW3A2A-lk5t_hLu510vshNAS4l8yLgvny2RTCNA4gxnnzGNWPDTCAssBIr7EHZAuYHseHy0XEgMkDBnzZjmF1T7" />
              </div>
              <span className="font-label text-[10px] font-bold tracking-[0.2em] text-[#cf6317] uppercase mb-3 block">INTERIOR</span>
              <h3 className="font-headline text-2xl font-bold mb-3 leading-tight group-hover:text-[#cf6317] transition-colors">Curating the Master Suite</h3>
              <p className="font-body text-sm text-black/60 line-clamp-2">Five principles for balancing luxury and intimacy in private spaces, featuring selecting pieces from the newly launched Nocturne series.</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
