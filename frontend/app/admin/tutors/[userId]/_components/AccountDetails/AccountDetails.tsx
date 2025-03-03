"use client";

import { Badge } from "@/components/shadcn/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { differenceInYears, format, getYear, isAfter, setYear } from "date-fns";
import { BadgeCheck, CalendarDays, CircleUser, Mail } from "lucide-react";

function formatBirth(birth: Date | null): string {
  if (!birth) return "Fecha de nacimiento no disponible";
  let age = differenceInYears(new Date(), birth);
  const currentYear = getYear(new Date());
  const celebratesThisYear = setYear(birth, currentYear);
  if (isAfter(celebratesThisYear, new Date())) {
    age--;
  }
  return `${format(birth, "dd/MM/yyyy")}, (${age} años)`;
}

export function AccountDetails({
  email,
  birth,
}: {
  email: string;
  birth: Date | null;
}) {
  return (
    <>
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
              <div className="flex gap-1 items-center">
                <Mail className="w-4" />
                {email}
                <Badge className="flex gap-1 items-center ml-1">
                  <BadgeCheck className="w-4" />
                  Verificado
                </Badge>
              </div>
              <div className="flex gap-1 items-center">
                <CalendarDays className="w-4" />
                {formatBirth(birth)}
                <Badge className="flex gap-1 items-center ml-1">
                  <BadgeCheck className="w-4" />
                  Mayor de edad
                </Badge>
              </div>

              {/*country && (
                <div className="flex items-center text-sm text-muted-foreground">
                  🌍 {country}
                </div>
              )*/}
            </article>
          </section>
        </CardContent>
      </Card>
    </>
  );
}
