'use client';

import { usePathname } from 'next/navigation';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  const isDashboard = pathname.startsWith('/vendor') || pathname.startsWith('/admin');
  
  if (isDashboard) {
    return (
      <>
        {children}
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="lg:pl-[280px]">
        {children}
        <Footer />
      </div>
    </>
  );
}
