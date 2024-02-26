import debounce from 'lodash.debounce';

import { SEARCH_DELAY } from './constants';

export const onSearchDebounced = debounce((newValue: string, onChange: (newValue: string) => void) => {
  onChange(newValue);
}, SEARCH_DELAY);
