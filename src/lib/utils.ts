import mongoose from "mongoose";

export function cn(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}
