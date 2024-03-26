import type { AuthConfig } from "@auth/core";
import { Auth } from "@auth/core";
import Google from "@auth/core/providers/google";

const authConfig = {
  secret: process.env.AUTH_SECRET,
  trustHost: !!process.env.VERCEL || process.env.NODE_ENV === "development",
  redirectProxyUrl: process.env.AUTH_REDIRECT_PROXY_URL,
  basePath: "/api/auth/proxy",
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
} satisfies AuthConfig;

export async function GET(request: Request) {
  return Auth(request, authConfig);
}

export async function POST(request: Request) {
  return Auth(request, authConfig);
}
