import { Metadata } from "next";

import { Separator } from "@/components/shadcn/ui/separator";
import { SidebarNav } from "./_components/sidebar-nav";

export const metadata: Metadata = {
  title: "Configuración",
  description:
    "Personaliza tu experiencia. Administra tu perfil, preferencias de notificación y más. ¡Configura tu cuenta a tu gusto y disfruta de una experiencia más personalizada!",
};

export default function SettingsStudentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="w-full flex justify-center">
        <section className="w-full max-w-[1350px]">
          <div className="space-y-6 p-10 pb-16 block">
            <div className="space-y-0.5">
              <h2 className="text-2xl font-bold tracking-tight">
                Configuración
              </h2>
              <p className="text-muted-foreground">
                Administra la configuración de tu cuenta y establece tus
                preferencias de correo electrónico.
              </p>
            </div>
            <Separator className="my-6" />
            <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
              <aside className="-mx-4 lg:w-1/5">
                <SidebarNav />
              </aside>
              <div className="flex-1 lg:max-w-2xl">{children}</div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
