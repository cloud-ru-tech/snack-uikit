import { useMergeRefs } from '@floating-ui/react';
import cn from 'classnames';
import {
  FocusEvent,
  FocusEventHandler,
  forwardRef,
  KeyboardEvent,
  KeyboardEventHandler,
  MouseEvent,
  MouseEventHandler,
  PointerEventHandler,
  ReactElement,
  useContext,
  useRef,
} from 'react';

import { Avatar, AvatarProps } from '@snack-ui/avatar';
import { ChevronRightSVG } from '@snack-ui/icons';
import { Tag } from '@snack-ui/tag';
import { Checkbox } from '@snack-ui/toggles';
import { TruncateString } from '@snack-ui/truncate-string';
import { extractSupportProps, WithSupportProps } from '@snack-ui/utils';

import { DroplistContext } from '../../components/Droplist/DroplistContext';
import { Size, Variant } from '../../constants';
import { getDataTestId } from '../utils';
import { useListFocus } from './hooks';
import styles from './styles.module.scss';

export type BaseDroplistItemProps = WithSupportProps<{
  option: string;
  caption?: string;
  description?: string;
  tagLabel?: string;
  size?: Size;
  disabled?: boolean;
  icon?: ReactElement;
  avatar?: Omit<AvatarProps, 'size'>;
  className?: string;
  position?: number;
  variant: Variant;
  checked?: boolean;
  hasChecked?: boolean;
  onClick?(e: MouseEvent<HTMLButtonElement>): void;
  onChange?(checked: boolean): void;
  onKeyDown?: KeyboardEventHandler<HTMLButtonElement>;
  indeterminate?: boolean;
}>;

type InnerProps = {
  open?: boolean;
  hasSublist?: boolean;
  onBlur?: FocusEventHandler<HTMLButtonElement>;
  onFocus?: FocusEventHandler<HTMLButtonElement>;
  onMouseEnter?: MouseEventHandler<HTMLButtonElement>;
  onMouseLeave?: MouseEventHandler<HTMLButtonElement>;
  onPointerEnter?: PointerEventHandler<HTMLButtonElement>;
  onPointerLeave?: PointerEventHandler<HTMLButtonElement>;
  onMouseMove?: MouseEventHandler<HTMLButtonElement>;
  onPointerDown?: PointerEventHandler<HTMLButtonElement>;
};

const CHECKBOX_SIZE_MAP = {
  [Size.S]: Checkbox.sizes.S,
  [Size.M]: Checkbox.sizes.S,
  [Size.L]: Checkbox.sizes.M,
};

const ForwardedBaseDroplistItem = forwardRef<HTMLButtonElement, BaseDroplistItemProps & InnerProps>(
  (
    {
      option,
      size: sizeProp = Size.S,
      variant,
      caption,
      description,
      tagLabel,
      disabled,
      onChange,
      checked,
      hasChecked,
      onClick,
      icon,
      avatar,
      className,
      position = 0,
      hasSublist,
      onBlur: onBlurProp,
      onFocus: onFocusProp,
      onKeyDown: onKeyDownProp,
      onMouseEnter,
      onMouseLeave,
      onPointerEnter,
      onPointerLeave,
      onMouseMove,
      onPointerDown,
      open,
      indeterminate,
      ...rest
    },
    forwardedRef,
  ) => {
    const showBeforeContent = Boolean(avatar) || Boolean(icon) || undefined;
    const ref = useRef<HTMLButtonElement>(null);
    const commonRef = useMergeRefs<HTMLButtonElement>([ref, forwardedRef]);

    const size = useContext(DroplistContext).size || sizeProp;

    const { onBlur, onFocus, tabIndex, firstElementRefCallback, onKeyDown } = useListFocus({ position, ref });

    const dataTestId = rest['data-test-id'];

    const getTestId = (prefix: string) => getDataTestId(prefix, dataTestId);

    const onClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      onChange?.(!checked);
    };

    const onKeyDownHandler = (e: KeyboardEvent<HTMLButtonElement>) => {
      onKeyDown(e);
      onKeyDownProp?.(e);
    };

    const onFocusHandler = (e: FocusEvent<HTMLButtonElement>) => {
      onFocus();
      onFocusProp?.(e);
    };

    const onBlurHandler = (e: FocusEvent<HTMLButtonElement>) => {
      onBlur();
      onBlurProp?.(e);
    };

    const refHandler = (element: HTMLButtonElement | null) => {
      commonRef && commonRef(element);
      if (position === 0) {
        firstElementRefCallback?.(element);
      }
    };

    return (
      <button
        className={cn(styles.droplistItem, className)}
        {...extractSupportProps(rest)}
        onPointerDown={onPointerDown}
        onPointerEnter={onPointerEnter}
        onMouseLeave={onMouseLeave}
        onMouseMove={onMouseMove}
        onMouseEnter={onMouseEnter}
        onPointerLeave={onPointerLeave}
        ref={refHandler}
        onKeyDown={onKeyDownHandler}
        onFocus={onFocusHandler}
        onBlur={onBlurHandler}
        onClick={onClickHandler}
        disabled={disabled}
        tabIndex={disabled ? -1 : tabIndex}
        data-open={open || undefined}
        data-size={size}
        data-variant={variant}
        data-checked={checked || undefined}
        data-has-checked={hasChecked || undefined}
        role='option'
        aria-selected={checked}
        data-has-sublist={hasSublist || undefined}
        data-before-content={showBeforeContent}
      >
        {variant === Variant.Single && <div className={styles.markerContainer} />}

        {variant === Variant.Multiple && (
          <div className={styles.beforeContent}>
            <Checkbox
              size={CHECKBOX_SIZE_MAP[size]}
              disabled={disabled}
              tabIndex={-1}
              onChange={onChange}
              checked={checked}
              indeterminate={indeterminate}
              data-test-id={getTestId('checkbox')}
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
            <span className={styles.option}>
              <TruncateString text={option} maxLines={1} />
            </span>

            {caption && (
              <span data-test-id={getTestId('caption')} className={styles.caption}>
                {caption}
              </span>
            )}

            {tagLabel && <Tag data-test-id={getTestId('tag')} label={tagLabel} />}
          </div>

          {description && (
            <div data-test-id={getTestId('description')} className={styles.description}>
              <TruncateString text={description} maxLines={2} />
            </div>
          )}
        </div>

        {hasSublist && (
          <div className={styles.expandableIcon}>
            <ChevronRightSVG size={24} />
          </div>
        )}
      </button>
    );
  },
);

export const BaseDroplistItem = ForwardedBaseDroplistItem as typeof ForwardedBaseDroplistItem & {
  variants: typeof Variant;
};

BaseDroplistItem.variants = Variant;
