'use client';

import { login } from '@/app/actions/auth';
import { useState } from 'react';

export default function AuthModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const result = await login(formData);
    setLoading(false);
    if (result?.error) {
      setError(result.error);
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" id="auth-modal">
      <div 
        className="modal-overlay absolute inset-0 bg-black/60 backdrop-blur-md" 
        onClick={onClose}
      ></div>
      <div className="bg-white w-full max-w-lg relative z-10 shadow-3xl overflow-hidden rounded-none">
        <div className="flex flex-col md:flex-row h-full">
          {/* Aesthetic Side Panel */}
          <div className="hidden md:block w-1/3 bg-[#1c1b1b] p-8 text-white relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10">
              <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"></path><path d="M12 8a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"></path><path d="M7 18a5 5 0 0 1 10 0"></path></svg>
            </div>
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <h4 className="font-headline text-xl font-bold uppercase mb-4">The Studio Portal</h4>
                <p className="font-body text-[10px] text-white/60 tracking-widest uppercase">Secured by Furniture Studio Architecture</p>
              </div>
              <p className="font-body text-[10px] text-white/40 leading-relaxed uppercase">
                Internal access for vendors and curators within the global ecosystem.
              </p>
            </div>
          </div>

          <div className="flex-1 p-8 md:p-12">
            <div className="flex flex-col items-center text-center mb-10">
              <div className="flex flex-col leading-none mb-4">
                <span className="font-headline text-2xl tracking-tight font-extrabold text-black uppercase leading-[0.9]">FURNITURE</span>
                <span className="font-headline text-2xl tracking-tighter font-light text-black/60 uppercase leading-[0.9]">STUDIO</span>
              </div>
              <p className="font-label text-[10px] font-bold tracking-[0.2em] text-[#cf6317] uppercase">Management Portal</p>
            </div>

            <form className="space-y-6" action={handleSubmit}>
              {error && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest text-center">{error}</p>}
              <div className="space-y-4">
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40 group-focus-within:text-[#cf6317] transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"></path></svg>
                  </div>
                  <input 
                    className="w-full bg-[#f6f3ee] border-0 border-b-2 border-transparent focus:border-[#cf6317] pl-12 pr-4 py-4 text-sm font-body transition-colors outline-none" 
                    placeholder="curator@studiodartistes.eu" 
                    type="email"
                    name="email"
                    required
                  />
                </div>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40 group-focus-within:text-[#cf6317] transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                  </div>
                  <input 
                    className="w-full bg-[#f6f3ee] border-0 border-b-2 border-transparent focus:border-[#cf6317] pl-12 pr-4 py-4 text-sm font-body transition-colors outline-none" 
                    placeholder="••••••••" 
                    type="password"
                    name="password"
                    required
                  />
                </div>
              </div>
              
              <div className="pt-4">
                <button 
                  className="w-full bg-primary text-white py-5 font-label text-[10px] font-bold tracking-[0.2em] hover:bg-[#cf6317] transition-all uppercase active:scale-[0.98] disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? 'Authenticating...' : 'Login to Workspace'}
                </button>
              </div>
            </form>

            <div className="mt-12 pt-8 border-t border-black/5 text-center">
              <p className="text-[10px] font-bold text-black/40 tracking-widest mb-4 uppercase">New to the platform?</p>
              <button className="text-[#cf6317] font-label text-[10px] font-bold tracking-[0.2em] uppercase hover:text-black transition-colors">
                Apply for Vendor Access
              </button>
            </div>
          </div>
        </div>
        
        <button 
          className="absolute top-4 right-4 text-black/40 hover:text-[#cf6317] transition-all group" 
          onClick={onClose}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-90 transition-transform"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>
    </div>
  );
}
