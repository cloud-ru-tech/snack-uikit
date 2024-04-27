import cn from 'classnames';
import { FocusEvent, KeyboardEvent, MouseEvent, ReactNode, RefObject } from 'react';

import { Checkbox, Switch } from '@snack-uikit/toggles';
import { extractSupportProps } from '@snack-uikit/utils';

import { ItemContent } from '../../../helperComponents';
import {
  useCollapseLevelContext,
  useFocusListContext,
  useNewListContext,
  useSelectionContext,
} from '../../Lists/contexts';
import commonStyles from '../styles.module.scss';
import { FlattenBaseItem } from '../types';
import { isContentItem } from '../utils';
import { CHECKBOX_SIZE_MAP } from './constants';
import styles from './styles.module.scss';

type AllBaseItemProps = FlattenBaseItem & {
  expandIcon?: ReactNode;
  open?: boolean;
  indeterminate?: boolean;
  checked?: boolean;
  onSelect?(): void;
  isParentNode?: boolean;
  onOpenNestedList?(e?: KeyboardEvent<HTMLElement>): void;
};

export function BaseItem({
  beforeContent,
  afterContent,
  content,
  onClick,
  onMouseDown,
  id,
  expandIcon,
  disabled,
  open,
  itemRef,
  switch: switchProp,
  onKeyDown,
  onFocus,
  indeterminate,
  checked: checkedProp,
  onSelect,
  onOpenNestedList,
  isParentNode,
  className,
  inactive,
  itemWrapRender,
  ...rest
}: AllBaseItemProps) {
  const interactive = !inactive;

  const { size = 's', marker, contentRender } = useNewListContext();
  const { level = 0 } = useCollapseLevelContext();
  const { forceUpdateActiveItemId } = useFocusListContext();
  const { value, onChange, mode, isSelectionSingle, isSelectionMultiple } = useSelectionContext();

  const isChecked = isSelectionSingle ? value === id : checkedProp ?? value?.includes(id ?? '');

  const handleChange = () => {
    onChange?.(id);
  };

  const handleItemMouseDown = (e: MouseEvent<HTMLElement>) => {
    if (disabled) return;

    if (interactive) {
      if (!isParentNode) {
        handleChange();
      }
    }

    onMouseDown?.(e);

    forceUpdateActiveItemId?.('~drop-focus');
  };

  const handleItemKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    onKeyDown?.(e);

    if (e.key === 'ArrowRight' && onOpenNestedList) {
      onOpenNestedList(e);

      e.preventDefault();
      e.stopPropagation();

      return;
    }

    if (e.code === 'Space' || e.key === 'Enter') {
      if (isSelectionMultiple && isParentNode && onSelect) {
        onSelect();
      }

      !isParentNode && handleChange();
      // TODO: should pass an event here?
      !isParentNode && onClick?.(e as unknown as MouseEvent<HTMLElement>);

      e.stopPropagation();
      e.preventDefault();
    }
  };

  const handleItemFocus = (e: FocusEvent<HTMLElement>) => {
    onFocus?.(e);
    e.stopPropagation();
  };

  const handleCheckboxChange = () => {
    if (isParentNode && onSelect) {
      onSelect();
    } else {
      handleChange();
    }
  };

  const handleItemClick = (e: MouseEvent<HTMLElement>) => {
    if (!disabled) {
      onClick?.(e);
    }
  };

  const handleCheckboxClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

  const props = extractSupportProps(rest);

  const itemJSX = (
    <div
      className={cn(commonStyles.itemWrapper, styles.innerWrapper, className)}
      data-inactive={inactive || undefined}
      data-disabled={disabled || undefined}
      data-variant={mode || undefined}
      data-checked={(isParentNode && (indeterminate || isChecked)) || (isChecked && !switchProp) || undefined}
    >
      <li
        data-type='outside'
        role={'menuitem'}
        data-test-id={props['data-test-id'] || 'list__base-item_' + id}
        data-checked={(isParentNode && (indeterminate || isChecked)) || (isChecked && !switchProp) || undefined}
        ref={itemRef as unknown as RefObject<HTMLLIElement>}
        className={cn(commonStyles.listItem, styles.droplistItem)}
        data-size={size}
        onClick={handleItemClick}
        onMouseDown={handleItemMouseDown}
        tabIndex={-1}
        data-non-pointer={inactive && !onClick}
        data-variant={mode || undefined}
        data-open={open || undefined}
        onKeyDown={handleItemKeyDown}
        onFocus={handleItemFocus}
        style={{ '--level': level }}
      >
        {!switchProp && isSelectionSingle && marker && !isParentNode && interactive && (
          <div className={styles.markerContainer} data-test-id='list__base-item-marker' />
        )}

        {!switchProp && isSelectionMultiple && interactive && (
          <div className={styles.checkbox}>
            <Checkbox
              size={CHECKBOX_SIZE_MAP[size ?? 's']}
              disabled={disabled}
              tabIndex={-1}
              onChange={isParentNode ? handleCheckboxChange : undefined}
              checked={isChecked}
              data-test-id='list__base-item-checkbox'
              onClick={handleCheckboxClick}
              indeterminate={indeterminate}
            />
          </div>
        )}

        {beforeContent && <div className={styles.beforeContent}>{beforeContent}</div>}
        {content && isContentItem(content) ? (
          contentRender?.({ id, content }) ?? <ItemContent disabled={disabled} {...content} />
        ) : (
          <div className={styles.content}> {content} </div>
        )}
        {afterContent}

        {switchProp && interactive && (
          <Switch disabled={disabled} checked={isChecked} data-test-id='list__base-item-switch' />
        )}

        {!switchProp && expandIcon && <span className={styles.expandableIcon}>{expandIcon}</span>}
      </li>
    </div>
  );

  if (!itemWrapRender) {
    return itemJSX;
  }

  return itemWrapRender(itemJSX);
}
