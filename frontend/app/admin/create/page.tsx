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

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
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
    } catch (error) {
      toast.error("something ocurred!");
    }
  };

  return (
    <>
      <div className="max-w-5xl mx-auto flex items-center justify-center h-full p-6">
        <div>
          <h1 className="text-2xl">Name your course</h1>
          <p className="text-sm text-slate-600">
            What would you like to name your course? Don&apos;t worry, you can
            change this later.
          </p>{" "}
          <br />
          <Card x-chunk="dashboard-07-chunk-0">
            <CardHeader>
              <CardTitle>Course Title</CardTitle>
              <CardDescription>
                Lipsum dolor sit amet, consectetur adipiscing elit
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="name">Course Title</Label>
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
                      cancel
                    </Button>
                  </Link>
                  <Button type="submit">Continue</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}