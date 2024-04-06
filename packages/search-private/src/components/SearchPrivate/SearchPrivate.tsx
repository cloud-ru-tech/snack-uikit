import cn from 'classnames';
import mergeRefs from 'merge-refs';
import { FocusEvent, forwardRef, KeyboardEvent, useCallback, useMemo, useRef } from 'react';

import { SearchSVG } from '@snack-uikit/icons';
import {
  InputPrivate,
  InputPrivateProps,
  moveCursorToEnd,
  useButtonNavigation,
  useClearButton,
} from '@snack-uikit/input-private';
import { Sun } from '@snack-uikit/loaders';
import { useLocale } from '@snack-uikit/locale';
import { extractSupportProps, useValueControl, WithSupportProps } from '@snack-uikit/utils';

import { PRIVATE_SEARCH_TEST_IDS, SIZE } from '../../constants';
import { Size } from '../../types';
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
    tabIndex?: number;
  } & Pick<Partial<InputPrivateProps>, 'value' | 'onChange' | 'placeholder' | 'onFocus' | 'onBlur' | 'onKeyDown'>
>;

export const SearchPrivate = forwardRef<HTMLInputElement, SearchPrivateProps>(function SearchPrivate(
  {
    size = SIZE.S,
    value: valueProp = '',
    onChange: onChangeProp,
    loading,
    placeholder,
    onKeyDown,
    onFocus,
    onBlur,
    onSubmit,
    className,
    tabIndex,
    ...rest
  },
  ref,
) {
  const [value = '', onValueChange] = useValueControl<string>({
    value: valueProp,
    defaultValue: '',
    onChange: onChangeProp,
  });

  const localRef = useRef<HTMLInputElement>(null);
  const clearButtonRef = useRef<HTMLButtonElement>(null);

  const { t } = useLocale('SearchPrivate');

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
    <div className={cn(styles.container, className)} {...extractSupportProps(rest)} data-size={size}>
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
        tabIndex={tabIndex ?? inputTabIndex}
        ref={mergeRefs(ref, localRef)}
        placeholder={placeholder ?? t('placeholder')}
        type='text'
        data-test-id={PRIVATE_SEARCH_TEST_IDS.input}
      />

      <span className={styles.postfix}>{buttons}</span>
    </div>
  );
});
