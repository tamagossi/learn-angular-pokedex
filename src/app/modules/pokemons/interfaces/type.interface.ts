import { Result } from '@/core/interfaces';

export interface TypeResponse {
  count: number;
  next?: string;
  previous?: string;
  results: Result[];
}
