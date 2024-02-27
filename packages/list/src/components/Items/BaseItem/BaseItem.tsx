import cn from 'classnames';
import { FocusEvent, KeyboardEvent, MouseEvent, RefObject } from 'react';

import { Checkbox, Switch } from '@snack-uikit/toggles';
import { TruncateString } from '@snack-uikit/truncate-string';
import { extractSupportProps } from '@snack-uikit/utils';

import { useCollapseContext, useListContext, useParentListContext, useSelectionContext } from '../../Lists/contexts';
import commonStyles from '../styles.module.scss';
import { BaseItemPrivateProps, BaseItemProps } from '../types';
import { CHECKBOX_SIZE_MAP } from './constants';
import styles from './styles.module.scss';

type AllBaseItemProps = BaseItemProps &
  BaseItemPrivateProps & { indeterminate?: boolean; onSelect?(): void; isParentNode?: boolean };

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
  onSelect,
  isParentNode,
  className,
  inactive,
  itemWrapRender,
  ...rest
}: AllBaseItemProps) {
  const { option, caption, description } = content || {};
  const interactive = !inactive;

  const { parentResetActiveFocusIndex } = useParentListContext();
  const { size, marker, parent } = useListContext();
  const { level = 0 } = useCollapseContext();
  const { value, onChange, mode, isSelectionSingle, isSelectionMultiple } = useSelectionContext();

  const isChecked = isSelectionSingle ? value === id : value?.includes(id);

  const handleChange = () => {
    onChange?.(id ?? '');
  };

  const handleItemClick = (e: MouseEvent<HTMLElement>) => {
    if (disabled) return;

    if (interactive) {
      parentResetActiveFocusIndex?.();

      if (!isParentNode) {
        handleChange();
      }
    }

    onClick?.(e);
  };

  const handleItemKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    onKeyDown?.(e);

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

  const handleCheckboxClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

  const props = extractSupportProps(rest);

  const item = (
    <li
      role={'menuitem'}
      data-test-id={props['data-test-id'] || 'list__base-item_' + id}
      ref={itemRef as unknown as RefObject<HTMLLIElement>}
      className={cn(commonStyles.listItem, styles.droplistItem, className)}
      data-size={size}
      onClick={handleItemClick}
      onMouseDown={onMouseDown}
      tabIndex={-1}
      data-non-pointer={inactive && !onClick}
      data-inactive={inactive || undefined}
      data-checked={(isParentNode && (indeterminate || isChecked)) || (isChecked && !switchProp) || undefined}
      data-variant={mode || undefined}
      data-open={open || undefined}
      data-disabled={disabled || undefined}
      aria-disabled={disabled || undefined}
      data-parent={parent || 'list'}
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
            onChange={handleCheckboxChange}
            checked={isChecked}
            data-test-id='list__base-item-checkbox'
            onClick={handleCheckboxClick}
            indeterminate={indeterminate}
          />
        </div>
      )}

      {beforeContent && <div className={styles.beforeContent}>{beforeContent}</div>}

      <div className={styles.content}>
        <div className={styles.headline}>
          <span className={styles.option}>
            <TruncateString text={option} maxLines={1} />
          </span>
          {caption && <span className={styles.caption}>{caption}</span>}
        </div>

        {description && (
          <div className={styles.description}>
            <TruncateString text={description} maxLines={2} />
          </div>
        )}
      </div>

      {afterContent}

      {switchProp && interactive && (
        <Switch disabled={disabled} checked={isChecked} data-test-id='list__base-item-switch' />
      )}
      {!switchProp && expandIcon && <span className={styles.expandableIcon}>{expandIcon}</span>}
    </li>
  );

  if (!itemWrapRender) {
    return item;
  }

  return itemWrapRender(item);
}
