import { TPerson } from './presonModel';

export type Tpeople = {
  count: number,
  next: string | null,
  previous: string | null,
  results: Array<TPerson>,
}