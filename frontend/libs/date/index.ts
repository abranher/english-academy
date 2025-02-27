import { format } from "date-fns";
import { es } from "date-fns/locale";

export function formatDate(isoDateString: Date): string {
  const date = new Date(isoDateString);
  return format(date, "EEEE, dd 'de' MMMM 'de' yyyy 'a las' hh:mm aa", {
    locale: es,
  });
}

export function formatDateShort(isoDateString: Date): string {
  const date = new Date(isoDateString);
  return format(date, "'Se unió en ' MMMM 'de' yyyy", {
    locale: es,
  });
}
