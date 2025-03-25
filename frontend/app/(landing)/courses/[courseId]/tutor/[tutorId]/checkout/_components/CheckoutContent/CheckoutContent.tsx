"use client";

import { useParams } from "next/navigation";

import { Course, Plan } from "@/types/models";
import { useQuery } from "@tanstack/react-query";
import { useStepEnrollmentStore } from "@/services/store/student/enrollment";

import { StepOne } from "./StepOne";
import { StepTwo } from "./StepTwo";
import { StepThree } from "./StepThree";

import { Progress } from "@/components/shadcn/ui/progress";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { getCourse } from "@/services/network/courses";

export function CheckoutContent({
  userId,
  studentId,
}: {
  userId: string;
  studentId: string;
}) {
  const { courseId } = useParams();

  const step = useStepEnrollmentStore((state) => state.step);
  const totalSteps = useStepEnrollmentStore((state) => state.totalSteps);

  const progressValue = (step / totalSteps) * 100;

  const {
    isPending,
    data: plan,
    isError,
  } = useQuery<Course>({
    queryKey: ["course_enrollment_checkout"],
    queryFn: () => getCourse(courseId as string),
  });

  if (isPending) return <>Cargando...</>;
  if (isError) return <>Ha ocurrido un error al cargar el plan</>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <article className="mb-3 text-center font-medium">
            Paso {step} de {totalSteps}
          </article>
          <Progress value={progressValue} className="mb-6" />
        </CardTitle>
        <CardContent>
          {step === 1 && <StepOne plan={plan} />}
          {step === 2 && (
            <StepTwo userId={userId} studentId={studentId} plan={plan} />
          )}
          {step === 3 && <StepThree />}
        </CardContent>
      </CardHeader>
    </Card>
  );
}
