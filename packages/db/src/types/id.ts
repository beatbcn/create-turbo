import { createId } from "@paralleldrive/cuid2";
import { varchar } from "drizzle-orm/pg-core";

export function id(name: string) {
  return varchar(name, { length: 255 }).$defaultFn(createId);
}

export { createId };
