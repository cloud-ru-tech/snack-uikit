# Counter

## Installation
`npm i @snack-ui/counter`

[Changelog](./CHANGELOG.md)

## Props

```typescript jsx
enum Appearance {
  Primary = 'primary',
  Neutral = 'neutral',
  Critical = 'critical',
}

enum Variant {
  Count = 'count',
  CountPlus = 'count-plus',
  CountK = 'count-k',
}

enum Size {
  S = 's',
  M = 'm',
}

type CounterProps = WithSupportProps<{
  value: number;
  appearance?: Appearance;
  variant?: Variant;
  size?: Size;
  plusLimit?: number;
}>;
```
