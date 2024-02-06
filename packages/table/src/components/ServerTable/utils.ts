import debounce from 'lodash.debounce';

import { SEARCH_DELAY } from './constants';

export function onSearchDebounced() {
  return debounce((newValue: string, onChange: (newValue: string) => void) => {
    onChange(newValue);
  }, SEARCH_DELAY);
}
