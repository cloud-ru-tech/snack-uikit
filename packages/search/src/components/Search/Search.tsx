import { forwardRef } from 'react';

import { extractSupportProps } from '@snack-uikit/utils';

import { Size } from '../../constants';
import { SearchAutocomplete, SearchAutocompleteProps } from '../SearchAutocomplete';
import { SearchFieldText } from '../SearchFieldText';
import { SearchPrivateProps } from '../SearchPrivate';

export type SearchProps = Omit<SearchPrivateProps, 'onKeyDown'> & {
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

const SearchComponent = forwardRef<HTMLInputElement, SearchProps>(function Search({ size = Size.S, ...props }, ref) {
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

export const Search = SearchComponent as typeof SearchComponent & {
  sizes: typeof Size;
};

Search.sizes = Size;
