import clsx, { type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatCurrency(amount: number) {
  const formatted = Math.abs(amount).toLocaleString("en-PK");
  const sign = amount < 0 ? "-" : "";
  return `${sign}Rs. ${formatted}`;
}

export function formatNumber(n: number) {
  return n.toLocaleString("en-PK");
}
