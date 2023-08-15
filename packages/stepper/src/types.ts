import { StepState, StepValidationResult } from './constants';

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
