"use client";

import { User } from "@/types/models/User";
import { useQuery } from "@tanstack/react-query";
import { TutorStatus } from "@/types/enums";
import { getUserTutor } from "../../_services/get-user-tutor";

import { TutorPaymentProfileSkeleton } from "./TutorPaymentProfileSkeleton";

import { CardTitle, CardDescription } from "@/components/shadcn/ui/card";
import { AlertBanner } from "@/components/common/AlertBanner";
import { Separator } from "@/components/shadcn/ui/separator";

export function TutorPaymentProfile({ userId }: { userId: string }) {
  const { isPending, data: userTutor } = useQuery<User>({
    queryKey: ["tutor_user_payment_profile"],
    queryFn: () => getUserTutor(userId as string),
  });

  if (isPending) return <TutorPaymentProfileSkeleton />;
  if (!userTutor) return <div>No se pudo cargar la información.</div>;

  return (
    <>
      <section className="flex flex-col gap-1">
        <CardTitle>Perfil de Pago</CardTitle>
        <CardDescription>
          Accede y gestiona tu información para recibir pagos.
        </CardDescription>
      </section>

      <Separator />

      {(userTutor.tutor?.status !== TutorStatus.APPROVED ||
        !userTutor.tutor.approvedAt) && (
        <AlertBanner
          label={"Tu cuenta está en revisión."}
          description={"Solo puedes editar tu perfil hasta ser aprobado."}
        />
      )}

      <section className="w-full grid grid-cols-1 lg:grid-cols-8 gap-4">
        Tutor card
        <section className="lg:col-span-5 gap-3 flex flex-col">
          BiographyCard
        </section>
      </section>
    </>
  );
}
