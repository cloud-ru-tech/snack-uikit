# Tag

## Installation
`npm i @snack-ui/tag`

[Changelog](./CHANGELOG.md)

## Props

```ts
enum Appearance {
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
  Xs = 'xs',
  S = 's',
}

type TagProps = WithSupportProps<{
  label: string;
  size?: Size;
  appearance?: Appearance;
  onDelete?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}>;
```
