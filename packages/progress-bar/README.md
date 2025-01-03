# Progress Bar

## Installation

`npm i @snack-uikit/progress-bar`

[Changelog](./CHANGELOG.md)

## Example

```typescript jsx
import { ProgressBar, ProgressBarPage } from "@snack-uikit/progress-bar";

<ProgressBar
  progress={20}
  size='xs'
/>

<ProgressBarPage
  inProgress={true}
  animationDuration={100}
  incrementDuration={500}
  minimum={0.2}
/>
```

[//]: DOCUMENTATION_SECTION_START
[//]: THIS_SECTION_IS_AUTOGENERATED_PLEASE_DONT_EDIT_IT
## ProgressBar
Компонент индикатор загрузки
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| size* | enum ValueOf<{ readonly S: "s"; readonly XS: "xs"; }>: `"s"`, `"xs"` | - | Размер |
| progress* | `number` | - | Процент загрузки от 0 до 100 |
| appearance | enum Appearance: `"neutral"`, `"primary"`, `"red"`, `"orange"`, `"yellow"`, `"green"`, `"blue"`, `"violet"`, `"pink"` | primary | Внешний вид |
| className | `string` | - | CSS-класс |
## ProgressBarPage
Компонент индикатор загрузки страницы
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| inProgress* | `boolean` | - | Включен/выключен |
| animationDuration | `number` | 200 | Скорость анимации |
| incrementDuration | `number` | 800 | Время между прогрессом |
| minimum | `number` | - | Минимальное значение прогресс бара от 0 до 1 |
| className | `string` | - | CSS-класс |


[//]: DOCUMENTATION_SECTION_END
