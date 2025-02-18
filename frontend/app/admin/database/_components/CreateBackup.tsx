"use client";

import axios from "@/config/axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/shadcn/ui/alert-dialog";
import { CloudDownload } from "lucide-react";
import { Button } from "@/components/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { toast } from "sonner";

export default function CreateBackup({
  onBackupCreated,
}: {
  onBackupCreated: () => void;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.get("api/backup");
      router.refresh();
      toast.success("Respaldo creado!");
      onBackupCreated();
    } catch (error) {
      if (error instanceof AxiosError) {
        const status = error.response?.status;
        const message = error.response?.data?.message || "Error desconocido";

        const errorMessages: { [key: number]: string } = {
          400: "Datos no válidos",
          404: "Recurso no encontrado",
          409: "Conflicto",
          500: "Error del servidor",
          "-1": "Error inesperado",
        };

        if (status) toast.error(errorMessages[status] || message);
        else toast.error(errorMessages["-1"] || message);
      } else {
        toast.error("Error de conexión o error inesperado");
      }
    }
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Crear Respaldo</CardTitle>
          <CardDescription>
            Aquí podrás crear respaldos completos que te permitirán restaurar
            tus datos en caso de cualquier eventualidad.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
              <Button className="flex gap-2 w-full">
                <CloudDownload />
                Crear
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  ¿Estás completamente seguro?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Crear nuevo respaldo
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <form onSubmit={onSubmit}>
                  <AlertDialogAction type="submit">Confirmar</AlertDialogAction>
                </form>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </>
  );
}
