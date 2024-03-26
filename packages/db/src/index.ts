import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as auth from "./schema/auth";
import { id } from "./types/id";

export { createId } from "./types/id";
export const schema = { ...auth };

export const types = { id };

export { pgTable as tableCreator } from "./schema/_table";

export * from "drizzle-orm";

const sql = neon<boolean, boolean>(process.env.DATABASE_URL!);

export const db = drizzle(sql, { schema });
