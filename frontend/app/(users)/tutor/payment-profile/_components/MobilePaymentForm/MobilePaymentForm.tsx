"use client";

import { Bank, MobilePayment, Tutor, User } from "@/types/models";

import { CreateMobilePaymentModal } from "./CreateMobilePaymentModal";
import { EditMobilePaymentForm } from "./EditMobilePaymentForm";

import { CardDescription } from "@/components/shadcn/ui/card";
import { FolderOpen } from "lucide-react";

export function MobilePaymentForm({
  userTutor,
}: {
  userTutor: User & {
    tutor: Tutor & { mobilePayment: (MobilePayment & { bank: Bank }) | null };
  };
}) {
  return (
    <section>
      {!userTutor.tutor.mobilePayment && (
        <>
          <article className="my-6">
            <CardDescription className="flex justify-center flex-col items-center text-lg w-full italic">
              <FolderOpen className="w-20 h-20" />
              Sin registrar
            </CardDescription>
          </article>

          <CreateMobilePaymentModal userTutor={userTutor} />
        </>
      )}

      {userTutor.tutor.mobilePayment && (
        <EditMobilePaymentForm
          mobilePayment={userTutor.tutor.mobilePayment}
          tutorId={userTutor.tutor.id}
        />
      )}
    </section>
  );
}
