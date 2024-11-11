import { Metadata } from "next";

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
      <div className="w-full flex justify-center">
        <section className="w-full max-w-[1536px] p-8">{children}</section>
      </div>
    </>
  );
}
