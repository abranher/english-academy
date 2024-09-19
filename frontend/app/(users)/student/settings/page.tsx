import { Separator } from "@/components/shadcn/ui/separator";
import { ProfileForm } from "./profile-form";

export default function SettingsProfileStudentPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Perfil</h3>
        <p className="text-sm text-muted-foreground">
          Así te verán los demás en la plataforma.
        </p>
      </div>
      <Separator />
      <ProfileForm />
    </div>
  );
}
