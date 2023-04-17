# Counter

## Installation
`npm i @snack-ui/counter`

[Changelog](./CHANGELOG.md)

## Example

```typescript jsx
import {Counter} from "@snack-ui/counter";

<Counter
  value={42}
  size={Counter.sizes.M}
/>

<Counter 
  value={101}
  appearance={Counter.appearances.Critical}
  variant={Counter.variants.CountPlus}
  plusLimit={100}
/>
```

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
