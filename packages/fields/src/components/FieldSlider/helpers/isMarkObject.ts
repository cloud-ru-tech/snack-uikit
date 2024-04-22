import { ReactNode } from 'react';

import { SliderProps as SliderComponentProps } from '@snack-uikit/slider';

type Marks = NonNullable<SliderComponentProps['marks']>;

type MarkObject = {
  label: ReactNode;
};

export function isMarkObject(mark: Marks[keyof Marks]): mark is MarkObject {
  return Boolean(mark && typeof mark === 'object' && 'label' in mark);
}
