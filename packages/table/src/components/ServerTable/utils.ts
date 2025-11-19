import debounce from 'lodash.debounce';

import { SEARCH_DELAY } from './constants';

type ChangeHandler = (newValue: string) => void;
type SearchHandler = (newValue: string, onChange: ChangeHandler) => void;

type OnSearchDebouncedType = ReturnType<typeof debounce<SearchHandler>>;

export const onSearchDebounced: OnSearchDebouncedType = debounce((newValue, onChange) => {
  onChange(newValue);
}, SEARCH_DELAY);
