import { useMemo } from 'react';

import { Option } from '../types';

export function useFilteredOptions({
  searchable,
  touched,
  inputValue,
  options,
}: {
  searchable: boolean;
  touched: boolean;
  inputValue: string;
  options: Option[];
}) {
  return useMemo(
    () =>
      searchable && touched && inputValue
        ? options.filter(item => item.label.toLowerCase().includes(inputValue.toLowerCase().trim()))
        : options,
    [inputValue, options, searchable, touched],
  );
}
