type Primitive = null | undefined | string | number | boolean | symbol | bigint;

type BuiltIns = Primitive | void | Date | RegExp;

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

/**
 * https://stackoverflow.com/a/73179989
 */
type Dot<T extends string, U extends string> = '' extends U ? T : `${T}.${U}`;

export type PathsToProps<T, V> = T extends V
  ? ''
  : {
      [K in Extract<keyof T, string>]: Dot<K, PathsToProps<T[K], V>>;
    }[Extract<keyof T, string>];
