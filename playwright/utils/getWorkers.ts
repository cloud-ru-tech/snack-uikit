import { CI_WORKERS } from '../constants/common';

export function getWorkers(): string | number {
  if (!CI_WORKERS) return 2;

  const value = CI_WORKERS.trim();

  if (value.endsWith('%')) {
    const percentage = parseInt(value);
    return percentage ? `${percentage}%` : 2;
  }

  return parseInt(value) || 2;
}
