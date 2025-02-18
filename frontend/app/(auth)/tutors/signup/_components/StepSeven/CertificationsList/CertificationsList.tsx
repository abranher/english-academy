"use client";

import axios from "@/config/axios";
import { useQuery } from "@tanstack/react-query";
import { useDeleteCertification } from "../_hooks/useDeleteCertification";

import { Button } from "@/components/shadcn/ui/button";
import { Skeleton } from "@/components/shadcn/ui/skeleton";
import { Eye, Trash2 } from "lucide-react";

export function CertificationsList({ userId }: { userId: string }) {
  const { data, isPending, isError } = useQuery({
    queryKey: ["certifications", userId],
    queryFn: async () => {
      const { data } = await axios.get(`/api/certifications/${userId}/tutor`);
      return data;
    },
  });

  const deleteMutation = useDeleteCertification(userId);

  if (isPending) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-[72px] w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (isError) return <div>Error cargando certificaciones</div>;

  return (
    <div className="space-y-4">
      {data?.map((cert: any) => (
        <div
          key={cert.id}
          className="flex items-center justify-between rounded-lg border p-4"
        >
          <div className="space-y-1">
            <h3 className="font-medium">Nombre: {cert.name}</h3>
            <p className="text-sm text-muted-foreground">
              Organismo emisor: {cert.issuingOrganization}
            </p>
          </div>

          <section className="flex gap-3">
            <Button size="sm" variant="outline">
              <Eye />
            </Button>

            <Button
              variant="destructive"
              size="sm"
              onClick={() => deleteMutation.mutate(cert.id)}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Eliminando..." : <Trash2 />}
            </Button>
          </section>
        </div>
      ))}

      {data?.length === 0 && (
        <p className="text-center text-sm text-muted-foreground">
          Aún no has añadido certificaciones
        </p>
      )}
    </div>
  );
}
