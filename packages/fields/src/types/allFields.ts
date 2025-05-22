import { ReactNode } from 'react';

import { DroplistProps, SelectionSingleState } from '@snack-uikit/list';
import { ValueOf } from '@snack-uikit/utils';

import { BUTTON_VARIANT, CONTAINER_VARIANT, VALIDATION_STATE } from '../constants';
import { ButtonFieldProps } from '../helperComponents';

export type ValidationState = ValueOf<typeof VALIDATION_STATE>;

export type ContainerVariant = ValueOf<typeof CONTAINER_VARIANT>;

export type ButtonVariant = ValueOf<typeof BUTTON_VARIANT>;

export type AsyncValueRequest = Promise<{ success: boolean; value?: string }>;

export type NativeDroplistProps = Pick<DroplistProps, 'items' | 'open' | 'onOpenChange' | 'search' | 'scroll'> & {
  selection?: Omit<SelectionSingleState, 'mode'>;
};

export type Button = Omit<NativeDroplistProps, 'items'> &
  Pick<ButtonFieldProps, 'variant' | 'content'> &
  (
    | {
        items?: DroplistProps['items'];
        hasArrow?: never;
        arrowOpen?: never;
        wrapper?: never;
      }
    | (Pick<ButtonFieldProps, 'hasArrow' | 'arrowOpen'> & {
        items?: never;
        wrapper?: (button: ReactNode) => JSX.Element;
      })
  );
