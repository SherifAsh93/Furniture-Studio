'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { getAdminData, updateUserStatus, deleteUser, getSiteSettings, updateSiteSettings, deleteProduct, updateProduct } from '@/app/actions/data';
import { useEffect, useState } from 'react';

export default function AdminControlCenter() {
  const { loading: authLoading } = useAuth();
  const [adminData, setAdminData] = useState<any>(null);
  const [dataLoading, setDataLoading] = useState(false);
  const [pin, setPin] = useState('');
  const [isPinCorrect, setIsPinCorrect] = useState(false);
  const [pinError, setPinError] = useState(false);

  // Check session PIN on mount
  useEffect(() => {
    const savedPin = sessionStorage.getItem('admin_pin_verified');
    if (savedPin === 'true') {
      setIsPinCorrect(true);
    }
  }, []);

  const [activeTab, setActiveTab] = useState<'dashboard' | 'directory' | 'inventory' | 'transactions' | 'commissions' | 'aesthetics'>('dashboard');
  const [siteSettings, setSiteSettings] = useState<any>({
    heroTitle: '',
    heroSubtitle: '',
    heroDescription: '',
    heroImage: '',
  });

  // Only fetch admin data after PIN is verified
  useEffect(() => {
    if (!isPinCorrect) return;
    async function fetchData() {
      setDataLoading(true);
      const [data, settings] = await Promise.all([
        getAdminData(),
        getSiteSettings()
      ]);
      setAdminData(data);
      if (settings) setSiteSettings(settings);
      setDataLoading(false);
    }
    fetchData();
  }, [isPinCorrect]);

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '114891') {
      setIsPinCorrect(true);
      setPinError(false);
      sessionStorage.setItem('admin_pin_verified', 'true');
    } else {
      setPinError(true);
    }
  };

  const handleStatusUpdate = async (userId: string, status: string) => {
    const res = await updateUserStatus(userId, status);
    if (res.success) {
      const data = await getAdminData();
      setAdminData(data);
    }
  };

  const handleDelete = async (userId: string) => {
    if (confirm('Are you sure you want to delete this user? This will also delete their products, orders, and negotiations.')) {
      const res = await deleteUser(userId);
      if (res.success) {
        const data = await getAdminData();
        setAdminData(data);
      }
    }
  };

  const handleDeleteProduct = async (prodId: string) => {
    if (confirm('Are you sure you want to delete this product listing?')) {
      const res = await deleteProduct(prodId);
      if (res.success) {
        const data = await getAdminData();
        setAdminData(data);
      }
    }
  };

  const handleSettingsUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setDataLoading(true);
    const res = await updateSiteSettings(siteSettings);
    if (res.success) {
      alert('Aesthetics Published Successfully');
    }
    setDataLoading(false);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }



  if (!isPinCorrect) {
    return (
      <div className="min-h-screen bg-[#1c1b1b] flex flex-col items-center justify-center p-8 text-[#fcf9f4]">
        <div className="w-full max-w-md bg-white/5 p-12 backdrop-blur-xl border border-white/10 text-center">
          <div className="mb-8 opacity-40">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mx-auto"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
          </div>
          <h1 className="text-2xl font-headline font-bold mb-2 uppercase tracking-tight">Terminal Authorization</h1>
          <p className="text-[0.65rem] font-bold tracking-widest uppercase opacity-40 mb-8">Enter security PIN to bypass encryption</p>
          
          <form onSubmit={handlePinSubmit} className="space-y-6">
            <input 
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="••••••"
              autoFocus
              className="w-full bg-white/5 border-b border-white/20 px-4 py-4 text-center text-2xl font-mono tracking-[1em] focus:border-white focus:outline-none transition-all placeholder:opacity-20"
            />
            {pinError && <p className="text-xs text-secondary font-bold uppercase tracking-widest animate-shake">Incorrect Security PIN</p>}
            <button 
              type="submit"
              className="w-full py-4 bg-primary text-on-primary font-bold tracking-[0.2em] uppercase text-[0.7rem] hover:opacity-90 transition-opacity"
            >
              Authorize Terminal
            </button>
          </form>
        </div>
        <Link href="/" className="mt-8 text-[0.6rem] font-bold uppercase tracking-widest opacity-30 hover:opacity-100 transition-opacity">Abort Access Attempt</Link>
      </div>
    );
  }

  return (
    <div className="bg-surface text-on-surface font-body antialiased selection:bg-secondary selection:text-on-secondary min-h-screen">
      <header className="fixed top-0 w-full z-[60] bg-[#fcf9f4]/90 dark:bg-[#1c1b1b]/90 backdrop-blur-xl border-b border-black/5 flex justify-between items-center px-4 md:px-6 py-4 transition-colors duration-300">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-white overflow-hidden w-8 h-8 rounded-lg flex items-center justify-center border border-outline-variant/30">
              <img alt="Logo" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=100&auto=format&fit=crop"/>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-headline text-lg tracking-tight font-bold text-black dark:text-white uppercase">FURNITURE</span>
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-4">
           <span className="hidden sm:block text-[10px] font-mono tracking-widest uppercase opacity-40">Admin Terminal</span>
           <button onClick={() => { sessionStorage.removeItem('admin_pin_verified'); window.location.reload(); }} className="text-[9px] font-bold uppercase tracking-widest text-secondary border border-secondary/20 px-3 py-1 hover:bg-secondary hover:text-white transition-all">Lock</button>
        </div>
      </header>

      {/* Mobile Tab Navigation */}
      <div className="fixed top-16 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-black/5 md:hidden overflow-x-auto scrollbar-hide">
        <div className="flex px-4 min-w-max">
          {['dashboard', 'directory', 'inventory', 'transactions', 'commissions', 'aesthetics'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`whitespace-nowrap px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] transition-all border-b-2 ${activeTab === tab ? 'border-black text-black' : 'border-transparent text-black/30'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="flex pt-32 md:pt-16 min-h-screen">
        <aside className="hidden md:flex h-[calc(100vh-64px)] w-80 bg-[#f6f3ee] dark:bg-[#1c1b1b] border-r border-[#c4c7c7]/15 flex-col p-8 gap-6 sticky top-16">
          <nav className="flex flex-col gap-4">
            {['dashboard', 'directory', 'inventory', 'transactions', 'commissions', 'aesthetics'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`text-left py-3 px-4 uppercase tracking-widest text-[0.7rem] transition-all border-l-2 ${activeTab === tab ? 'border-[#735c00] text-[#735c00] font-bold bg-black/5' : 'border-transparent text-[#747878] hover:bg-black/5'}`}
              >
                {tab.replace('_', ' ')}
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 p-6 md:p-12 max-w-7xl mx-auto w-full overflow-x-hidden">
          <div className="mb-8 md:mb-12 border-b border-outline-variant/15 pb-6 md:pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-secondary">Operational Oversight</span>
              <h1 className="text-3xl md:text-4xl font-headline font-bold tracking-tight text-primary mt-2 uppercase">{activeTab.replace('_', ' ')} Control</h1>
            </div>
          </div>

          {activeTab === 'dashboard' && (
            <div className="space-y-16">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {[
                  { label: 'Total Users', value: adminData?.users?.length || 0, color: 'bg-black text-white shadow-xl shadow-black/10' },
                  { label: 'Active Listings', value: adminData?.allProducts?.length || 0, color: 'bg-surface-variant' },
                  { label: 'Total Orders', value: adminData?.allOrders?.length || 0, color: 'bg-white border border-black/5 premium-shadow' },
                  { label: 'Custom Requests', value: adminData?.allRequests?.length || 0, color: 'bg-surface-variant' }
                ].map((stat, i) => (
                  <div key={i} className={`p-8 flex flex-col justify-between min-h-[140px] rounded-2xl transition-all hover:scale-[1.02] ${stat.color}`}>
                    <p className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-40">{stat.label}</p>
                    <h2 className="text-4xl font-headline italic font-bold tracking-tighter">{stat.value}</h2>
                  </div>
                ))}
              </div>

              <section>
                <h3 className="text-xl font-headline font-bold uppercase tracking-widest mb-8 border-l-4 border-secondary pl-4">Pending Approvals</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <tbody className="divide-y divide-outline-variant/10">
                      {adminData?.pendingVendors?.map((vendor: any) => (
                        <tr key={vendor.id} className="group hover:bg-surface-container-low transition-colors">
                          <td className="py-6 pr-8">
                            <p className="font-bold text-primary text-sm uppercase">{vendor.companyName || vendor.name}</p>
                            <p className="text-[0.6rem] font-bold uppercase tracking-widest opacity-40">{vendor.email}</p>
                          </td>
                          <td className="py-6 pr-8 text-xs font-bold uppercase opacity-60">{vendor.name}</td>
                          <td className="py-6 text-right flex justify-end gap-3">
                            <button onClick={() => handleStatusUpdate(vendor.id, 'REJECTED')} className="text-[0.65rem] font-bold tracking-widest uppercase border border-outline-variant/30 px-3 py-1.5 hover:border-error transition-colors">Reject</button>
                            <button onClick={() => handleStatusUpdate(vendor.id, 'ACTIVE')} className="text-[0.65rem] font-bold tracking-widest uppercase bg-primary text-on-primary px-3 py-1.5 hover:bg-secondary transition-colors">Approve</button>
                          </td>
                        </tr>
                      ))}
                      {(!adminData?.pendingVendors || adminData.pendingVendors.length === 0) && (
                        <tr><td className="py-12 text-center text-[0.65rem] font-bold uppercase tracking-[0.3em] opacity-30">No requests pending review</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-headline font-bold uppercase tracking-widest mb-8 border-l-4 border-secondary pl-4">Global Users</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-outline-variant/10">
                        <th className="py-4 text-[0.65rem] font-bold uppercase tracking-widest opacity-40">User</th>
                        <th className="py-4 text-[0.65rem] font-bold uppercase tracking-widest opacity-40">Role</th>
                        <th className="py-4 text-right text-[0.65rem] font-bold uppercase tracking-widest opacity-40">Command</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/10 text-[0.7rem] font-bold uppercase tracking-widest">
                      {adminData?.users?.map((u: any) => (
                        <tr key={u.id}>
                          <td className="py-6 pr-8">
                            <p className="text-primary">{u.name}</p>
                            <p className="opacity-40">{u.email}</p>
                          </td>
                          <td className="py-6 pr-8">
                            <span className={`px-2 py-0.5 rounded text-[0.55rem] ${u.role === 'ADMIN' ? 'bg-secondary text-white' : u.role === 'VENDOR' ? 'bg-primary text-white' : 'bg-surface-container text-outline'}`}>{u.role}</span>
                          </td>
                          <td className="py-6 text-right">
                            {u.role !== 'ADMIN' && <button onClick={() => handleDelete(u.id)} className="text-error hover:scale-105 transition-all">Destroy</button>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          )}

          {activeTab === 'directory' && (
            <div className="space-y-12">
              <div className="bg-[#f6f3ee] p-8 border border-black/5">
                <p className="text-[0.65rem] font-bold tracking-widest uppercase opacity-40 mb-2">DIRECTORY OVERVIEW</p>
                <p className="font-body text-sm text-on-surface-variant">Manage vendors displayed on the Directory (/artisans) page. Each vendor's shop name and product images are shown publicly.</p>
              </div>
              
              {adminData?.users?.filter((u: any) => u.role === 'VENDOR').length === 0 && (
                <div className="py-20 text-center">
                  <p className="text-[0.65rem] font-bold uppercase tracking-[0.3em] opacity-30">No vendors registered yet</p>
                </div>
              )}

              {adminData?.users?.filter((u: any) => u.role === 'VENDOR').map((vendor: any) => {
                const vendorProducts = adminData?.allProducts?.filter((p: any) => p.vendorId === vendor.id) || [];
                return (
                  <div key={vendor.id} className="border border-outline-variant/15 bg-white">
                    {/* Vendor Header */}
                    <div className="p-8 border-b border-outline-variant/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#735c00] flex items-center justify-center text-white font-bold text-lg">
                          {(vendor.companyName || vendor.name || 'A')[0].toUpperCase()}
                        </div>
                        <div>
                          <h3 className="font-headline text-xl font-bold uppercase tracking-tight">{vendor.companyName || vendor.name}</h3>
                          <p className="text-[0.6rem] font-bold uppercase tracking-widest opacity-40">{vendor.email} — {vendor.city || 'No Location'}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1.5 text-[0.55rem] font-bold uppercase tracking-widest ${
                          vendor.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 
                          vendor.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'
                        }`}>{vendor.status}</span>
                        {vendor.status === 'PENDING' && (
                          <button onClick={() => handleStatusUpdate(vendor.id, 'ACTIVE')} className="text-[0.65rem] font-bold tracking-widest uppercase bg-primary text-on-primary px-4 py-1.5 hover:bg-secondary transition-colors">Approve</button>
                        )}
                        {vendor.status === 'ACTIVE' && (
                          <button onClick={() => handleStatusUpdate(vendor.id, 'REJECTED')} className="text-[0.65rem] font-bold tracking-widest uppercase border border-error/30 text-error px-4 py-1.5 hover:bg-error/5 transition-colors">Suspend</button>
                        )}
                        {vendor.status === 'REJECTED' && (
                          <button onClick={() => handleStatusUpdate(vendor.id, 'ACTIVE')} className="text-[0.65rem] font-bold tracking-widest uppercase border border-green-600/30 text-green-700 px-4 py-1.5 hover:bg-green-50 transition-colors">Re-activate</button>
                        )}
                      </div>
                    </div>
                    {/* Product Grid */}
                    <div className="p-8">
                      <p className="text-[0.6rem] font-bold tracking-widest uppercase opacity-40 mb-4">{vendorProducts.length} PRODUCT{vendorProducts.length !== 1 ? 'S' : ''} LISTED</p>
                      {vendorProducts.length === 0 ? (
                        <div className="py-8 text-center border-2 border-dashed border-outline-variant/15 bg-[#fcf9f4]">
                          <p className="text-[0.6rem] font-bold uppercase tracking-widest opacity-30">No products uploaded yet</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
                          {vendorProducts.map((prod: any) => (
                            <div key={prod.id} className="group/prod border border-outline-variant/10 bg-[#fcf9f4] transition-all hover:shadow-lg">
                              <div className="aspect-square relative overflow-hidden">
                                <img 
                                  alt={prod.title} 
                                  className="w-full h-full object-cover transition-all duration-500 group-hover/prod:scale-110" 
                                  src={prod.images?.[0] || 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&q=60'}
                                />
                              </div>
                              <div className="p-3">
                                <h4 className="font-headline text-xs uppercase tracking-tight font-bold truncate">{prod.title}</h4>
                                <p className="text-[0.55rem] font-bold tracking-widest uppercase opacity-40">EGP {new Intl.NumberFormat().format(prod.price)}</p>
                                <div className="flex gap-2 mt-2">
                                  <span className="text-[0.5rem] font-bold uppercase tracking-widest opacity-30">Stock: {prod.stock}</span>
                                </div>
                                <button 
                                  onClick={() => handleDeleteProduct(prod.id)} 
                                  className="w-full mt-3 py-2 border border-error/20 text-error text-[0.55rem] font-bold uppercase tracking-widest hover:bg-error/5 transition-colors"
                                >Remove</button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          
          {activeTab === 'inventory' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {adminData?.allProducts?.map((prod: any) => (
                <div key={prod.id} className="group border border-outline-variant/10 bg-surface-container-low transition-all">
                  <div className="aspect-square relative overflow-hidden">
                    <img alt={prod.title} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" src={prod.images?.[0] || 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7'}/>
                    <div className="absolute top-4 left-4 bg-primary text-on-primary px-3 py-1 text-[0.6rem] font-bold uppercase tracking-widest">{prod.vendor.companyName || 'Artisan'}</div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-headline text-lg uppercase tracking-tight font-bold mb-1">{prod.title}</h3>
                    <p className="text-[0.6rem] font-bold tracking-widest uppercase opacity-40 mb-6">EGP {prod.price} — Stock: {prod.stock}</p>
                    <button onClick={() => handleDeleteProduct(prod.id)} className="w-full py-4 border border-error/20 text-error text-[0.65rem] font-bold uppercase tracking-widest hover:bg-error/5 transition-colors">DE-LIST PRODUCT</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'transactions' && (
            <div className="overflow-x-auto bg-surface-container-low border border-outline-variant/15 p-4 md:p-8">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead className="border-b border-primary/10">
                  <tr className="text-[0.65rem] font-bold uppercase tracking-widest opacity-40">
                    <th className="py-4">Identifier</th>
                    <th className="py-4">Customer</th>
                    <th className="py-4">Items</th>
                    <th className="py-4 text-right">Revenue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10 text-[0.7rem] font-bold uppercase tracking-widest">
                  {adminData?.allOrders?.map((order: any) => (
                    <tr key={order.id} className="hover:bg-black/5 transition-colors">
                      <td className="py-6 text-primary">{order.id.slice(-8).toUpperCase()}</td>
                      <td className="py-6">
                        <p>{order.customer?.name || 'Guest'}</p>
                        <p className="opacity-40 lowercase">{order.customer?.email}</p>
                      </td>
                      <td className="py-6">
                        <div className="space-y-1">
                           <p>{order.items?.[0]?.product?.title || 'Artifact'}</p>
                           {order.items?.length > 1 && <p className="opacity-40 text-[10px]">+{order.items.length - 1} more items</p>}
                        </div>
                      </td>
                      <td className="py-6 text-right whitespace-nowrap text-sm font-headline">EGP {new Intl.NumberFormat().format(order.total)}</td>
                    </tr>
                  ))}
                  {(!adminData?.allOrders || adminData.allOrders.length === 0) && (
                    <tr>
                      <td colSpan={4} className="py-24 text-center text-outline uppercase tracking-widest font-bold opacity-30">No transactions recorded yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'commissions' && (
            <div className="space-y-6">
              {adminData?.allRequests?.map((req: any) => (
                <div key={req.id} className="bg-surface-container-low p-8 border border-outline-variant/15 flex justify-between items-center group hover:border-primary/30 transition-all">
                  <div>
                    <div className="flex gap-4 mb-2">
                       <span className="bg-secondary text-white px-3 py-1 text-[0.6rem] font-bold uppercase">{req.category}</span>
                       <span className="text-[0.6rem] font-bold opacity-40 tracking-widest uppercase">{req.status}</span>
                    </div>
                    <p className="text-lg font-headline font-bold uppercase text-primary">{req.material} Custom {req.category}</p>
                    <p className="text-[0.65rem] font-bold uppercase opacity-60 mt-1">
                      {req.customer.name} → {req.vendor.companyName || req.vendor.name}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[0.65rem] font-headline font-bold uppercase opacity-40">{new Date(req.createdAt).toLocaleDateString()}</p>
                    <p className="text-sm font-bold uppercase mt-1">QTY: {req.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'aesthetics' && (
            <section className="bg-surface-container-low p-12 border border-outline-variant/15 border-dashed max-w-4xl">
              <div className="mb-12">
                <h3 className="text-2xl font-headline font-bold uppercase tracking-tight mb-2 italic">Aesthetic Directives</h3>
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-outline opacity-50">Global overrides for atmospheric branding</p>
              </div>
              <form onSubmit={handleSettingsUpdate} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="group">
                    <label className="font-label text-[10px] uppercase text-outline tracking-widest mb-2 block font-bold">Hero Title</label>
                    <input className="w-full bg-transparent border-0 border-b border-outline-variant/40 py-4 px-0 focus:ring-0 focus:border-primary transition-colors text-primary font-headline text-3xl uppercase font-bold outline-none" value={siteSettings.heroTitle} onChange={(e) => setSiteSettings({...siteSettings, heroTitle: e.target.value})}/>
                  </div>
                  <div className="group">
                    <label className="font-label text-[10px] uppercase text-outline tracking-widest mb-2 block font-bold">Editorial Subtitle</label>
                    <input className="w-full bg-transparent border-0 border-b border-outline-variant/40 py-4 px-0 focus:ring-0 focus:border-primary transition-colors text-primary font-label text-sm tracking-widest uppercase font-bold outline-none" value={siteSettings.heroSubtitle} onChange={(e) => setSiteSettings({...siteSettings, heroSubtitle: e.target.value})}/>
                  </div>
                </div>
                <div className="group">
                  <label className="font-label text-[10px] uppercase text-outline tracking-widest mb-2 block font-bold">Manifesto / Mission</label>
                  <textarea className="w-full bg-transparent border-0 border-b border-outline-variant/40 py-4 px-0 focus:ring-0 focus:border-primary transition-colors text-primary font-body text-base leading-relaxed outline-none resize-none" rows={3} value={siteSettings.heroDescription} onChange={(e) => setSiteSettings({...siteSettings, heroDescription: e.target.value})}/>
                </div>
                <div className="group">
                  <label className="font-label text-[10px] uppercase text-outline tracking-widest mb-2 block font-bold">Backdrop (URL)</label>
                  <input className="w-full bg-transparent border-0 border-b border-outline-variant/40 py-4 px-0 focus:ring-0 focus:border-primary transition-colors text-primary font-body text-sm outline-none" value={siteSettings.heroImage} onChange={(e) => setSiteSettings({...siteSettings, heroImage: e.target.value})}/>
                  {siteSettings.heroImage && <div className="mt-8 aspect-video w-full bg-surface-variant overflow-hidden border border-outline-variant/10"><img src={siteSettings.heroImage} className="w-full h-full object-cover" /></div>}
                </div>
                <div className="pt-8 border-t border-outline-variant/10">
                  <button type="submit" disabled={dataLoading} className="px-12 py-5 bg-primary text-on-primary font-bold tracking-[0.3em] uppercase text-[0.75rem] hover:bg-secondary transition-all disabled:opacity-50">{dataLoading ? 'SYNCING ARCHIVE...' : 'PUBLISH AESTHETICS'}</button>
                </div>
              </form>
            </section>
          )}
        </main>
      </div>

      <footer className="bg-[#1c1b1b] text-[#fcf9f4] w-full py-16 px-8 flex flex-col md:flex-row justify-between items-center border-t border-white/5 gap-8">
        <div className="flex flex-col items-start gap-4 text-center md:text-left">
          <span className="font-headline italic text-2xl tracking-tighter font-bold uppercase">THE EDITORIAL COLLECTIVE</span>
          <p className="font-body text-[0.7rem] tracking-widest uppercase text-[#c4c7c7] font-bold">© 2024 THE EDITORIAL COLLECTIVE. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div>
  );
}
