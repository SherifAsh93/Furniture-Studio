'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';

export default function RegisterArtisanButton() {
  const { openModal } = useAuth();

  return (
    <button 
      onClick={() => openModal('register', 'VENDOR')}
      className="bg-[#a1824a] text-white px-12 py-5 font-label text-[10px] font-bold tracking-[0.4em] hover:bg-white hover:text-black transition-all uppercase active:scale-[0.98] shadow-lg shadow-[#a1824a]/20"
    >
      Submit Portfolio
    </button>
  );
}
