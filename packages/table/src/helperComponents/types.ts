export type DataAttributes = Record<`data-${string}`, string | boolean>;

type IsEqual<A, B> = (<G>() => G extends A ? 1 : 2) extends <G>() => G extends B ? 1 : 2 ? true : false;

type Filter<KeyType, ExcludeType> = IsEqual<KeyType, ExcludeType> extends true
  ? never
  : KeyType extends ExcludeType
  ? never
  : KeyType;

export type Except<ObjectType, KeysType extends keyof ObjectType> = {
  [KeyType in keyof ObjectType as Filter<KeyType, KeysType>]: ObjectType[KeyType];
};
