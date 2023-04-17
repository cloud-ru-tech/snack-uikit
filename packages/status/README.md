# Status

## Installation
`npm i @snack-ui/status`

[Changelog](./CHANGELOG.md)

## Example

```typescript jsx
import {Status, StatusIndicator} from "@snack-ui/status";

<Status 
  label="Text after status"
  appearance={Status.appearances.Pink}
  size={Status.sizes.Xs}
  hasBackground={true}
/>

<StatusIndicator
  appearance={Status.appearances.Violet}
  size={Status.sizes.L}
/>
```

## Props

### Status

```typescript jsx
enum Appearance {
  Primary = 'primary',
  Neutral = 'neutral',
  Red = 'red',
  Orange = 'orange',
  Yellow = 'yellow',
  Green = 'green',
  Blue = 'blue',
  Violet = 'violet',
  Pink = 'pink',
}

enum Size {
  Xs = 'xs',
  S = 's',
}

type StatusProps = WithSupportProps<{
  label: string;
  appearance?: Appearance;
  size?: Size;
  hasBackground?: boolean;
}>;
```

### Status Indicator

```typescript jsx
enum Appearance {
  Primary = 'primary',
  Neutral = 'neutral',
  Red = 'red',
  Orange = 'orange',
  Yellow = 'yellow',
  Green = 'green',
  Blue = 'blue',
  Violet = 'violet',
  Pink = 'pink',
}

enum Size {
  Xxs = 'xxs',
  Xs = 'xs',
  S = 's',
  M = 'm',
  L = 'l',
}

type StatusIndicatorProps = WithSupportProps<{
  size?: Size;
  appearance?: Appearance;
}>;
```