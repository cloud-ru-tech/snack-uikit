import { ValueOf } from '@snack-uikit/utils';

import { APPEARANCE, COLOR, SIZE, VARIANT } from './constants';

export type Appearance = ValueOf<typeof APPEARANCE>;
export type Size = ValueOf<typeof SIZE>;
export type Variant = ValueOf<typeof VARIANT>;
export type Color = ValueOf<typeof COLOR>;
