import type { Primitive } from 'type-fest';
import type { IsLiteralUnion } from 'type-fest/source/is-literal';
import type { IsNotFalse } from 'type-fest/source/internal';

// type GetPrismaSelect<T> = {
//   [K in keyof T]?: T[K] extends Primitive
//     ? boolean
//       : T[K] extends ArrayLike<infer U>
//         ? (U extends Primitive ? boolean : { select: GetPrismaSelect<U> }) | boolean
//         : { select: GetPrismaSelect<T[K]> } | boolean;
// };

type IsArray<T> = T extends Array<infer U>
  ? U extends Primitive
    ? boolean
    : { select: GetPrismaSelect<U> }
  : never;

type IsObject<T> = IsNotFalse<IsLiteralUnion<T>> extends true
  ? { select: GetPrismaSelect<T> }
  : never;

export type GetPrismaSelect<T> = {
  [K in keyof T]?: boolean | IsArray<T[K]> | IsObject<T[K]>;
};
