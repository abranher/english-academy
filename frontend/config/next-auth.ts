import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import axios from "./axios";
import { JWT } from "next-auth/jwt";
import { NEXT_PUBLIC_BACKEND_URL } from "./app";

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

export const authOptions: NextAuthOptions = {
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
    async jwt({ token, user }) {
      if (user) return { ...token, ...user };
      if (new Date().getTime() < token.backendTokens.expiresIn) return token;
      return await refreshToken(token);
    },

    async session({ token, session }) {
      session.user = token.user;
      session.backendTokens = token.backendTokens;
      return session;
    },
  },
  pages: {
    signIn: "/",
    signOut: "/",
    newUser: "/",
    verifyRequest: "/",
    error: "/",
  },
};
