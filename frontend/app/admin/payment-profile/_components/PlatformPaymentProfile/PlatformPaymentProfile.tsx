"use client";

import { useState } from "react";
import { PaymentMethod } from "@/types/enums";
import { useQuery } from "@tanstack/react-query";
import { getPlatformWithPaymentMethod } from "../../_services/get-platform-payment-method";
import { Bank, MobilePayment, Platform } from "@/types/models";

import { PlatformPaymentProfileSkeleton } from "./PlatformPaymentProfileSkeleton";
import { MobilePaymentForm } from "../MobilePaymentForm";

import { CardTitle, CardDescription } from "@/components/shadcn/ui/card";
import { Separator } from "@/components/shadcn/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/shadcn/ui/radio-group";
import { Label } from "@/components/shadcn/ui/label";
import { Smartphone } from "lucide-react";

export function PlatformPaymentProfile({ userId }: { userId: string }) {
  const [tabs, setTabs] = useState<string>(PaymentMethod.MOBILE_PAYMENT);

  const {
    isPending,
    data: platform,
    isError,
  } = useQuery<Platform & { mobilePayment: MobilePayment & { bank: Bank } }>({
    queryKey: ["admin_platform_payment_profile"],
    queryFn: () => getPlatformWithPaymentMethod(userId as string),
  });

  if (isPending) return <PlatformPaymentProfileSkeleton />;
  if (isError) return <div>No se pudo cargar la información.</div>;

  return (
    <>
      <section className="flex flex-col gap-1">
        <CardTitle>Perfil de Pago</CardTitle>
        <CardDescription>
          Accede y gestiona tu información para recibir pagos.
        </CardDescription>
      </section>

      <Separator />

      <CardTitle>Metodos de pago disponibles</CardTitle>

      <RadioGroup
        onValueChange={setTabs}
        defaultValue={tabs}
        className="flex gap-3"
      >
        <section className="w-full">
          <RadioGroupItem
            value={PaymentMethod.MOBILE_PAYMENT}
            id={PaymentMethod.MOBILE_PAYMENT}
            className="peer sr-only"
          />
          <Label
            htmlFor={PaymentMethod.MOBILE_PAYMENT}
            className="flex flex-col items-center justify-between cursor-pointer rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <Smartphone className="mb-3 h-6 w-6" />
            <span className="whitespace-nowrap">Pago móvil</span>
          </Label>
        </section>

        <section className="w-full">
          <RadioGroupItem
            value={PaymentMethod.PAYPAL}
            id={PaymentMethod.PAYPAL}
            className="peer sr-only"
            disabled
          />
          <Label
            htmlFor={PaymentMethod.PAYPAL}
            className="flex flex-col items-center justify-between cursor-pointer rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <svg role="img" viewBox="0 0 24 24" className="mb-3 h-6 w-6">
              <path
                d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 0 1 .923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.471z"
                fill="currentColor"
              ></path>
            </svg>
            <span className="whitespace-nowrap">PayPal</span>
          </Label>
        </section>
      </RadioGroup>

      <Separator className="my-3" />

      {tabs === PaymentMethod.MOBILE_PAYMENT && (
        <MobilePaymentForm platform={platform} userId={userId} />
      )}
    </>
  );
}
