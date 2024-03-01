import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const getCharacterValidationError = (str) => {
  return `must have at least 1 ${str} character`;
};
