"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

import axios from "@/config/axios";
import { z } from "zod";
import { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FormSchema } from "./FormSchema";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/ui/form";
import { Button } from "@/components/shadcn/ui/button";
import { Textarea } from "@/components/shadcn/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/shadcn/ui/radio-group";
import { LoadingButton } from "@/components/common/LoadingButton";
import { CourseReview } from "@/types/models/CourseReview";
import { CourseReviewDecision } from "@/types/enums";
import { Label } from "@/components/shadcn/ui/label";
import { BadgeAlert, BadgeCheck, BadgeInfo } from "lucide-react";

export function ChangeCourseReviewModal({
  courseReview,
}: {
  courseReview: CourseReview;
}) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const { userId, courseId } = useParams();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const mutation = useMutation({
    mutationFn: (updatedCourseReview: {
      feedback: string;
      decision: CourseReviewDecision;
    }) =>
      axios.patch(
        `/api/admin/course-reviews/${courseReview.id}/user/${userId}`,
        updatedCourseReview
      ),
    onSuccess: (response) => {
      if (response.status === 200 || response.status === 201) {
        const data = response.data;
        toast.success(data.message);
        queryClient.invalidateQueries({
          queryKey: ["course_reviews_list", courseId],
        });
        setOpen(false);
      }
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const status = error.response?.status;
        const message = error.response?.data?.message || "Error desconocido";

        const errorMessages: { [key: number]: string } = {
          400: "Datos no válidos",
          404: "Revisión del curso no encontrado",
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
    mutation.mutate({
      feedback: data.feedback,
      decision: data.decision,
    });
  }

  const { isValid, isSubmitting } = form.formState;

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size="sm">Gestionar</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[555px]">
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
                  name="feedback"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Comentario</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="p.ej: Modifica el título..."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Deja un comentario para informar al tutor del por qué de
                        tu decisión.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="decision"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Estado a cambiar</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid grid-cols-3 gap-4"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <section className="w-full">
                                <RadioGroupItem
                                  value={CourseReviewDecision.APPROVED}
                                  id={CourseReviewDecision.APPROVED}
                                  className="peer sr-only"
                                />
                                <Label
                                  htmlFor={CourseReviewDecision.APPROVED}
                                  className="flex flex-col items-center justify-between cursor-pointer rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                >
                                  <BadgeCheck className="mb-3 h-6 w-6" />
                                  APROBADO
                                </Label>
                              </section>
                            </FormControl>
                          </FormItem>

                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <section className="w-full">
                                <RadioGroupItem
                                  value={CourseReviewDecision.NEEDS_CHANGES}
                                  id={CourseReviewDecision.NEEDS_CHANGES}
                                  className="peer sr-only"
                                />
                                <Label
                                  htmlFor={CourseReviewDecision.NEEDS_CHANGES}
                                  className="flex flex-col items-center justify-between cursor-pointer rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                >
                                  <BadgeInfo className="mb-3 h-6 w-6" />
                                  <span className="whitespace-nowrap">
                                    NECESITA CAMBIOS
                                  </span>
                                </Label>
                              </section>
                            </FormControl>
                          </FormItem>

                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <section className="w-full">
                                <RadioGroupItem
                                  value={CourseReviewDecision.REJECTED}
                                  id={CourseReviewDecision.REJECTED}
                                  className="peer sr-only"
                                />
                                <Label
                                  htmlFor={CourseReviewDecision.REJECTED}
                                  className="flex flex-col items-center justify-between cursor-pointer rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                >
                                  <BadgeAlert className="mb-3 h-6 w-6" />
                                  RECHAZADO
                                </Label>
                              </section>
                            </FormControl>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <section className="flex w-full justify-end mt-4">
                  <LoadingButton
                    isLoading={mutation.isPending}
                    isValid={isValid}
                    isSubmitting={isSubmitting}
                  />
                </section>
              </form>
            </Form>
          </section>
        </DialogContent>
      </Dialog>
    </>
  );
}
