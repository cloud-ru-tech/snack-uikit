import { ValueOf } from '@snack-uikit/utils';

import { PURPOSE, SIZE } from './constants';

type Purpose = ValueOf<typeof PURPOSE>;
type Size = ValueOf<typeof SIZE>;

export type Variant = `${Purpose}-${Size}`;
