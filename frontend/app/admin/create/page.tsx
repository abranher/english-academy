"use client";

import axios from "@/config/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
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
import Link from "next/link";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  levelId: z.string(),
});

export default function CreateCoursePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const router = useRouter();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    try {
      const response = axios.post("/api/courses", values);
      router.push(`/admin/courses/${response.data.id}`);
      toast.success("Curso creado!");
    } catch (error) {
      toast.error("something ocurred!");
    }
  };

  return (
    <>
      <div className="max-w-5xl mx-auto flex items-center justify-center h-full p-6">
        <div>
          <h1 className="text-2xl">Ponle nombre a tu curso</h1>
          <p className="text-sm text-slate-600">
            ¿Cómo te gustaría llamar a tu curso? No te preocupes, podrás cambiar
            esto más tarde.
          </p>{" "}
          <br />
          <Card x-chunk="dashboard-07-chunk-0">
            <CardHeader>
              <CardTitle>Curso</CardTitle>
              <CardDescription>
                Lipsum dolor sit amet, consectetur adipiscing elit
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
                <div className="grid gap-3">
                  <Label>Nivel</Label>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a fruit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Fruits</SelectLabel>
                        <SelectItem value="apple">Apple</SelectItem>
                        <SelectItem value="banana">Banana</SelectItem>
                        <SelectItem value="blueberry">Blueberry</SelectItem>
                        <SelectItem value="grapes">Grapes</SelectItem>
                        <SelectItem value="pineapple">Pineapple</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
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
                  <Link href="/admin/dashboard">
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
