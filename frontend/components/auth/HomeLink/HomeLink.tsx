import Link from "next/link";

import { Roles } from "@/types/enums/Roles";
import { cn } from "@/libs/shadcn/utils";

import { buttonVariants } from "@/components/shadcn/ui/button";
import { Home } from "lucide-react";

export function HomeLink({ role = Roles.ADMIN }: { role?: Roles }) {
  return (
    <>
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "secondary" }),
          "absolute flex justify-center items-center gap-2",
          (role === Roles.STUDENT || role === Roles.ADMIN) &&
            "right-4 top-4 md:right-8 md:top-8",
          role === Roles.TUTOR && "left-4 top-4 md:left-8 md:top-8"
        )}
      >
        <Home />
      </Link>
    </>
  );
}
