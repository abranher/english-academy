import { IconBadge } from "@/components/icons/IconBadge";
import { LucideIcon } from "lucide-react";

interface InfoCardProps {
  numberOfItems: number;
  variant?: "default" | "success";
  label: string;
  icon: LucideIcon;
}

export default function InfoCard({
  numberOfItems,
  icon: Icon,
  variant,
  label,
}: InfoCardProps) {
  return (
    <div className="border rounded-md flex items-center gap-x-2 p-3">
      <IconBadge variant={variant} icon={Icon} />
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-gray-50 text-sm">
          {numberOfItems} {numberOfItems === 1 ? "Curso" : "Cursos"}
        </p>
      </div>
    </div>
  );
}
