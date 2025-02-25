"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getUserTutor } from "../../_services/get-all-tutors";
import {
  BadgeAlert,
  BadgeCheck,
  BookmarkCheck,
  BookUser,
  CircleUser,
  Eye,
  FileText,
  GraduationCap,
  History,
  Mail,
  Menu,
  School,
} from "lucide-react";
import { Button } from "@/components/shadcn/ui/button";
import { Avatar } from "@nextui-org/react";
import { assetAttachments, assetImg } from "@/libs/asset";
import { Badge } from "@/components/shadcn/ui/badge";
import { Certification } from "@/types/models/Certification";
import { TutorStatus } from "@/types/enums/TutorStatus";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/ui/form";
import { Textarea } from "@/components/shadcn/ui/textarea";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { RadioGroup, RadioGroupItem } from "@/components/shadcn/ui/radio-group";
import axios from "@/config/axios";
import { AxiosError } from "axios";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/ui/dialog";

const FormSchema = z.object({
  comment: z
    .string()
    .min(10, {
      message: "comment must be at least 10 characters.",
    })
    .max(160, {
      message: "comment must not be longer than 30 characters.",
    }),
  status: z.enum([TutorStatus.APPROVED, TutorStatus.REJECTED], {
    required_error: "Debe seleccionar un estado.",
  }),
});

