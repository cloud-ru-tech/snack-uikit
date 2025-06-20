import { forwardRef } from 'react';

import { extractSupportProps } from '@snack-uikit/utils';

import { SIZE } from '../../constants';
import { SearchBaseProps } from '../../types';
import { SearchAutocomplete, SearchAutocompleteProps } from '../SearchAutocomplete';
import { SearchFieldText } from '../SearchFieldText';

export type SearchProps = SearchBaseProps &
  (
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
        /** В режиме FieldText options отсутствуют */
        options?: never;
      }
  );

export const Search = forwardRef<HTMLInputElement, SearchProps>(function Search(props, ref) {
  const {
    value,
    onChange,
    onBlur,
    onFocus,
    outline,
    loading,
    placeholder,
    onSubmit,
    className,
    tabIndex,
    postfix,
    size = SIZE.S,
    ...rest
  } = props;
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
        tabIndex={tabIndex}
        postfix={postfix}
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
      tabIndex={tabIndex}
      postfix={postfix}
      {...supportProps}
    />
  );
});
