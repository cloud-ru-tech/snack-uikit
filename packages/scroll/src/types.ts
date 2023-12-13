import { ValueOf } from '@snack-uikit/utils';

import { AUTOSCROLL_TO, BAR_HIDE_STRATEGY, RESIZE, SIZE } from './constants';

export type Size = ValueOf<typeof SIZE>;

export type AutoscrollTo = ValueOf<typeof AUTOSCROLL_TO>;

export type Resize = ValueOf<typeof RESIZE>;

export type BarHideStrategy = ValueOf<typeof BAR_HIDE_STRATEGY>;
