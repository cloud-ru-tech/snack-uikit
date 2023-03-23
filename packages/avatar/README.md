# Avatar

## Installation
`npm i @snack-ui/avatar`

[Changelog](./CHANGELOG.md)


## Props

```typescript jsx
import { StatusIndicatorProps } from '@snack-ui/status';

enum Appearance {
  Red = 'red',
  Orange = 'orange',
  Yellow = 'yellow',
  Green = 'green',
  Blue = 'blue',
  Violet = 'violet',
  Pink = 'pink',
  Gray = 'gray',
}

enum Size {
  Xxs = 'xxs',
  Xs = 'xs',
  S = 's',
  M = 'm',
  L = 'l',
  Xl = 'xl',
  Xxl = 'xxl',
}

enum Shape {
  Round = 'round',
  Square = 'square',
}

type AvatarProps = WithSupportProps<{
  name: string;
  src?: string;
  appearance?: Appearance;
  size?: Size;
  shape?: Shape;
  indicator?: StatusIndicatorProps['appearance'];
  showTwoSymbols?: boolean;
}>;
```
