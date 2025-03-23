import Footer from "@/components/common/Footer";
import NavMenu from "@/components/common/NavMenu";

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="text-foreground bg-background">
      <NavMenu />
      {children}
      <Footer />
    </section>
  );
}
