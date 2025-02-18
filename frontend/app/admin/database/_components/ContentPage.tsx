"use client";

import { useState } from "react";
import BackupList from "./BackupList";
import CreateBackup from "./CreateBackup";

export default function ContentPage() {
  const [backupCount, setBackupCount] = useState(0);

  const handleBackupCreated = () => {
    setBackupCount((prevCount) => prevCount + 1);
  };
  return (
    <>
      <CreateBackup onBackupCreated={handleBackupCreated} />

      <BackupList key={backupCount} />
    </>
  );
}
