import { useInitialTestStore } from "@/services/store/initial-test";
import ProgressTest from "./ProgressTest";
import Exercise from "./Exercise";

export default function Test() {
  const exercises = useInitialTestStore((state) => state.exercises);
  const currentExercise = useInitialTestStore((state) => state.currentExercise);

  const exerciseInfo = exercises[currentExercise];

  return (
    <>
      <div className="text-5xl">
        <h2>Test de nivel</h2>
      </div>
      <ProgressTest />
      <div className="sm:w-[600px]">
        <Exercise info={exerciseInfo} />
      </div>
    </>
  );
}
