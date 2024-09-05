import Footer from "@/components/common/Footer";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="text-foreground bg-background">
      {children}
      <Footer />
    </div>
  );
}
