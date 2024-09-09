"use client";

import { useQuestionsStore } from "@/store/initial-test";
import Test from "../_components/Test";

export default function InitialTestStartPage() {
  const questions = useQuestionsStore((state) => state.questions);

  return (
    <>
      <div className="container h-[600px] flex flex-col items-center justify-center">
        <div className="lg:p-8">
          <div className="mx-auto">
            <h2 className="text-4xl">Prueba inicial</h2>

            {questions.length > 0 && <Test />}
          </div>
        </div>
      </div>
    </>
  );
}
