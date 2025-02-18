import Link from "next/link";
import axios from "@/config/axios";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/shadcn/ui/breadcrumb";
import { CardDescription, CardTitle } from "@/components/shadcn/ui/card";
import { ContentPage } from "./_components/ContentPage";

export default async function TurorsAdminPage() {
  const { data } = await axios.get("/api/courses");

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/admin">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Tutores</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div>
        <CardTitle>Tutores</CardTitle>
        <CardDescription>Listados de Tutores</CardDescription>
      </div>

      <ContentPage />
    </>
  );
}
