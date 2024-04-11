import { createContext, ReactNode, useCallback, useContext } from 'react';

import { useValueControl } from '@snack-uikit/utils';

import { AnyType, ItemId } from '../../Items';

export type OnChangeHandler<T = AnyType> = (value: T) => void;

export type SelectionSingleValueType = ItemId;

export type SelectionSingleState = {
  /** Начальное состояние */
  defaultValue?: ItemId;
  /** Controlled состояние */
  value?: ItemId;
  /** Controlled обработчик измения состояния */
  onChange?: OnChangeHandler;
  /** Режим выбора */
  mode: 'single';
};

export type SelectionSingleProps = {
  setValue?(value: AnyType): void;
  /** Режим выбора single */
  isSelectionSingle: true;
  /** Режим выбора multi */
  isSelectionMultiple: false;
} & SelectionSingleState;

export type SelectionMultipleState = {
  /** Начальное состояние */
  defaultValue?: ItemId[];
  /** Controlled состояние */
  value?: ItemId[];
  /** Controlled обработчик измения состояния */
  onChange?: OnChangeHandler;
  /** Режим выбора */
  mode: 'multiple';
};

export type SelectionMultipleProps = {
  setValue?(value: AnyType): void;
  /** Режим выбора single */
  isSelectionSingle: false;
  /** Режим выбора multi */
  isSelectionMultiple: true;
} & SelectionMultipleState;

type SelectionNoneProps = {
  mode?: 'none';
  value?: undefined;
  onChange?: undefined;
  setValue?: undefined;
  defaultValue?: undefined;
  isSelectionSingle?: undefined;
  isSelectionMultiple?: undefined;
};

type SelectionContextType =
  | Omit<SelectionNoneProps, 'defaultValue'>
  | Omit<SelectionSingleProps, 'defaultValue'>
  | Omit<SelectionMultipleProps, 'defaultValue'>;

export type SelectionState = {
  selection?: SelectionSingleState | SelectionMultipleState;
};

export const SelectionContext = createContext<SelectionContextType>({
  value: undefined,
  onChange: undefined,
  mode: undefined,
});

export function isSelectionMultipleProps(props: AnyType): props is SelectionMultipleProps {
  return 'mode' in props && props['mode'] === 'multiple';
}
export function isSelectionSingleProps(props: AnyType): props is SelectionSingleProps {
  return 'mode' in props && props['mode'] === 'single';
}

type Child = {
  children: ReactNode;
};

function SelectionNoneProvider({ children }: SelectionNoneProps & Child) {
  return (
    <SelectionContext.Provider
      value={{
        mode: 'none',
      }}
    >
      {children}
    </SelectionContext.Provider>
  );
}

function SelectionSingleProvider({
  value: valueProp,
  defaultValue,
  onChange: onChangeProp,
  children,
}: SelectionSingleProps & Child) {
  const [value, setValue] = useValueControl<ItemId | undefined>({
    value: valueProp,
    defaultValue,
    onChange: onChangeProp,
  });

  const onChange = useCallback(
    (newValue: SelectionSingleValueType | undefined) =>
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
  const [value, setValue] = useValueControl<ItemId[] | undefined>({
    value: valueProp,
    defaultValue,
    onChange: onChangeProp,
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

type SelectionProviderProps = {
  /** Начальное состояние */
  defaultValue?: AnyType;
  /** Controlled состояние */
  value?: AnyType;
  /** Controlled обработчик измения состояния */
  onChange?: OnChangeHandler;
  /** Режим выбора */
  mode?: 'multiple' | 'single' | 'none';
};

export function SelectionProvider({ children, ...props }: SelectionProviderProps & Child) {
  if (isSelectionSingleProps(props)) {
    return <SelectionSingleProvider {...props}>{children}</SelectionSingleProvider>;
  }

  if (isSelectionMultipleProps(props)) {
    return <SelectionMultipleProvider {...props}>{children}</SelectionMultipleProvider>;
  }

  return <SelectionNoneProvider>{children}</SelectionNoneProvider>;
}

export function useSelectionContext() {
  return useContext(SelectionContext);
}
