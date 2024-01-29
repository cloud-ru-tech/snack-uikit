import { createContext, ReactNode, useCallback, useContext } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

type SelectionSingleValueType = string | number | undefined;

export type SelectionSingleProps = {
  /** Начальное состояние */
  defaultValue?: SelectionSingleValueType;
  /** Controlled состояние */
  value?: SelectionSingleValueType;
  /** Controlled обработчик измения состояния */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?(value: any): void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue?(value: any): void;
  /** Режим выбора */
  selection: 'single';
  /** Режим выбора single */
  isSelectionSingle: true;
  /** Режим выбора multi */
  isSelectionMultiple: false;
};

export type SelectionMultipleProps = {
  /** Начальное состояние */
  defaultValue?: SelectionSingleValueType[];
  /** Controlled состояние */
  value?: SelectionSingleValueType[];
  /** Controlled обработчик измения состояния */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?(value: any): void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue?(value: any): void;
  /** Режим выбора */
  selection: 'multiple';
  /** Режим выбора single */
  isSelectionSingle: false;
  /** Режим выбора multi */
  isSelectionMultiple: true;
};

type SelectionNoneProps = {
  selection?: undefined;
  value?: undefined;
  onChange?: undefined;
  setValue?: undefined;
  defaultValue?: undefined;
  isSelectionSingle?: undefined;
  isSelectionMultiple?: undefined;
};

export type SelectionProviderProps = SelectionSingleProps | SelectionMultipleProps | SelectionNoneProps;

type SelectionContextType =
  | Omit<SelectionNoneProps, 'defaultValue'>
  | Omit<SelectionSingleProps, 'defaultValue'>
  | Omit<SelectionMultipleProps, 'defaultValue'>;

export const SelectionContext = createContext<SelectionContextType>({
  value: undefined,
  onChange: undefined,
  selection: undefined,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isSelectionMultipleProps(props: any): props is SelectionMultipleProps {
  return 'selection' in props && props['selection'] === 'multiple';
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isSelectionSingleProps(props: any): props is SelectionSingleProps {
  return 'selection' in props && props['selection'] === 'single';
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
  const [value, setValue] = useUncontrolledProp<SelectionSingleValueType>(valueProp, defaultValue, cb => {
    onChangeProp?.(cb(value));
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
      value={{ value, onChange, selection: 'single', isSelectionSingle: true, isSelectionMultiple: false, setValue }}
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
  const [value, setValue] = useUncontrolledProp<SelectionSingleValueType[]>(valueProp, defaultValue, cb => {
    onChangeProp?.(cb(value));
  });

  const onChange = useCallback(
    (newValue: SelectionSingleValueType) =>
      setValue((oldValues: SelectionSingleValueType[]) => {
        if (Array.isArray(oldValues)) {
          if (oldValues.includes(newValue)) {
            return oldValues.filter(oldValue => oldValue !== newValue);
          }

          return oldValues.concat(newValue);
        }

        return undefined;
      }),
    [setValue],
  );

  return (
    <SelectionContext.Provider
      value={{ value, onChange, selection: 'multiple', isSelectionSingle: false, isSelectionMultiple: true, setValue }}
    >
      {children}
    </SelectionContext.Provider>
  );
}

export function SelectionProvider(props: SelectionProviderProps & Child) {
  if (isSelectionSingleProps(props)) {
    return <SelectionSingleProvider {...props} />;
  }

  if (isSelectionMultipleProps(props)) {
    return <SelectionMultipleProvider {...props} />;
  }

  return <SelectionContext.Provider value={{}}>{props.children}</SelectionContext.Provider>;
}

export const useSelectionContext = () => useContext(SelectionContext);

export function extractSelectionProps<T extends SelectionProviderProps>({
  selection,
  value,
  defaultValue,
  onChange,
}: T) {
  return {
    selection,
    value,
    defaultValue,
    onChange,
  } as SelectionProviderProps;
}
