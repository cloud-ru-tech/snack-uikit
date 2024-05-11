import cn from 'classnames';
import mergeRefs from 'merge-refs';
import {
  forwardRef,
  KeyboardEvent,
  KeyboardEventHandler,
  MouseEvent,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';

import { BaseItemProps, Droplist } from '@snack-uikit/list';
import { SearchPrivate, SearchPrivateProps } from '@snack-uikit/search-private';

import { PRIVATE_SEARCH_TEST_IDS, SIZE, TEST_IDS } from '../../constants';
import { SearchDecorator } from '../SearchDecorator';
import styles from './styles.module.scss';

export type SearchAutocompleteProps = Omit<SearchPrivateProps, 'onKeyDown'> & {
  /**
   * Элементы выпадающие в Droplist в режиме Autocomplete.
   *
   * На нажатие 'Space', 'Enter' или клике по элементу будет вызываться onSubmit.
   */
  options: BaseItemProps[];
  /** Внешний бордер */
  outline?: boolean;
};

export const SearchAutocomplete = forwardRef<HTMLInputElement, SearchAutocompleteProps>(function SearchAutocomplete(
  {
    size = SIZE.S,
    value,
    onChange,
    placeholder,
    options = [],
    loading,
    outline,
    onSubmit,
    onFocus,
    className,
    ...rest
  },
  ref,
) {
  const scrollRef = useRef<HTMLElement>(null);
  const localRef = useRef<HTMLInputElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  const handleOptionKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>) => {
      if (e.key.length === 1) {
        e.stopPropagation();
        localRef.current?.focus();
        scrollRef.current?.scroll(0, 0);

        return;
      }

      // ignoring special keys (tab, arrows, backspace, etc.)
      if (!['ArrowUp', 'ArrowDown'].includes(e.key)) {
        e.stopPropagation();
      } else {
        e.preventDefault();
      }
    },
    [scrollRef],
  );

  const handleKeyDown = (cb?: KeyboardEventHandler<HTMLInputElement>) => (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ' ') {
      e.stopPropagation();
    }

    if (e.key.length === 1) {
      setIsOpen(true);
    }

    cb?.(e);
  };

  const items: BaseItemProps[] = useMemo(
    () =>
      options.map(({ onClick, ...item }, idx) => ({
        ...item,
        onClick: (e: MouseEvent<HTMLElement>) => {
          // Dirty hack: by default list items call onClick by 'Space' || 'Enter'
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          if (!(e.type === 'keydown' && e?.key === ' ')) {
            onClick?.(e);

            if (item.id) {
              onChange?.(String(item.id));
              onSubmit?.(String(item.id));
            } else if (typeof item.content === 'string') {
              onChange?.(item.content);
              onSubmit?.(item.content);
            }

            setIsOpen(false);
            localRef.current?.focus();
          }
        },
        onKeyDown: handleOptionKeyDown,
        'data-test-id': `${TEST_IDS.option}__${item.id ?? idx}`,
      })),
    [handleOptionKeyDown, onChange, onSubmit, options],
  );

  return (
    <div className={cn(styles.wrap, className)} {...rest}>
      <Droplist
        open={isOpen && options.length > 0}
        scroll
        size={size}
        onOpenChange={setIsOpen}
        data-test-id={TEST_IDS.droplist}
        triggerClassName={styles.triggerClassName}
        scrollRef={scrollRef}
        triggerElemRef={localRef}
        items={items}
        loading={loading}
      >
        {({ onKeyDown }) => (
          <SearchDecorator
            size={size}
            outline={outline || undefined}
            focused={(isOpen && Boolean(localRef.current?.value)) || undefined}
            data-test-id={TEST_IDS.decorator}
          >
            <SearchPrivate
              loading={loading}
              value={value}
              onChange={onChange}
              onSubmit={onSubmit}
              placeholder={placeholder}
              ref={mergeRefs(ref, localRef)}
              onKeyDown={handleKeyDown(onKeyDown)}
              onFocus={onFocus}
              size={size}
              data-test-id={PRIVATE_SEARCH_TEST_IDS.field}
            />
          </SearchDecorator>
        )}
      </Droplist>
    </div>
  );
});
