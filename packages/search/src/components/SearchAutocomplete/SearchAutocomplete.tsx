import cn from 'classnames';
import mergeRefs from 'merge-refs';
import { forwardRef, KeyboardEvent, useCallback, useRef, useState } from 'react';

import { Droplist, ItemSingleProps } from '@snack-uikit/droplist';

import { PRIVATE_SEARCH_TEST_IDS, SIZE, TEST_IDS } from '../../constants';
import { SearchDecorator } from '../SearchDecorator';
import { SearchPrivate, SearchPrivateProps } from '../SearchPrivate';
import styles from './styles.module.scss';

export type SearchAutocompleteProps = Omit<SearchPrivateProps, 'onKeyDown'> & {
  /**
   * Элементы выпадающие в Droplist в режиме Autocomplete.
   *
   * На нажатие 'Space', 'Enter' или клике по элементу будет вызываться onSubmit.
   */
  options: Pick<ItemSingleProps, 'option' | 'description' | 'tagLabel' | 'icon' | 'caption' | 'avatar'>[];
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

  const [isOpen, setIsOpen] = useState(false);

  const {
    firstElementRefCallback,
    handleDroplistFocusLeave,
    handleDroplistItemClick,
    handleTriggerKeyDown,
    handleDroplistItemKeyDown,
    triggerElementRef,
  } = Droplist.useKeyboardNavigation<HTMLInputElement>({
    setDroplistOpen: setIsOpen,
    triggerType: 'input',
  });

  const handleOptionKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>) => {
      event.stopPropagation();

      // ignoring special keys (tab, arrows, backspace, etc.)
      if (event.key.length === 1) {
        triggerElementRef.current?.focus();
        scrollRef.current?.scroll(0, 0);
      }
    },
    [triggerElementRef, scrollRef],
  );

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    handleTriggerKeyDown(e);

    if (e.key.length === 1) {
      setIsOpen(true);
    }
  };

  return (
    <div className={cn(styles.wrap, className)} {...rest}>
      <Droplist
        open={Boolean(triggerElementRef.current?.value) && isOpen && options.length > 0}
        firstElementRefCallback={firstElementRefCallback}
        useScroll
        size={size}
        onFocusLeave={handleDroplistFocusLeave}
        onOpenChange={setIsOpen}
        data-test-id={TEST_IDS.droplist}
        triggerClassName={styles.triggerClassName}
        scrollRef={scrollRef}
        triggerRef={triggerElementRef}
        triggerElement={
          <SearchDecorator
            size={size}
            outline={outline || undefined}
            focused={(isOpen && Boolean(triggerElementRef.current?.value)) || undefined}
            data-test-id={TEST_IDS.decorator}
          >
            <SearchPrivate
              loading={loading}
              value={value}
              onChange={onChange}
              onSubmit={onSubmit}
              placeholder={placeholder}
              ref={mergeRefs(ref, triggerElementRef)}
              onKeyDown={onKeyDown}
              onFocus={onFocus}
              size={size}
              data-test-id={PRIVATE_SEARCH_TEST_IDS.field}
            />
          </SearchDecorator>
        }
      >
        {options.map(item => (
          <Droplist.ItemSingle
            {...item}
            key={item.option}
            onClick={e => {
              handleDroplistItemClick(e);
              onChange?.(item.option);
              onSubmit?.(item.option);
              triggerElementRef.current?.blur();
            }}
            onKeyDown={e => handleDroplistItemKeyDown(e, handleOptionKeyDown)}
            data-test-id={TEST_IDS.option}
          />
        ))}
      </Droplist>
    </div>
  );
});
