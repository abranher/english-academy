import Link from "next/link";
import axios from "@/config/axios";
import { Button } from "@/components/shadcn/ui/button";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { ChevronLeft } from "lucide-react";

export default async function CoursesPage() {
  const { data } = await axios.get("/api/courses");

  return (
    <div className="w-full">
      <div className="flex items-center gap-4">
        <Link href="/admin/dashboard">
          <Button variant="outline" size="icon" className="h-7 w-7">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">atrás</span>
          </Button>
        </Link>
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          Cursos
        </h1>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
