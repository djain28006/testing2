import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function calculateEstimatedRentalCost(
  kms: number,
  days: number,
  ratePerKm: number,
  driverAllowancePerDay: number,
  baseFarePerDay: number
): number {
  const kmCost = kms * ratePerKm;
  const driverCost = days * driverAllowancePerDay;
  const baseCost = days * baseFarePerDay;
  return Math.max(kmCost + driverCost, baseCost + driverCost);
}
