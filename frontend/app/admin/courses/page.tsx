import Link from "next/link";
import axios from "@/config/axios";
import { Button } from "@/components/shadcn/ui/button";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";

export default async function CoursesPage() {
  const { data } = await axios.get("/api/courses");

  return (
    <div>
      <Link href="/admin/create">
        <Button>New course</Button>
      </Link>

      <DataTable columns={columns} data={data} />
    </div>
  );
}
