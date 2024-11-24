import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatRubles(amount) {
  const suffixes = ["", "тыс.", "млн", "млрд", "трлн"];
  if (!amount) return "0 ₽";
  
  const suffixIndex = Math.floor(Math.log10(amount) / 3);
  const scaledAmount = amount / Math.pow(10, suffixIndex * 3);
  let formattedAmount = scaledAmount.toFixed(2);
  parseInt(scaledAmount) === scaledAmount
    ? (formattedAmount = Number(formattedAmount).toFixed(0))
    : (formattedAmount = Number(formattedAmount).toFixed(2));
  return `${formattedAmount} ${suffixes[suffixIndex]} ₽`;
}
