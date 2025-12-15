# Accordion

## Installation
`npm i @snack-uikit/accordion`

[Changelog](./CHANGELOG.md)

## Description

- Пакет `@snack-uikit/accordion` предоставляет набор компонентов для построения аккордеонов: два визуальных варианта контейнера (`AccordionPrimary`, `AccordionSecondary`) и соответствующие им коллапс-блоки (`CollapseBlockPrimary`, `CollapseBlockSecondary`).
- Компоненты поддерживают как одиночное, так и множественное раскрытие секций, работают в контролируемом и неконтролируемом режимах и позволяют вкладывать аккордеоны друг в друга.
- Аккордеон собирается из контейнера (`AccordionPrimary` или `AccordionSecondary`) и одного или нескольких коллапс-блоков с заголовком и контентом.
- Для заголовка используются хедеры `CollapseBlockHeader` с поддержкой вспомогательных действий (иконки, кнопки), состояния раскрытия и пользовательских обработчиков клика.

## AccordionPrimary

### Description
- `AccordionPrimary` — основной визуальный вариант аккордеона для ключевого контента страницы: он имеет более выраженный фон и акцентные отступы.
- Используется вместе с `AccordionPrimary.CollapseBlock` и `AccordionPrimary.CollapseBlockHeader`.
- Поддерживает одиночный (`selectionMode="single"`) и множественный (`selectionMode="multiple"`) режимы, контролируемое/неконтролируемое раскрытие и вложенные аккордеоны (например, внутри блока можно использовать `AccordionSecondary`).
- Figma: [`Snack UI Kit — AccordionPrimary`](https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=41%3A262646&mode=design).

### Example

```tsx
import { AccordionPrimary } from '@snack-uikit/accordion';

function Example() {
  return (
    <AccordionPrimary selectionMode='single'>
      <AccordionPrimary.CollapseBlock
        id='item-1'
        header={<AccordionPrimary.CollapseBlockHeader title='Заголовок 1' />}
      >
        Первый блок контента
      </AccordionPrimary.CollapseBlock>

      <AccordionPrimary.CollapseBlock
        id='item-2'
        header={<AccordionPrimary.CollapseBlockHeader title='Заголовок 2' />}
      >
        Второй блок контента
      </AccordionPrimary.CollapseBlock>
    </AccordionPrimary>
  );
}
```

## AccordionSecondary

### Description
- `AccordionSecondary` — облегчённый вариант аккордеона для вложенного или второстепенного контента (например, внутри блока `AccordionPrimary` или в боковых панелях).
- Визуально менее акцентный, но поддерживает те же режимы работы с раскрытием, что и основной аккордеон.
- Используется вместе с `AccordionSecondary.CollapseBlock` и `AccordionSecondary.CollapseBlockHeader`.
- Figma: [`Snack UI Kit — AccordionSecondary`](https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=41%3A262646&mode=design).

### Example

```tsx
import { AccordionSecondary } from '@snack-uikit/accordion';

function Example() {
  return (
    <AccordionSecondary selectionMode='multiple'>
      <AccordionSecondary.CollapseBlock
        id='inner-1'
        header={<AccordionSecondary.CollapseBlockHeader title='Подраздел 1' />}
      >
        Контент первого подраздела
      </AccordionSecondary.CollapseBlock>

      <AccordionSecondary.CollapseBlock
        id='inner-2'
        header={<AccordionSecondary.CollapseBlockHeader title='Подраздел 2' />}
      >
        Контент второго подраздела
      </AccordionSecondary.CollapseBlock>
    </AccordionSecondary>
  );
}
```

## CollapseBlockPrimary

### Description
- Компонент, описанный в сторис-файле `CollapseBlockPrimary.story.tsx`, в реальном коде используется как `AccordionPrimary.CollapseBlock`.
- Это коллапс-блок для `AccordionPrimary` с более выразительным контейнером и поддержкой дополнительных визуальных настроек: внешнего бордера (`outline`) и формы (`shape: 'round' | 'square'`).
- Блок принимает произвольный заголовок (`header`), может отображать дополнительные действия (`actions`), а также умеет удалять контент из DOM при сворачивании (`removeContentFromDOM`) и вызывать обработчик клика по заголовку (`onClick`).
- Figma: [`Snack UI Kit — CollapseBlockPrimary`](https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=41%3A262548&mode=design).

### Example

```tsx
import { AccordionPrimary } from '@snack-uikit/accordion';

function Example() {
  return (
    <AccordionPrimary>
      <AccordionPrimary.CollapseBlock
        id='primary-block'
        outline
        shape='square'
        header={<AccordionPrimary.CollapseBlockHeader title='Основной блок' />}
      >
        Детальный контент с дополнительными настройками внешнего вида.
      </AccordionPrimary.CollapseBlock>
    </AccordionPrimary>
  );
}
```

## CollapseBlockSecondary

### Description
- Компонент, описанный в сторис-файле `CollapseBlockSecondary.story.tsx`, в реальном коде используется как `AccordionSecondary.CollapseBlock`.
- Это компактный коллапс-блок для `AccordionSecondary`, подходящий для вложенных секций, фильтров и вспомогательного контента.
- Поддерживает те же базовые возможности, что и `CollapseBlockPrimary` (произвольный заголовок, `actions`, `removeContentFromDOM`, `onClick`), но без настроек бордера и формы, что делает его менее акцентным и визуально легче.
- Figma: [`Snack UI Kit — CollapseBlockSecondary`](https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=41%3A262548&mode=design).

### Example

```tsx
import { AccordionSecondary } from '@snack-uikit/accordion';

function Example() {
  return (
    <AccordionSecondary>
      <AccordionSecondary.CollapseBlock
        id='secondary-block'
        header={<AccordionSecondary.CollapseBlockHeader title='Вложенный блок' />}
      >
        Вспомогательный или вложенный контент.
      </AccordionSecondary.CollapseBlock>
    </AccordionSecondary>
  );
}
```

[//]: DOCUMENTATION_SECTION_START
[//]: THIS_SECTION_IS_AUTOGENERATED_PLEASE_DONT_EDIT_IT
## AccordionPrimary
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| children* | `ReactElement<CollapseBlockProps, string \| JSXElementConstructor<any>> \| ReactElement<CollapseBlockProps, string \| JSXElementConstructor<...>>[]` | - | Вложенный контент |
| className | `string` | - | CSS-класс |
| expandedDefault | `string \| string[]` | - | Начальное состояние |
| expanded | `string \| string[]` | - | Controlled состояние |
| onExpandedChange | `((value: string) => void) \| ((value: string[]) => void)` | - | Controlled обработчик измения состояния |
| selectionMode | "single" \| "multiple" | - | Режим работы аккордиона |
## AccordionSecondary
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| children* | `ReactElement<CollapseBlockProps, string \| JSXElementConstructor<any>> \| ReactElement<CollapseBlockProps, string \| JSXElementConstructor<...>>[]` | - | Вложенный контент |
| className | `string` | - | CSS-класс |
| expandedDefault | `string \| string[]` | - | Начальное состояние |
| expanded | `string \| string[]` | - | Controlled состояние |
| onExpandedChange | `((value: string) => void) \| ((value: string[]) => void)` | - | Controlled обработчик измения состояния |
| selectionMode | "single" \| "multiple" | - | Режим работы аккордиона |


[//]: DOCUMENTATION_SECTION_END
