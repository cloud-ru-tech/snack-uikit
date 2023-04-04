# Button

## Installation

`npm i @snack-ui/button`

## TODO

- Add transition/animation
- Fix border radius in ButtonSupport and ButtonLight
- Fix colors in ButtonTonal
- Fix onClick type (button & anchor)
- R&D two icons in a button
- R&D rename Size (SizeS -> Small, ...)
- R&D type prop

## Example

```typescript jsx
import {ButtonFilled, ButtonSupport} from "@snack-ui/button";
import {DaySVG} from "@snack-ui/icons";

<ButtonFilled
  label='Navigate'
  onClick={() => navigate()}
  icon={<DaySVG />}
  size={ButtonFilled.sizes.SizeM}
  type={ButtonFilled.types.Critical}
  href='https://sbercloud.ru/'
  target='_blank'
  disabled={true}
  loading={true}
/>

<ButtonSupport
  label='Submit'
  onClick={() => sendForm()}
  iconPosition={ButtonSupport.iconPositions.Before}
/>
```

## Props

```typescript jsx
enum Type {
  Primary = 'primary',
  Neutral = 'neutral',
  Critical = 'critical',
}

enum Size {
  SizeS = 'size-s',
  SizeM = 'size-m',
  SizeL = 'size-l',
}

enum IconPosition {
  Before = 'before',
  After = 'after',
}

type BaseButtonProps = {
  className?: string;
  disabled?: boolean;
  icon?: ReactElement;
  iconPosition?: IconPosition; // Default IconPosition.After
  label?: string;
  loading?: boolean;
  onClick?: MouseEventHandler<HTMLElement>;
  size?: Size; // Default Size.SizeS
  type?: Type;
  htmlType?: 'button' | 'reset' | 'submit';
};

type AnchorButtonProps = {
  href?: string;
  target?: '_self' | '_blank' | '_parent' | '_top';
};

type CommonButtonProps = AnchorButtonProps & BaseButtonProps;

type ButtonFilledProps = WithSupportProps<Omit<CommonButtonProps, 'iconPosition'>>; // Default type Primary
type ButtonOutlineProps = WithSupportProps<Omit<CommonButtonProps, 'iconPosition'>>; // Default type Primary
type ButtonTonalProps = WithSupportProps<Omit<CommonButtonProps, 'iconPosition'>>; // Default type Primary

type ButtonLightProps = WithSupportProps<CommonButtonProps>; // Default type Neutral
type ButtonSupportProps = WithSupportProps<CommonButtonProps>; // Default type Neutral
```
