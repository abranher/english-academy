"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "@/config/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Input } from "@/components/shadcn/ui/input";
import { Button } from "@/components/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { Label } from "@/components/shadcn/ui/label";
import messages from "@/libs/validations/schemas/messages";
import { Separator } from "@/components/shadcn/ui/separator";

const formSchema = z.object({
  title: z.string(messages.requiredError).min(4, messages.min(4)),
});

export default function CreateCoursePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/courses", values);

      router.push(`/tutor/courses/${response.data.id}`);
      toast.success("Curso creado!");
    } catch (error) {
      console.log(error);
      toast.error("something ocurred!");
    }
  };

  return (
    <>
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-medium">Ponle nombre a tu curso</h3>
          <p className="text-sm text-muted-foreground">
            ¿Cómo te gustaría llamar a tu curso? No te preocupes, podrás cambiar
            esto más tarde.
          </p>
        </div>

        <Separator />

        <div className="w-full flex items-center justify-center h-full p-6">
          <Card className="w-full max-w-5xl">
            <CardHeader>
              <CardTitle>Nuevo Curso</CardTitle>
              <CardDescription>Crea un nuevo curso.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="name">Título del curso</Label>
                  <Input
                    id="name"
                    type="text"
                    {...register("title")}
                    className="w-full"
                  />
                  {errors.title && (
                    <span className="text-red-500">{errors.title.message}</span>
                  )}
                </div>

                <div className="flex items-center gap-x-2">
                  <Link href="/tutor/courses">
                    <Button variant="ghost" type="button">
                      Cancelar
                    </Button>
                  </Link>
                  <Button type="submit">Continuar</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
