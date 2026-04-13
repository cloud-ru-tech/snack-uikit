import { useCallback, useMemo } from 'react';
import { Handler } from 'uncontrollable';

import { SelectionSingleValueType } from '@snack-uikit/list';

import { FieldSelectMultipleAddCustomOptionTrigger } from '../types';

type UseResolvedAddCustomOptionTriggersParams = {
  addCustomOptionTriggers?: FieldSelectMultipleAddCustomOptionTrigger[];
  addOptionByEnter: boolean;
};

function useResolvedAddCustomOptionTriggers({
  addCustomOptionTriggers,
  addOptionByEnter,
}: UseResolvedAddCustomOptionTriggersParams): FieldSelectMultipleAddCustomOptionTrigger[] {
  return useMemo(() => {
    if (addCustomOptionTriggers !== undefined) {
      return addCustomOptionTriggers;
    }

    return addOptionByEnter ? ['enter'] : [];
  }, [addCustomOptionTriggers, addOptionByEnter]);
}

type UseFieldSelectMultipleCustomOptionParams = UseResolvedAddCustomOptionTriggersParams & {
  inputValue: string;
  value: SelectionSingleValueType[] | undefined;
  setValue: Handler;
  updateInputValue: () => void;
};
export function useFieldSelectMultipleCustomOption({
  addCustomOptionTriggers,
  addOptionByEnter,
  inputValue,
  value,
  setValue,
  updateInputValue,
}: UseFieldSelectMultipleCustomOptionParams) {
  const resolvedAddCustomOptionTriggers = useResolvedAddCustomOptionTriggers({
    addCustomOptionTriggers,
    addOptionByEnter,
  });

  const tryCommitCustomOptionFromInput = useCallback(
    (trigger: FieldSelectMultipleAddCustomOptionTrigger) => {
      if (!resolvedAddCustomOptionTriggers.includes(trigger) || inputValue === '') {
        return;
      }

      if (!(value ?? []).includes(inputValue)) {
        setValue((prev: SelectionSingleValueType[]) => (prev ?? []).concat(inputValue));
        updateInputValue();
      }
    },
    [resolvedAddCustomOptionTriggers, inputValue, value, setValue, updateInputValue],
  );

  return { resolvedAddCustomOptionTriggers, tryCommitCustomOptionFromInput };
}

type UseFieldSelectSingleCustomOptionParams = UseResolvedAddCustomOptionTriggersParams & {
  inputValue: string;
  handleSelectionChange: (value: SelectionSingleValueType) => void;
};

export function useFieldSelectSingleCustomOption({
  addCustomOptionTriggers,
  addOptionByEnter,
  inputValue,
  handleSelectionChange,
}: UseFieldSelectSingleCustomOptionParams) {
  const resolvedAddCustomOptionTriggers = useResolvedAddCustomOptionTriggers({
    addCustomOptionTriggers,
    addOptionByEnter,
  });

  const tryCommitCustomOptionFromInput = useCallback(
    (trigger: FieldSelectMultipleAddCustomOptionTrigger) => {
      if (!resolvedAddCustomOptionTriggers.includes(trigger) || inputValue === '') {
        return;
      }

      handleSelectionChange(inputValue);
    },
    [resolvedAddCustomOptionTriggers, inputValue, handleSelectionChange],
  );

  return { resolvedAddCustomOptionTriggers, tryCommitCustomOptionFromInput };
}
