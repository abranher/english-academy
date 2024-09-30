import Footer from "@/components/common/Footer";
import NavMenu from "@/components/common/NavMenu";

export default function UsersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="text-foreground bg-background">
      <NavMenu />
      {children}
      <Footer />
    </div>
  );
}
