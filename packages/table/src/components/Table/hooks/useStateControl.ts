import { useUncontrolledProp } from 'uncontrollable';

export function useStateControl<TState>(
  control: { initialState?: TState; state?: TState; onChange?(state: TState): void } | undefined,
  defaultState: TState,
) {
  return useUncontrolledProp<TState>(
    control?.state,
    control?.state ?? control?.initialState ?? defaultState,
    control?.onChange,
  );
}
