import { ValueOf } from '@snack-uikit/utils';

import { STEP_STATE, STEP_VALIDATION_RESULT } from './constants';

export type StepState = ValueOf<typeof STEP_STATE>;

export type StepValidationResult = ValueOf<typeof STEP_VALIDATION_RESULT>;

export type StepData = {
  title: string;
  validation?(): Promise<StepValidationResult>;
};

export type StepViewData = StepData & {
  onClick?(): void;
  state: StepState;
  number: number;
};

export type StepperApi = {
  goNext(): void;
  goPrev(): void;
  resetValidation(): void;
  isCompleted: boolean;
  currentStepIndex: number;
  stepCount: number;
};
