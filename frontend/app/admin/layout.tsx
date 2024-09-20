import HeaderAdmin from "@/components/admin/HeaderAdmin";
import AsideAdmin from "@/components/admin/AsideAdmin";
import { Button } from "@/components/shadcn/ui/button";

export const description =
  "Un panel de productos con una barra lateral de navegación y un área de contenido principal. El panel tiene un encabezado con una entrada de búsqueda y un menú de usuario. La barra lateral tiene un logotipo, enlaces de navegación y una tarjeta con una llamada a la acción. El área de contenido principal muestra un estado vacío con una llamada a la acción.";

export default function Dashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
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
