import { auth } from "@/config/auth";

import { ResultInitialTest } from "./_components/ResultInitialTest";

export default async function ResultInitialTestPage() {
  const session = await auth();

  if (!session) return <>Error al cargar los datos del usuario</>;

  return (
    <>
      <section className="container relative h-[600px] flex flex-col items-center justify-center">
        <ResultInitialTest session={session} />
      </section>
    </>
  );
}
