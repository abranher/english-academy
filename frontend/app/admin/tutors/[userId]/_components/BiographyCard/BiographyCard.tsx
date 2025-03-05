"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import Preview from "@/components/shadcn/ui/preview";
import { BookUser } from "lucide-react";

export function BiographyCard({ bio }: { bio: string | null }) {
  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex gap-3 items-center">
            Biografía
            <BookUser />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <section className="flex flex-col gap-5">
            {bio ? (
              <Preview value={bio} />
            ) : (
              <CardDescription>Sin biografía</CardDescription>
            )}
          </section>
        </CardContent>
      </Card>
    </>
  );
}
