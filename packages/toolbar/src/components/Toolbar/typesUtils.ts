export type IsEqual<A, B> = (<G>() => G extends A ? 1 : 2) extends <G>() => G extends B ? 1 : 2 ? true : false;

type Filter<KeyType, ExcludeType> = IsEqual<KeyType, ExcludeType> extends true
  ? never
  : KeyType extends ExcludeType
  ? never
  : KeyType;

type Except<ObjectType, KeysType extends keyof ObjectType> = {
  [KeyType in keyof ObjectType as Filter<KeyType, KeysType>]: ObjectType[KeyType];
};

export type RequireAtLeastOne<ObjectType, KeysType extends keyof ObjectType = keyof ObjectType> = {
  [Key in KeysType]-?: Required<Pick<ObjectType, Key>> & Partial<Pick<ObjectType, Exclude<KeysType, Key>>>;
}[KeysType] &
  Except<ObjectType, KeysType>;

export type NeverOrUndefined<T> = {
  [P in keyof T]?: never;
};
