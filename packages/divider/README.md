# Divider

## Installation
`npm i @snack-ui/divider`

[Changelog](./CHANGELOG.md)

Компонент для визуального отделения групп компонентов

## Props

```tsx
export enum Orientation {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
}

export enum Weight {
  Light = 'light',
  Regular = 'regular',
}

export type DividerProps = WithSupportProps<{
  weight: Weight;
  orientation: Orientation;
  className?: string;
}>;
```
