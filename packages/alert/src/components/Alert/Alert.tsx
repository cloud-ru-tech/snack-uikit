import cn from 'classnames';
import { ReactNode } from 'react';

import { CrossSVG } from '@snack-uikit/icons';
import { Link, LinkProps } from '@snack-uikit/link';
import { TruncateString } from '@snack-uikit/truncate-string';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { APPEARANCE, APPEARANCE_TO_COLOR_MAP, APPEARANCE_TO_LINK_COLOR_MAP } from '../../constants';
import { AlertButton, AlertButtonProps } from '../../helperComponents';
import { Appearance, Size } from '../../types';
import { getIcon } from '../../utils';
import styles from './styles.module.scss';

export type AlertProps = WithSupportProps<{
  /** Отображать иконку */
  icon?: boolean;
  /** Заголовок */
  title?: string;
  /**
   *  Максимальное кол-во строк
   * <br> - `title` - в заголовке
   * @default '{ <br>title: 1 }'
   */
  truncate?: {
    title?: number;
  };
  /** Описание */
  description: ReactNode;
  /** Cсылка */
  link?: Pick<LinkProps, 'text' | 'target' | 'onClick' | 'href' | 'appearance'>;
  /** Колбек закрытия */
  onClose?: () => void;
  /** Внешний вид */
  appearance?: Appearance;
  /** Внешний бордер  */
  outline?: boolean;
  /** Размер */
  size?: Size;
  /** CSS-класс */
  className?: string;
  /** Кнопки в футере алерта */
  actions?: {
    primary: Omit<AlertButtonProps, 'appearance'>;
    secondary?: Omit<AlertButtonProps, 'appearance'>;
  };
}>;

/**
 * Компонент для отображения уведомления.
 */
export function Alert({
  icon = true,
  title,
  truncate,
  link,
  description,
  onClose,
  appearance = APPEARANCE.Neutral,
  className,
  actions,
  outline,
  size = 'm',
  ...rest
}: AlertProps) {
  return (
    <div
      className={cn(
        styles.alert,
        {
          [styles.alertOutline]: outline,
        },
        className,
      )}
      {...extractSupportProps(rest)}
      data-color={APPEARANCE_TO_COLOR_MAP[appearance]}
      data-size={size}
    >
      <div className={styles.body} data-size={size}>
        {icon && (
          <div
            className={styles.icon}
            data-color={APPEARANCE_TO_COLOR_MAP[appearance]}
            data-test-id='alert__icon'
            data-size={size}
          >
            {getIcon(appearance, size === 's' ? 16 : 24)}
          </div>
        )}

        <div className={styles.contentLayout}>
          {title && (
            <TruncateString
              text={title}
              maxLines={truncate?.title ?? 1}
              className={styles.title}
              data-test-id='alert__title'
              data-size={size}
            />
          )}

          <span data-test-id='alert__description' className={styles.description} data-size={size}>
            {description}
          </span>

          {link && (
            <span>
              <Link
                {...link}
                appearance={APPEARANCE_TO_LINK_COLOR_MAP[appearance]}
                textMode='default'
                size={size}
                data-test-id='alert__link'
              />
            </span>
          )}
        </div>

        {onClose && (
          <AlertButton
            onClick={onClose}
            appearance={APPEARANCE_TO_COLOR_MAP[appearance]}
            icon={<CrossSVG />}
            variant='simple'
            dataTestId='alert__close-button'
          />
        )}
      </div>

      {actions && (
        <div className={styles.footer} data-size={size}>
          {actions.primary && (
            <AlertButton
              {...actions.primary}
              appearance={APPEARANCE_TO_COLOR_MAP[appearance]}
              variant='simple'
              size={size}
            />
          )}
          {actions?.secondary && (
            <AlertButton
              {...actions.secondary}
              appearance={APPEARANCE_TO_COLOR_MAP[appearance]}
              variant='simple'
              size={size}
            />
          )}
        </div>
      )}
    </div>
  );
}
