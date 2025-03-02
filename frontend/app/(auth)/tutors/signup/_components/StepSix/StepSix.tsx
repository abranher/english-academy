import axios from "@/config/axios";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { useStepTutorStore } from "@/services/store/auth/tutor/stepTutor";
import { toast } from "sonner";
import { useState } from "react";
import { Calendar, DateInput } from "@heroui/react";
import { CalendarDate, getLocalTimeZone, today } from "@internationalized/date";

import { Button } from "@/components/shadcn/ui/button";
import { CardDescription, CardTitle } from "@/components/shadcn/ui/card";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/shadcn/ui/input";

export function StepSix() {
  const nextStep = useStepTutorStore((state) => state.nextStep);
  const userId = useStepTutorStore((state) => state.userId);
  const [birth, setBirth] = useState(today(getLocalTimeZone()));

  const handleBirth = (value: CalendarDate | null) => {
    if (value) {
      setBirth(value);
    } else {
      // Manejar el caso en que el valor sea null, si es necesario
      // Por ejemplo, podrías establecer un valor por defecto o simplemente no hacer nada
      console.warn("El valor de la fecha es null");
    }
  };

  const createUserMutation = useMutation({
    mutationFn: (user: { birth: Date }) =>
      axios.post(`/api/tutors/signup/${userId}/birth`, user),
    onSuccess: (response) => {
      if (response.status === 200 || response.status === 201) {
        const data = response.data;
        toast.success(data.message);
        nextStep();
      }
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const status = error.response?.status;
        const message = error.response?.data?.message || "Error desconocido";

        const errorMessages: { [key: number]: string } = {
          400: "Datos no válidos",
          404: "Usuario no encontrado",
          500: "Error del servidor",
          "-1": "Error inesperado",
        };

        if (status) toast.error(errorMessages[status] || message);
        else toast.error(errorMessages["-1"] || message);
      } else {
        toast.error("Error de conexión o error inesperado");
        console.error("Error que no es de Axios:", error);
      }
    },
  });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log(birth);
    return;

    //createUserMutation.mutate({
    // birth: birth,
    //});
  }

  return (
    <>
      <section className="text-center mb-6">
        <CardTitle className="mb-3">Tu Fecha de Nacimiento y País</CardTitle>
        <CardDescription>
          Indica tu fecha de nacimiento y el país en el que resides para ajustar
          la experiencia a tus necesidades.
        </CardDescription>
      </section>

      <form onSubmit={onSubmit} className="space-y-4 mt-4">
        <section className="mb-32">
          <Calendar
            showMonthAndYearPickers
            maxValue={today(getLocalTimeZone())}
            value={birth}
            onChange={handleBirth}
          />

          <Input type="date" />
          <DateInput variant="bordered" />
        </section>
        <div className="w-full flex justify-end">
          {!createUserMutation.isPending ? (
            <Button type="submit">Continuar</Button>
          ) : (
            <Button disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Espere...
            </Button>
          )}
        </div>
      </form>
    </>
  );
}
