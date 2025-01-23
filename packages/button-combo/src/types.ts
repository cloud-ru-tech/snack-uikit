import { BaseItemProps } from '@snack-uikit/list';

export type Item = Omit<BaseItemProps, 'onClick' | 'onMouseDown' | 'onKeyDown' | 'onFocus' | 'onBlur'> &
  Required<Pick<BaseItemProps, 'onClick'>> & {
    /** Название */
    label?: string;
  };
