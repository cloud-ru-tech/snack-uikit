# Link

## Installation

`npm i @snack-ui/link`

[Changelog](./CHANGELOG.md)

## Example

```typescript jsx
import { Link } from '@snack-ui/link';

<Link
  text='Link text'
  href='https://cloud.ru/'
  target={Link.targets.Blank}
  size={Link.sizes.S}
  external={true}
  appearance={Link.appearances.Primary}
/>;
```

## Props

```typescript jsx
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

enum Appearance {
  Neutral = 'neutral',
  Primary = 'primary',
}

type LinkProps = WithSupportProps<{
  text?: string;
  href?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  target?: '_self' | '_blank' | '_parent' | '_top'; // Default _blank
  size?: Size; // Default Size.S
  external?: boolean;
  className?: string;
  appearance?: Appearance; //Default Appearance.Neutral
}>;
```
