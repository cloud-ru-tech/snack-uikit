type Primitive = null | undefined | string | number | boolean | symbol | bigint;

type BuiltIns = Primitive | void | Date | RegExp;

/* eslint-disable no-use-before-define */
export type PartialDeep<T> = T extends
  | BuiltIns
  | ((...arguments_: unknown[]) => unknown)
  | (new (...arguments_: unknown[]) => unknown)
  ? T
  : T extends Map<infer KeyType, infer ValueType>
    ? PartialMapDeep<KeyType, ValueType>
    : T extends Set<infer ItemType>
      ? PartialSetDeep<ItemType>
      : T extends ReadonlyMap<infer KeyType, infer ValueType>
        ? PartialReadonlyMapDeep<KeyType, ValueType>
        : T extends ReadonlySet<infer ItemType>
          ? PartialReadonlySetDeep<ItemType>
          : T extends object
            ? PartialObjectDeep<T>
            : unknown;

/**
 Same as `PartialDeep`, but accepts only `Map`s and as inputs. Internal helper for `PartialDeep`.
 */
type PartialMapDeep<KeyType, ValueType> = unknown & Map<PartialDeep<KeyType>, PartialDeep<ValueType>>;

/**
 Same as `PartialDeep`, but accepts only `Set`s as inputs. Internal helper for `PartialDeep`.
 */
type PartialSetDeep<T> = unknown & Set<PartialDeep<T>>;

/**
 Same as `PartialDeep`, but accepts only `ReadonlyMap`s as inputs. Internal helper for `PartialDeep`.
 */
type PartialReadonlyMapDeep<KeyType, ValueType> = unknown & ReadonlyMap<PartialDeep<KeyType>, PartialDeep<ValueType>>;

/**
 Same as `PartialDeep`, but accepts only `ReadonlySet`s as inputs. Internal helper for `PartialDeep`.
 */
type PartialReadonlySetDeep<T> = unknown & ReadonlySet<PartialDeep<T>>;

/**
 Same as `PartialDeep`, but accepts only `object`s as inputs. Internal helper for `PartialDeep`.
 */
type PartialObjectDeep<ObjectType extends object> = {
  [KeyType in keyof ObjectType]?: PartialDeep<ObjectType[KeyType]>;
};

export type PathsToStringProps<T> = T extends string
  ? []
  : {
      [K in Extract<keyof T, string>]: [K, ...PathsToStringProps<T[K]>];
    }[Extract<keyof T, string>];

export type Join<T extends string[], D extends string> = T extends []
  ? never
  : T extends [infer F]
    ? F
    : T extends [infer F, ...infer R]
      ? F extends string
        ? `${F}${D}${Join<Extract<R, string[]>, D>}`
        : never
      : string;
