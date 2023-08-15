import { useContext } from 'react';

import { StepperContext } from './StepperContext';

export const useStepperApi = () => useContext(StepperContext);
