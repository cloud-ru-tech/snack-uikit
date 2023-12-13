import { ValueOf } from '@snack-uikit/utils';

import { PLACEMENT, POPOVER_HEIGHT_STRATEGY, POPOVER_WIDTH_STRATEGY, TRIGGER } from './constants';

export type Placement = ValueOf<typeof PLACEMENT>;

export type Trigger = ValueOf<typeof TRIGGER>;

export type PopoverWidthStrategy = ValueOf<typeof POPOVER_WIDTH_STRATEGY>;

export type PopoverHeightStrategy = ValueOf<typeof POPOVER_HEIGHT_STRATEGY>;
