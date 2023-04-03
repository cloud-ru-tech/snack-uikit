# Typography

## Installation
`npm i @snack-ui/typography`

## TODO

- подумать над reusable components/classnames для специфичных компонентов (`<SansDisplayL />` / `.sans-display-l`)

## Example

```typescript jsx
import {Typography} from "@snack-ui/typography";

<Typography 
  family={Typography.families.Sans}
  role={Typography.roles.Display}
  size={Typography.sizes.S}
  tag={Typography.tags.h1}
  className='some-element'
>
  Some text
</Typography>
```
## Props

```typescript jsx
enum Family {
  Sans = 'sans',
  Light = 'light',
  Link = 'link',
  Mono = 'mono',
  CrossedOut = 'crossed-out',
}

enum Role {
  Display = 'display',
  Headline = 'headline',
  Title = 'title',
  Label = 'label',
  Body = 'body',
}

enum Size {
  L = 'l',
  M = 'm',
  S = 's',
}

enum Tag {
  span = 'span',
  h1 = 'h1',
  h2 = 'h2',
  h3 = 'h3',
  h4 = 'h4',
  h5 = 'h5',
  h6 = 'h6',
  div = 'div',
  label = 'label',
  p = 'p',
}

type TypographyProps = WithSupportProps<{
  tag?: Tag;
  className?: string;
  children?: ReactNode;
  family: Family;
  role: Role;
  size: Size;
}>;
```

[Changelog](./CHANGELOG.md)


