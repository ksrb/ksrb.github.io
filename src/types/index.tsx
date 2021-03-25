/**
 * Given a type T and property K on type T, set that property K to required
 * setting all other properties to optional.
 */
export type RequiredByElsePartial<T, K extends keyof T> = Required<Pick<T, K>> &
  Partial<Omit<T, K>>;

export type RequiredBy<T, K extends keyof T> = Required<Pick<T, K>> &
  Omit<T, K>;

/**
 * Given a type T and property K on type T, set that property K to optional
 * leaving all other as is.
 */
export type PartialBy<T, K extends keyof T> = Partial<Pick<T, K>> & Omit<T, K>;

export type ExtractArrayType<T> = T extends Array<infer U> ? U : T;

export type NonNullableBy<T, K extends keyof T> = {
  [P in keyof Pick<T, K>]-?: NonNullable<T[P]>;
} &
  Omit<T, K>;
