import { useUncontrolledProp } from 'uncontrollable';

type UseValueControl<TValue> = {
  value?: TValue;
  onChange?(value: TValue): void;
  defaultValue?: TValue;
};

export function useValueControl<TValue>({ value, onChange, defaultValue }: UseValueControl<TValue>) {
  return useUncontrolledProp<TValue>(value, value ?? defaultValue, (newValue: TValue) => {
    const newState = typeof newValue === 'function' ? newValue(value) : newValue;

    onChange?.(newState);
  });
}
