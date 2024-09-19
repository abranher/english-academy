export const ROOT = "/";

export const PUBLIC_ROUTES = [
  "/",
  "/students/signin",
  "/students/signup",
  "/tutors/signup",
  "/tutors/signin",
];

export const ADMIN = {
  DEFAULT_REDIRECT: "/admin",
  ROUTES: ["/admin/dashboard", "/admin/courses"],
};

export const STUDENT = {
  DEFAULT_REDIRECT: "/student",
  ROUTES: ["/"],
};

export const TUTOR = {
  DEFAULT_REDIRECT: "",
  ROUTES: ["/"],
};
