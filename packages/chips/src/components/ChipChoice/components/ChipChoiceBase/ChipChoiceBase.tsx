import cn from 'classnames';
import mergeRefs from 'merge-refs';
import { forwardRef, KeyboardEvent, KeyboardEventHandler, MouseEventHandler, ReactNode, useRef, useState } from 'react';

import { Sun, SunProps } from '@snack-uikit/loaders';
import { extractSupportProps } from '@snack-uikit/utils';

import { CHIP_CHOICE_TEST_IDS, SIZE, VARIANT } from '../../../../constants';
import { ButtonClearValue } from '../../../../helperComponents';
import { BUTTON_CLEAR_VALUE_SIZE_MAP } from '../../constants';
import { ChipChoiceCommonProps } from '../../types';
import styles from './styles.module.scss';

export type ChipChoiceBaseProps = Pick<
  ChipChoiceCommonProps,
  'loading' | 'tabIndex' | 'showClearButton' | 'disabled' | 'icon' | 'label' | 'size' | 'onClick' | 'className'
> & {
  /** Отображаемое значение */
  valueToRender?: ReactNode;
  /** Фактическое значение. Используется для отображения кнопки очистки, если свойство <strong>showClearButton=true</strong> */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: any;
  /** Колбек для клика по кнопке очистки */
  onClearButtonClick?: MouseEventHandler<HTMLButtonElement>;
  onKeyDown?(e: KeyboardEvent<HTMLDivElement>): void;
};

export const ChipChoiceBase = forwardRef<HTMLDivElement, ChipChoiceBaseProps>(
  (
    {
      size = SIZE.S,
      disabled,
      loading,
      icon,
      label,
      valueToRender,
      value,
      onClick,
      className,
      tabIndex = 0,
      onClearButtonClick,
      onKeyDown,
      showClearButton: showClearButtonProp = true,
      ...rest
    },
    ref,
  ) => {
    const variant = icon && size !== SIZE.Xs ? VARIANT.IconBefore : VARIANT.LabelOnly;
    const spinnerSize: SunProps['size'] = size === SIZE.Xs ? 'xs' : 's';

    const localRef = useRef<HTMLDivElement>(null);

    const clearButtonRef = useRef<HTMLButtonElement>(null);

    const [isDroplistOpened, setIsDroplistOpened] = useState(false);

    const handleChipClick: MouseEventHandler<HTMLDivElement> = e => {
      if (loading || disabled) return;

      onClick?.(e);

      !isDroplistOpened && setIsDroplistOpened(true);
    };

    const handleChipKeyDown: KeyboardEventHandler<HTMLDivElement> = e => {
      onKeyDown?.(e);

      if (e.key === 'ArrowRight') {
        clearButtonRef.current?.focus();
        e.stopPropagation();
        e.preventDefault();
      }
    };

    const handleClearButtonClick: MouseEventHandler<HTMLButtonElement> = e => {
      onClearButtonClick?.(e);
    };

    const handleClearButtonKeyDown: KeyboardEventHandler<HTMLButtonElement> = e => {
      switch (e.key) {
        case 'ArrowLeft': {
          localRef.current?.focus();

          return;
        }
        case 'Enter':
        case ' ': {
          e.stopPropagation();
          return;
        }
        default:
          break;
      }
    };

    const showClearButton = showClearButtonProp && (value instanceof Date || Boolean(value));

    return (
      <div
        {...extractSupportProps(rest)}
        role='button'
        ref={mergeRefs(localRef, ref)}
        className={cn(styles.choiceChip, className)}
        data-size={size}
        data-variant={variant}
        data-loading={loading || undefined}
        // data-test-id={testId || undefined}
        data-disabled={(!loading && disabled) || undefined}
        onClick={handleChipClick}
        onKeyDown={handleChipKeyDown}
        tabIndex={tabIndex}
      >
        {variant === VARIANT.IconBefore && (
          <span className={styles.icon} data-test-id={CHIP_CHOICE_TEST_IDS.icon}>
            {icon}
          </span>
        )}

        <span className={styles.labelLayout}>
          {label && (
            <span className={styles.label} data-test-id={CHIP_CHOICE_TEST_IDS.label}>
              {label + ': '}
            </span>
          )}

          {loading ? (
            <span className={styles.spinner} data-test-id={CHIP_CHOICE_TEST_IDS.spinner}>
              <Sun size={spinnerSize} />
            </span>
          ) : (
            <span className={styles.value} data-test-id={CHIP_CHOICE_TEST_IDS.value}>
              {valueToRender ?? value}
            </span>
          )}
        </span>

        {!disabled && !loading && showClearButton && (
          <ButtonClearValue
            size={BUTTON_CLEAR_VALUE_SIZE_MAP[size]}
            onClick={handleClearButtonClick}
            data-test-id={CHIP_CHOICE_TEST_IDS.clearButton}
            onKeyDown={handleClearButtonKeyDown}
            ref={clearButtonRef}
          />
        )}
      </div>
    );
  },
);
