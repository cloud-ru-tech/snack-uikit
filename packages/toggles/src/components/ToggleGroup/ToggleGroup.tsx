import { ReactNode, useCallback } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { SELECTION_MODE } from '../../constants';
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
      selectionMode?: typeof SELECTION_MODE.Single;
    }
  | {
      /** Начальное состояние */
      defaultValue?: string[];
      /** Controlled состояние */
      value?: string[];
      /** Controlled обработчик измения состояния */
      onChange?(value: (string[] | undefined) | string[]): void;
      /** Режим выбора */
      selectionMode?: typeof SELECTION_MODE.Multiple;
    }
);

export function ToggleGroup({
  children,
  value: valueProp,
  onChange: onChangeProp,
  selectionMode = SELECTION_MODE.Single,
  defaultValue,
}: ToggleGroupProps) {
  const [value, setValue] = useUncontrolledProp<string | string[] | undefined>(valueProp, defaultValue, cb => {
    onChangeProp?.(cb(value));
  });

  const onChange = useCallback(
    (newValue: string) => {
      if (selectionMode === SELECTION_MODE.Single) {
        return setValue((oldValue: string | undefined) => {
          if (newValue !== oldValue) {
            return newValue;
          }

          return undefined;
        });
      }

      return setValue((oldValues: string[] | undefined = []) => {
        if (Array.isArray(oldValues)) {
          if (oldValues.includes(newValue)) {
            return oldValues.filter(oldValue => oldValue !== newValue);
          }

          return oldValues.concat(newValue);
        }

        return undefined;
      });
    },
    [selectionMode, setValue],
  );

  return (
    <ToggleGroupContext.Provider value={{ value, onChange, selectionMode }}>{children}</ToggleGroupContext.Provider>
  );
}
