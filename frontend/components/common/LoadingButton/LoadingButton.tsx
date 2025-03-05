"use client";

import { Button } from "@/components/shadcn/ui/button";
import { Loader2 } from "lucide-react";

export function LoadingButton({
  isLoading,
  isValid,
  isSubmitting,
}: {
  isLoading: boolean;
  isValid: boolean;
  isSubmitting: boolean;
}) {
  return (
    <>
      {!isLoading ? (
        <Button disabled={!isValid || isSubmitting} type="submit">
          Confirmar
        </Button>
      ) : (
        <Button disabled>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Espere por favor...
        </Button>
      )}
    </>
  );
}
