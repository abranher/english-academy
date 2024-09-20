import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import axios from "@/config/axios";
import SessionService from "@/libs/auth/Session";
import { object, string, ZodError } from "zod";
import { Roles } from "@/types/enums/Roles";

class NotStudentError extends CredentialsSignin {
  code = "No eres estudiante.";
}

class NotTutorError extends CredentialsSignin {
  code = "No eres tutor.";
}

class NotAdminError extends CredentialsSignin {
  code = "No eres administrador.";
}

class InvalidCredentialsError extends CredentialsSignin {
  code = "Credenciales no validas";
}

class UserNotFound extends CredentialsSignin {
  code = "Usuario no encontrado";
}

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
      credentials: { email: {}, password: {}, type: {} },
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

          if (credentials.type === user.user.role) {
            return user;
          }

          if (credentials.type === Roles.STUDENT) throw new NotStudentError();
          if (credentials.type === Roles.TUTOR) throw new NotTutorError();
          if (credentials.type === Roles.ADMIN) throw new NotAdminError();
        } catch (error) {
          if (error instanceof NotStudentError) throw new NotStudentError();

          if (error instanceof NotTutorError) throw new NotTutorError();

          if (error instanceof NotAdminError) throw new NotAdminError();

          if (error instanceof ZodError) {
            throw new InvalidCredentialsError();
          }

          if (error?.response?.status === 401) {
            throw new UserNotFound();
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
