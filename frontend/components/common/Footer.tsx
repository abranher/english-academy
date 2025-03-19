import { getYear } from "date-fns";

export default function Footer() {
  return (
    <footer>
      <section className="container mx-auto px-4 text-center">
        <article className="py-8">
          <p className="text-center text-base text-body-color dark:text-white">
            &copy; {getYear(Date())} Inglés App. Todos los derechos reservados.
          </p>
        </article>
      </section>
    </footer>
  );
}
