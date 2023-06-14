# Truncate String

## Installation
`npm i @snack-ui/truncate-string`

[Changelog](./CHANGELOG.md)

## Example 

```typescript jsx
<TruncateString
  variant={TruncateString.variants.End}
  placement={TruncateString.placements.Top}
  hideTooltip={true}
  text={'Текст'}
  maxLines={2}
/>
```

## Props

#### **`variant?: Variant`** - *`[Variant.End]`*
Вариант обрезания строки:
- `End` - с конца 
- `Middle` - по середине

#### **`text: string`**
Текст, который будет обрезаться

#### **`hideTooltip?: boolean`** - *`[false]`*
Скрывать ли тултип с полным текстом

#### **`placement?: Placement`** - *`[Top]`*
Положение тултипа относительно обрезанного текста.
Возможные значения: `Left, LeftStart, LeftEnd, Right, RightStart, RightEnd, Top, TopStart, TopEnd, Bottom, BottomStart, BottomEnd`

#### **`className?: string`**
css-класс контейнера.

#### **`maxLines?: number`** - *`[1]`*
[*Валидно только для `variant = Variant.End`*]
Максимальное кол-во строк, до которого может сворачиваться текст.

## Troubleshooting

Если компонент работает некорректно, проверь:
* `<TruncateString />` должен лежать в органиченном по ширине контейнере,
  иначе он не сможет правильно высчитывать обрезание.
* если с ограничением по ширине тоже возникают проблемы, можно попробовать 
  задать на компоненте-обёртке св-во display: grid 


