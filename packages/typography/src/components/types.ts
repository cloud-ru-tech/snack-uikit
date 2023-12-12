import { ValueOf } from '@snack-uikit/utils';

import { FAMILY, PURPOSE, SIZE, TAG } from './constants';

export type Tag = ValueOf<typeof TAG>;

export type Size = ValueOf<typeof SIZE>;

export type Family = ValueOf<typeof FAMILY>;

export type Purpose = ValueOf<typeof PURPOSE>;
