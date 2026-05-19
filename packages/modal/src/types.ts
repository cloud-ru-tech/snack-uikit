import { ValueOf } from '@snack-uikit/utils';

import { ALIGN, ANIMATION_STATE, CONTENT_ALIGN, MODE, SIZE } from './constants';

export type Size = ValueOf<typeof SIZE>;

export type Mode = ValueOf<typeof MODE>;

export type Align = ValueOf<typeof ALIGN>;

export type ContentAlign = ValueOf<typeof CONTENT_ALIGN>;

export type AnimationState = ValueOf<typeof ANIMATION_STATE>;
