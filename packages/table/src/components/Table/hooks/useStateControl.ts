import { useUncontrolledProp } from 'uncontrollable';

export function useStateControl<TState>(
  control: { initialState?: TState; state?: TState; onChange?(state: TState): void } | undefined,
  defaultState: TState,
) {
  const [state, onStateChange] = useUncontrolledProp<TState>(
    control?.state,
    control?.state ?? control?.initialState ?? defaultState,
    (controlState: TState) => {
      const newState = typeof controlState === 'function' ? controlState(state) : controlState;

      control?.onChange?.(newState);
    },
  );

  return {
    state,
    onStateChange,
  };
}
