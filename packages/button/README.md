# Button

## Installation

`npm i @snack-uikit/button`

[Changelog](./CHANGELOG.md)

## Description

- Пакет `@snack-uikit/button` предоставляет набор кнопок разных визуальных стилей: залитая (`ButtonFilled`), контурная (`ButtonOutline`), тональная (`ButtonTonal`), текстовая (`ButtonSimple`), функциональная с счётчиком (`ButtonFunction`) и приподнятая (`ButtonElevated`).
- Все варианты поддерживают единый API: размеры (`size`), внешний вид (`appearance` — где применимо), иконку и её позицию, состояния `disabled` и `loading`, работу в виде нативной кнопки или ссылки через `href`/`target`.
- Компоненты подстраиваются под содержимое: корректно работают в режимах «только иконка», «только текст» и «иконка + текст», а также могут растягиваться на всю ширину контейнера (`fullWidth`).
- Для сценариев с уведомлениями о количестве (непрочитанное, badge-счётчики) используется специализированная кнопка `ButtonFunction` со встроенным счётчиком.

## ButtonFilled

### Description

- `ButtonFilled` — основная акцентная кнопка с заливкой, используемая для ключевых действий на странице.
- Поддерживает разные размеры (`size`), варианты внешнего вида (`appearance`, например primary/neutral/destructive), состояния `disabled` и `loading`, а также отображение иконки вместе с текстом или вместо него.
- Может работать как обычная кнопка или как ссылка (`href`, `target`), сохраняя единый внешний вид и состояния наведения/нажатия.
- В состоянии загрузки отображает индикатор, блокирует клик и скрывает или приглушает основной контент кнопки.
- Figma: [`ButtonFilled`](https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=9%3A535&mode=design).

### Example

```tsx
import { ButtonFilled } from '@snack-uikit/button';
import { PlaceholderSVG } from '@snack-uikit/icons';

export function ButtonFilledExample() {
  return (
    <ButtonFilled
      label='Перейти в раздел'
      appearance='primary'
      size='m'
      icon={<PlaceholderSVG />}
      href='https://cloud.ru'
      target='_blank'
      loading={false}
      fullWidth={false}
      onClick={() => console.log('Navigate')}
    />
  );
}
```

## ButtonOutline

### Description

- `ButtonOutline` — контурная кнопка с прозрачным фоном и бордером; подходит для второстепенных, но всё ещё заметных действий.
- По API повторяет `ButtonFilled`: поддерживает размеры, `appearance`, состояния `disabled`/`loading`, иконку и текст, работу в виде кнопки или ссылки.
- Визуально менее акцентная по сравнению с залитой кнопкой, поэтому часто используется в парах «основное/второстепенное действие».
- Figma: [`ButtonOutline`](https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=9%3A1682&mode=design).

### Example

```tsx
import { ButtonOutline } from '@snack-uikit/button';

export function ButtonOutlineExample() {
  return (
    <ButtonOutline
      label='Дополнительное действие'
      appearance='primary'
      size='s'
      onClick={() => console.log('Secondary action')}
    />
  );
}
```

## ButtonTonal

### Description

- `ButtonTonal` — кнопка с мягкой заливкой в тон фона, которая выделяется меньше, чем `ButtonFilled`, но заметнее, чем `ButtonSimple`.
- Используется для важных, но не первостепенных действий или для вторичных CTA в блоках с насыщенным фоном.
- Поддерживает иконку, текст, размеры, `appearance`, состояния `disabled` и `loading`, режимы «только иконка»/«только текст» и растягивание на всю ширину.
- Figma: [`ButtonTonal`](https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=9%3A2829&mode=design).

### Example

```tsx
import { ButtonTonal } from '@snack-uikit/button';

export function ButtonTonalExample() {
  return (
    <ButtonTonal
      label='Сохранить черновик'
      appearance='primary'
      size='m'
      fullWidth
      onClick={() => console.log('Save draft')}
    />
  );
}
```

## ButtonSimple

### Description

