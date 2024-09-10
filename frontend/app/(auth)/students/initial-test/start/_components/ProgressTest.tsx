import { useInitialTestData } from "@/components/hooks/useInitialTestData";
import { Progress } from "@/components/shadcn/ui/progress";

const calculateProgress = (
  correctAnswer: number,
  totalAnswer: number
): number => {
  if (totalAnswer === 0) return 0;
  const percentage = (correctAnswer / totalAnswer) * 100;
  return Math.round(percentage);
};

export default function ProgressTest() {
  const { exercises, correct, incorrect, unanswered } = useInitialTestData();

  const progress = calculateProgress(correct, exercises.length);

  console.log({
    correct,
    incorrect,
    unanswered,
  });

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
