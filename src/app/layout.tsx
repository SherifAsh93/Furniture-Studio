import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
import { AuthProvider } from "@/context/AuthContext";
import { EcommerceProvider } from "@/context/EcommerceContext";
import AuthModal from "@/components/AuthModal";
import EcommerceSidebar from "@/components/EcommerceSidebar";

export const metadata = {
  title: "Furniture Studio",
  description: "Furniture Studio Design System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background text-on-background antialiased">
        <AuthProvider>
          <EcommerceProvider>
            <LayoutWrapper>{children}</LayoutWrapper>
            <AuthModal />
            <EcommerceSidebar />
          </EcommerceProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
