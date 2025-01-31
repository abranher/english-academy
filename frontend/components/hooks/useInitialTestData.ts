import { useInitialTestStore } from "@/services/store/initial-test";

const calculateProgress = (
  correctAnswer: number,
  totalAnswer: number
): number => {
  if (totalAnswer === 0) return 0;
  const percentage = (correctAnswer / totalAnswer) * 100;
  return Math.round(percentage);
};

export const useInitialTestData = () => {
  const exercises = useInitialTestStore((state) => state.exercises);

  let correct = 0;
  let incorrect = 0;
  let unanswered = 0;

  exercises.forEach((exercise) => {
    const { userSelectedAnswer, correctAnswer } = exercise;
    if (userSelectedAnswer == null) unanswered++;
    else if (userSelectedAnswer === correctAnswer) correct++;
    else incorrect++;
  });

  const progress = calculateProgress(correct, exercises.length);

  return { exercises, correct, incorrect, unanswered, progress };
};
