import { JSX } from 'react';

import { ValueOf } from '@snack-uikit/utils';

import { STEP_STATE } from './constants';

export type StepState = ValueOf<typeof STEP_STATE>;

export type StepsValidator = (prevStepIndex: number, newStepIndex: number) => Promise<boolean>;

export type StepData = {
  title: string;
  description?: string;
};

export type StepViewData = StepData & {
  onClick?(): void;
  state: StepState;
  number: number;
};

export type StepperApi = {
  stepper: JSX.Element;
  goNext(stepIndex?: number): void;
  goPrev(stepIndex?: number): void;
  resetValidation(): void;
  setValidator(validator: StepsValidator): void;
  isCompleted: boolean;
  currentStepIndex: number;
  stepCount: number;
};
