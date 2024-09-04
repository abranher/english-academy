import axios from "@/config/axios";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";

export default async function CoursesPage() {
  const { data } = await axios.get("/api/courses");

  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
