# Modal

## Installation
`npm i @snack-uikit/modal`

[Changelog](./CHANGELOG.md)

## Description

- Пакет `@snack-uikit/modal` предоставляет компоненты для отображения модальных окон: готовый компонент с предустановленной структурой и конструктор для кастомной сборки.
- Компоненты поддерживают три режима отображения (`regular`, `aggressive`, `forced`), которые определяют способы закрытия модального окна (кнопка закрытия, клик на оверлей, клавиша `Esc`).
- Модальные окна доступны в трёх размерах (`s`, `m`, `l`) и поддерживают различные варианты выравнивания контента в зависимости от размера.
- Компоненты умеют работать с заголовком, подзаголовком, иконкой или изображением, произвольным контентом, кнопками действий и дисклеймером.

## Modal

### Description

- `Modal` — готовый компонент модального окна с предустановленной структурой, использующий `ModalCustom` внутри.
- Компонент предоставляет упрощённый API для быстрого создания модальных окон с заголовком, подзаголовком, контентом и кнопками действий.
- Поддерживает **три кнопки в футере**: основную (`approveButton`), отмены (`cancelButton`) и дополнительную (`additionalButton`), которые автоматически стилизуются и размещаются.
- Позволяет задать **состояние загрузки** (`loading`) с отображением спиннера по умолчанию или кастомного контента (`loadingState`).
- Умеет **обрезать длинные заголовки и подзаголовки** через проп `truncate` с указанием максимального количества строк.
- Поддерживает **дисклеймер** (`disclaimer`) с текстом и опциональной ссылкой, отображаемый под кнопками футера.
- Может отображать **иконку или изображение** в заголовке через проп `picture`, принимающий компонент иконки из `@snack-uikit/icon-predefined` или объект с путём к изображению.
- Figma: [`Modal`](https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=41%3A205426&mode=design).

### Example

```tsx
import { useState } from 'react';
import { Modal } from '@snack-uikit/modal';
import { PlaceholderSVG } from '@snack-uikit/icons';

function Example() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Открыть модальное окно</button>

      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title="Подтвердите действие"
        subtitle="Это действие нельзя отменить"
        content={<div>Основной контент модального окна</div>}
        picture={PlaceholderSVG}
        approveButton={{
          label: 'Подтвердить',
          onClick: () => {
            console.log('Подтверждено');
            setIsOpen(false);
          },
        }}
        cancelButton={{
          label: 'Отмена',
          onClick: () => setIsOpen(false),
        }}
        disclaimer={{
          text: 'Нажимая кнопку, вы соглашаетесь с условиями',
          link: {
            text: 'Условиями использования',
            href: '#',
          },
        }}
        size="m"
        mode="regular"
      />
    </>
  );
}
```

## ModalCustom

### Description

- `ModalCustom` — конструктор модального окна, позволяющий собрать компонент самостоятельно из составных частей.
- Компонент предоставляет максимальную гибкость в структуре и содержимом модального окна за счёт композиции из дочерних компонентов.
- Состоит из трёх составных частей: `ModalCustom.Header` для заголовка, `ModalCustom.Body` для контента и `ModalCustom.Footer` для кнопок действий.
- Каждая часть может быть настроена независимо: заголовок поддерживает иконку/изображение, тултип и подзаголовок; тело — произвольный контент; футер — любые кнопки и дисклеймер.
- Позволяет **независимо управлять выравниванием** каждой части через пропы `align` в `Header`, `Body` и `Footer`.
- Поддерживает те же режимы отображения (`regular`, `aggressive`, `forced`) и размеры (`s`, `m`, `l`), что и `Modal`, но даёт полный контроль над содержимым и структурой.
- Figma: [`ModalCustom`](https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=41%3A205426&mode=design).

### Example

```tsx
import { useState } from 'react';
import { ModalCustom } from '@snack-uikit/modal';
import { ButtonFilled, ButtonTonal } from '@snack-uikit/button';
import { PlaceholderSVG } from '@snack-uikit/icons';

function Example() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Открыть кастомное модальное окно</button>

      <ModalCustom open={isOpen} onClose={() => setIsOpen(false)} size="m" mode="regular">
        <ModalCustom.Header
          title="Кастомный заголовок"
          subtitle="Кастомный подзаголовок"
          picture={PlaceholderSVG}
          titleTooltip="Подсказка для заголовка"
          align="default"
        />

        <ModalCustom.Body
          content={
            <div>
              <p>Произвольный контент модального окна</p>
              <p>Можно использовать любые React-компоненты</p>
            </div>
          }
          align="default"
        />

        <ModalCustom.Footer
          align="default"
          disclaimer="Кастомный дисклеймер"
          actions={
            <>
              <ButtonFilled label="Основная кнопка" size="s" />
              <ButtonTonal label="Вторичная кнопка" size="s" />
            </>
          }
        />
      </ModalCustom>
    </>
  );
}
```

