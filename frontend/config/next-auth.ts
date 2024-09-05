import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import axios from "./axios";
import { NEXT_PUBLIC_BACKEND_URL } from "./app";

async function refreshToken(token: JWT): Promise<JWT> {
  const res = await fetch(NEXT_PUBLIC_BACKEND_URL + "/api/auth/refresh", {
    method: "POST",
    headers: {
      authorization: `Refresh ${token.backendTokens.refreshToken}`,
    },
  });

  const response = await res.json();

  return {
    ...token,
    backendTokens: response,
  };
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;

        const { email, password } = credentials;

        const response = await axios.post("/api/auth/signin", {
          email,
          password,
        });

        if (response.status == 401) {
          console.log(response.statusText);

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
