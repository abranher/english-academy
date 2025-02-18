"use client";

import axios from "@/config/axios";
import { useQuery } from "@tanstack/react-query";
import { useDeleteCertification } from "../_hooks/useDeleteCertification";
import { Certification } from "@/types/models/Certification";

import { Button } from "@/components/shadcn/ui/button";
import { Skeleton } from "@/components/shadcn/ui/skeleton";
import { Eye, Trash2 } from "lucide-react";

export function CertificationsList({ userId }: { userId: string }) {
  const deleteMutation = useDeleteCertification(userId);

  const { data, isPending, isError } = useQuery({
    queryKey: ["certifications", userId],
    queryFn: async () => {
      const { data } = await axios.get(`/api/certifications/${userId}/tutor`);
      return data;
    },
  });

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
      {data?.map((certification: Certification) => (
        <section
          key={certification.id}
          className="flex items-center justify-between rounded-lg border p-4 dark:border-zinc-700"
        >
          <div className="space-y-1">
            <h3 className="font-medium">Nombre: {certification.name}</h3>
            <p className="text-sm text-muted-foreground">
              Organismo emisor: {certification.issuingOrganization}
            </p>
          </div>

          <section className="flex gap-3">
            <Button size="sm" variant="outline">
              <Eye />
            </Button>

            <Button
              variant="destructive"
              size="sm"
              onClick={() => deleteMutation.mutate(certification.id)}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Eliminando..." : <Trash2 />}
            </Button>
          </section>
        </section>
      ))}

      {data?.length === 0 && (
        <p className="text-center text-sm text-muted-foreground py-4">
          Aún no has añadido certificaciones
        </p>
      )}
    </div>
  );
}
