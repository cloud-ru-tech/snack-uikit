import { ChangeEvent, FocusEventHandler, KeyboardEventHandler, MouseEventHandler, RefAttributes } from 'react';

import { WithSupportProps } from '@snack-ui/utils';

import { Type } from './constants';

export type InputPrivateProps = RefAttributes<HTMLInputElement> &
  WithSupportProps<{
    name?: string;
    value: string;
    onChange?(value: string, e?: ChangeEvent<HTMLInputElement>): void;
    id?: string;
    className?: string;
    placeholder?: string;
    readonly?: boolean;
    type?: Type;
    disabled?: boolean;
    autoComplete?: boolean;
    maxLength?: number;
    tabIndex?: number;
    onFocus?: FocusEventHandler<HTMLInputElement>;
    onBlur?: FocusEventHandler<HTMLInputElement>;
    onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
    onClick?: MouseEventHandler<HTMLInputElement>;
    onMouseDown?: MouseEventHandler<HTMLInputElement>;
  }>;
