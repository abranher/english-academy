import { NEXT_PUBLIC_BACKEND_URL } from "@/config/app";
import axios from "@/config/axios";
import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

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

const authOptions: NextAuthOptions = {
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

        console.log(response.data);

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
    signIn: "/student/auth/signin",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
