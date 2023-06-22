import { useFloatingTree } from '@floating-ui/react';
import cn from 'classnames';
import { forwardRef, MouseEvent, RefObject } from 'react';

import { Avatar } from '@snack-ui/avatar';
import { ChevronRightSSVG } from '@snack-ui/icons';
import { Tag } from '@snack-ui/tag';
import { Checkbox } from '@snack-ui/toggles';
import { TruncateString } from '@snack-ui/truncate-string';
import { extractSupportProps } from '@snack-ui/utils';

import { Size, Variant } from './constants';
import styles from './styles.module.scss';
import { DroplistItemProps } from './types';

const ForwardedDroplistItem = forwardRef<HTMLInputElement | HTMLLabelElement, DroplistItemProps>(
  (
    {
      label,
      size = Size.S,
      variant,
      caption,
      description,
      tagLabel,
      disabled,
      onChange,
      checked,
      onClick,
      icon,
      avatar,
      className,
      tabIndex = 0,
      onKeyDown,
      ...rest
    },
    forwardedRef,
  ) => {
    const showBeforeContent = Boolean(avatar) || Boolean(icon) || undefined;
    const isExpandable = variant === Variant.Expandable;
    const tree = useFloatingTree();

    const handleChange = () => {
      if (isExpandable) {
        return;
      }

      onChange?.(!checked);
    };

    const clickableProps =
      variant === Variant.Expandable
        ? {
            onClick: (e: MouseEvent<HTMLLabelElement>) => {
              onClick?.(e);
              tree?.events.emit('click');
            },
            role: 'button',
          }
        : {};

    return (
      <label
        className={cn(styles.droplistItem, className)}
        {...clickableProps}
        ref={isExpandable ? (forwardedRef as RefObject<HTMLLabelElement>) : undefined}
        {...extractSupportProps(rest)}
      >
        <input
          type='checkbox'
          className={styles.input}
          disabled={disabled}
          tabIndex={disabled ? undefined : tabIndex}
          checked={checked}
          onChange={handleChange}
          ref={!isExpandable ? (forwardedRef as RefObject<HTMLInputElement>) : undefined}
          onKeyDown={onKeyDown}
        />

        <div
          className={styles.container}
          data-size={size}
          data-variant={variant}
          data-before-content={showBeforeContent}
        >
          {variant === Variant.Single && <div className={styles.markerContainer} />}

          {variant === Variant.Multiple && (
            <div className={styles.beforeContent}>
              <Checkbox
                size={Checkbox.sizes.S}
                disabled={disabled}
                tabIndex={-1}
                onChange={onChange}
                checked={checked}
              />
            </div>
          )}

          {showBeforeContent && (
            <div className={styles.beforeContent}>
              {icon && !avatar && icon}

              {avatar && <Avatar size={Avatar.sizes.Xs} {...avatar} />}
            </div>
          )}

          <div className={styles.content}>
            <div className={styles.headline}>
              <span className={styles.label}>
                <TruncateString text={label} maxLines={1} />
              </span>

              {caption && <span className={styles.caption}>{caption}</span>}

              {tagLabel && <Tag label={tagLabel} />}
            </div>

            {description && (
              <div className={styles.description}>
                <TruncateString text={description} maxLines={2} />
              </div>
            )}
          </div>

          {isExpandable && (
            <div className={styles.expandableIcon}>
              <ChevronRightSSVG size={24} />
            </div>
          )}
        </div>
      </label>
    );
  },
);

export const DroplistItem = ForwardedDroplistItem as typeof ForwardedDroplistItem & {
  variants: typeof Variant;
};

DroplistItem.variants = Variant;
