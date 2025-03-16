import cn from 'classnames';
import { MouseEvent, useRef } from 'react';

import { CrossSVG } from '@snack-uikit/icons';
import { extractSupportProps } from '@snack-uikit/utils';

import { APPEARANCE, SIZE } from '../../constants';
import { ManageRestrictTooltipProps, TagBaseProps } from '../../types';
import { ICON_SIZE } from './constants';
import styles from './styles.module.scss';

type TagBaseWithTooltip = TagBaseProps & ManageRestrictTooltipProps;
type TagBaseComponentProps = TagBaseProps | TagBaseWithTooltip;

function isTagWithTooltip(props: TagBaseProps): props is TagBaseWithTooltip {
  return 'changeRestrictTooltipState' in props && props.changeRestrictTooltipState !== undefined;
}

export function TagBase(props: TagBaseComponentProps) {
  const { label, size = SIZE.Xs, appearance = APPEARANCE.Neutral, onDelete, className, tabIndex, ...rest } = props;

  const deleteButtonRef = useRef<HTMLButtonElement>(null);

  const isRemovable = Boolean(onDelete);

  const handleMouseEvents = (isEntering: boolean) => {
    if (isRemovable && isTagWithTooltip(props)) {
      const { changeRestrictTooltipState } = props;
      changeRestrictTooltipState(isEntering);
    }
  };

  const handleMouseEnter = (event: MouseEvent<HTMLButtonElement>) => {
    if (deleteButtonRef.current?.contains(event.target as Node)) {
      handleMouseEvents(true);
    }
  };

  const handleMouseLeave = () => {
    handleMouseEvents(false);
  };

  return (
    <span
      {...extractSupportProps(rest)}
      className={cn(styles.tag, className)}
      data-size={size}
      data-appearance={appearance}
      data-removable={isRemovable}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className={styles.label}>{label}</span>
      {isRemovable && (
        <button
          type='button'
          className={styles.tagButton}
          onClick={onDelete}
          data-test-id='tag-remove-button'
          tabIndex={tabIndex}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          ref={deleteButtonRef}
        >
          {size === SIZE.Xs ? (
            <CrossSVG size={ICON_SIZE[size]} className={styles.icon} />
          ) : (
            <CrossSVG size={ICON_SIZE[size]} className={styles.icon} />
          )}
        </button>
      )}
    </span>
  );
}
