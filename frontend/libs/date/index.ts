import { format } from "date-fns";
import { es } from "date-fns/locale";

export function formatDate(isoDateString: string): string {
  const date = new Date(isoDateString);
  return format(date, "EEEE, dd 'de' MMMM 'de' yyyy 'a las' HH:mm aa", {
    locale: es,
  });
}
