# Avatar

## Installation
`npm i @snack-ui/avatar`

[Changelog](./CHANGELOG.md)

## Example

```typescript jsx
import {Avatar} from "@snack-ui/avatar";

<Avatar 
  name="Name Surname"
  src="path-to-avatar/image.jpg"
  size={Avatar.sizes.Xl}
/>

<Avatar 
  name="Name Surname"
  appearance={Avatar.appearances.Pink}
  indicator={Avatar.indicators.Violet}
  shape={Avatar.shapes.Square}
  showTwoSymbols={true}
/>
```

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
