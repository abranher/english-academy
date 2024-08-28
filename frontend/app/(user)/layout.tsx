import Footer from "@/components/common/Footer";
import NavMenu from "@/components/common/Nav";
import { Providers } from "@/components/Providers/Providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="text-foreground bg-background">
      <Providers>
        <NavMenu />
        {children}
        <Footer />
      </Providers>
    </div>
  );
}
