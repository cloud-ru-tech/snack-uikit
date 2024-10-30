import { ValueOf } from '@snack-uikit/utils';

import { MODES, NO_SECONDS_MODE, TIME_MODES } from '../constants';

export type Slot = {
  start: number;
  end: number;
  max: number;
  min: number;
};

export type Mode = ValueOf<typeof MODES>;
export type TimeMode = ValueOf<typeof TIME_MODES>;
export type NoSecondsMode = typeof NO_SECONDS_MODE;
