import cn from 'classnames';
import { ReactNode } from 'react';

import { CrossSVG } from '@snack-uikit/icons';
import { Link, LinkProps } from '@snack-uikit/link';
import { TruncateString } from '@snack-uikit/truncate-string';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { APPEARANCE, APPEARANCE_TO_COLOR_MAP } from '../../constants';
import { AlertButton, AlertButtonProps } from '../../helperComponents';
import { Appearance } from '../../types';
import { getIcon } from '../../utils';
import { APPEARANCE_TO_COLOR_MAP_INVERT } from './constants';
import styles from './styles.module.scss';

export type AlertTopProps = WithSupportProps<{
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
  link?: Pick<LinkProps, 'text' | 'target' | 'onClick' | 'href' | 'appearance' | 'external'>;
  /** Кнопка дополнительного действия */
  action?: AlertButtonProps;
  /** Колбек закрытия */
  onClose?: () => void;
  /** Внешний вид */
  appearance?: Appearance;
  /** CSS-класс */
  className?: string;
}>;

/**
 * Компонент для отображения уведомления вверху экрана.
 */
export function AlertTop({
  icon = true,
  title,
  description,
  link,
  onClose,
  truncate,
  appearance = APPEARANCE.Neutral,
  action,
  className,
  ...rest
}: AlertTopProps) {
  return (
    <div
      className={cn(styles.alertTop, className)}
      {...extractSupportProps(rest)}
      data-color={APPEARANCE_TO_COLOR_MAP_INVERT[appearance]}
    >
      <div className={styles.contentWrapper}>
        {icon && (
          <div
            className={styles.icon}
            data-color={APPEARANCE_TO_COLOR_MAP_INVERT[appearance]}
            data-test-id='alert-top__icon'
          >
            {getIcon(appearance, 24)}
          </div>
        )}

        <div className={styles.contentLayout}>
          <div className={styles.textLayout}>
            {title && (
              <div
                className={styles.title}
                data-color={APPEARANCE_TO_COLOR_MAP_INVERT[appearance]}
                data-test-id='alert-top__title'
              >
                <TruncateString text={title} maxLines={truncate?.title ?? 1} />
              </div>
            )}

            <span
              className={styles.description}
              data-color={APPEARANCE_TO_COLOR_MAP_INVERT[appearance]}
              data-test-id='alert-top__description'
            >
              {description}
            </span>
          </div>

          {link && (
            <span>
              <Link
                external
                {...link}
                appearance={APPEARANCE_TO_COLOR_MAP[appearance]}
                textMode='on-accent'
                size='m'
                data-test-id='alert-top__link'
              />
            </span>
          )}
        </div>
      </div>
      <div className={styles.actions}>
        {action && <AlertButton {...action} appearance={APPEARANCE_TO_COLOR_MAP_INVERT[appearance]} variant='tonal' />}

        {onClose && (
          <AlertButton
            onClick={onClose}
            appearance={APPEARANCE_TO_COLOR_MAP_INVERT[appearance]}
            icon={<CrossSVG />}
            variant='tonal'
            dataTestId='alert-top__close-button'
          />
        )}
      </div>
    </div>
  );
}
