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
                   <div className="p-8 border-b border-black/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-[#fdfdfd]">
                      <div>
                         <span className="font-label text-[8px] uppercase text-black/40 block font-bold mb-1">REFERENCE NUM.</span>
                         <span className="font-label text-xs tracking-widest uppercase font-bold">STR-{order.id.slice(-8).toUpperCase()}</span>
                      </div>
                      <div className="flex gap-12">
                         <div>
                            <span className="font-label text-[8px] uppercase text-black/40 block font-bold mb-1">DATE CURATED</span>
                            <span className="font-label text-[10px] uppercase font-bold">{new Date(order.createdAt).toLocaleDateString()}</span>
                         </div>
                         <div>
                            <span className="font-label text-[8px] uppercase text-black/40 block font-bold mb-1">PROCUREMENT STATUS</span>
                            <span className="font-label text-[10px] uppercase font-bold text-[#735c00]">{order.status}</span>
                         </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                           <span className="font-label text-[8px] uppercase text-black/40 block font-bold mb-1">INVESTMENT TOTAL</span>
                           <span className="font-headline text-xl font-bold">${new Intl.NumberFormat().format(order.total)}</span>
                        </div>
                        {order.status === 'PENDING' && (
                          <button 
                            onClick={() => handleDeleteOrder(order.id)}
                            className="bg-red-50 text-red-600 p-2 rounded-lg hover:bg-red-600 hover:text-white transition-all text-[10px] font-bold uppercase tracking-widest border border-red-100"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                   </div>

                   {/* Order Items */}
                   <div className="p-8 space-y-8">
                      {order.items.map((item: any) => (
                        <div key={item.id} className="flex gap-8 group">
                           <div className="w-24 h-24 bg-[#fcf9f4] overflow-hidden rounded-xl border border-black/5">
                              <img 
                                src={item.product?.images?.[0] || "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=200&auto=format&fit=crop"} 
                                alt={item.product?.title} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                              />
                           </div>
                           <div className="flex-1 space-y-1">
                              <h4 className="font-headline text-lg font-bold uppercase group-hover:text-[#a1824a] transition-colors">{item.product?.title}</h4>
                              <p className="font-body text-xs text-on-surface-variant font-medium pr-12 line-clamp-1">{item.product?.description}</p>
                              <div className="pt-4 flex items-center gap-8">
                                 <div>
                                    <span className="font-label text-[8px] uppercase text-black/40 block font-bold mb-1">Quantity</span>
                                    <span className="font-label text-[10px] font-bold">0{item.quantity}</span>
                                 </div>
                                 <div className="border-l border-black/5 pl-8">
                                    <span className="font-label text-[8px] uppercase text-black/40 block font-bold mb-1">Unit Value</span>
                                    <span className="font-label text-[10px] font-bold text-[#735c00]">${new Intl.NumberFormat().format(item.price)}</span>
                                 </div>
                              </div>
                           </div>
                           {order.status === 'PENDING' && (
                             <div className="flex flex-col items-end justify-center">
                                <button 
                                  onClick={() => handleUpdateQuantity(item.id, item.quantity)}
                                  className="p-3 border border-black/5 hover:bg-black hover:text-white transition-all rounded-lg opacity-40 hover:opacity-100"
                                >
                                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
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
