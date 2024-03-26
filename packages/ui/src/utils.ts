import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export { cva } from "class-variance-authority";
export type { VariantProps } from "class-variance-authority";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
