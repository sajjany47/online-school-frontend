import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const GenerateEmployeeId = () => {
  const nanoidCharacters: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const id = Array.from({ length: 8 }, () =>
    nanoidCharacters.charAt(Math.floor(Math.random() * nanoidCharacters.length))
  ).join("");
  return id.toUpperCase();
};
