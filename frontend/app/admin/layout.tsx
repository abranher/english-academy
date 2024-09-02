import AsideAdmin from "@/components/admin/AsideAdmin";
import HeaderAdmin from "@/components/admin/HeaderAdmin";
import MainBox from "@/components/admin/MainBox";
import "@/styles/globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div suppressHydrationWarning>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <AsideAdmin />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <HeaderAdmin />

          <MainBox>{children}</MainBox>
        </div>
      </div>
    </div>
  );
}
