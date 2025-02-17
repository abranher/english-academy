import axios from "@/config/axios";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { AxiosError } from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useStepTutorStore } from "@/services/store/auth/tutor/stepTutor";
import { toast } from "sonner";

import { Button } from "@/components/shadcn/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/shadcn/ui/card";

import { CV } from "./CV";
import { Certifications } from "./Certifications";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shadcn/ui/tabs";

export function StepSeven() {
  const nextStep = useStepTutorStore((state) => state.nextStep);

  const userId = useStepTutorStore((state) => state.userId);
  const [updateFlag, setUpdateFlag] = useState(0); // Para forzar re-fetch

  const {
    isLoading,
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

  if (isLoading) return <div>Cargando...</div>;
  if (isError) return <div>Error cargando datos</div>;

  const hasCV = userData?.tutor?.cvUrl;

  return (
    <>
      <section className="text-center mb-6">
        <CardTitle className="mb-3">Datos Académicos y Tutoría</CardTitle>
        <CardDescription>
          {hasCV ? "CV actualizado ✓" : "Por favor sube tu CV para continuar"}
        </CardDescription>
      </section>

      <Tabs defaultValue="cv">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="cv" disabled={hasCV}>
            Currículum {hasCV && "✓"}
          </TabsTrigger>
          <TabsTrigger value="certifications">Certificaciones</TabsTrigger>
        </TabsList>

        <TabsContent value="cv">
          <CV onSuccess={handleUpdate} />
        </TabsContent>

        <TabsContent value="certifications">
          <Certifications onSuccess={handleUpdate} />
        </TabsContent>
      </Tabs>

      <section className="flex w-full justify-end mt-3">
        <Button disabled={!hasCV} onClick={() => nextStep()}>
          {hasCV ? "Finalizar" : "Sube tu CV para continuar"}
        </Button>
      </section>
    </>
  );
}
