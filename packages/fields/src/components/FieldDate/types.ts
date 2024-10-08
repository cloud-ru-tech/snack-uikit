import { ValueOf } from '@snack-uikit/utils';

import { MODES } from './constants';

export type Slot = {
  start: number;
  end: number;
  max: number;
  min: number;
};

export type Mode = ValueOf<typeof MODES>;
