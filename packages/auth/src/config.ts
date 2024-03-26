import type { DefaultSession, NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import WebAuthn from "next-auth/providers/webauthn";

import { db } from "@acme/db";

import { DrizzleAdapter } from "./adapter";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const authConfig = {
  adapter: DrizzleAdapter(db),
  providers: [
    WebAuthn({
      name: "Passkey",
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  experimental: {
    enableWebAuthn: true,
  },
  callbacks: {
    session: (opts) => {
      if (!("user" in opts)) throw "unreachable with session strategy";

      return {
        ...opts.session,
        user: {
          ...opts.session.user,
          id: opts.user.id,
        },
      };
    },
  },
} satisfies NextAuthConfig;
