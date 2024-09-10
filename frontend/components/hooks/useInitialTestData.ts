import { useInitialTestStore } from "@/store/initial-test";

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

  return { exercises, correct, incorrect, unanswered };
};
