"use client";

import { useState } from "react";

import { CreateBackup } from "./CreateBackup";
import { BackupList } from "./BackupList";

import { CardDescription, CardTitle } from "@/components/shadcn/ui/card";

export function BackupContent() {
  const [backupCount, setBackupCount] = useState(0);

  function handleBackupCreated() {
    setBackupCount((prevCount) => prevCount + 1);
  }

  return (
    <>
      <section>
        <CardTitle>Respaldo de Base de datos</CardTitle>
        <CardDescription>
          En esta sección, puedes realizar respaldos completos de la base de
          datos para garantizar la seguridad y disponibilidad de tus datos.{" "}
        </CardDescription>
      </section>

      <section className="flex gap-3">
        <CreateBackup onBackupCreated={handleBackupCreated} />
        <BackupList key={backupCount} />
      </section>
    </>
  );
}
