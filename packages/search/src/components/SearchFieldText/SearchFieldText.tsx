import { forwardRef } from 'react';

import { SearchPrivate } from '@snack-uikit/search-private';

import { PRIVATE_SEARCH_TEST_IDS, SIZE } from '../../constants';
import { SearchBaseProps } from '../../types';
import { SearchDecorator } from '../SearchDecorator';

export type SearchTextFieldProps = SearchBaseProps;

export const SearchFieldText = forwardRef<HTMLInputElement, SearchTextFieldProps>(function SearchFieldText(
  {
    value,
    onChange,
    onBlur,
    onFocus,
    size = SIZE.S,
    outline,
    loading,
    placeholder,
    onSubmit,
    className,
    tabIndex,
    ...rest
  },
  ref,
) {
  return (
    <SearchDecorator outline={outline} size={size} className={className} {...rest}>
      <SearchPrivate
        ref={ref}
        size={size}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        onSubmit={onSubmit}
        placeholder={placeholder}
        loading={loading}
        data-test-id={PRIVATE_SEARCH_TEST_IDS.field}
        tabIndex={tabIndex}
      />
    </SearchDecorator>
  );
});
