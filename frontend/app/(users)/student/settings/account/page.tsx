import { Separator } from "@/components/shadcn/ui/separator";
import { AccountForm } from "./account-form";

export default function SettingsAccountPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Cuenta</h3>
        <p className="text-sm text-muted-foreground">
          Actualice la configuración de su cuenta. Establezca su idioma
          preferido y su zona horaria.
        </p>
      </div>
      <Separator />
      <AccountForm />
    </div>
  );
}
