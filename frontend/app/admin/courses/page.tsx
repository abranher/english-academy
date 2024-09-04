import { Button } from "@/components/shadcn/ui/button";
import Link from "next/link";

export default function CoursesPage() {
  return (
    <div>
      <Link href="/admin/create">
        <Button>New course</Button>
      </Link>
    </div>
  );
}
