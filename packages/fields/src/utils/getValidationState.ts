import { VALIDATION_STATE } from '../constants';
import { ValidationState } from '../types';

export function getValidationState({ validationState, error }: { validationState?: ValidationState; error?: string }) {
  return error ? VALIDATION_STATE.Error : validationState ?? VALIDATION_STATE.Default;
}
