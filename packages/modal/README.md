# Modal

## Installation
`npm i @snack-ui/modal`

[Changelog](./CHANGELOG.md)

Пакет экспортирует 2 компонента:
- `Modal` - компонент модального окна с определенным поведением и параметрами
- `ModalCustom` - конструктор модального окна, позволяющий собрать компонент самостоятельно
  Содержит в себе дополнительные компоненты:
  - `ModalCustom.Header`
  - `ModalCustom.Body`
  - `ModalCustom.Footer`

### Общие пропсы для `Modal` и `ModalCustom`

#### **`open: boolean`**
Управляет состоянием показан/не показан.

#### **`onClose(): void`**
Колбек закрытия компонента

#### **`mode?: Mode`** - *`[Mode.Regular]`*
Режим отображения модального окна
  - `Regular` - есть кнопка закрытия, клик на оверлей и нажатие кнопки `Esc` закрывают модалку
  - `Aggressive` - есть кнопка закрытия, но выключен клик на оверлей и не работает закрытие по клавише `Esc`
  - `Forced` - закрыть модальное окно можно только по нажатию на кнопку действия в нижней части

#### **`size?: Size`** - *`[Size.S]`*
Размер модального окна, возможные значения:
  - `sizes.S`
  - `sizes.M`
  - `sizes.L`

#### **`className?: string`**
CSS-класс на контейнере модального окна.


### Modal

#### **`picture?: ModalHeaderProps['picture']`**
Заголовок модального окна

#### **`title: string`**
Заголовок модального окна

#### **`titleTooltip?: ModalHeaderProps['titleTooltip']`**
Заголовок модального окна

#### **`subtitle?: string`**
Подзаголовок

#### **`content?: ReactNode`**
Содержимое модального окна

#### **`align?: Align`** - *`[Align.Default]`*
Выравнивание контента, возможные значения:
  - `aligns.Default`
  - `aligns.Center`
  - `aligns.Vertical`

##### Есть зависимость от параметра `size`, возможные комбинации:
  - ```
    size?: Size.S;
    align?: Align;
    ```
  - ```
    size?: Size.M;
    align?: Align.Default | Align.Center;
    ```
  - ```
    size?: Size.L;
    align?: Align.Default;
    ```


#### **`approveButton: Omit<ButtonFilledProps, 'size' | 'data-test-id'>`**
Основная кнопка действия

#### **`cancelButton?: Omit<ButtonTonalProps, 'size' | 'data-test-id'>`**
Вторая кнопка действия

#### **`additionalButton?: Omit<ButtonSimpleProps, 'size' | 'data-test-id'>`**
Дополнительная кнопка действия

#### **`disclaimer?: { text: string; link?: Pick<LinkProps, 'text' | 'href' | 'target'> }`**
Небольшой текст под кнопками футера с возможностью передать дополнительно ссылку


### ModalCustom

#### **`children: ReactNode`**
Содержимое модального окна


### ModalCustom.Header

#### **`title: ReactNode`**
Заголовок модального окна

#### **`titleTooltip?: TooltipProps['tip']`**
Тултип для заголовка

#### **`subtitle: ReactNode`**
Подзаголовок

#### **`picture?: IconPredefinedProps['icon'] | { src: string; alt: string; }`**
Можно передать иконку из пакета `@snack-ui/icon-predefined`
или путь к картинке и атрибут `alt`

#### **`align?: ContentAlign`** - *`[ContentAlign.Default]`*
Выравнивание контента, возможные значения:
  - `aligns.Default`
  - `aligns.Center`

#### **`className?: string`**
CSS-класс на контейнере модального окна.


### ModalCustom.Body

#### **`content: ReactNode`**
Содержимое модального окна

#### **`align?: ContentAlign`** - *`[ContentAlign.Default]`*
Выравнивание контента, возможные значения:
  - `aligns.Default`
  - `aligns.Center`

#### **`className?: string`**
CSS-класс на контейнере модального окна.


### ModalCustom.Footer

#### **`actions: ReactNode`**
Параметр для передачи кнопок

#### **`disclaimer: ReactNode`**
Параметр для небольшого текста под кнопками

#### **`align?: Align`** - *`[Align.Default]`*
Выравнивание контента, возможные значения:
  - `aligns.Default`
  - `aligns.Center`
  - `aligns.Vertical`

#### **`className?: string`**
CSS-класс на контейнере модального окна.
