# Link

## Installation

`npm i @snack-ui/link`

[Changelog](./CHANGELOG.md)

## Example

## Example

```tsx
import { Link } from '@snack-ui/link';

<Link
  onSurface={Link.onSurfaces.Accent}
  href='https://cloud.ru/'
  text='Link text'
  external={true}
  onColor={Link.onSurfaces.Primary}
/>;
```

## Props

```ts
enum OnColor {
  InvertNeutral = 'invert-neutral',
  Neutral = 'neutral',
  Primary = 'primary',
  Red = 'red',
  Orange = 'orange',
  Yellow = 'yellow',
  Green = 'green',
  Blue = 'blue',
  Violet = 'violet',
  Pink = 'pink',
}

enum Size {
  S = 's',
  M = 'm',
  L = 'l',
}

enum Target {
  Self = '_self',
  Blank = '_blank',
  Parent = '_parent',
  Top = '_top',
}

enum OnSurface {
  Background = 'background',
  Decor = 'decor',
  Accent = 'accent',
}

type LinkProps = WithSupportProps<{
  text?: string;
  className?: string;
  href?: string;
  target?: AnchorHTMLAttributes<HTMLAnchorElement>['target']; //Default Target.Blank
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  size?: Size; //Default Size.S
  external?: boolean;
  onColor?: OnColor; //Default OnColor.Primary
  onSurface?: OnSurface; //Default OnSurface.Background
}>;
```