export function TutorProfile() {
  const { userId } = useParams();
  const [open, setOpen] = useState(false);

  const { isPending, data: userTutor } = useQuery({
    queryKey: ["tutor-admin-profile"],
    queryFn: () => getUserTutor(userId as string),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const createMutation = useMutation({
    mutationFn: (user: { comment: string; status: string }) =>
      axios.post(`/api/admin/tutors/user/${userId}/manage-status`, user),
    onSuccess: (response) => {
      if (response.status === 200 || response.status === 201) {
        const data = response.data;
        toast.success(data.message);
        setOpen(false);
      }
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const status = error.response?.status;
        const message = error.response?.data?.message || "Error desconocido";

        const errorMessages: { [key: number]: string } = {
          400: "Datos no válidos",
          404: "Usuario no encontrado",
          500: "Error del servidor",
          "-1": "Error inesperado",
        };

        if (status) toast.error(errorMessages[status] || message);
        else toast.error(errorMessages["-1"] || message);
      } else {
        toast.error("Error de conexión o error inesperado");
        console.error("Error que no es de Axios:", error);
      }
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    createMutation.mutate({
      comment: data.comment,
      status: data.status,
    });
  }

  const { isSubmitting, isValid } = form.formState;

  console.log(userTutor);

  if (isPending) return <div>Cargando...</div>;

  return (
    <>
      <section className="flex justify-between">
        <article>
          <CardTitle>Tutor</CardTitle>
          <CardDescription>Datos del Tutor</CardDescription>
        </article>

        <article>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                <Menu />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Estado del tutor</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>Aprobar</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </article>
      </section>

      <section className="grid grid-cols-7 gap-4">
        <Card className="col-span-2">
          <CardHeader className="flex flex-col items-center p-6">
            <section className="w-full flex justify-end">
              {userTutor.tutor.status === TutorStatus.PENDING && (
                <Badge
                  className="flex gap-1 items-center"
                  variant="destructive"
                >
                  <BadgeAlert />
                  Sin verificar
                </Badge>
              )}
              {userTutor.tutor.status === TutorStatus.REJECTED && (
                <Badge
                  className="flex gap-1 items-center"
                  variant="destructive"
                >
                  <BadgeAlert />
                  Rechazado
                </Badge>
              )}
            </section>

            <section className="w-full flex flex-col items-center justify-center gap-2">
              <article className="w-full flex items-center">
                <Avatar
                  isBordered
                  className="w-20 h-20"
                  color="default"
                  src={
                    assetImg(userTutor.avatarUrl) ||
                    "https://i.pravatar.cc/150?u=a042581f4e29026704d"
                  }
                />
              </article>
            </section>
          </CardHeader>
          <CardContent>
            <section className="flex flex-col gap-3">
              <article className="flex gap-2 flex-col">
                <CardTitle className="flex gap-2 items-center">
                  {`${userTutor.name} ${userTutor.lastName}` ||
                    "Nombre no disponible"}
                </CardTitle>

                <CardDescription className="flex gap-2 items-center">
                  @{userTutor.username}
                </CardDescription>
              </article>

              <article>
                <CardDescription className="flex gap-2 items-center">
                  0 Cursos
                </CardDescription>
              </article>

              <article>
                <CardDescription className="flex gap-2 items-center">
                  De venezuela
                </CardDescription>
              </article>

              <article className="py-4">
                <a
                  href={assetAttachments(userTutor.tutor.cvUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="flex items-center gap-2" size="sm">
                    <FileText />
                    Currículum
                  </Button>
                </a>
              </article>
            </section>
          </CardContent>
        </Card>

        <section className="col-span-5 gap-3 flex flex-col">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex gap-3 items-center">
                Biografía
                <BookUser />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <section className="flex flex-col gap-5">
                <article>{userTutor.tutor.bio}</article>
              </section>
            </CardContent>
          </Card>

          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex gap-3 items-center">
                Datos de la cuenta
                <CircleUser />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <section className="flex flex-col gap-5">
                <article className="flex flex-col gap-3">
                  <p className="flex gap-3 items-center">
                    <Mail />
                    {userTutor.email}
                    <Badge className="flex gap-1 items-center">
                      <BadgeCheck />
                      Verificado
                    </Badge>
                  </p>
                </article>
              </section>
            </CardContent>
          </Card>

          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex gap-3 items-center">
                Certificaciones
                <GraduationCap />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <section className="flex flex-col gap-5">
                <article className="flex flex-col gap-3">
                  {userTutor.tutor.certifications.length === 0 ? (
                    <>
                      <CardDescription>
                        No registro certificaciones
                      </CardDescription>
                    </>
                  ) : (
                    userTutor.tutor?.certifications.map(
                      (certification: Certification) => (
                        <section
                          key={certification.id}
                          className="flex items-center justify-between rounded-lg border p-4 dark:border-zinc-700"
                        >
                          <div className="space-y-2">
                            <h3 className="font-medium flex gap-1 items-center">
                              <BookmarkCheck />
                              Nombre: {certification.name}
                            </h3>
                            <p className="text-sm text-muted-foreground flex gap-1 items-center">
                              <School />
                              Organismo emisor:{" "}
                              {certification.issuingOrganization}
                            </p>
                          </div>

                          <section className="flex gap-3">
                            <a
                              href={assetAttachments(certification.url)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2"
                            >
                              <Button size="sm">
                                <Eye />
                              </Button>
                            </a>
                          </section>
                        </section>
                      )
                    )
                  )}
                </article>
              </section>
            </CardContent>
          </Card>

          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex gap-3 items-center">
                Historial de Aprobaciones y Rechazos
                <History />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <section className="flex flex-col gap-5">
                <article className="flex flex-col gap-3">
                  {userTutor.tutor.rejectionHistory === null ? (
                    <CardDescription>Aun no hay registros</CardDescription>
                  ) : (
                    userTutor.tutor?.rejectionHistory.map(
                      (certification: Certification) => (
                        <section
                          key={certification.id}
                          className="flex items-center justify-between rounded-lg border p-4 dark:border-zinc-700"
                        >
                          <div className="space-y-2">
                            <h3 className="font-medium flex gap-1 items-center">
                              <BookmarkCheck />
                              Nombre: {certification.name}
                            </h3>
                            <p className="text-sm text-muted-foreground flex gap-1 items-center">
                              <School />
                              Organismo emisor:{" "}
                              {certification.issuingOrganization}
                            </p>
                          </div>

                          <section className="flex gap-3">
                            <a
                              href={assetAttachments(certification.url)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2"
                            >
                              <Button size="sm">
                                <Eye />
                              </Button>
                            </a>
                          </section>
                        </section>
                      )
                    )
                  )}
                </article>
              </section>

              <section className="w-full flex justify-end gap-3 pt-3">
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline">Gestionar</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Gestionar estado de tutor</DialogTitle>
                    </DialogHeader>
                    <section>
                      <Form {...form}>
                        <form
                          className="flex flex-col gap-3"
                          onSubmit={form.handleSubmit(onSubmit)}
                        >
                          <FormField
                            control={form.control}
                            name="comment"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Comentario</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Tell us a little bit about yourself"
                                    className="resize-none"
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription>
                                  Deja un comentario para informar al tutor del
                                  por qué de tu decisión
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                              <FormItem className="space-y-3">
                                <FormLabel>Estado a cambiar</FormLabel>
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-col space-y-1"
                                  >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem
                                          value={TutorStatus.APPROVED}
                                        />
                                      </FormControl>
                                      <FormLabel className="font-normal">
                                        APROBADO
                                      </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem
                                          value={TutorStatus.REJECTED}
                                        />
                                      </FormControl>
                                      <FormLabel className="font-normal">
                                        RECHAZADO
                                      </FormLabel>
                                    </FormItem>
                                  </RadioGroup>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <section className="flex w-full justify-end mt-4">
                            <Button
                              disabled={!isValid || isSubmitting}
                              type="submit"
                            >
                              Confirmar
                            </Button>
                          </section>
                        </form>
                      </Form>
                    </section>
                  </DialogContent>
                </Dialog>
              </section>
            </CardContent>
          </Card>
        </section>
      </section>
    </>
  );
}
