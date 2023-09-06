import cn from 'classnames';
import mergeRefs from 'merge-refs';
import { forwardRef, useRef } from 'react';

import { Droplist, ItemSingleProps } from '@snack-ui/droplist';

import { Size, TEST_IDS } from '../../constants';
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

  const { handleKeyDown, handleItemOnClick, handleOnFocusLeave, isOpen, setIsOpen, firstElementRefCallback } =
    useHandlers({
      localRef,
      onChange,
      onSubmit,
    });

  return (
    <div className={cn(styles.wrap, className)} {...rest}>
      <Droplist
        open={Boolean(localRef.current?.value) && isOpen && options.length > 0}
        className={styles.itemList}
        firstElementRefCallback={firstElementRefCallback}
        useScroll
        size={size}
        onFocusLeave={handleOnFocusLeave}
        onOpenChange={setIsOpen}
        data-test-id={TEST_IDS.droplist}
        triggerClassName={styles.trigger}
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
            data-test-id={TEST_IDS.option}
          />
        ))}
      </Droplist>
    </div>
  );
});
