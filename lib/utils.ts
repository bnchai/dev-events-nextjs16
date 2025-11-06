import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateSlug = (title: string) => {
  return title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/[\s-]+/g, '-') // Replace multiple space, hyphen with hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};
