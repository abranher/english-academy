import { Button } from "@/components/shadcn/ui/button";
import { useStepTutorStore } from "@/services/store/auth/tutor/stepTutor";

export function StepInit() {
  const nextStep = useStepTutorStore((state) => state.nextStep);
  const setOpen = useStepTutorStore((state) => state.setOpen);

  return (
    <>
      <section className="text-xs flex flex-col gap-2">
        <article>
          Estamos emocionados de que estés interesado en unirte a nosotros. Al
          registrarte, te pediremos algunos datos personales que nos ayudarán a
          conocerte mejor y asegurarnos de que tengas la mejor experiencia
          posible como tutor. También podrás subir tu currículum vitae (CV) para
          que podamos evaluar tu trayectoria profesional.
        </article>
        <article>
          Además, si cuentas con certificaciones que respalden tu experiencia,
          ¡nos encantaría que las compartieras! Podrás agregar información sobre
          tus certificaciones, incluyendo el título, la institución que las
          emitió, la fecha de emisión y el idioma en el que están disponibles.
          Esto nos permitirá conocer más sobre tus habilidades y formación.
        </article>
        <article>
          Ten en cuenta que todos los datos serán revisados cuidadosamente por
          nuestro equipo de administradores. Ellos se encargarán de evaluar tu
          información para asegurarse de que cumples con los requisitos
          necesarios. Una vez completado este proceso, recibirás una
          notificación sobre tu aprobación.
        </article>
        <article>
          ¡Estamos ansiosos por tenerte a bordo y contribuir juntos a la
          enseñanza del inglés!
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
