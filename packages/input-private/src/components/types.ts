import { ChangeEvent, FocusEventHandler, RefAttributes } from 'react';

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
    type?: Type;
    disabled?: boolean;
    autoComplete?: boolean;
    maxLength?: number;
    onFocus?: FocusEventHandler<HTMLInputElement>;
    onBlur?: FocusEventHandler<HTMLInputElement>;
  }>;
