import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: clsx.ClassValue[]) {
  return twMerge(clsx(inputs));
}
