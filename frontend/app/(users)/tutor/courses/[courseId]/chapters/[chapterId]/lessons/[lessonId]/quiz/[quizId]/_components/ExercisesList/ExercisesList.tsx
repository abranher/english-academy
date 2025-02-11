import { FolderOpen } from "lucide-react";

export function ExercisesList() {
  return (
    <>
      {
        <div className="text-lg w-full">
          <p className="flex justify-center flex-col items-center">
            <FolderOpen className="w-20 h-20" />
            Sin ejercicios
          </p>
        </div>
      }
    </>
  );
}