- `ButtonSimple` — лёгкая текстовая кнопка без явной заливки и бордера; подходит для менее акцентных действий, ссылок в тексте и вторичных сценариев.
- Имеет те же состояния и базовый API, что и остальные кнопки: `disabled`, `loading`, размеры, иконку и работу как ссылка через `href`/`target`.
- Может использоваться как «link-like» элемент в списках и таблицах, когда важен минимум визуального шума.
- Figma: [`ButtonSimple`](https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=9%3A3976&mode=design).

### Example

```tsx
import { ButtonSimple } from '@snack-uikit/button';

export function ButtonSimpleExample() {
  return (
    <ButtonSimple
      label='Подробнее'
      appearance='neutral'
      size='s'
      onClick={() => console.log('Show details')}
    />
  );
}
```

## ButtonFunction

### Description

- `ButtonFunction` — функциональная кнопка с поддержкой встроенного счётчика (`counter`), которая подходит для сценариев «количество уведомлений», «непрочитанные элементы» и т.п.
- Дополнительно к базовому API кнопок поддерживает выбор позиции иконки относительно текста (`iconPosition="before" | "after"`) и выводит счётчик с настройкой значения, варианта отображения и лимита (`plusLimit`).
- Корректно работает во всех комбинациях содержимого: только иконка, только текст, иконка до/после текста, с/без счётчика.
- Figma: [`ButtonFunction`](https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=9%3A5123&mode=design).

### Example

```tsx
import { ButtonFunction } from '@snack-uikit/button';

export function ButtonFunctionExample() {
  return (
    <ButtonFunction
      label='Непрочитанные сообщения'
      appearance='neutral'
      iconPosition='after'
      counter={{ value: 7, appearance: 'primary', variant: 'filled', plusLimit: 99 }}
      onClick={() => console.log('Open messages')}
    />
  );
}
```

## ButtonElevated

### Description

- `ButtonElevated` — приподнятая кнопка с тенью, используемая для самых важных действий или для выделения CTA на сложном фоне.
- Всегда предполагает наличие иконки и поддерживает размеры, состояния `disabled`/`loading`, а также полноценную клавиатурную навигацию и фокусные стили.
- В остальном следует общим правилам пакета кнопок: единый API, чёткие состояния и предсказуемое поведение при кликах и в состоянии загрузки.
- Figma: [`ButtonElevated`](https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=9%3A8268&mode=design).

### Example

```tsx
import { ButtonElevated } from '@snack-uikit/button';
import { PlaceholderSVG } from '@snack-uikit/icons';

export function ButtonElevatedExample() {
  return (
    <ButtonElevated
      label='Главное действие'
      size='m'
      icon={<PlaceholderSVG />}
      onClick={() => console.log('Primary CTA')}
    />
  );
}
```

