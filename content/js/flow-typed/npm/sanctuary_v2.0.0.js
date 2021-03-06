declare module 'sanctuary' {
  declare export function create({checkTypes: boolean, env: *}): S
  declare export var env: *
}

declare class Maybe<A> {
}
declare class Pair<A, B> {
}

type S = {
  Nothing: Maybe<*>,
  Just<A>(a: A): Maybe<A>,
  append<A>(a: A): Array<A> => Array<A>,
  drop<A>(n: number): Array<A> => Maybe<Array<A>>,
  dropWhile<A>(pred: A => boolean): Array<A> => Array<A>,
  takeWhile<A>(pred: A => boolean): Array<A> => Array<A>,
  isJust<A>(m: Maybe<A>): boolean,
  filter<A>(pred: A => boolean): Array<A> => Array<A>,
  reject<A>(pred: A => boolean): Array<A> => Array<A>,
  curry2<A, B, C>(f: (A, B) => C): A => B => C,
  init<A>(as: Array<A>): Maybe<Array<A>>,
  head<A>(as: Array<A>): Maybe<A>,
  last<A>(as: Array<A>): Maybe<A>,
  tail<A>(as: Array<A>): Maybe<Array<A>>,
  equals<A>(a: A): A => boolean,
  on<A, B, C>(f: (A => A => B)): (C => A) => C => C => B,
  groupBy<A>(f: (A => A => boolean)):  Array<A> => Array<Array<A>>,
  max(number): number => number,
  maybe<A, B>(b: B): (A => B) => Maybe<A> => B,
  maybe_<A, B>(b: () => B): (A => B) => Maybe<A> => B,
  justs<A>(as: Array<Maybe<A>>): Array<A>,
  fromMaybe_<A>(f: () => A): Maybe<A> => A,
  fromMaybe<A>(f: A): Maybe<A> => A,
  maybeToNullable<A>(a: Maybe<A>): ?A,
  reduce<A, B>(f: (B => A => B)): B => Array<A> => B,
  joinWith(s: string): Array<string> => string,
  keys<A>(m: { [string]: A }): Array<string>,
  fromPairs<A>(ps: Array<[string, A]>): { [string]: A },
  range(low: number): number => Array<number>,
  find<A>(pred: A => boolean): Array<A> => Maybe<A>,
  stripPrefix(prefix: string): string => Maybe<string>,
  trim(s: string): string,
  splitOn(s: string): string => Array<string>,
  splitOnRegex(s: RegExp): string => Array<string>,
  zip<A, B>(as: Array<A>): Array<B> => Array<Pair<A, B>>,
  fst<A, B>(p: Pair<A, B>): A,
  snd<A, B>(p: Pair<A, B>): B,
  concat<A>(l: Array<A>): Array<A> => Array<A>,
  sort<A>(as: Array<A>): Array<A>,
  join<A>(a: Maybe<Maybe<A>>): Maybe<A>
} & {
  chain<A, B>(f: A => Maybe<B>): Maybe<A> => Maybe<B>
} & {
  map<A, B>(f: A => B): Array<A> => Array<B>
} & {
  map<A, B>(f: A => B): Maybe<A> => Maybe<B>
} & {
  pipe<A, B, C>([A => B, B => C]): A => C
} & {
  pipe<A, B, C, D>([A => B, B => C, C => D]): A => D
} & {
  pipe<A, B, C, D, E>([A => B, B => C, C => D, D => E]): A => E
} & {
  pipe<A, B, C, D, E, F>([A => B, B => C, C => D, D => E, E => F]): A => F
} & {
  pipe<A, B, C, D, E, F, G>([A => B, B => C, C => D, D => E, E => F, F => G]): A => G
} & {
  pipe<A, B, C, D, E, F, G, H>([A => B, B => C, C => D, D => E, E => F, F => G, G => H]): A => H
} & {
  pipe<A, B, C, D, E, F, G, H, I>([A => B, B => C, C => D, D => E, E => F, F => G, G => H, H => I]): A => I
} & {
  join<A>(a: Array<Array<A>>): Array<A>
}
