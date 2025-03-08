"use client";

import { useParams } from "next/navigation";

import { useQuery } from "@tanstack/react-query";
import { getUserTutor } from "../../_services/get-user-tutor";
import { User } from "@/types/models/User";

import { StatusManagementHistory } from "../StatusManagementHistory";
import { BiographyCard } from "../BiographyCard";
import { CertificationsCard } from "../CertificationsCard";
import { AccountDetails } from "../AccountDetails";
import { TutorProfileSkeleton } from "./TutorProfileSkeleton";

import { CardTitle, CardDescription } from "@/components/shadcn/ui/card";
import { TutorProfileCard } from "../TutorProfileCard";

export function TutorProfile() {
  const { isPending, data: userTutor } = useQuery<User>({
    queryKey: ["tutor-admin-profile"],
    queryFn: () => getUserTutor(userId as string),
  });

  const { userId } = useParams();

  if (isPending) return <TutorProfileSkeleton />;
  if (!userTutor) return <div>No se pudo cargar la información del tutor.</div>;

  return (
    <>
      <section className="flex flex-col gap-1">
        <CardTitle>Tutor</CardTitle>
        <CardDescription>Detalle de Tutor</CardDescription>
      </section>

      <section className="w-full grid grid-cols-1 lg:grid-cols-7 gap-4">
        <TutorProfileCard userTutor={userTutor} />

        <section className="lg:col-span-5 gap-3 flex flex-col">
          <BiographyCard bio={userTutor.tutor!.bio} />
          <AccountDetails email={userTutor.email} birth={userTutor.birth} />
          <CertificationsCard
            certifications={userTutor.tutor!.certifications}
          />
          <StatusManagementHistory
            tutorStatusHistory={userTutor.tutor!.tutorStatusHistory}
            userTutor={userTutor}
          />
        </section>
      </section>
    </>
  );
}
