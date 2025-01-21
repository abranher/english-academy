"use client";

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
import { useQuery } from "@tanstack/react-query";
import { getBackups } from "../_services/getBackups";
import { Skeleton } from "@/components/shadcn/ui/skeleton";
import { Button } from "@/components/shadcn/ui/button";
import { DatabaseBackup } from "lucide-react";

export default function BackupList() {
  const {
    isPending,
    error,
    data: backups,
  } = useQuery({
    queryKey: ["backups-list"],
    queryFn: getBackups,
  });

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
                  <Select>
                    <SelectTrigger id="backups">
                      <SelectValue placeholder="-- Selecciona la copia a restaurar --" />
                    </SelectTrigger>
                    <SelectContent>
                      {backups &&
                        backups.map((backup: any, index: any) => (
                          <SelectItem key={index} value={index}>
                            {backup.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>

                  <Button className="flex gap-3">
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
