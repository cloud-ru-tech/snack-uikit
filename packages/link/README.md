# Link

## Installation
`npm i @snack-ui/link`

[Changelog](./CHANGELOG.md)

## Example

```typescript jsx
import { Link } from '@snack-ui/link';

<Link
  text='Link text' 
  href='https://sbercloud.ru/'
  target={Link.targets.Blank}
  size={Link.sizes.S}
  disabled={true}
  external={true}
/>
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

type LinkProps = WithSupportProps<{
  text?: string;
  href?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  target?: '_self' | '_blank' | '_parent' | '_top'; // Default _blank
  size?: Size; // Default Size.S
  disabled?: boolean;
  external?: boolean;
  className?: string;
}>;
```


