import { Metadata } from "next";

import { Separator } from "@/components/shadcn/ui/separator";
import { SidebarNav } from "./_components/sidebar-nav";

export const metadata: Metadata = {
  title: "Configuración",
  description:
    "Personaliza tu experiencia. Administra tu perfil, preferencias de notificación y más. ¡Configura tu cuenta a tu gusto y disfruta de una experiencia más personalizada!",
};

export default function DashboardTutorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <section className="flex items-center justify-center h-[250px] bg-gradient-to-r from-zinc-950 to-zinc-900">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white">
            ¡Bienvenido, Abraham!
          </h1>
        </div>
      </section>

      <div className="w-full flex justify-center">
        <section className="w-full max-w-[1536px]">
          <div className="space-y-6 p-8 pb-16 block">
            <div className="space-y-0.5">
              <h2 className="text-2xl font-bold tracking-tight">
                Panel de Tutor
              </h2>
              <p className="text-muted-foreground">
                Administra tus cursos, visualiza estadísticas.
              </p>
            </div>
            <Separator className="my-6" />
            <div className="flex flex-col md:gap-6 lg:gap-1 space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
              <aside className="-mx-4 lg:w-1/5">
                <SidebarNav />
              </aside>
              <div className="flex-1">{children}</div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
