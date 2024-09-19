export const ROOT = "/";

export const ROUTES = {
  PUBLIC: [
    "/",
    "/students/signin",
    "/students/signup",
    "/tutors/signup",
    "/tutors/signin",
  ],
  ADMIN: {
    DEFAULT_REDIRECT: "/admin",
    ROUTES: ["/admin/dashboard", "/admin/courses"],
  },
  STUDENT: {
    DEFAULT_REDIRECT: "/student",
    ROUTES: ["/"],
  },
  TUTOR: {
    DEFAULT_REDIRECT: "",
    ROUTES: ["/"],
  },
};
