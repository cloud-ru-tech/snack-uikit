# Chips

## Installation
`npm i @snack-ui/chips`

[Changelog](./CHANGELOG.md)

## TODO

- `droplist` и выбор значений в `FilterChip`

## Example

```typescript jsx
import { AssistChip, FilterChip, ToggleChip } from '@snack-ui/chips';
import { PlaceholderSVG } from '@snack-ui/icons';

<AssistChip
  label='Label'
  icon={<PlaceholderSVG />}
  size={AssistChip.sizes.S}
  disabled={false}
  loading={false}
  onClick={doSomething}
  className='className'
  tabIndex={1}
/>

<ToggleChip
  label='Label'
  icon={<PlaceholderSVG />}
  size={ToggleChip.sizes.S}
  selected={false}
  disabled={false}
  loading={false}
  onChange={handleChange}
  className='className'
  tabIndex={1}
/>

<FilterChip
  label='Label'
  value='value'
  icon={<PlaceholderSVG />}
  size={FilterChip.sizes.S}
  disabled={false}
  loading={false}
  onClick={doSomething}
  className='className'
  tabIndex={1}
/>
```


## Props

```typescript
type BaseChipProps = {
  label: string;
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactElement;
  className?: string;
  tabIndex?: number;
};

enum Size {
  Xs = 'xs',
  S = 's',
  M = 'm',
  L = 'l',
}

type AssistChipProps = WithSupportProps<
  BaseChipProps & {
    size?: Size;
    onClick: MouseEventHandler<HTMLButtonElement>;
  }
>;

type ToggleChipProps = WithSupportProps<
  BaseChipProps & {
    checked: boolean;
    size?: Size;
    onChange(checked: boolean, e: ChangeEvent<HTMLInputElement>): void;
  }
>;


// specific to FilterChip

enum Size {
  Xs = 'xs',
  S = 's',
}

type FilterChipProps = WithSupportProps<
  Partial<BaseChipProps> & {
    value: string;
    size?: Size;
    onClick: MouseEventHandler<HTMLButtonElement>;
  }
>;
```

### FilterChip

#### **`selectionMode?: SelectionMode`** - *`FilterChip.selectionModes.Single`*
Режим выбора значенией:
  - `FilterChip.selectionModes.Single` - Режим выбора одного значения. В этом режиме компонент не может находиться без значения. Если значение не передано посредством пропсов `value` или `defaultValue` то компонент выберет первое из списка `options`. Если переданное `value` или `defaultValue` не содержится в `options`, то так же выберется первое в списке. 
  - `FilterChip.selectionModes.Multi` - Режим множественного выбора значений.

#### **`value?: string|string[]`**
Значение компонента. `string` в режиме `single` и `string[]` в режиме `multi`.

#### **`defaultValue?: string|string[]`**
Значение компонента по-умолчанию. `string` в режиме `single` и `string[]` в режиме `multi`.

#### **`onChangeValue?: (value: string|string[]) => void`**
Колбэк изменения значения. Принимает value: `string` в режиме `single` и `string[]` в режиме `multi`.

#### **`size?: Size`** - *`FilterChip.sizes.S`*
Размер:
- `FilterChip.sizes.Xs`,
- `FilterChip.sizes.S`.

#### **`disabled?: boolean`**
Деактивирован ли компонент.

#### **`loading?: boolean`**
Включает состояние загрузки.

#### **`icon?: JSX`**
Иконка. Отображается только в размере `S`.

#### **`label: string`**
Лейбл компонента. Обязателен в режиме `Multi`.

#### **`onClick?: (e: MouseEventHandler<HTMLButtonElement>) => void;`**
Колбэк клика в FilterChip.

#### **`className?: string`**
CSS-класс.

#### **`tabIndex?: number`**
Tab-index.

#### **`options?: FilterOption[]`**
Массив доступных к выбору опций. Опция `FilterOption` имеет тип:
```typescript
import { AvatarProps } from '@snack-ui/avatar';

type FilterOption = {
  label: string; // Лейбл опции
  value: string; // Значение опции
  caption?: string; // Подзаголовок
  description?: string; // Описание
  tagLabel?: string; // Лейбл тэга
  icon?: JSX; // Иконка
  avatar?: AvatarProps; // Пропсы аватара
};
```

#### **`labelFormatter?: (selectedOption: FilterOption|FilterOption[]) => string;`**
Функция формирушая строковое представление выбранного значения. Принимает выбранное значение, или массив выбранных значений в режиме `Multi`.
По умолчанию в `Single` для отображения используется `FilterOption.label` а в `Multi` кол-во выбранных значений.
