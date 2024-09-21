import { Button } from "@/components/shadcn/ui/button";
import { Loader2 } from "lucide-react";

export default function SignInButton({ isLoading }: { isLoading: boolean }) {
  return (
    <>
      {!isLoading ? (
        <Button type="submit" className="w-full">
          Iniciar sesión
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
