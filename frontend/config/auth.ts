import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import axios from "@/config/axios";
import SessionService from "@/libs/auth/Session";
import { object, string, ZodError } from "zod";

export const signInSchema = object({
  email: string({ required_error: "Correo electrónico es requerido" })
    .min(1, "Correo electrónico es requerido")
    .email("Correo electrónico no válido"),
  password: string({ required_error: "Contraseña es requerida" })
    .min(1, "Contraseña es requerida")
    .min(8, "La contraseña debe tener más de 8 caracteres")
    .max(32, "La contraseña debe tener menos de 32 caracteres"),
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      authorize: async (credentials) => {
        try {
          const { email, password } = await signInSchema.parseAsync(
            credentials
          );

          const response = await axios.post("/api/auth/signin", {
            email,
            password,
          });

          const user = await response.data;

          return user;
        } catch (error) {
          if (error?.response?.status === 401 || error instanceof ZodError) {
            return null;
          }
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) return { ...token, ...user };
      if (new Date().getTime() < token.backendTokens.expiresIn) return token;
      return await SessionService.refreshToken(token);
    },

    async session({ token, session }) {
      session.user = token.user;
      session.backendTokens = token.backendTokens;
      return session;
    },
  },
});
