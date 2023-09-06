import { forwardRef } from 'react';

import { Size } from '../../constants';
import { SearchDecorator } from '../SearchDecorator';
import { SearchPrivate, SearchPrivateProps } from '../SearchPrivate';

export type SearchTextFieldProps = Omit<SearchPrivateProps, 'onKeyDown'> & {
  /** Внешний бордер */
  outline?: boolean;
};

export const SearchFieldText = forwardRef<HTMLInputElement, SearchTextFieldProps>(function SearchFieldText(
  { value, onChange, onBlur, onFocus, size = Size.S, outline, loading, placeholder, onSubmit, className, ...rest },
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
      />
    </SearchDecorator>
  );
});
