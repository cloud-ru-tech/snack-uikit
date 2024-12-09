import { useUncontrolledProp } from 'uncontrollable';

type UseValueControl<TValue> = {
  /**
   * Значение состояния
   */
  value?: TValue;
  /**
   * Значение по умолчанию
   */
  defaultValue?: TValue;
  /**
   * Колбек, вызываемый на смену состояния
   */
  onChange?(value: TValue): void;
};

/**
 * Хук для работы с состоянием.
 * Нужен для поддержки controlled/uncontrolled поведения, в зависимости от того были ли переданы входные аргументы
 */
export function useValueControl<TValue>({ value, onChange, defaultValue }: UseValueControl<TValue>) {
  return useUncontrolledProp<TValue>(value, defaultValue, (newValue: TValue) => {
    const newState = typeof newValue === 'function' ? newValue(value) : newValue;

    onChange?.(newState);
  });
}
