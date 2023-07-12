import { KeyboardEventHandler, MouseEventHandler, ReactElement, RefObject } from 'react';

type RenderButtonProps = {
  key: string;
  ref: RefObject<HTMLButtonElement>;
  tabIndex: number;
  onKeyDown: KeyboardEventHandler<HTMLButtonElement>;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export type ButtonProps = {
  id: string;
  ref: RefObject<HTMLButtonElement>;
  show: boolean;
  render(props: RenderButtonProps): ReactElement;
};
