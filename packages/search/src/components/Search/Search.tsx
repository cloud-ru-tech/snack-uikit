import { forwardRef } from 'react';

import { SearchPrivateProps } from '@snack-uikit/search-private';
import { extractSupportProps } from '@snack-uikit/utils';

import { SIZE } from '../../constants';
import { SearchAutocomplete, SearchAutocompleteProps } from '../SearchAutocomplete';
import { SearchFieldText } from '../SearchFieldText';

export type SearchProps = Omit<SearchPrivateProps, 'onKeyDown' | 'tabIndex'> & {
  /** Внешний бордер */
  outline?: boolean;
} & (
    | (Pick<SearchAutocompleteProps, 'options'> & {
        /**
         * Работа в режиме Autocomplete в значении true
         *
         * Работа в режиме FieldText в значении false | undefined
         */
        autocomplete: true;
      })
    | {
        autocomplete?: false;
        /** В режиме FieldText options отсутсвуют */
        options?: never;
      }
  );

export const Search = forwardRef<HTMLInputElement, SearchProps>(function Search({ size = SIZE.S, ...props }, ref) {
  const { value, onChange, onBlur, onFocus, outline, loading, placeholder, onSubmit, className, ...rest } = props;
  const supportProps = extractSupportProps(rest);

  if (props.autocomplete) {
    return (
      <SearchAutocomplete
        value={value}
        onChange={onChange}
        options={props.options}
        onBlur={onBlur}
        onFocus={onFocus}
        onSubmit={onSubmit}
        size={size}
        outline={outline}
        loading={loading}
        placeholder={placeholder}
        className={className}
        ref={ref}
        {...supportProps}
      />
    );
  }

  return (
    <SearchFieldText
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      onSubmit={onSubmit}
      size={size}
      outline={outline}
      loading={loading}
      placeholder={placeholder}
      className={className}
      ref={ref}
      {...supportProps}
    />
  );
});
