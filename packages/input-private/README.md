# Input Private

## Installation
`npm i @snack-ui/input-private`

[Changelog](./CHANGELOG.md)

```ts
export enum Types {
  Text = 'text',
  File = 'file',
  Hidden = 'hidden',
  Image = 'image',
  Password = 'password',
  Color = 'color',
  Date = 'date',
  DateTime = 'datetime',
  DateTimeLocal = 'datetime-local',
  Email = 'email',
  Number = 'number',
  Range = 'range',
  Search = 'search',
  Tel = 'tel',
  Time = 'time',
  Url = 'url',
  Month = 'month',
  Week = 'week',
}
```

```ts
export type InputPrivateProps = RefAttributes<HTMLInputElement> &
  WithSupportProps<{
    name?: string;
    value: string;
    onChange?(value: string, e?: ChangeEvent<HTMLInputElement>): void;
    id?: string;
    className?: string;
    placeholder?: string;
    type?: Types;
    disabled?: boolean;
    autoComplete?: boolean;
    maxLength?: number;
    onFocus?: FocusEventHandler<HTMLInputElement>;
    onBlur?: FocusEventHandler<HTMLInputElement>;
    prefix?: ReactNode;
    postfix?: ReactNode;
    onClick?: MouseEventHandler<HTMLInputElement>;
    onMouseDown?: MouseEventHandler<HTMLInputElement>;
  }>;
```

