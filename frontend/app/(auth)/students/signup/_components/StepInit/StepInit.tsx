import { Button } from "@/components/shadcn/ui/button";
import { useStepStudentStore } from "@/services/store/auth/student/stepStudent";

export function StepInit() {
  const nextStep = useStepStudentStore((state) => state.nextStep);
  const setOpen = useStepStudentStore((state) => state.setOpen);

  return (
    <>
      <section className="text-xs flex flex-col gap-2">
        <article>
          ¡Estamos encantados de que estés interesado en aprender con nosotros!
          Al registrarte, te pediremos algunos datos personales que nos ayudarán
          a conocerte mejor y a ofrecerte la mejor experiencia posible como
          estudiante.
        </article>
        <article>
          Para asegurarnos de que recibas la formación más adecuada,
          realizaremos una pequeña prueba inicial de nivel de inglés. Esta
          prueba nos permitirá evaluar tus habilidades actuales y recomendarte
          los cursos que mejor se adapten a tu nivel.
        </article>
        <article>
          No te preocupes, la prueba es sencilla y está diseñada para que puedas
          demostrar lo que sabes sin estrés.
        </article>
        <article>
          Estamos emocionados por acompañarte en tu viaje de aprendizaje y
          ayudarte a alcanzar tus metas en el dominio del inglés.
        </article>

        <article className="w-full flex justify-between mt-5">
          <Button
            variant="outline"
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancelar
          </Button>

          <Button
            onClick={() => {
              nextStep();
            }}
          >
            Continuar
          </Button>
        </article>
      </section>
    </>
  );
}
