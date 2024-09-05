import { ADMIN } from "./ADMIN";
import { STUDENT } from "./STUDENT";
import { TUTOR } from "./TUTOR";

export const webStudent = (name: string) => {
  const routeFound = STUDENT.find((route) => route.name === name);
  if (!routeFound) throw new Error("El nombre de ruta indicado no existe!");
  return routeFound.pathname;
};

export const webTutor = (name: string) => {
  const routeFound = TUTOR.find((route) => route.name === name);
  if (!routeFound) throw new Error("El nombre de ruta indicado no existe!");
  return routeFound.pathname;
};

export const webAdmin = (name: string) => {
  const routeFound = ADMIN.find((route) => route.name === name);
  if (!routeFound) throw new Error("El nombre de ruta indicado no existe!");
  return routeFound.pathname;
};
