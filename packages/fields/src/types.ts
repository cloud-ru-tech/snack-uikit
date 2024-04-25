import { ValueOf } from '@snack-uikit/utils';

import { CONTAINER_VARIANT, VALIDATION_STATE } from './constants';

export type ValidationState = ValueOf<typeof VALIDATION_STATE>;

export type ContainerVariant = ValueOf<typeof CONTAINER_VARIANT>;

export type AsyncValueRequest = Promise<{ success: boolean; value?: string }>;
