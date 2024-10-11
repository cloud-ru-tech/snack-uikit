import { ReactNode } from 'react';

import { DroplistProps, SelectionSingleState } from '@snack-uikit/list';
import { ValueOf } from '@snack-uikit/utils';

import { BUTTON_VARIANT, CONTAINER_VARIANT, VALIDATION_STATE } from '../constants';

export type ValidationState = ValueOf<typeof VALIDATION_STATE>;

export type ContainerVariant = ValueOf<typeof CONTAINER_VARIANT>;

export type ButtonVariant = ValueOf<typeof BUTTON_VARIANT>;

export type AsyncValueRequest = Promise<{ success: boolean; value?: string }>;

export type NativeDroplistProps = Pick<DroplistProps, 'items' | 'open' | 'onOpenChange'> & {
  selection?: Omit<SelectionSingleState, 'mode'>;
};

export type Button = Omit<NativeDroplistProps, 'items'> & {
  variant: ButtonVariant;
  content?: ReactNode;
  items?: DroplistProps['items'];
};
