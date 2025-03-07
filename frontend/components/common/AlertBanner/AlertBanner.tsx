import { Info } from "lucide-react";

export function AlertBanner({
  label,
  description = "",
}: {
  label: string;
  description?: string;
}) {
  return (
    <>
      <div
        className="bg-yellow-50 border border-yellow-200 text-sm text-yellow-800 rounded-lg p-4 dark:bg-yellow-800/10 dark:border-yellow-900 dark:text-yellow-500"
        role="alert"
        tabIndex={-1}
      >
        <div className="flex gap-2 items-center">
          <Info className="w-5 h-5" />
          <div>
            <h3 className="text-md font-bold">{label}</h3>
            <div className="text-sm">{description}</div>
          </div>
        </div>
      </div>
    </>
  );
}
