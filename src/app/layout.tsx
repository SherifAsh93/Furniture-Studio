import "./globals.css";

export const metadata = {
  title: "Furniture Studio",
  description: "Furniture Studio Design System",
};

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background text-on-background antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
