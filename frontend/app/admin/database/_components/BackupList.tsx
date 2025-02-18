"use client";

import axios from "@/config/axios";
import { AxiosError } from "axios";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { getBackups } from "../_services/getBackups";

import { Label } from "@/components/shadcn/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { Skeleton } from "@/components/shadcn/ui/skeleton";
import { Button } from "@/components/shadcn/ui/button";
import { DatabaseBackup } from "lucide-react";
import { toast } from "sonner";

export default function BackupList() {
  const [selectedBackup, setSelectedBackup] = useState<string | null>(null);

  const {
    isPending,
    error,
    data: backups,
  } = useQuery({
    queryKey: ["backups-list"],
    queryFn: getBackups,
  });

  const router = useRouter();

  const handleRestore = async () => {
    if (!selectedBackup) {
      toast.error("Debes seleccionar un respaldo para restaurar.");
      return;
    }

    try {
      await axios.post("/api/backup/restore", {
        filename: selectedBackup,
      });

      toast.success("Respaldo restaurado con éxito.");
      router.refresh();
    } catch (error) {
      console.error(error);
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
          <CardTitle>Listado de Respaldos</CardTitle>
          <CardDescription>
            En esta sección, puedes consultar todos los respaldos existentes de
            la base de datos y restaurar cualquier versión anterior que
            necesites, garantizando así la seguridad y disponibilidad de tus
            datos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid gap-3">
              {isPending ? (
                <>
                  <Skeleton className="py-2" />
                  <Skeleton className="py-5" />
                </>
              ) : (
                <>
                  <Label htmlFor="backups">Respaldos</Label>
                  <Select onValueChange={(value) => setSelectedBackup(value)}>
                    <SelectTrigger id="backups">
                      <SelectValue placeholder="-- Selecciona la copia a restaurar --" />
                    </SelectTrigger>
                    <SelectContent>
                      {backups &&
                        backups.map((backup: any) => (
                          <SelectItem key={backup.name} value={backup.name}>
                            {backup.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>

                  <Button
                    className="flex gap-3"
                    onClick={handleRestore}
                    disabled={!selectedBackup}
                  >
                    <DatabaseBackup />
                    Restaurar
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
