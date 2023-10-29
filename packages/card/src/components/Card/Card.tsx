import cn from 'classnames';
import { KeyboardEvent, ReactElement, ReactNode, useCallback, useRef } from 'react';

import { Typography } from '@snack-ui/typography';
import { extractSupportProps, WithSupportProps } from '@snack-ui/utils';

import { Size } from '../../constants';
import { CardContext } from '../../context';
import { Check, FunctionBadgeWrapper, PromoBadge } from '../../helperComponents';
import { HeaderProps } from '../Header';
import { BODY_TEXT_SIZE_MAP, TRIGGER_CLICK_KEY_CODES } from './constants';
import styles from './styles.module.scss';

export type CardProps = WithSupportProps<{
  /** Управление состоянием выбран/не выбран. */
  checked?: boolean;
  /** Колбек на клик по карточке */
  onClick?(): void;
  /** Размер */
  size?: Size;
  /** Текст для PromoBadge */
  promoBadge?: string;
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
}>;

export function Card({
  onClick,
  checked,
  size = Size.M,
  children,
  header,
  footer,
  functionBadge,
  promoBadge,
  image,
  className,
  ...rest
}: CardProps) {
  const localRef = useRef<HTMLDivElement>(null);

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.target === localRef.current) {
        if (TRIGGER_CLICK_KEY_CODES.includes(e.code)) {
          onClick?.();
        }
      }
    },
    [onClick],
  );

  return (
    <CardContext.Provider value={{ size }}>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        ref={localRef}
        className={cn(styles.card, className)}
        {...extractSupportProps(rest)}
        onClick={onClick}
        data-checked={checked || undefined}
        data-pointer={onClick ? true : undefined}
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        {image}

        {functionBadge && (
          <FunctionBadgeWrapper className={styles.functionBadgeWrapper}>{functionBadge}</FunctionBadgeWrapper>
        )}

        <div className={styles.composition} tabIndex={-1}>
          <div className={styles.content} data-size={size}>
            {header || null}

            <Typography
              family={Typography.families.Sans}
              size={BODY_TEXT_SIZE_MAP[size]}
              role={Typography.roles.Body}
              className={styles.body}
            >
              {children}
            </Typography>
          </div>

          {footer && <div className={styles.footer}>{footer}</div>}
        </div>

        {promoBadge && <PromoBadge text={promoBadge} />}

        {checked && <Check className={styles.check} />}
      </div>
    </CardContext.Provider>
  );
}

Card.sizes = Size;
