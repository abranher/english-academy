"use client";

import { Certification } from "@/types/models/Certification";
import { assetAttachments } from "@/libs/asset";

import { Button } from "@/components/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { BookmarkCheck, Eye, GraduationCap, School } from "lucide-react";

export function CertificationsCard({
  certifications,
}: {
  certifications: Certification[];
}) {
  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex gap-3 items-center">
            Certificaciones
            <GraduationCap />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <section className="flex flex-col gap-5">
            <article className="flex flex-col gap-3">
              {certifications.length === 0 ? (
                <>
                  <CardDescription>No registro certificaciones</CardDescription>
                </>
              ) : (
                certifications.map((certification: Certification) => (
                  <section
                    key={certification.id}
                    className="flex items-center justify-between rounded-lg border p-4 dark:border-zinc-700"
                  >
                    <div className="space-y-2">
                      <h3 className="font-medium flex gap-1 items-center">
                        <BookmarkCheck className="w-4" />
                        Nombre: {certification.name}
                      </h3>
                      <p className="text-sm text-muted-foreground flex gap-1 items-center">
                        <School className="w-4" />
                        Organismo emisor: {certification.issuingOrganization}
                      </p>
                    </div>

                    <section className="flex gap-3">
                      <a
                        href={assetAttachments(certification.url)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <Button size="sm">
                          <Eye />
                        </Button>
                      </a>
                    </section>
                  </section>
                ))
              )}
            </article>
          </section>
        </CardContent>
      </Card>
    </>
  );
}
