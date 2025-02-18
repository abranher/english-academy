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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/shadcn/ui/avatar";
import { Button } from "@/components/shadcn/ui/button";
import Avvvatars from "avvvatars-react";

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

      <div className="w-full">
        <Card>
          <CardHeader>
            <CardTitle>Listado de Solicitudes de Nuevos Tutores</CardTitle>
            <CardDescription>
              En esta sección encontrarás todas las solicitudes de nuevos
              tutores que desean unirse a nuestra plataforma. Revisa cada
              propuesta y ayúdanos a dar la bienvenida a nuevos talentos que
              enriquecerán nuestra comunidad educativa.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Card className="w-[350px] bg-white shadow-lg rounded-lg overflow-hidden">
              <CardHeader className="flex flex-row items-center space-x-4 p-6">
                <Avatar className="flex items-center justify-center h-40 w-40">
                  <Avvvatars size={80} value={"pedro@gmail.com"} />
                </Avatar>
                <div>
                  <CardTitle className="text-lg font-semibold">
                    John Doe
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-500">
                    @johndoe
                  </CardDescription>
                </div>
              </CardHeader>
              <CardFooter className="flex justify-end p-6">
                <Button
                  variant="outline"
                  className="bg-blue-500 text-white hover:bg-blue-600"
                >
                  Ver más información
                </Button>
              </CardFooter>
            </Card>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
