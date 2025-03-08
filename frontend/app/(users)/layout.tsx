import NavMenu from "@/components/common/NavMenu";
import Footer from "@/components/common/Footer";

export default function UsersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="text-foreground bg-background">
      <NavMenu />
      <section className="flex justify-center">
        <section className="w-full flex flex-col gap-4 lg:gap-6 max-w-5xl px-8 py-5">
          {children}
        </section>
      </section>
      <Footer />
    </div>
  );
}
