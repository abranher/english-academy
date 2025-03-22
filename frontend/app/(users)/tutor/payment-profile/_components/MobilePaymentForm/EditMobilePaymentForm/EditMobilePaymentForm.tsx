"use client";

import { getBanks } from "../../../_services/get-banks";
import { useQuery } from "@tanstack/react-query";
import { Bank, MobilePayment } from "@/types/models";

import { EditMobilePaymentSkeleton } from "./EditMobilePaymentSkeleton";
import { PhoneForm } from "./PhoneForm";
import { DocumentForm } from "./DocumentForm";
import { BankForm } from "./BankForm";

import { Card, CardDescription, CardTitle } from "@/components/shadcn/ui/card";

export function EditMobilePaymentForm({
  mobilePayment,
  tutorId,
}: {
  mobilePayment: MobilePayment & { bank: Bank };
  tutorId: string;
}) {
  const {
    isPending,
    data: banks,
    isError,
  } = useQuery<Bank[] | []>({
    queryKey: ["get_banks_tutor_payment_profile_edit"],
    queryFn: getBanks,
  });

  if (isError) return <div>No se pudo cargar la información.</div>;

  return (
    <Card className="p-8">
      <CardTitle>Pago Móvil</CardTitle>
      <CardDescription>
        Accede y gestiona los datos de tu pago móvil
      </CardDescription>

      <section className="grid gap-6 py-5">
        {isPending ? (
          <EditMobilePaymentSkeleton />
        ) : (
          <>
            <PhoneForm
              phoneCode={mobilePayment.phoneCode}
              phoneNumber={mobilePayment.phoneNumber}
              tutorId={tutorId}
            />

            <DocumentForm
              documentType={mobilePayment.documentType}
              documentNumber={mobilePayment.documentNumber}
              tutorId={tutorId}
            />

            <BankForm
              bankId={mobilePayment.bankId}
              banks={banks}
              tutorId={tutorId}
            />
          </>
        )}
      </section>
    </Card>
  );
}