[//]: DOCUMENTATION_SECTION_START
[//]: THIS_SECTION_IS_AUTOGENERATED_PLEASE_DONT_EDIT_IT
## ButtonFilled
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| href | `string` | - | Ссылка |
| target | `HTMLAttributeAnchorTarget` | _blank | HTML-аттрибут target |
| className | `string` | - | CSS-класс |
| disabled | `boolean` | - | Флаг неактивности компонента |
| icon | `ReactElement` | - | Иконка |
| label | `string` | - | Текст кнопки |
| loading | `boolean` | - | Флаг состояния загрузки |
| onClick | `MouseEventHandler<HTMLElement>` | - | Колбек обработки клика |
| onKeyDown | `KeyboardEventHandler<HTMLElement>` | - | Колбек обработки нажатия клавиши |
| onFocus | `FocusEventHandler<HTMLButtonElement \| HTMLAnchorElement>` | - | Колбек обработки фокуса |
| onBlur | `FocusEventHandler<HTMLButtonElement \| HTMLAnchorElement>` | - | Колбек обработки блюра |
| size | enum Size: `"xs"`, `"s"`, `"m"`, `"l"` | s | Размер |
| appearance | enum Appearance: `"primary"`, `"neutral"`, `"destructive"` | primary | Внешний вид кнопки |
| type | "submit" \| "reset" \| "button" | button | HTML-аттрибут type |
| tabIndex | `number` | - | HTML-аттрибут tab-index |
| fullWidth | `boolean` | - | Сделать кнопку во всю ширину |
| ref | `LegacyRef<HTMLButtonElement \| HTMLAnchorElement>` | - | Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or call the ref with `null` if you passed a callback ref). @see {@link https://react.dev/learn/referencing-values-with-refs#refs-and-the-dom React Docs} |
| key | `Key` | - |  |
## ButtonSimple
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| href | `string` | - | Ссылка |
| target | `HTMLAttributeAnchorTarget` | _blank | HTML-аттрибут target |
| className | `string` | - | CSS-класс |
| disabled | `boolean` | - | Флаг неактивности компонента |
| icon | `ReactElement` | - | Иконка |
| label | `string` | - | Текст кнопки |
| loading | `boolean` | - | Флаг состояния загрузки |
| onClick | `MouseEventHandler<HTMLElement>` | - | Колбек обработки клика |
| onKeyDown | `KeyboardEventHandler<HTMLElement>` | - | Колбек обработки нажатия клавиши |
| onFocus | `FocusEventHandler<HTMLButtonElement \| HTMLAnchorElement>` | - | Колбек обработки фокуса |
| onBlur | `FocusEventHandler<HTMLButtonElement \| HTMLAnchorElement>` | - | Колбек обработки блюра |
| size | enum Size: `"xs"`, `"s"`, `"m"`, `"l"` | s | Размер |
| appearance | enum Appearance: `"primary"`, `"neutral"`, `"destructive"` | neutral | Внешний вид кнопки |
| type | "submit" \| "reset" \| "button" | button | HTML-аттрибут type |
| tabIndex | `number` | - | HTML-аттрибут tab-index |
| fullWidth | `boolean` | - | Сделать кнопку во всю ширину |
| ref | `LegacyRef<HTMLButtonElement \| HTMLAnchorElement>` | - | Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or call the ref with `null` if you passed a callback ref). @see {@link https://react.dev/learn/referencing-values-with-refs#refs-and-the-dom React Docs} |
| key | `Key` | - |  |
## ButtonOutline
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| href | `string` | - | Ссылка |
| target | `HTMLAttributeAnchorTarget` | _blank | HTML-аттрибут target |
| className | `string` | - | CSS-класс |
| disabled | `boolean` | - | Флаг неактивности компонента |
| icon | `ReactElement` | - | Иконка |
| label | `string` | - | Текст кнопки |
| loading | `boolean` | - | Флаг состояния загрузки |
| onClick | `MouseEventHandler<HTMLElement>` | - | Колбек обработки клика |
| onKeyDown | `KeyboardEventHandler<HTMLElement>` | - | Колбек обработки нажатия клавиши |
| onFocus | `FocusEventHandler<HTMLButtonElement \| HTMLAnchorElement>` | - | Колбек обработки фокуса |
| onBlur | `FocusEventHandler<HTMLButtonElement \| HTMLAnchorElement>` | - | Колбек обработки блюра |
| size | enum Size: `"xs"`, `"s"`, `"m"`, `"l"` | s | Размер |
| appearance | enum Appearance: `"primary"`, `"neutral"`, `"destructive"` | primary | Внешний вид кнопки |
| type | "submit" \| "reset" \| "button" | button | HTML-аттрибут type |
| tabIndex | `number` | - | HTML-аттрибут tab-index |
| fullWidth | `boolean` | - | Сделать кнопку во всю ширину |
| ref | `LegacyRef<HTMLButtonElement \| HTMLAnchorElement>` | - | Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or call the ref with `null` if you passed a callback ref). @see {@link https://react.dev/learn/referencing-values-with-refs#refs-and-the-dom React Docs} |
| key | `Key` | - |  |
## ButtonTonal
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| href | `string` | - | Ссылка |
| target | `HTMLAttributeAnchorTarget` | _blank | HTML-аттрибут target |
| className | `string` | - | CSS-класс |
| disabled | `boolean` | - | Флаг неактивности компонента |
| icon | `ReactElement` | - | Иконка |
| label | `string` | - | Текст кнопки |
| loading | `boolean` | - | Флаг состояния загрузки |
| onClick | `MouseEventHandler<HTMLElement>` | - | Колбек обработки клика |
| onKeyDown | `KeyboardEventHandler<HTMLElement>` | - | Колбек обработки нажатия клавиши |
| onFocus | `FocusEventHandler<HTMLButtonElement \| HTMLAnchorElement>` | - | Колбек обработки фокуса |
| onBlur | `FocusEventHandler<HTMLButtonElement \| HTMLAnchorElement>` | - | Колбек обработки блюра |
| size | enum Size: `"xs"`, `"s"`, `"m"`, `"l"` | s | Размер |
| appearance | enum Appearance: `"primary"`, `"neutral"`, `"destructive"` | primary | Внешний вид кнопки |
| type | "submit" \| "reset" \| "button" | button | HTML-аттрибут type |
| tabIndex | `number` | - | HTML-аттрибут tab-index |
| fullWidth | `boolean` | - | Сделать кнопку во всю ширину |
| ref | `LegacyRef<HTMLButtonElement \| HTMLAnchorElement>` | - | Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or call the ref with `null` if you passed a callback ref). @see {@link https://react.dev/learn/referencing-values-with-refs#refs-and-the-dom React Docs} |
| key | `Key` | - |  |
## ButtonFunction
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| href | `string` | - | Ссылка |
| target | `HTMLAttributeAnchorTarget` | _blank | HTML-аттрибут target |
| className | `string` | - | CSS-класс |
| disabled | `boolean` | - | Флаг неактивности компонента |
| icon | `ReactElement` | - | Иконка |
| iconPosition | enum IconPosition: `"before"`, `"after"` | after | Позиция иконки |
| label | `string` | - | Текст кнопки |
| loading | `boolean` | - | Флаг состояния загрузки |
| onClick | `MouseEventHandler<HTMLElement>` | - | Колбек обработки клика |
| onKeyDown | `KeyboardEventHandler<HTMLElement>` | - | Колбек обработки нажатия клавиши |
| onFocus | `FocusEventHandler<HTMLButtonElement \| HTMLAnchorElement>` | - | Колбек обработки фокуса |
| onBlur | `FocusEventHandler<HTMLButtonElement \| HTMLAnchorElement>` | - | Колбек обработки блюра |
| size | enum Size: `"xs"`, `"s"`, `"m"`, `"l"` | s | Размер |
| appearance | enum Appearance: `"primary"`, `"neutral"`, `"destructive"` | neutral | Внешний вид кнопки |
| type | "submit" \| "reset" \| "button" | button | HTML-аттрибут type |
| tabIndex | `number` | - | HTML-аттрибут tab-index |
| fullWidth | `boolean` | - | Сделать кнопку во всю ширину |
| counter | `CounterInButtonProps` | - | Пропсы каунтера в кнопке |
| ref | `LegacyRef<HTMLButtonElement \| HTMLAnchorElement>` | - | Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or call the ref with `null` if you passed a callback ref). @see {@link https://react.dev/learn/referencing-values-with-refs#refs-and-the-dom React Docs} |
| key | `Key` | - |  |
## ButtonElevated
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| href | `string` | - | Ссылка |
| target | `HTMLAttributeAnchorTarget` | _blank | HTML-аттрибут target |
| className | `string` | - | CSS-класс |
| disabled | `boolean` | - | Флаг неактивности компонента |
| icon | `ReactElement` | - | Иконка |
| loading | `boolean` | - | Флаг состояния загрузки |
| onClick | `MouseEventHandler<HTMLElement>` | - | Колбек обработки клика |
| onKeyDown | `KeyboardEventHandler<HTMLElement>` | - | Колбек обработки нажатия клавиши |
| onFocus | `FocusEventHandler<HTMLButtonElement \| HTMLAnchorElement>` | - | Колбек обработки фокуса |
| onBlur | `FocusEventHandler<HTMLButtonElement \| HTMLAnchorElement>` | - | Колбек обработки блюра |
| type | "submit" \| "reset" \| "button" | button | HTML-аттрибут type |
| tabIndex | `number` | - | HTML-аттрибут tab-index |
| size | enum Size: `"xs"`, `"s"`, `"m"`, `"l"` | s | Размер |
| ref | `LegacyRef<HTMLButtonElement \| HTMLAnchorElement>` | - | Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or call the ref with `null` if you passed a callback ref). @see {@link https://react.dev/learn/referencing-values-with-refs#refs-and-the-dom React Docs} |
| key | `Key` | - |  |


[//]: DOCUMENTATION_SECTION_END
