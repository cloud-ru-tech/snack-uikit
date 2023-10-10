import cn from 'classnames';
import mergeRefs from 'merge-refs';
import { forwardRef, useRef } from 'react';

import { Droplist, ItemSingleProps, useGetDropdownOffset } from '@snack-ui/droplist';

import { PRIVATE_SEARCH_TEST_IDS, Size, TEST_IDS } from '../../constants';
import { SearchDecorator } from '../SearchDecorator';
import { SearchPrivate, SearchPrivateProps } from '../SearchPrivate';
import { useHandlers } from './hooks';
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
    size = Size.S,
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
  const localRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLElement>(null);

  const triggerRef = useRef<HTMLElement>(null);
  const dropdownOffset = useGetDropdownOffset(triggerRef);

  const {
    handleKeyDown,
    handleOptionKeyDown,
    handleItemOnClick,
    handleOnFocusLeave,
    isOpen,
    setIsOpen,
    firstElementRefCallback,
  } = useHandlers({
    localRef,
    onChange,
    onSubmit,
    scrollRef,
  });

  return (
    <div className={cn(styles.wrap, className)} {...rest}>
      <Droplist
        open={Boolean(localRef.current?.value) && isOpen && options.length > 0}
        firstElementRefCallback={firstElementRefCallback}
        useScroll
        size={size}
        onFocusLeave={handleOnFocusLeave}
        onOpenChange={setIsOpen}
        data-test-id={TEST_IDS.droplist}
        triggerClassName={styles.trigger}
        triggerRef={triggerRef}
        offset={dropdownOffset}
        scrollRef={scrollRef}
        triggerElement={
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
              onKeyDown={handleKeyDown}
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
            onClick={() => {
              handleItemOnClick(item.option);
            }}
            onKeyDown={handleOptionKeyDown}
            data-test-id={TEST_IDS.option}
          />
        ))}
      </Droplist>
    </div>
  );
});