[//]: DOCUMENTATION_SECTION_START
[//]: THIS_SECTION_IS_AUTOGENERATED_PLEASE_DONT_EDIT_IT
## ModalCustom
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| children* | `ReactNode` | - | Контент |
| onClose* | `() => void` | - | Колбек закрытия компонента. |
| open* | `boolean` | - | Управляет состоянием показан/не показан. |
| mode | enum Mode: `"regular"`, `"aggressive"`, `"forced"` | regular | Режим отображения модального окна: <br> - __`Regular`__ -  есть кнопка закрытия, клик на оверлей и нажатие кнопки `Esc` закрывают модалку <br> - __`Aggressive`__ - есть кнопка закрытия, но выключен клик на оверлей и не работает закрытие по клавише `Esc` <br> - __`Forced`__ - закрыть модальное окно можно только по нажатию на кнопку действия в нижней части |
| size | enum Size: `"s"`, `"m"`, `"l"` | s | Размер модального окна |
| className | `string` | - | CSS-класс |
| closeOnPopstate | `boolean` | - | Закрывать при переходе по истории браузера |
## ModalCustom.Header
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| title* | `ReactNode` | - | Заголовок модального окна |
| titleTooltip | `ReactNode` | - | Тултип для заголовка |
| subtitle | `ReactNode` | - | Подзаголовок |
| picture | `JSXElementConstructor<{ size?: number; className?: string; }> \| ModalHeaderImage` | - | Можно передать иконку из пакета `@snack-uikit/icon-predefined` или путь к картинке и атрибут `alt` |
| align | enum ContentAlign: `"default"`, `"center"` | - | Выравнивание контента |
| className | `string` | - | CSS-класс |
## ModalCustom.Body
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| content* | `ReactNode` | - | Содержимое модального окна |
| align | enum ContentAlign: `"default"`, `"center"` | - | Выравнивание контента |
| className | `string` | - | CSS-класс |
## ModalCustom.Footer
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| actions* | `ReactNode` | - | Параметр для передачи кнопок |
| disclaimer | `ReactNode` | - | Параметр для небольшого текста под кнопками |
| align | enum Align: `"vertical"`, `"default"`, `"center"` | - | Выравнивание контента |
| className | `string` | - | CSS-класс |
## Modal
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| approveButton* | `Omit<ButtonFilledProps, "data-test-id" \| "size">` | - | Основная кнопка действия |
| title* | `string` | - | Заголовок модального окна |
| onClose* | `() => void` | - | Колбек закрытия компонента. |
| open* | `boolean` | - | Управляет состоянием показан/не показан. |
| mode | enum Mode: `"regular"`, `"aggressive"`, `"forced"` | regular | Режим отображения модального окна: <br> - __`Regular`__ -  есть кнопка закрытия, клик на оверлей и нажатие кнопки `Esc` закрывают модалку <br> - __`Aggressive`__ - есть кнопка закрытия, но выключен клик на оверлей и не работает закрытие по клавише `Esc` <br> - __`Forced`__ - закрыть модальное окно можно только по нажатию на кнопку действия в нижней части |
| className | `string` | - | CSS-класс |
| closeOnPopstate | `boolean` | - | Закрывать при переходе по истории браузера |
| titleTooltip | `ReactNode` | - | Всплывающая подсказка для заголовка |
| subtitle | `string` | - | Подзаголовок |
| content | `ReactNode` | - | Содержимое модального окна |
| cancelButton | `Omit<ButtonOutlineProps, "data-test-id" \| "size">` | - | Кнопка отмены |
| additionalButton | `Omit<ButtonSimpleProps, "data-test-id" \| "size">` | - | Вторая кнопка действия |
| disclaimer | `{ text: string; link?: PickLinkProps<LinkElement, "text" \| "as">; }` | - | Небольшой текст под кнопками футера с возможностью передать дополнительно ссылку |
| truncate | `{ title?: number; subtitle?: number; }` | '{ <br>title: 1; <br>subtitle: 2; }' | Максимальное кол-во строк <br> - `title` - в заголовке <br> - `subtitle` - в подзаголовке |
| loading | `boolean` | - | Управление состоянием загрузки |
| loadingState | `ReactNode` | - | Содержимое состояния загрузки вместо спиннера по умолчанию |
| size | "s" \| "m" \| "l" | s | Размер |
| align | enum Align: `"vertical"`, `"default"`, `"center"` | default | Выравнивание, для разных размеров доступны разные значения <br> для size=`s` - все <br> для size=`m` - align=`default \| center` <br> для size=`l` - align=`default` |
| picture | `JSXElementConstructor<{ size?: number; className?: string; }> \| ModalHeaderImage` | - | Можно передать иконку из пакета `@snack-uikit/icon-predefined`, или путь к картинке и атрибут `alt` |


[//]: DOCUMENTATION_SECTION_END