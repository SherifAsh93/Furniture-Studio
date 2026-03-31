'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const { openModal, isOpen } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Open the modal by default when visiting /login
    if (!isOpen) {
      openModal('login');
    }
  }, [openModal, isOpen]);

  // If the modal is closed by the user, redirect them back to home
  useEffect(() => {
    if (!isOpen) {
      router.push('/');
    }
  }, [isOpen, router]);

  return (
    <div className="min-h-screen bg-[#fcf9f4] relative overflow-hidden">
      {/* Mock Background: The Editorial Marketplace */}
      <div className="absolute inset-0 opacity-20 pointer-events-none filter blur-sm">
        <div className="p-20 space-y-20">
          <div className="flex justify-between items-center">
             <div className="flex flex-col leading-none">
                <span className="font-headline text-4xl tracking-tight font-extrabold text-black uppercase">FURNITURE</span>
                <span className="font-headline text-4xl tracking-tighter font-light text-black/60 uppercase">STUDIO</span>
             </div>
          </div>
          <div className="space-y-8">
             <h1 className="font-headline text-9xl font-black text-black leading-[0.8] uppercase">Living<br />Art</h1>
             <div className="w-1/2 aspect-video bg-black/5"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
