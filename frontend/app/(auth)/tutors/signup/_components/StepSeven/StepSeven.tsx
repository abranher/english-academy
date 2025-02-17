import axios from "@/config/axios";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { useStepTutorStore } from "@/services/store/auth/tutor/stepTutor";
import { toast } from "sonner";

import { Button } from "@/components/shadcn/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/shadcn/ui/card";

import { CV } from "./CV";
import { Certifications } from "./Certifications";

export function StepSeven() {
  const nextStep = useStepTutorStore((state) => state.nextStep);
  const userId = useStepTutorStore((state) => state.userId);

  return (
    <>
      <section className="text-center mb-6">
        <CardTitle className="mb-3">Datos Académicos y Tutoría</CardTitle>
        <CardDescription>
          Ingresa tus datos académicos para validar tu rol como tutor.
        </CardDescription>
      </section>

      <CV />
      <Certifications />
    </>
  );
}
