import { Flour } from "server/src/model/flour";

export interface Selection {
  flour: Flour,
  amount: number,
  hydration?: number
}