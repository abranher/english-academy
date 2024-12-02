"use client";

import Box from "@/components/common/Box";
import { useParams } from "next/navigation";

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { courseId } = useParams();

  return (
    <Box>
      <div className="space-y-6 p-6">
        {/* Contenedor con grilla ajustada */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
          {children}

          <div className="h-32 rounded-lg">hola</div>
        </div>
      </div>
    </Box>
  );
}
