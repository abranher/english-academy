import { NEXT_PUBLIC_BACKEND_URL } from "@/config/app";
import { JWT } from "next-auth/jwt";

export default class SessionService {
  static async refreshToken(token: JWT): Promise<JWT> {
    const response = await fetch(
      NEXT_PUBLIC_BACKEND_URL + "/api/auth/refresh",
      {
        method: "POST",
        headers: {
          authorization: `Refresh ${token.backendTokens.refreshToken}`,
        },
      }
    );

    const data = await response.json();

    return {
      ...token,
      backendTokens: data,
    };
  }
}
