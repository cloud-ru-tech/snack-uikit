import { useCallback } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

export function useStateControl<TState>(
  control: { initialState?: TState; state?: TState; onChange?(state: TState): void } | undefined,
  defaultState: TState,
) {
  const state = control?.state;
  const onChange = control?.onChange;

  return useUncontrolledProp<TState>(
    control?.state,
    control?.state ?? control?.initialState ?? defaultState,
    useCallback(
      (controlState: TState) => {
        const newState = typeof controlState === 'function' ? controlState(state || defaultState) : controlState;

        onChange?.(newState);
      },
      [state, defaultState, onChange],
    ),
  );
}
