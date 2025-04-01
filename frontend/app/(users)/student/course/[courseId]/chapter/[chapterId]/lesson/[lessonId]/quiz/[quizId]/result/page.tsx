import { redirect } from "next/navigation";

import { auth } from "@/config/auth";

import { QuizResult } from "./_components/QuizResult";

export default async function ResultQuizPage() {
  const session = await auth();
  if (!session) redirect("/");
  if (!session.user.student) redirect("/");

  return (
    <section className="container relative h-[600px] flex flex-col items-center justify-center">
      <QuizResult session={session} />
    </section>
  );
}
