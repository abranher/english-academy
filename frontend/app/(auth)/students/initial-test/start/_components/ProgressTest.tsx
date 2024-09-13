import { useInitialTestData } from "@/components/hooks/useInitialTestData";
import { Progress } from "@/components/shadcn/ui/progress";

export default function ProgressTest() {
  const { progress } = useInitialTestData();

  return (
    <>
      <div className="flex flex-col gap-3">
        <Progress variant="success" value={progress} />
        <div className="w-full text-end">
          <p className="font-bold text-lg">{`${Math.round(progress)} %`}</p>
        </div>
      </div>
    </>
  );
}
