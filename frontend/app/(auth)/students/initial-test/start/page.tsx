"use client";

import { useInitialTestStore } from "@/store/initial-test";
import Start from "./_components/Start";
import Test from "./_components/Test";

export default function InitialTestStartPage() {
  const exercises = useInitialTestStore((state) => state.exercises);
  console.log(exercises);

  return (
    <>
      <div
        className={
          exercises.length === 0
            ? "container h-screen flex flex-col items-center justify-center"
            : "container h-full flex flex-col items-center justify-center"
        }
      >
        <div className="m-auto lg:p-12 my-8">
          <div className="flex flex-col gap-4">
            {exercises.length === 0 && (
              <>
                <div className="text-5xl">
                  <h2>¿Listo para comenzar?</h2>
                </div>
                <div className="flex justify-end">
                  <Start />
                </div>
              </>
            )}
            {exercises.length > 0 && <Test />}
          </div>
        </div>
      </div>
    </>
  );
}
