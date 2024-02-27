import { createContext, ReactNode, useCallback, useContext } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

export type SelectionSingleValueType = string | number | undefined;

export type SelectionSingleState = {
  /** Начальное состояние */
  defaultValue?: SelectionSingleValueType;
  /** Controlled состояние */
  value?: SelectionSingleValueType;
  /** Controlled обработчик измения состояния */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?(value: any): void;
  /** Режим выбора */
  mode: 'single';
};

export type SelectionSingleProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue?(value: any): void;
  /** Режим выбора single */
  isSelectionSingle: true;
  /** Режим выбора multi */
  isSelectionMultiple: false;
} & SelectionSingleState;

export type SelectionMultipleState = {
  /** Начальное состояние */
  defaultValue?: SelectionSingleValueType[];
  /** Controlled состояние */
  value?: SelectionSingleValueType[];
  /** Controlled обработчик измения состояния */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?(value: any): void;
  /** Режим выбора */
  mode: 'multiple';
};

export type SelectionMultipleProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue?(value: any): void;
  /** Режим выбора single */
  isSelectionSingle: false;
  /** Режим выбора multi */
  isSelectionMultiple: true;
} & SelectionMultipleState;

type SelectionNoneProps = {
  mode?: undefined;
  value?: undefined;
  onChange?: undefined;
  setValue?: undefined;
  defaultValue?: undefined;
  isSelectionSingle?: undefined;
  isSelectionMultiple?: undefined;
};

type SelectionProviderProps = SelectionSingleProps | SelectionMultipleProps | SelectionNoneProps;

type SelectionContextType =
  | Omit<SelectionNoneProps, 'defaultValue'>
  | Omit<SelectionSingleProps, 'defaultValue'>
  | Omit<SelectionMultipleProps, 'defaultValue'>;

export type SelectionState = { selection?: SelectionSingleState | SelectionMultipleState };

export const SelectionContext = createContext<SelectionContextType>({
  value: undefined,
  onChange: undefined,
  mode: undefined,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isSelectionMultipleProps(props: any): props is SelectionMultipleProps {
  return 'mode' in props && props['mode'] === 'multiple';
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isSelectionSingleProps(props: any): props is SelectionSingleProps {
  return 'mode' in props && props['mode'] === 'single';
}

type Child = {
  children: ReactNode;
};

function SelectionSingleProvider({
  value: valueProp,
  defaultValue,
  onChange: onChangeProp,
  children,
}: SelectionSingleProps & Child) {
  const [value, setValue] = useUncontrolledProp<SelectionSingleValueType>(valueProp, defaultValue, newValue => {
    const result = typeof newValue === 'function' ? newValue(value) : newValue;

    onChangeProp?.(result);
  });

  const onChange = useCallback(
    (newValue: SelectionSingleValueType) =>
      setValue((oldValue: SelectionSingleValueType) => {
        if (newValue !== oldValue) {
          return newValue;
        }

        return undefined;
      }),
    [setValue],
  );

  return (
    <SelectionContext.Provider
      value={{
        value,
        onChange,
        mode: 'single',
        isSelectionSingle: true,
        isSelectionMultiple: false,
        setValue,
      }}
    >
      {children}
    </SelectionContext.Provider>
  );
}

function SelectionMultipleProvider({
  value: valueProp,
  defaultValue,
  onChange: onChangeProp,
  children,
}: SelectionMultipleProps & Child) {
  const [value, setValue] = useUncontrolledProp<SelectionSingleValueType[]>(valueProp, defaultValue, newValue => {
    const result = typeof newValue === 'function' ? newValue(value) : newValue;

    onChangeProp?.(result);
  });

  const onChange = useCallback(
    (newValue: SelectionSingleValueType) => {
      setValue((oldValues: SelectionSingleValueType[]) => {
        if (Array.isArray(oldValues)) {
          if (oldValues.includes(newValue)) {
            return oldValues.filter(oldValue => oldValue !== newValue);
          }

          return oldValues.concat(newValue);
        }

        if (oldValues === undefined) {
          return Array.isArray(newValue) ? newValue : [newValue];
        }

        return undefined;
      });
    },
    [setValue],
  );

  return (
    <SelectionContext.Provider
      value={{
        value,
        onChange,
        mode: 'multiple',
        isSelectionSingle: false,
        isSelectionMultiple: true,
        setValue,
      }}
    >
      {children}
    </SelectionContext.Provider>
  );
}

export function SelectionProvider({ children, ...props }: SelectionProviderProps & Child) {
  if (isSelectionSingleProps(props)) {
    return <SelectionSingleProvider {...props}>{children}</SelectionSingleProvider>;
  }

  if (isSelectionMultipleProps(props)) {
    return <SelectionMultipleProvider {...props}>{children}</SelectionMultipleProvider>;
  }

  return <SelectionContext.Provider value={{}}>{children}</SelectionContext.Provider>;
}

export const useSelectionContext = () => useContext(SelectionContext);

export function extractSelectionProps<T extends SelectionState>({ selection }: T) {
  return {
    ...(selection ?? {}),
  } as SelectionProviderProps;
}
