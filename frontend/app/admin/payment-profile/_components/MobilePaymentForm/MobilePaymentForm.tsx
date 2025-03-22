"use client";

import { Bank, MobilePayment, Platform } from "@/types/models";

import { EditMobilePaymentForm } from "./EditMobilePaymentForm";

export function MobilePaymentForm({
  platform,
  userId,
}: {
  platform: Platform & { mobilePayment: MobilePayment & { bank: Bank } };
  userId: string;
}) {
  return (
    <section>
      {platform.mobilePayment && (
        <EditMobilePaymentForm
          mobilePayment={platform.mobilePayment}
          userId={userId}
        />
      )}
    </section>
  );
}
