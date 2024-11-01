import cn from 'classnames';
import mergeRefs from 'merge-refs';
import {
  forwardRef,
  KeyboardEvent,
  KeyboardEventHandler,
  MouseEvent,
  ReactElement,
  ReactNode,
  useCallback,
  useRef,
} from 'react';

import { PromoTagProps } from '@snack-uikit/promo-tag';
import { Typography } from '@snack-uikit/typography';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { SIZE, TEST_IDS } from '../../constants';
import { CardContext } from '../../context';
import { Check, FunctionBadgeWrapper, PromoBadge } from '../../helperComponents';
import { Size } from '../../types';
import { HeaderProps } from '../Header';
import { TRIGGER_CLICK_KEY_CODES } from './constants';
import styles from './styles.module.scss';

export type CardProps = WithSupportProps<{
  /** Управление состоянием интерактивности */
  disabled?: boolean;
  /** Управление состоянием выбран/не выбран */
  checked?: boolean;
  /** Управление состоянием наличия обводки */
  outline?: boolean;
  /** Отображение галочки для режима массового выделения карточек */
  multipleSelection?: boolean;
  /** Колбек на клик по карточке */
  onClick?(e: MouseEvent<HTMLDivElement | HTMLAnchorElement>): void;
  /** Размер */
  size?: Size;
  /** PromoBadge */
  promoBadge?: Pick<PromoTagProps, 'text' | 'appearance'> | string;
  /** Вложенный контент  */
  children?: ReactNode;
  /** Вложенный Header */
  header?: ReactElement<HeaderProps>;
  /** Вложенный Footer */
  footer?: ReactNode;
  /** Вложенный Image */
  image?: ReactNode;
  /** Вложенный FunctionBadge */
  functionBadge?: ReactNode;
  /** CSS-класс для элемента с контентом */
  className?: string;
  /** Ссылка карточки */
  href?: string;
  /** Колбек нажатия клавиши клавиатуры */
  onKeyDown?: KeyboardEventHandler<HTMLDivElement>;
}>;

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      onClick,
      disabled = false,
      checked,
      outline,
      multipleSelection = false,
      size = SIZE.M,
      children,
      header,
      footer,
      functionBadge,
      promoBadge,
      image,
      className,
      href,
      onKeyDown: onKeyDownProp,
      ...rest
    },
    ref,
  ) => {
    const localDivRef = useRef<HTMLDivElement>(null);
    const localAnchorRef = useRef<HTMLAnchorElement>(null);

    const onKeyDown = useCallback(
      (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.target === localDivRef.current) {
          if (TRIGGER_CLICK_KEY_CODES.includes(e.code) || e.key === ' ') {
            href ? localAnchorRef.current?.click() : localDivRef.current?.click();
          }

          onKeyDownProp?.(e);
        }
      },
      [href, onKeyDownProp],
    );

    const supportProps = extractSupportProps(rest);

    return (
      <CardContext.Provider value={{ size, disabled }}>
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
        <div
          ref={mergeRefs(ref, localDivRef)}
          className={cn(styles.card, className)}
          {...supportProps}
          onClick={onClick}
          data-disabled={disabled || undefined}
          data-checked={checked || undefined}
          data-outline={outline || undefined}
          data-pointer={onClick ? true : undefined}
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
          tabIndex={0}
          onKeyDown={onKeyDown}
        >
          {image}

          <div className={styles.composition} tabIndex={-1}>
            {href && (
              <a
                ref={localAnchorRef}
                data-test-id={TEST_IDS.anchor}
                tabIndex={-1}
                href={href}
                className={styles.anchor}
                aria-label={supportProps['aria-label'] as string}
              />
            )}

            {!disabled && functionBadge && (
              <FunctionBadgeWrapper className={styles.functionBadgeWrapper}>{functionBadge}</FunctionBadgeWrapper>
            )}

            <div className={styles.contentWrapper}>
              <div className={styles.content} data-size={size}>
                {header || null}

                {children && (
                  <Typography family='sans' size={size} purpose='body' className={styles.body} tag='div'>
                    {children}
                  </Typography>
                )}

                {footer && <div className={styles.footer}>{footer}</div>}
              </div>
            </div>

            {promoBadge && <PromoBadge {...(typeof promoBadge === 'string' ? { text: promoBadge } : promoBadge)} />}
          </div>

          {checked && multipleSelection && <Check className={styles.check} />}
        </div>
      </CardContext.Provider>
    );
  },
);
