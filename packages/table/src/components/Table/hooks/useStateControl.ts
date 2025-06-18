import { OnChangeFn } from '@tanstack/react-table';
import { useUncontrolledProp } from 'uncontrollable';

export function useStateControl<TState extends object | string | number | boolean | undefined>(
  control: { initialState?: TState; state?: TState; onChange?(state: TState): void } | undefined,
  defaultState: TState,
) {
  const [state, setState] = useUncontrolledProp<TState>(
    control?.state,
    control?.state ?? control?.initialState ?? defaultState,
    control?.onChange,
  );

  const onChangeFunction: OnChangeFn<TState> = updater => {
    if (typeof updater === 'function') {
      setState(updater(state));
    } else {
      setState(updater);
    }
  };

  return [state, onChangeFunction] as const;
}
