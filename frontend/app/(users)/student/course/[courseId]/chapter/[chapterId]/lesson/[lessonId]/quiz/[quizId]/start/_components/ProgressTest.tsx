import { useQuizData } from "@/hooks/useQuizData";

import { Progress } from "@/components/shadcn/ui/progress";

export default function ProgressTest() {
  const { progress } = useQuizData();

  return (
    <section className="flex flex-col gap-3">
      <Progress variant="success" value={progress} />
      <div className="w-full text-end">
        <p className="font-bold text-lg">{`${Math.round(progress)} %`}</p>
      </div>
    </section>
  );
}
