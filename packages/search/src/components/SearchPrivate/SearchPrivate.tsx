import cn from 'classnames';
import mergeRefs from 'merge-refs';
import { FocusEvent, forwardRef, KeyboardEvent, useCallback, useMemo, useRef } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { SearchSVG } from '@snack-ui/icons';
import {
  InputPrivate,
  InputPrivateProps,
  moveCursorToEnd,
  useButtonNavigation,
  useClearButton,
} from '@snack-ui/input-private';
import { Sun } from '@snack-ui/loaders';
import { extractSupportProps, WithSupportProps } from '@snack-ui/utils';

import { PRIVATE_SEARCH_TEST_IDS, Size } from '../../constants';
import styles from './styles.module.scss';

export type SearchPrivateProps = WithSupportProps<
  {
    /** Размер */
    size?: Size;
    /** Состояние загрузки */
    loading?: boolean;
    /** Колбек на подтверждение поиска по строке */
    onSubmit?(value: string): void;
    /** CSS-класс */
    className?: string;
  } & Pick<Partial<InputPrivateProps>, 'value' | 'onChange' | 'placeholder' | 'onFocus' | 'onBlur' | 'onKeyDown'>
>;

const SearchPrivateComponent = forwardRef<HTMLInputElement, SearchPrivateProps>(function SearchPrivate(
  {
    size = Size.S,
    value: valueProp = '',
    onChange: onChangeProp,
    loading,
    placeholder,
    onKeyDown,
    onFocus,
    onBlur,
    onSubmit,
    className,
    ...rest
  },
  ref,
) {
  const [value, onValueChange] = useUncontrolledProp(valueProp, '', onChangeProp);

  const localRef = useRef<HTMLInputElement>(null);
  const clearButtonRef = useRef<HTMLButtonElement>(null);

  const showClearButton = Boolean(value);

  const onClear = () => {
    onValueChange('');

    localRef.current?.focus();
  };

  const clearButtonSettings = useClearButton({
    clearButtonRef,
    showClearButton,
    size,
    onClear,
  });

  const { buttons, inputTabIndex, onInputKeyDown } = useButtonNavigation({
    inputRef: localRef,
    buttons: useMemo(() => [clearButtonSettings], [clearButtonSettings]),
    readonly: false,
    submitKeys: ['Enter', 'Space'],
  });

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      onKeyDown && onKeyDown(e);
      onInputKeyDown(e);

      if (e.key === 'Enter' && localRef.current?.value) {
        onSubmit && onSubmit(localRef.current.value);
        localRef.current?.blur();
      }
    },
    [onInputKeyDown, onKeyDown, onSubmit],
  );

  const handleOnFocus = useCallback(
    (e: FocusEvent<HTMLInputElement, Element>) => {
      onFocus && onFocus(e);
      moveCursorToEnd(localRef.current);
    },
    [onFocus],
  );

  return (
    <div className={cn(styles.container, className)} data-size={size} {...extractSupportProps(rest)}>
      <span className={styles.prefix}>
        {loading ? (
          <Sun data-test-id={PRIVATE_SEARCH_TEST_IDS.iconSun} />
        ) : (
          <SearchSVG data-test-id={PRIVATE_SEARCH_TEST_IDS.iconSearch} />
        )}
      </span>

      <InputPrivate
        value={value}
        onChange={onValueChange}
        onKeyDown={handleKeyDown}
        onFocus={handleOnFocus}
        onBlur={onBlur}
        tabIndex={inputTabIndex}
        ref={mergeRefs(ref, localRef)}
        placeholder={placeholder}
        type={InputPrivate.types.Text}
        data-test-id={PRIVATE_SEARCH_TEST_IDS.input}
      />

      <span className={styles.postfix}>{buttons}</span>
    </div>
  );
});

export const SearchPrivate = SearchPrivateComponent as typeof SearchPrivateComponent & {
  sizes: typeof Size;
};

SearchPrivate.sizes = Size;
