# Icon Predefined

## Installation
`npm i @snack-ui/icon-predefined`

[Changelog](./CHANGELOG.md)

## Example

```tsx
import { HeartSSVG } from '@snack-ui/icons';
import { IconPredefined } from '@snack-ui/icon-predefined';

<IconPredefined
    appearance={IconPredefined.appearances.Red}
    size={IconPredefined.sizes.L}
    className='className'
    icon={HeartSSVG}
    decor
/>
```

## Props

#### **`icon: JSXElementConstructor`**
Компонент svg-иконки из пакета `@snack-ui/icons`.

#### **`className?: string`**
css-класс контейнера.

#### **`appearance?: Appearance`** - *`[Appearance.Primary]`*
Цвет иконки. Возможные варианты:
  - `IconPredefined.appearances.Primary`
  - `IconPredefined.appearances.Neutral`
  - `IconPredefined.appearances.Red`
  - `IconPredefined.appearances.Orange`
  - `IconPredefined.appearances.Yellow`
  - `IconPredefined.appearances.Green`
  - `IconPredefined.appearances.Blue`
  - `IconPredefined.appearances.Violet`
  - `IconPredefined.appearances.Pink`

#### **`size?: Size`** - *`[Size.S]`*
Размер компонента. Возможные варианты:
  - `IconPredefined.sizes.S`
  - `IconPredefined.sizes.M`
  - `IconPredefined.sizes.L`

#### **`decor?: boolean`** - *`[true]`*
Включает цветную подложку для иконки.
