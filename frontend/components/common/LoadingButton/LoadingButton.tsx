"use client";

import { Button } from "@/components/shadcn/ui/button";
import { Loader2, LucideIcon } from "lucide-react";

export function LoadingButton({
  isLoading,
  isValid,
  isSubmitting,
  label = "Confirmar",
  icon: Icon,
}: {
  isLoading: boolean;
  isValid: boolean;
  isSubmitting: boolean;
  label?: string;
  icon?: LucideIcon;
}) {
  return (
    <>
      {!isLoading ? (
        <Button disabled={!isValid || isSubmitting} type="submit">
          {Icon && <Icon className="mr-2 h-4 w-4" />}
          {label}
        </Button>
      ) : (
        <Button disabled>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Espere...
        </Button>
      )}
    </>
  );
}
