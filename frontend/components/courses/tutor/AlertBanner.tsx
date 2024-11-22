import { Info } from "lucide-react";

export default function AlertBanner({
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
        aria-labelledby="hs-with-description-label"
      >
        <div className="flex">
          <div className="shrink-0">
            <Info className="shrink-0 size-4 mt-0.5" />
          </div>
          <div className="ms-4">
            <h3
              id="hs-with-description-label"
              className="text-sm font-semibold"
            >
              {label}
            </h3>
            <div className="mt-1 text-sm text-yellow-700">{description}</div>
          </div>
        </div>
      </div>
    </>
  );
}
