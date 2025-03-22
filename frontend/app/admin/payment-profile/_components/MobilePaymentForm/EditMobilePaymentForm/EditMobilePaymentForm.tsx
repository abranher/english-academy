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
  userId,
}: {
  mobilePayment: MobilePayment & { bank: Bank };
  userId: string;
}) {
  const {
    isPending,
    data: banks,
    isError,
  } = useQuery<Bank[] | []>({
    queryKey: ["get_banks_admin_platform_payment_profile_edit"],
    queryFn: getBanks,
  });

  if (isError) return <div>No se pudo cargar la información.</div>;

  return (
    <Card className="p-8">
      <CardTitle>Pago Móvil</CardTitle>
      <CardDescription>
        Accede y gestiona los datos del pago móvil
      </CardDescription>

      <section className="grid gap-6 py-5">
        {isPending ? (
          <EditMobilePaymentSkeleton />
        ) : (
          <>
            <PhoneForm
              phoneCode={mobilePayment.phoneCode}
              phoneNumber={mobilePayment.phoneNumber}
              userId={userId}
            />

            <DocumentForm
              documentType={mobilePayment.documentType}
              documentNumber={mobilePayment.documentNumber}
              userId={userId}
            />

            <BankForm
              bankId={mobilePayment.bankId}
              banks={banks}
              userId={userId}
            />
          </>
        )}
      </section>
    </Card>
  );
}
