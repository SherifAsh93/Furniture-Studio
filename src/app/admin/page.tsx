export default function AdminControlCenter() {
  return (
    <div className="bg-surface text-on-surface min-h-[max(884px,100dvh)] font-body">
      <header className="fixed top-0 w-full z-50 bg-[#fcf9f4]/80 dark:bg-[#1c1b1b]/80 backdrop-blur-xl shadow-[0px_20px_40px_rgba(28,28,25,0.04)] flex justify-between items-center px-6 py-4 max-w-full transition-colors duration-300">
        <div className="flex items-center gap-4">
          <button className="text-[#1c1c19] dark:text-[#fcf9f4] cursor-pointer" aria-label="Menu">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="18" x2="20" y2="18"></line></svg>
          </button>
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="bg-white overflow-hidden w-10 h-10 rounded-lg flex items-center justify-center border border-outline-variant/30">
              <img alt="Furniture Studio Logo" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYzwpRTmQxUU1zbZR1afOETDBbBv0B_OTy3uSZi1M-zr3D4OJhAdZ0rdtuJJVMreSJlhnXVbub7ICKPYtOIzIlBG9k9G0KaWgp5bzWDrziAUAXbS75sIc3Sa16PXvXkieA209VMEJWQLh75Mx7kidMOOdwBqHjOv2WfUJmMX9ythFYjuEt9oemiO96XkY7XFbPGpzOadEvAVB0kaJ83HKjGXKjarlpsAFZuyYWNGqW9BTJorDxFA9LYqQLpix6hr6C5-ehOtP7Soa7" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-headline text-xl tracking-tight font-bold text-black dark:text-white uppercase">FURNITURE</span>
              <span className="font-headline text-xl tracking-tight font-light text-black/60 dark:text-white/60 uppercase -mt-0.5">STUDIO</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-black/60 dark:text-white/60 cursor-pointer hover:text-black transition-colors" aria-label="Account">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          </button>
          <button className="text-black/60 dark:text-white/60 cursor-pointer hover:text-black transition-colors" aria-label="Logout">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
          </button>
        </div>
      </header>
      
      <div className="flex pt-16 min-h-screen">
        <aside className="hidden md:flex h-[calc(100vh-64px)] w-80 bg-[#f6f3ee] dark:bg-[#1c1b1b] border-r border-[#c4c7c7]/15 flex-col p-8 gap-6 sticky top-16">
          <div className="mb-4">
            <p className="font-label uppercase tracking-[0.1em] text-[0.75rem] text-[#747878]">NAVIGATION</p>
          </div>
          <nav className="flex flex-col gap-4">
            <a className="flex items-center gap-3 py-2 text-[#747878] hover:bg-[#ffffff] transition-all px-2 rounded" href="#">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
              <span className="font-label uppercase tracking-[0.1em] text-[0.75rem]">COLLECTIONS</span>
            </a>
            <a className="flex items-center gap-3 py-2 text-[#747878] hover:bg-[#ffffff] transition-all px-2 rounded" href="#">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19 7-7 3 3-7 7-3-3z"></path><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="m2 2 5 5"></path><path d="m11 11 5 5"></path></svg>
              <span className="font-label uppercase tracking-[0.1em] text-[0.75rem]">ARTISANS</span>
            </a>
            <a className="flex items-center gap-3 py-2 text-[#735c00] font-bold border-b border-[#735c00] px-2 bg-white/50" href="#">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>
              <span className="font-label uppercase tracking-[0.1em] text-[0.75rem]">DASHBOARD</span>
            </a>
            <a className="flex items-center gap-3 py-2 text-[#747878] hover:bg-[#ffffff] transition-all px-2 rounded" href="#">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path><polyline points="3.29 7 12 12 20.71 7"></polyline><line x1="12" y1="22" x2="12" y2="12"></line></svg>
              <span className="font-label uppercase tracking-[0.1em] text-[0.75rem]">INVENTORY</span>
            </a>
            <a className="flex items-center gap-3 py-2 text-[#747878] hover:bg-[#ffffff] transition-all px-2 rounded" href="#">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
              <span className="font-label uppercase tracking-[0.1em] text-[0.75rem]">SETTINGS</span>
            </a>
          </nav>
        </aside>

        <main className="flex-1 p-8 md:p-12 max-w-7xl mx-auto w-full">
          <div className="mb-12 border-b border-outline-variant/15 pb-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <span className="text-[0.75rem] font-label uppercase tracking-[0.2em] text-secondary font-bold">Terminal 01</span>
                <h1 className="text-4xl md:text-5xl font-headline font-bold tracking-tight text-primary mt-2">Admin Control Center</h1>
              </div>
              <div className="flex items-center gap-4 bg-surface-container-low px-6 py-4 border border-outline-variant/10 rounded">
                <span className="text-outline">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                </span>
                <div className="flex flex-col">
                  <label className="text-[0.6rem] font-bold tracking-widest uppercase text-outline">Security Code</label>
                  <span className="text-sm font-mono tracking-widest text-primary">••••••91</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="md:col-span-2 bg-primary-container p-8 flex flex-col justify-between min-h-[220px] rounded">
              <div className="flex justify-between items-start">
                <p className="text-[0.7rem] font-bold tracking-[0.2em] text-on-primary-container uppercase">Monthly Revenue</p>
                <span className="text-secondary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>
                </span>
              </div>
              <div>
                <h2 className="text-5xl font-headline text-on-primary italic">$248.5k</h2>
                <p className="text-secondary text-sm mt-2 flex items-center gap-1 font-bold">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
                  12.4% from last month
                </p>
              </div>
            </div>
            
            <div className="bg-surface-container-lowest p-8 flex flex-col justify-between border border-outline-variant/10 shadow-[0px_20px_40px_rgba(28,28,25,0.02)] rounded">
              <div>
                <p className="text-[0.7rem] font-bold tracking-[0.2em] text-outline uppercase">Active Vendors</p>
                <h2 className="text-4xl font-headline text-primary mt-4">1,422</h2>
              </div>
              <div className="w-full bg-surface-container h-1 mt-6 rounded overflow-hidden">
                <div className="bg-secondary h-full w-3/4"></div>
              </div>
            </div>
            
            <div className="bg-surface-container-low p-8 flex flex-col justify-between rounded">
              <div>
                <p className="text-[0.7rem] font-bold tracking-[0.2em] text-outline uppercase">Database Health</p>
                <div className="flex items-center gap-3 mt-4">
                  <span className="w-2 h-2 bg-[#2e7d32] rounded-full"></span>
                  <h2 className="text-xl font-bold tracking-tight text-primary">OPTIMAL</h2>
                </div>
              </div>
              <p className="text-[0.65rem] text-outline mt-4 font-bold">Latency: 24ms</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1 flex flex-col gap-12">
              <section>
                <h3 className="text-xl font-headline font-bold mb-6 flex items-center gap-2">Global Parameters</h3>
                <div className="space-y-8">
                  <div className="bg-surface-container-low p-6 rounded">
                    <label className="block text-[0.7rem] font-bold tracking-widest text-outline uppercase mb-4">Subscription Model</label>
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-sm font-medium">Automatic Recurring Billing</span>
                      <div className="w-12 h-6 bg-secondary flex items-center px-1 rounded-full">
                        <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
                      </div>
                    </div>
                    <div className="relative">
                      <label className="block text-[0.6rem] font-bold tracking-widest text-outline uppercase mb-1">Standard Vendor Fee</label>
                      <div className="flex items-center border-b border-outline-variant/30 focus-within:border-secondary transition-colors">
                        <span className="text-primary font-headline text-xl">$</span>
                        <input className="w-full bg-transparent border-none focus:ring-0 outline-none text-xl font-headline text-primary py-2" type="text" defaultValue="10,000" />
                      </div>
                    </div>
                    <button className="mt-6 w-full py-4 bg-primary text-on-primary text-[0.75rem] font-bold tracking-widest uppercase hover:opacity-90 transition-opacity rounded">Update Configuration</button>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-outline-variant/10">
                      <span className="text-sm text-on-surface-variant">API Gateway</span>
                      <span className="text-[0.6rem] font-bold bg-[#e8f5e9] text-[#2e7d32] px-2 py-0.5 tracking-tighter uppercase rounded">Operational</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-outline-variant/10">
                      <span className="text-sm text-on-surface-variant">Auth Service</span>
                      <span className="text-[0.6rem] font-bold bg-[#e8f5e9] text-[#2e7d32] px-2 py-0.5 tracking-tighter uppercase rounded">Operational</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-outline-variant/10">
                      <span className="text-sm text-on-surface-variant">Image CDN</span>
                      <span className="text-[0.6rem] font-bold bg-[#fff3e0] text-[#ef6c00] px-2 py-0.5 tracking-tighter uppercase rounded">High Load</span>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div className="lg:col-span-2">
              <section>
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-2xl font-headline font-bold">Pending Vendor Approvals</h3>
                  <span className="text-[0.7rem] font-bold text-secondary tracking-widest border border-secondary px-3 py-1 rounded">8 REQUESTS</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-primary/10">
                        <th className="py-4 text-[0.7rem] font-bold tracking-widest text-outline uppercase">Vendor Identity</th>
                        <th className="py-4 text-[0.7rem] font-bold tracking-widest text-outline uppercase">Category</th>
                        <th className="py-4 text-[0.7rem] font-bold tracking-widest text-outline uppercase">Origin</th>
                        <th className="py-4 text-right text-[0.7rem] font-bold tracking-widest text-outline uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/10">
                      <tr className="group hover:bg-surface-container-low transition-colors">
                        <td className="py-6 pl-2">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-surface-container overflow-hidden rounded">
                              <img alt="Atelier Nord" className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_SHvOXm8YKCGRr8fnqdAQ8FQIX2etC1wh_ZNneA40AoP8lWsyRgvfXdBOCJynjjhbsFhKlxrlaB5yniUjN2Ck02mivUPEMC-no-GSwOY6sa1rGHczjdvsjLvEuBTNxQpFNMCusztktCZIMGL2NhTggcPeWYP61FMB1vQdKYwCMhpOiG9G8Tya2c0IW3j_wXFQezgno_MNDZEmALW8fNFepbCJSqZ3vWKo0-IbrNrxwFCbp9_jFemC9uZSnK9DbYzpOEHfDL3Csai0" />
                            </div>
                            <div>
                              <p className="font-bold text-primary text-sm uppercase tracking-tight">Atelier Nord</p>
                              <p className="text-xs text-outline font-bold">joined 2h ago</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-6 text-sm text-on-surface-variant">Furniture / Minimalist</td>
                        <td className="py-6 text-sm text-on-surface-variant font-bold">Copenhagen, DK</td>
                        <td className="py-6 text-right pr-2">
                          <div className="flex justify-end gap-3">
                            <button className="text-[0.65rem] font-bold tracking-widest uppercase text-primary hover:text-secondary transition-colors px-4 py-2 border border-outline-variant/30 rounded">Reject</button>
                            <button className="text-[0.65rem] font-bold tracking-widest uppercase bg-primary text-on-primary px-4 py-2 hover:bg-secondary transition-colors rounded">Approve</button>
                          </div>
                        </td>
                      </tr>
                      <tr className="group hover:bg-surface-container-low transition-colors">
                        <td className="py-6 pl-2">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-surface-container overflow-hidden rounded">
                              <img alt="Studio Marmo" className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTYnzwXxvoIacpB-85JIlWUF6HmfNl3ylq9KncpFBneM15GOS9p4zH-V1rIJexWfyxfqg8e72CyfBV3pxxQ9zGqZDs_YQeA-Wp1z27G4mmkVOsxqq0iDab6UoeIHvXkEEGrpeSN927r6Y9p79561kCgr6yjwZZGWgOrBC5RLvjEk6f_0ZDUAL8GDo7wBK6vCeKzLV_JXBp_AH1367N6JpYvuDCbE2IZGWULMeMgAIt5bREmIWwnIsDMAvFlHmFNLnYxmXKMR6NOQ1n" />
                            </div>
                            <div>
                              <p className="font-bold text-primary text-sm uppercase tracking-tight">Studio Marmo</p>
                              <p className="text-xs text-outline font-bold">joined 5h ago</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-6 text-sm text-on-surface-variant">Lighting / Stone</td>
                        <td className="py-6 text-sm text-on-surface-variant font-bold">Milan, IT</td>
                        <td className="py-6 text-right pr-2">
                          <div className="flex justify-end gap-3">
                            <button className="text-[0.65rem] font-bold tracking-widest uppercase text-primary hover:text-secondary transition-colors px-4 py-2 border border-outline-variant/30 rounded">Reject</button>
                            <button className="text-[0.65rem] font-bold tracking-widest uppercase bg-primary text-on-primary px-4 py-2 hover:bg-secondary transition-colors rounded">Approve</button>
                          </div>
                        </td>
                      </tr>
                      <tr className="group hover:bg-surface-container-low transition-colors">
                        <td className="py-6 pl-2">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-surface-container overflow-hidden rounded">
                              <img alt="Ember & Ash" className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6-5xIiQveYTSqRN7JiBY_lHLH8yTRxtMqENpTP95_cl9PGoehw6dixVvtOqpVY81DY3TM1TBz9VoBW7z4KucRFIXbwYm00lb1JQu_7T4XpqShj9GHKSumf19fg25O48OEz3AIf0MQuId0r5zZl48Wfr01YWoz4WnR8yVGv6O9w68b3NZI7Etb0lBMpbEpT-Rg2tOAYApkP_Tgtqph8pEbBTfTCH3KHkAlo14scWEemXyvoC2N-rXvCiHvPcIJ0onp3gz5UNq-2MTI" />
                            </div>
                            <div>
                              <p className="font-bold text-primary text-sm uppercase tracking-tight">Ember & Ash</p>
                              <p className="text-xs text-outline font-bold">joined yesterday</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-6 text-sm text-on-surface-variant">Textiles / Hand-dyed</td>
                        <td className="py-6 text-sm text-on-surface-variant font-bold">Portland, US</td>
                        <td className="py-6 text-right pr-2">
                          <div className="flex justify-end gap-3">
                            <button className="text-[0.65rem] font-bold tracking-widest uppercase text-primary hover:text-secondary transition-colors px-4 py-2 border border-outline-variant/30 rounded">Reject</button>
                            <button className="text-[0.65rem] font-bold tracking-widest uppercase bg-primary text-on-primary px-4 py-2 hover:bg-secondary transition-colors rounded">Approve</button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-8">
                  <button className="text-[0.7rem] font-bold tracking-[0.2em] text-secondary uppercase border-b border-secondary pb-1 hover:text-primary transition-colors">View All Requests (34)</button>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>

      <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center py-4 bg-[#fcf9f4] dark:bg-[#1c1b1b] border-t border-[#c4c7c7]/10 z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
        <a className="flex flex-col items-center text-[#735c00]" href="/">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          <span className="font-label text-[10px] tracking-widest uppercase mt-1">HOME</span>
        </a>
        <a className="flex flex-col items-center text-[#747878]" href="/#search">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <span className="font-label text-[10px] tracking-widest uppercase mt-1">SEARCH</span>
        </a>
        <a className="flex flex-col items-center text-[#747878]" href="/#favorites">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          <span className="font-label text-[10px] tracking-widest uppercase mt-1">WISHLIST</span>
        </a>
        <a className="flex flex-col items-center text-[#747878]" href="/admin">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          <span className="font-label text-[10px] tracking-widest uppercase mt-1">ACCOUNT</span>
        </a>
      </nav>

      <footer className="bg-[#1c1b1b] text-[#fcf9f4] w-full py-16 px-8 flex flex-col md:flex-row justify-between items-center gap-8 border-t border-white/5">
        <div className="flex flex-col items-center md:items-start gap-4">
          <span className="font-headline italic text-2xl tracking-tighter font-bold">THE EDITORIAL COLLECTIVE</span>
          <p className="font-label text-[0.7rem] tracking-widest uppercase text-[#c4c7c7]">© 2024 THE EDITORIAL COLLECTIVE. ALL RIGHTS RESERVED.</p>
        </div>
        <div className="flex gap-8">
          <a className="font-label text-[0.7rem] tracking-widest uppercase text-[#c4c7c7] hover:text-[#735c00] transition-colors" href="#">PRIVACY</a>
          <a className="font-label text-[0.7rem] tracking-widest uppercase text-[#c4c7c7] hover:text-[#735c00] transition-colors" href="#">TERMS</a>
          <a className="font-label text-[0.7rem] tracking-widest uppercase text-[#c4c7c7] hover:text-[#735c00] transition-colors" href="#">SHIPPING</a>
          <a className="font-label text-[0.7rem] tracking-widest uppercase text-[#c4c7c7] hover:text-[#735c00] transition-colors" href="#">CONTACT</a>
        </div>
      </footer>
    </div>
  );
}
