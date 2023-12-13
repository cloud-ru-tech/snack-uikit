import { forwardRef } from 'react';

import { PRIVATE_SEARCH_TEST_IDS, SIZE } from '../../constants';
import { SearchDecorator } from '../SearchDecorator';
import { SearchPrivate, SearchPrivateProps } from '../SearchPrivate';

export type SearchTextFieldProps = Omit<SearchPrivateProps, 'onKeyDown'> & {
  /** Внешний бордер */
  outline?: boolean;
};

export const SearchFieldText = forwardRef<HTMLInputElement, SearchTextFieldProps>(function SearchFieldText(
  { value, onChange, onBlur, onFocus, size = SIZE.S, outline, loading, placeholder, onSubmit, className, ...rest },
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
      />
    </SearchDecorator>
  );
});
