import { differenceInDays, format, formatDistance } from "date-fns";
import { es } from "date-fns/locale";

export function formatDate(isoDateString: Date): string {
  const date = new Date(isoDateString);
  return format(date, "EEEE, dd 'de' MMMM 'de' yyyy', ' hh:mm aa", {
    locale: es,
  });
}

export function formatDateNormal(isoDateString: Date): string {
  const date = new Date(isoDateString);
  return format(date, "dd/MM/yyyy', ' hh:mm aa", {
    locale: es,
  });
}

export function formatDateShort(isoDateString: Date): string {
  const date = new Date(isoDateString);
  return format(date, "'Se unió en ' MMMM 'de' yyyy", {
    locale: es,
  });
}

export function formatDateForOrders(isoDateString: Date): string {
  const date = new Date(isoDateString);
  return format(date, "'Se generó el 'dd' de 'MMMM 'de' yyyy", {
    locale: es,
  });
}

export function formatDateForHumans(date: Date): string {
  const now = new Date();
  return formatDistance(date, now, {
    addSuffix: true,
    locale: es,
  });
}

export function calculateDaysRemaining(endDate: Date): string {
  const today = new Date();
  const days = differenceInDays(endDate, today);

  if (days < 0) return "Expirada";
  else if (days === 0) return "Último día";
  else if (days === 1) return "1 día restante";
  else return `${days} días restantes`;
}

export function formatSubscriptionDate(date: Date): string {
  return format(date, "dd 'de' MMMM 'de' yyyy", { locale: es });
}
