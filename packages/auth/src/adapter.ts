import type { Adapter } from "@auth/core/adapters";
import type { AdapterAccount, AdapterAuthenticator } from "next-auth/adapters";
import { and, eq } from "drizzle-orm";

import type { db } from "@acme/db";
import { createId, schema } from "@acme/db";

export function DrizzleAdapter(client: typeof db): Adapter {
  const { users, accounts, sessions, verificationTokens, authenticator } =
    schema;

  return {
    async createUser(data) {
      return await client
        .insert(users)
        .values({ ...data, id: createId() })
        .returning()
        .then((res) => res[0]!);
    },
    async getUser(data) {
      return await client
        .select()
        .from(users)
        .where(eq(users.id, data))
        .then((res) => res[0] ?? null);
    },
    async getUserByEmail(data) {
      return await client
        .select()
        .from(users)
        .where(eq(users.email, data))
        .then((res) => res[0] ?? null);
    },
    async createSession(data) {
      return await client
        .insert(sessions)
        .values({ ...data })
        .returning()
        .then((res) => res[0]!);
    },
    async getSessionAndUser(data) {
      return await client
        .select({
          session: sessions,
          user: users,
        })
        .from(sessions)
        .where(eq(sessions.sessionToken, data))
        .innerJoin(users, eq(users.id, sessions.userId))
        .then((res) => res[0] ?? null);
    },
    async updateUser(data) {
      if (!data.id) {
        throw new Error("No user id.");
      }
      return await client
        .update(users)
        .set(data)
        .where(eq(users.id, data.id))
        .returning()
        .then((res) => res[0]!);
    },
    async updateSession(data) {
      return await client
        .update(sessions)
        .set(data)
        .where(eq(sessions.sessionToken, data.sessionToken))
        .returning()
        .then((res) => res[0]);
    },
    async linkAccount(rawAccount) {
      return stripUndefined(
        await client
          .insert(accounts)
          .values(rawAccount)
          .returning()
          .then((res) => res[0]!),
      );
    },
    async getUserByAccount(account) {
      const dbAccount =
        (await client
          .select()
          .from(accounts)
          .where(
            and(
              eq(accounts.providerAccountId, account.providerAccountId),
              eq(accounts.provider, account.provider),
            ),
          )
          .leftJoin(users, eq(accounts.userId, users.id))
          .then((res) => res[0])) ?? null;

      return dbAccount?.user ?? null;
    },
    async deleteSession(sessionToken) {
      const session = await client
        .delete(sessions)
        .where(eq(sessions.sessionToken, sessionToken))
        .returning()
        .then((res) => res[0] ?? null);

      return session;
    },
    async createVerificationToken(token) {
      return await client
        .insert(verificationTokens)
        .values(token)
        .returning()
        .then((res) => res[0]!);
    },
    async useVerificationToken(token) {
      try {
        return await client
          .delete(verificationTokens)
          .where(
            and(
              eq(verificationTokens.identifier, token.identifier),
              eq(verificationTokens.token, token.token),
            ),
          )
          .returning()
          .then((res) => res[0]!);
      } catch (err) {
        throw new Error("No verification token found.");
      }
    },
    async deleteUser(id) {
      await client
        .delete(users)
        .where(eq(users.id, id))
        .returning()
        .then((res) => res[0]!);
    },
    async unlinkAccount(account) {
      const { type, provider, providerAccountId, userId } = await client
        .delete(accounts)
        .where(
          and(
            eq(accounts.providerAccountId, account.providerAccountId),
            eq(accounts.provider, account.provider),
          ),
        )
        .returning()
        .then((res) => res[0]!);

      return { provider, type, providerAccountId, userId };
    },
    async getAccount(providerAccountId, provider) {
      return ((await client.query.accounts?.findFirst({
        where: and(
          eq(accounts.providerAccountId, providerAccountId),
          eq(accounts.provider, provider),
        ),
      })) ?? null) as AdapterAccount | null;
    },
    async createAuthenticator(authenticator) {
      return client
        .insert(schema.authenticator)
        .values(authenticator)
        .returning()
        .then((res) => ({
          ...res[0]!,
          transports: res[0]!.transports ?? undefined,
        }));
    },
    async getAuthenticator(credentialID) {
      return (
        ((await client.query.authenticator.findFirst({
          where: eq(authenticator.credentialID, credentialID),
        })) as unknown as AdapterAuthenticator) ?? null
      );
    },
    async listAuthenticatorsByUserId(userId) {
      return client.query.authenticator.findMany({
        where: eq(authenticator.userId, userId),
      }) as unknown as Promise<AdapterAuthenticator[]>;
    },
    async updateAuthenticatorCounter(credentialID, counter) {
      return client
        .update(authenticator)
        .set({ counter })
        .where(eq(authenticator.credentialID, credentialID))
        .returning()
        .then((res) => ({
          ...res[0]!,
          transports: res[0]!.transports ?? undefined,
        }));
    },
  };
}

type NonNullableProps<T> = {
  [P in keyof T]: null extends T[P] ? never : P;
}[keyof T];

function stripUndefined<T>(obj: T): Pick<T, NonNullableProps<T>> {
  const result = {} as T;
  for (const key in obj) if (obj[key] !== undefined) result[key] = obj[key];
  return result;
}
