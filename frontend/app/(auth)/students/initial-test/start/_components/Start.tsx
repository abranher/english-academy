"use client";

import { Button } from "@/components/shadcn/ui/button";
import { useInitialTestStore } from "@/store/initial-test";

export default function Start() {
  const fetchExercises = useInitialTestStore((state) => state.fetchExercises);
  const handleClick = () => {
    fetchExercises(10);
  };

  return (
    <>
      <Button onClick={handleClick}>Empezar</Button>
    </>
  );
}
