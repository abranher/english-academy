"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
import axios from "@/config/axios";
import { toast } from "sonner";

export default function CreateBackup() {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.get("api/backup");

      router.refresh();
      toast.success("Respaldo creado!");
    } catch (error) {
      console.log(error);
      toast.error("something ocurred!");
    }
  };

  return (
    <>
      <Card>
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
              <Button className="flex gap-2">
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
