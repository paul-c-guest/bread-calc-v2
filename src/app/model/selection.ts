import { Flour } from "server/src/flour";

export interface Selection {
  flour: Flour,
  amount: number,
  hydration?: number
}