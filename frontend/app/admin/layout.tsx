import HeaderAdmin from "@/components/admin/HeaderAdmin";
import AsideAdmin from "@/components/admin/AsideAdmin";

export default function Dashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] text-foreground bg-background">
      <AsideAdmin />
      <div className="flex flex-col">
        <HeaderAdmin />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
