export const STEP_STATE = {
  Completed: 'completed',
  Current: 'current',
  Loading: 'loading',
  Waiting: 'waiting',
  Rejected: 'rejected',
} as const;

export const STEP_VALIDATION_RESULT = {
  Completed: 'completed',
  Rejected: 'rejected',
} as const;
