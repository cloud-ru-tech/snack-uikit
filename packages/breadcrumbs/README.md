# Breadcrumbs

## Installation
`npm i @snack-ui/breadcrumbs`

[Changelog](./CHANGELOG.md)


## Props

#### **`items: Item[]`**
Массив объектов, описывающих компонент:
```ts
type Item = {
  id: string, // уникальный id
  label: string; // лейбл
  shortLabel?: string; // короткий вариант лейбла, применяется при недостаточном пространстве
  href?: string;
  onClick?(): void;
}
```
Компоненты Breadcrumbs мемоизирован, старайтесь передавать `items` одной и той же ссылкой.

#### **`separator?: string`** - *`['›']`*
Символ разделителя

#### **`size?: Size`** - *`[Size.S]`*
Размер компонента: `xs` или `s`.

#### **`className?: string`**
css-класс контейнера.
