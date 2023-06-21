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

