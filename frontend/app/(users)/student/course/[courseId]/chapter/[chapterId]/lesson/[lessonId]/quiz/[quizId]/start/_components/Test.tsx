import { useQuizStore } from "@/services/store/student/quiz";

import ProgressTest from "./ProgressTest";
import Exercise from "./Exercise";

export default function Test() {
  const exercises = useQuizStore((state) => state.exercises);
  const currentExercise = useQuizStore((state) => state.currentExercise);

  const exerciseInfo = exercises[currentExercise];

  return (
    <>
      <div className="text-5xl">
        <h2>Quiz</h2>
      </div>
      <ProgressTest />
      <div className="sm:w-[600px]">
        <Exercise info={exerciseInfo} />
      </div>
    </>
  );
}
