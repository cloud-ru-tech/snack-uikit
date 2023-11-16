import cn from 'classnames';
import { KeyboardEventHandler, MouseEventHandler, ReactNode, useCallback, useRef, useState } from 'react';

import { Droplist } from '@snack-ui/droplist';
import { Sun } from '@snack-ui/loaders';
import { extractSupportProps } from '@snack-ui/utils';

import { CHIP_CHOICE_TEST_IDS, Size, Variant } from '../../../../constants';
import { ButtonClearValue } from '../../../../helperComponents';
import { BUTTON_CLEAR_VALUE_SIZE_MAP, DROPLIST_SIZE_MAP } from '../../constants';
import { ChipChoiceCommonProps } from '../../types';
import styles from './styles.module.scss';

export type ChipChoiceCustomProps = ChipChoiceCommonProps & {
  /** Отображаемое значение */
  valueToRender?: ReactNode;
  /** Фактическое значение. Используется для отображения кнопки очистки, если свойство <strong>showClearButton=true</strong> */
  value?: string | Date | string[] | [Date, Date];
  /** Колбек для клика по кнопке очистки */
  onClearButtonClick?: MouseEventHandler<HTMLButtonElement>;
  /** Контент выпадающего меню
   <br>
   <br> Принимает <strong>ReactNode</strong>
   <br> Или функцию с аргументами:
   <br> <strong>handleDroplistItemKeyDown</strong>: Обработчик нажатия клавиши на элемент выпадающего меню
   <br> <strong>closeDroplist</strong>: Метод для закрытия выпадающего меню
   */
  children?:
    | ReactNode
    | ((props: {
        handleDroplistItemKeyDown: ReturnType<typeof Droplist.useKeyboardNavigation>['handleDroplistItemKeyDown'];
        closeDroplist(): void;
      }) => ReactNode);
};

export function ChipChoiceCustom({
  size = Size.S,
  disabled,
  loading,
  icon,
  label,
  valueToRender,
  value,
  onClick,
  className,
  tabIndex = 0,
  placement = Droplist.placements.BottomStart,
  widthStrategy = Droplist.widthStrategies.Gte,
  onClearButtonClick,
  showClearButton: showClearButtonProp = true,
  children,
  'data-test-id': testId,
  ...rest
}: ChipChoiceCustomProps) {
  const variant = icon && size !== Size.Xs ? Variant.IconBefore : Variant.LabelOnly;
  const spinnerSize = size === Size.Xs ? Sun.sizes.XS : Sun.sizes.S;

  const clearButtonRef = useRef<HTMLButtonElement>(null);

  const [isDroplistOpened, setIsDroplistOpened] = useState(false);

  const {
    firstElementRefCallback,
    triggerElementRef,
    handleDroplistFocusLeave,
    handleTriggerKeyDown,
    handleDroplistItemKeyDown,
  } = Droplist.useKeyboardNavigation<HTMLDivElement>({
    setDroplistOpen: setIsDroplistOpened,
  });

  const handleChipClick: MouseEventHandler<HTMLDivElement> = e => {
    if (loading || disabled) return;

    onClick?.(e);

    !isDroplistOpened && setIsDroplistOpened(true);
  };

  const handleChipKeyDown: KeyboardEventHandler<HTMLDivElement> = e => {
    if (e.key === 'ArrowRight') {
      clearButtonRef.current?.focus();
    }

    handleTriggerKeyDown(e);
  };

  const onOpenChangeHandler = (opened: boolean) => !opened && setIsDroplistOpened(false);

  const closeDroplist = useCallback(() => {
    setIsDroplistOpened(false);

    // TODO: same bug as in FieldDate
    setTimeout(() => {
      triggerElementRef.current?.focus();
    }, 0);
  }, [triggerElementRef]);

  const handleClearButtonClick: MouseEventHandler<HTMLButtonElement> = e => {
    onClearButtonClick?.(e);
    closeDroplist();
  };

  const handleClearButtonKeyDown: KeyboardEventHandler<HTMLButtonElement> = e => {
    switch (e.key) {
      case 'ArrowLeft': {
        triggerElementRef.current?.focus();
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

  const showClearButton = showClearButtonProp && (value instanceof Date || Boolean(value?.length));

  return (
    <Droplist
      trigger={Droplist.triggers.Click}
      open={isDroplistOpened}
      firstElementRefCallback={firstElementRefCallback}
      onOpenChange={onOpenChangeHandler}
      onFocusLeave={handleDroplistFocusLeave}
      triggerClassName={styles.triggerClassName}
      widthStrategy={widthStrategy}
      placement={placement}
      size={DROPLIST_SIZE_MAP[size]}
      data-test-id={CHIP_CHOICE_TEST_IDS.droplist}
      triggerElement={
        <div
          {...extractSupportProps(rest)}
          role='button'
          ref={triggerElementRef}
          className={cn(styles.choiceChip, className)}
          data-size={size}
          data-variant={variant}
          data-loading={loading || undefined}
          data-test-id={testId || undefined}
          data-disabled={(!loading && disabled) || undefined}
          onClick={handleChipClick}
          onKeyDown={handleChipKeyDown}
          tabIndex={tabIndex}
        >
          {variant === Variant.IconBefore && (
            <span className={styles.icon} data-test-id={CHIP_CHOICE_TEST_IDS.icon}>
              {icon}
            </span>
          )}

          <span className={styles.labelLayout}>
            {label && (
              <span className={styles.label} data-test-id={CHIP_CHOICE_TEST_IDS.label}>
                {label}
              </span>
            )}

            {loading ? (
              <span className={styles.spinner} data-test-id={CHIP_CHOICE_TEST_IDS.spinner}>
                <Sun size={spinnerSize} />
              </span>
            ) : (
              <span className={styles.value} data-test-id={CHIP_CHOICE_TEST_IDS.value}>
                {valueToRender}
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
      }
    >
      {typeof children === 'function' ? children({ handleDroplistItemKeyDown, closeDroplist }) : children}
    </Droplist>
  );
}
