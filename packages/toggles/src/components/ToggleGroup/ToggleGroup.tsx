import { ReactNode, useCallback, useEffect } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { SelectionMode } from '../../constants';
import { ToggleGroupContext } from '../../context';

export type ToggleGroupProps = {
  /** Вложенный контент */
  children: ReactNode;
} & (
  | {
      /** Начальное состояние */
      defaultValue?: string;
      /** Controlled состояние */
      value?: string;
      /** Controlled обработчик измения состояния */
      onChange?(value: (string | undefined) | string): void;
      /** Режим выбора */
      selectionMode?: SelectionMode.Single;
    }
  | {
      /** Начальное состояние */
      defaultValue?: string[];
      /** Controlled состояние */
      value?: string[];
      /** Controlled обработчик измения состояния */
      onChange?(value: (string[] | undefined) | string[]): void;
      /** Режим выбора */
      selectionMode?: SelectionMode.Multiple;
    }
);

export function ToggleGroup({
  children,
  value: valueProp,
  onChange: onChangeProp,
  selectionMode = SelectionMode.Single,
  defaultValue,
}: ToggleGroupProps) {
  const [value, setValue] = useUncontrolledProp<string | string[] | undefined>(valueProp, defaultValue, onChangeProp);

  const onChange = useCallback(
    (newValue: string) => {
      if (selectionMode === SelectionMode.Single) {
        return setValue((oldValue: string | undefined) => {
          if (newValue !== oldValue) {
            return newValue;
          }

          return '';
        });
      }

      return setValue((oldValues: string[] | undefined = []) => {
        if (oldValues.includes(newValue)) {
          return oldValues.filter(oldValue => oldValue !== newValue);
        }

        return oldValues.concat(newValue);
      });
    },
    [selectionMode, setValue],
  );

  useEffect(() => {
    if (selectionMode === SelectionMode.Single) {
      setValue((value: string[] | string) => {
        if (Array.isArray(value)) {
          return undefined;
        }

        return value;
      });

      return;
    }

    setValue((value: string[] | string) => {
      if (!Array.isArray(value)) {
        return undefined;
      }

      return value;
    });
  }, [selectionMode, setValue]);

  return (
    <ToggleGroupContext.Provider value={{ value, onChange, selectionMode }}>{children}</ToggleGroupContext.Provider>
  );
}

ToggleGroup.selectionModes = SelectionMode;
