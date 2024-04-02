import { createContext, useContext } from 'react';

import { StepperApi } from '../types';

export type StepperContextValue = StepperApi;

export const StepperContext = createContext<StepperApi>({
  stepper: <></>,
  stepCount: 0,
  isCompleted: false,
  currentStepIndex: 0,
  goNext() {
    /* stub */
  },
  goPrev() {
    /* stub */
  },
  resetValidation() {
    /* stub */
  },
  setValidator() {
    /* stub */
  },
});

export const useStepperApi = () => useContext(StepperContext);
