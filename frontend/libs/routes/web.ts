interface Routes {
  name: string;
  pathname: string;
}

const routes: Routes[] = [
  {
    name: "signin",
    pathname: "/student/auth/signin",
  },
  {
    name: "signup",
    pathname: "/student/auth/signup",
  },
];

const web = (name: string): string => {
  const routeFound = routes.find((route) => route.name === name);

  if (!routeFound) throw new Error("El nombre de ruta indicado no existe!");

  return routeFound.pathname;
};

export default web;
