import { ValueOf } from '@snack-uikit/utils';

import { APPEARANCE, SIZE } from './constants';

export type Appearance = ValueOf<typeof APPEARANCE>;

export type Size = ValueOf<typeof SIZE>;

export type TagRowItem = {
  label: string;
  appearance?: Appearance;
};

export type TagRowItemInner = {
  label: string;
  appearance: Appearance;
};
