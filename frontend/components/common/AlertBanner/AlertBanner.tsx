import { Info, AlertCircle, CheckCircle2, AlertTriangle } from "lucide-react";

type AlertVariant = "default" | "destructive" | "success" | "warning" | "info";

interface AlertBannerProps {
  label: string;
  description?: string;
  variant?: AlertVariant;
}

export function AlertBanner({
  label,
  description = "",
  variant = "default",
}: AlertBannerProps) {
  const variants = {
    default: {
      bg: "bg-blue-50 dark:bg-blue-900/10",
      border: "border-blue-200 dark:border-blue-900",
      text: "text-blue-800 dark:text-blue-500",
      icon: <Info className="w-5 h-5" />,
    },
    destructive: {
      bg: "bg-red-50 dark:bg-red-900/10",
      border: "border-red-200 dark:border-red-900",
      text: "text-red-800 dark:text-red-500",
      icon: <AlertCircle className="w-5 h-5" />,
    },
    success: {
      bg: "bg-green-50 dark:bg-green-900/10",
      border: "border-green-200 dark:border-green-900",
      text: "text-green-800 dark:text-green-500",
      icon: <CheckCircle2 className="w-5 h-5" />,
    },
    warning: {
      bg: "bg-yellow-50 dark:bg-yellow-900/10",
      border: "border-yellow-200 dark:border-yellow-900",
      text: "text-yellow-800 dark:text-yellow-500",
      icon: <AlertTriangle className="w-5 h-5" />,
    },
    info: {
      bg: "bg-blue-50 dark:bg-blue-900/10",
      border: "border-blue-200 dark:border-blue-900",
      text: "text-blue-800 dark:text-blue-500",
      icon: <Info className="w-5 h-5" />,
    },
  };

  const currentVariant = variants[variant];

  return (
    <section
      className={`${currentVariant.bg} ${currentVariant.border} ${currentVariant.text} rounded-lg p-4 text-sm`}
      role="alert"
      tabIndex={-1}
    >
      <article className="flex gap-2 items-center">
        {currentVariant.icon}
        <div>
          <h3 className="text-md font-bold">{label}</h3>
          {description && <div className="text-sm">{description}</div>}
        </div>
      </article>
    </section>
  );
}
