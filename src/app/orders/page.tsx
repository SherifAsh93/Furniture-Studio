'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getCustomerOrders } from '@/app/actions/data';
import { useRouter } from 'next/navigation';

export default function OrdersPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = React.useCallback(async () => {
    if (!user?.id) return;
    const res = await getCustomerOrders(user.id);
    if (res.success) {
      setOrders(res.orders || []);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    if (!user && !loading) {
      router.push('/');
      return;
    }
    fetchOrders();
  }, [user, router, fetchOrders]);

  const handleDeleteOrder = async (orderId: string) => {
    if (!confirm('Are you sure you want to cancel this order? This action cannot be undone.')) return;
    const res = await (await import('@/app/actions/data')).deleteOrder(orderId);
    if (res.success) {
      fetchOrders();
    } else {
      alert(res.error || 'Failed to cancel order');
    }
  };

  const handleUpdateQuantity = async (itemId: string, currentQty: number) => {
    const newQtyStr = window.prompt('Enter new quantity:', currentQty.toString());
    if (newQtyStr === null) return;
    const newQty = parseInt(newQtyStr);
    if (isNaN(newQty) || newQty < 1) {
      alert('Please enter a valid quantity (min 1)');
      return;
    }
    const res = await (await import('@/app/actions/data')).updateOrderItem(itemId, { quantity: newQty });
    if (res.success) {
      fetchOrders();
    } else {
      alert(res.error || 'Failed to update quantity');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fcf9f4]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
          <span className="font-label text-[10px] tracking-widest uppercase font-bold text-black/40">Synchronizing Archive...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcf9f4] py-24 md:py-32">
       <div className="container mx-auto px-6 max-w-5xl">
          <div className="mb-16">
             <span className="text-[#a1824a] font-label text-[10px] tracking-widest uppercase mb-4 block font-bold">Client History</span>
             <h1 className="font-headline text-5xl font-bold tracking-tight uppercase">Procurement <br/>Archive</h1>
          </div>

          <div className="space-y-12">
             {orders.length === 0 ? (
               <div className="py-32 bg-white rounded-3xl border border-black/5 text-center space-y-6">
                  <div className="opacity-10">
                     <svg className="mx-auto" xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                  </div>
                  <div className="space-y-2">
                     <h3 className="font-headline text-2xl uppercase font-bold">No Records Found</h3>
                     <p className="font-body text-on-surface-variant max-w-xs mx-auto italic">Your Studio collection is currently empty. Explore our latest discoveries to begin your curation.</p>
                  </div>
                  <button onClick={() => router.push('/')} className="px-10 py-5 bg-black text-white font-label text-[10px] tracking-widest uppercase hover:bg-[#a1824a] transition-all font-bold">
                     BROWSE THE SERIES
                  </button>
               </div>
             ) : (
               orders.map(order => (
                <div key={order.id} className="bg-white rounded-3xl shadow-sm border border-black/5 overflow-hidden transition-all hover:shadow-xl hover:shadow-black/5">
                    {/* Order Header */}
                    <div className="p-6 md:p-10 border-b border-black/5 grid grid-cols-2 md:flex md:justify-between items-start md:items-center gap-8 bg-[#fdfdfd]">
                       <div className="col-span-1">
                          <span className="font-label text-[8px] uppercase text-black/40 block font-bold mb-1 tracking-widest">REFERENCE NUM.</span>
                          <span className="font-label text-[10px] sm:text-xs tracking-widest uppercase font-bold text-black">STR-{order.id.slice(-8).toUpperCase()}</span>
                       </div>
                       <div className="col-span-1 text-right md:text-left">
                          <span className="font-label text-[8px] uppercase text-black/40 block font-bold mb-1 tracking-widest">DATE CURATED</span>
                          <span className="font-label text-[10px] uppercase font-bold text-black">{new Date(order.createdAt).toLocaleDateString()}</span>
                       </div>
                       <div className="col-span-1">
                          <span className="font-label text-[8px] uppercase text-black/40 block font-bold mb-1 tracking-widest">PROCUREMENT STATUS</span>
                          <span className="font-label text-[10px] uppercase font-bold text-[#a1824a] bg-[#a1824a]/5 px-2 py-0.5 rounded-full">{order.status}</span>
                       </div>
                       <div className="col-span-1 flex flex-col md:flex-row items-end md:items-center gap-4">
                         <div className="text-right">
                            <span className="font-label text-[8px] uppercase text-black/40 block font-bold mb-1 tracking-widest">INVESTMENT</span>
                            <span className="font-headline text-lg sm:text-2xl font-bold text-black">EGP {new Intl.NumberFormat().format(order.total)}</span>
                         </div>
                         {order.status === 'PENDING' && (
                           <button 
                             onClick={() => handleDeleteOrder(order.id)}
                             className="text-red-500 hover:text-red-700 transition-colors p-1"
                             title="Cancel Order"
                           >
                             <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                           </button>
                         )}
                       </div>
                    </div>

                    {/* Order Items */}
                    <div className="p-6 md:p-10 space-y-10">
                       {order.items.map((item: any) => (
                         <div key={item.id} className="flex flex-col sm:flex-row gap-6 md:gap-10 group">
                            <div className="w-full sm:w-32 aspect-square bg-[#fcf9f4] overflow-hidden rounded-2xl border border-black/5 flex-shrink-0">
                               <img 
                                 src={item.product?.images?.[0] || "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=200&auto=format&fit=crop"} 
                                 alt={item.product?.title} 
                                 className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                               />
                            </div>
                            <div className="flex-1 space-y-3">
                               <h4 className="font-headline text-xl md:text-2xl font-bold uppercase text-black group-hover:text-[#a1824a] transition-colors tracking-tight">{item.product?.title}</h4>
                               <p className="font-body text-sm text-on-surface-variant leading-relaxed sm:pr-12 italic">Architectural element Curated from the Studio Collection.</p>
                               <div className="pt-4 flex items-center gap-10">
                                  <div>
                                     <span className="font-label text-[9px] uppercase text-black/30 block font-bold mb-1 tracking-widest">QUANTITY</span>
                                     <span className="font-label text-xs font-bold text-black">0{item.quantity} units</span>
                                  </div>
                                  <div className="border-l border-black/10 pl-10">
                                     <span className="font-label text-[9px] uppercase text-black/30 block font-bold mb-1 tracking-widest">UNIT VALUE</span>
                                     <span className="font-label text-xs font-bold text-[#a1824a]">EGP {new Intl.NumberFormat().format(item.price)}</span>
                                  </div>
                               </div>
                            </div>
                            {order.status === 'PENDING' && (
                              <div className="flex items-center sm:items-end justify-start sm:justify-center pt-4 sm:pt-0">
                                 <button 
                                   onClick={() => handleUpdateQuantity(item.id, item.quantity)}
                                   className="flex items-center gap-3 px-4 py-2 border border-black/5 hover:bg-black hover:text-white transition-all rounded-full text-[10px] font-bold uppercase tracking-widest group/btn"
                                 >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                    Edit QTY
                                 </button>
                              </div>
                            )}
                         </div>
                       ))}
                    </div>

                   {/* Order Footer */}
                   <div className="p-8 bg-[#fafafa] border-t border-black/5 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                         <div className="w-1.5 h-1.5 rounded-full bg-[#735c00]"></div>
                         <span className="font-label text-[9px] tracking-widest uppercase font-bold text-on-surface-variant">Authentic Studio Artifact</span>
                      </div>
                      <button className="font-label text-[10px] tracking-widest uppercase border-b border-black pb-1 font-bold hover:text-[#a1824a] hover:border-[#a1824a] transition-all">
                         DOWNLOAD LOGISTICS PROTOCOL
                      </button>
                   </div>
                </div>
               ))
             )}
          </div>
       </div>
    </div>
  );
}
