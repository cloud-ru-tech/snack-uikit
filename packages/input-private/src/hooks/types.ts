import { KeyboardEventHandler, MouseEventHandler, ReactElement, RefObject } from 'react';

type RenderActiveButtonProps = {
  key: string;
  ref: RefObject<HTMLButtonElement>;
  tabIndex: number;
  onKeyDown: KeyboardEventHandler<HTMLButtonElement>;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

type RenderInactiveButtonProps = {
  key: string;
};

export type InactiveItem = {
  active: false;
  id: string;
  render(props: RenderInactiveButtonProps): ReactElement;
  show: boolean;
};

export type ActiveItem = {
  active: true;
  id: string;
  ref: RefObject<HTMLButtonElement>;
  show: boolean;
  render(props: RenderActiveButtonProps): ReactElement;
};

export type ButtonProps = InactiveItem | ActiveItem;
