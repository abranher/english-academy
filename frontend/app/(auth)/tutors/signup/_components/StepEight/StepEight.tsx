"use client";

import axios from "@/config/axios";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useStepTutorStore } from "@/services/store/auth/tutor/stepTutor";

import { Button } from "@/components/shadcn/ui/button";
import { CardDescription, CardTitle } from "@/components/shadcn/ui/card";

import { CV } from "./CV";
import { AddCertification } from "./AddCertification";
import { CertificationsList } from "./CertificationsList";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shadcn/ui/tabs";
import { StepEightSkeleton } from "./StepEightSkeleton";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn/ui/popover";

export function StepEight() {
  const nextStep = useStepTutorStore((state) => state.nextStep);

  const userId = useStepTutorStore((state) => state.userId);
  const [updateFlag, setUpdateFlag] = useState(0); // Para forzar re-fetch

  const {
    isPending,
    isError,
    data: userData,
  } = useQuery({
    queryKey: ["tutor", userId, updateFlag],
    queryFn: async () => {
      const { data } = await axios.get(
        `/api/tutors/user/${userId}/certifications`
      );
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

  // Función para actualizar los datos
  const handleUpdate = () => setUpdateFlag((prev) => prev + 1);

  const hasCV = userData?.tutor?.cvUrl;

  const defaultTab = hasCV ? "certifications" : "cv";

  if (isPending) return <StepEightSkeleton />;

  if (isError) return <div>Error cargando datos</div>;

  return (
    <>
      <section className="text-center mb-6">
        <CardTitle className="mb-3">Datos Académicos y Tutoría</CardTitle>
        <CardDescription>
          {hasCV ? "CV actualizado ✓" : "Por favor sube tu CV para continuar"}
        </CardDescription>
      </section>

      <Tabs defaultValue={defaultTab}>
        <TabsList className="grid w-full grid-cols-3 mb-4 md:grid-cols-3">
          <TabsTrigger value="cv" disabled={hasCV}>
            Currículum {hasCV && "✓"}
          </TabsTrigger>
          <TabsTrigger value="add-certifications">Certificación</TabsTrigger>
          <TabsTrigger value="certifications">Certificaciones</TabsTrigger>
        </TabsList>

        <TabsContent value="cv">
          <CV onSuccess={handleUpdate} />
        </TabsContent>

        <TabsContent value="add-certifications">
          <AddCertification onSuccess={handleUpdate} />
        </TabsContent>

        <TabsContent value="certifications">
          <CertificationsList userId={userId} />
        </TabsContent>
      </Tabs>

      <section className="flex w-full justify-end mt-3">
        <Popover modal>
          <PopoverTrigger asChild>
            <Button disabled={!hasCV}>
              {hasCV ? "Finalizar" : "Sube tu CV para continuar"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2 text-center">
                <p>¿Estas seguro de finalizar?</p>
              </div>
              <div className="space-y-2 text-center">
                <Button onClick={() => nextStep()}>Confirmar</Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </section>
    </>
  );
}
