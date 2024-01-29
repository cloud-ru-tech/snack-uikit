import cn from 'classnames';
import { FocusEvent, KeyboardEvent, MouseEvent, useCallback } from 'react';

import { Checkbox, Switch } from '@snack-uikit/toggles';
import { TruncateString } from '@snack-uikit/truncate-string';
import { extractSupportProps } from '@snack-uikit/utils';

import { useCollapseContext, useListContext, useSelectionContext } from '../../Lists/contexts';
import commonStyles from '../styles.module.scss';
import { BaseItemPrivateProps, BaseItemProps, SwitchProps } from '../types';
import { CHECKBOX_SIZE_MAP } from './constants';
import styles from './styles.module.scss';

export function BaseItem({
  beforeContent,
  afterContent,
  content,
  onClick,
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
  ...rest
}: BaseItemProps &
  BaseItemPrivateProps &
  SwitchProps & { indeterminate?: boolean; onSelect?(): void; isParentNode?: boolean }) {
  const { option, caption, description } = content || {};

  const { size, marker } = useListContext();
  const { level = 0 } = useCollapseContext();
  const { value, onChange, selection } = useSelectionContext();

  const isChecked = selection === 'single' ? value === id : value?.includes(id);

  const handleChange = useCallback(() => {
    if (selection === 'single' && isParentNode) {
      return;
    }

    if (isParentNode && onSelect) {
      onSelect();
      return;
    }

    onChange?.(id ?? '');
  }, [id, isParentNode, onChange, onSelect, selection]);

  const handleClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      if (!isParentNode) {
        handleChange?.();
      }

      onClick?.(e);
    },
    [handleChange, isParentNode, onClick],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>) => {
      onKeyDown?.(e);

      if (e.code === 'Space' || e.key === 'Enter') {
        if (selection === 'multiple' && isParentNode && onSelect?.()) {
          onSelect();
        }

        !isParentNode && handleChange();
        // TODO: should pass an event here?
        !isParentNode && onClick?.(e as unknown as MouseEvent<HTMLButtonElement>);

        e.stopPropagation();
        e.preventDefault();
      }
    },
    [handleChange, isParentNode, onClick, onKeyDown, onSelect, selection],
  );

  const props = extractSupportProps(rest);

  return (
    <li role={'menuitem'} data-test-id={props['data-test-id'] || 'list__base-item_' + id}>
      <button
        ref={itemRef}
        className={cn(commonStyles.listItem, styles.droplistItem)}
        data-size={size}
        onClick={handleClick}
        tabIndex={-1}
        data-checked={(isParentNode && (indeterminate || isChecked)) || (isChecked && !switchProp) || undefined}
        data-variant={selection || undefined}
        data-open={open || undefined}
        disabled={disabled}
        onKeyDown={handleKeyDown}
        onFocus={(e: FocusEvent<HTMLButtonElement>) => {
          onFocus?.(e);
          e.stopPropagation();
        }}
        style={{ '--level': level }}
      >
        {!switchProp && selection === 'single' && marker && !isParentNode && (
          <div className={styles.markerContainer} data-test-id='list__base-item-marker' />
        )}
        {!switchProp && selection === 'multiple' && (
          <div className={styles.checkbox}>
            <Checkbox
              size={CHECKBOX_SIZE_MAP[size ?? 's']}
              disabled={disabled}
              tabIndex={-1}
              onChange={() => {
                if (isParentNode && onSelect?.()) {
                  onSelect();
                } else {
                  handleChange();
                }
              }}
              checked={isChecked}
              data-test-id='list__base-item-checkbox'
              onClick={e => {
                e.stopPropagation();
              }}
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

        {switchProp && <Switch disabled={disabled} checked={isChecked} data-test-id='list__base-item-switch' />}
        {!switchProp && expandIcon && <span className={styles.expandableIcon}>{expandIcon}</span>}
      </button>
    </li>
  );
}
