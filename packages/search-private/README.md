# Search Private

## Installation
`npm i @snack-uikit/search-private`

[Changelog](./CHANGELOG.md)



[//]: DOCUMENTATION_SECTION_START
[//]: THIS_SECTION_IS_AUTOGENERATED_PLEASE_DONT_EDIT_IT
## SearchPrivate
### Props
| name | type | default value | description |
|------|------|---------------|-------------|
| size | enum Size: `"s"`, `"m"`, `"l"` | s | Размер |
| loading | `boolean` | - | Состояние загрузки |
| onSubmit | `(value: string) => void` | - | Колбек на подтверждение поиска по строке |
| className | `string` | - | CSS-класс |
| tabIndex | `number` | - |  |
| value | `string` | - | Значение input |
| onChange | `(value: string, e?: ChangeEvent<HTMLInputElement>) => void` | - | Колбек смены значения |
| placeholder | `string` | - | Значение плейсхолдера |
| onFocus | `FocusEventHandler<HTMLInputElement>` | - | Колбек обработки получения фокуса |
| onBlur | `FocusEventHandler<HTMLInputElement>` | - | Колбек обработки потери фокуса |
| onKeyDown | `KeyboardEventHandler<HTMLInputElement>` | - | Колбек обработки начала нажатия клавиши клавиатуры |
| ref | `LegacyRef<HTMLInputElement>` | - | Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or call the ref with `null` if you passed a callback ref). @see {@link https://react.dev/learn/referencing-values-with-refs#refs-and-the-dom React Docs} |
| key | `Key` | - |  |


[//]: DOCUMENTATION_SECTION_END
