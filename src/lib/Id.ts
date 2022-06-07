import * as O from "fp-ts/lib/Ord";
import { Ord as stringOrd } from "fp-ts/lib/string";

export type Id = number | string;

export const generateUnique = (): Id =>
  Date.now().toString(36) + Math.random().toString(36).substring(2);

export const Ord: O.Ord<Id> = O.contramap((id: Id) => id.toString())(stringOrd);
