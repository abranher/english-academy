import NextAuth, { type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { User } from "./types/models/User";
import { JWT } from "next-auth/jwt";
import { NEXT_PUBLIC_BACKEND_URL } from "./config/app";
import axios from "./config/axios";

async function refreshToken(token: JWT): Promise<JWT> {
  const response = await fetch(NEXT_PUBLIC_BACKEND_URL + "/api/auth/refresh", {
    method: "POST",
    headers: {
      authorization: `Refresh ${token.backendTokens.refreshToken}`,
    },
  });

  const data = await response.json();

  return {
    ...token,
    backendTokens: data,
  };
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) return null;
        const { email, password } = credentials;
        const response = await axios.post("/api/auth/signin", {
          email,
          password,
        });
        if (response.status == 401) {
          return null;
        }
        const user = await response.data;
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) return { ...token, ...user };
      if (new Date().getTime() < token.backendTokens.expiresIn) return token;
      return await refreshToken(token);
    },

    async session({ token, session }) {
      console.log(token);

      session.user = {
        ...session.user,
        id: token.id as string,
        email: token.email as string,
        role: token.role as Roles,
      };
      session.backendTokens = token.backendTokens;
      return session;

      //session.user = token.user;
      //session.backendTokens = token.backendTokens;
      // return session;
    },
  },
});
