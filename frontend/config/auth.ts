import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import axios from "@/config/axios";
import SessionService from "@/libs/auth/Session";

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
      return await SessionService.refreshToken(token);
    },

    async session({ token, session }) {
      session.user = token.user;
      session.backendTokens = token.backendTokens;
      return session;
    },
  },
});
