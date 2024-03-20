import cn from 'classnames';

import { CrossSVG } from '@snack-uikit/icons';
import { Link, LinkProps } from '@snack-uikit/link';
import { TruncateString } from '@snack-uikit/truncate-string';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { APPEARANCE, APPEARANCE_TO_COLOR_MAP } from '../../constants';
import { AlertButton, AlertButtonProps } from '../../helperComponents';
import { Appearance } from '../../types';
import { getIcon } from '../../utils';
import styles from './styles.module.scss';

export type AlertProps = WithSupportProps<{
  /** Отображать иконку */
  icon?: boolean;
  /** Заголовок */
  title?: string;
  /** Описание */
  description: string;
  /** Cсылка */
  link?: Pick<LinkProps, 'text' | 'target' | 'onClick' | 'href'>;
  /** Колбек закрытия */
  onClose?: () => void;
  /** Внешний вид */
  appearance?: Appearance;
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
  link,
  description,
  onClose,
  appearance = APPEARANCE.Neutral,
  className,
  actions,
  ...rest
}: AlertProps) {
  return (
    <div
      className={cn(styles.alert, className)}
      {...extractSupportProps(rest)}
      data-color={APPEARANCE_TO_COLOR_MAP[appearance]}
    >
      <div className={styles.body}>
        {icon && (
          <div className={styles.icon} data-color={APPEARANCE_TO_COLOR_MAP[appearance]} data-test-id='alert__icon'>
            {getIcon(appearance)}
          </div>
        )}

        <div className={styles.contentLayout}>
          {title && <TruncateString text={title} maxLines={1} className={styles.title} data-test-id='alert__title' />}

          <span data-test-id='alert__description' className={styles.description}>
            {description}
          </span>

          {link && (
            <span>
              <Link
                {...link}
                textMode='default'
                external
                appearance={APPEARANCE_TO_COLOR_MAP[appearance]}
                size='m'
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
        <div className={styles.footer}>
          {actions.primary && (
            <AlertButton {...actions.primary} appearance={APPEARANCE_TO_COLOR_MAP[appearance]} variant='simple' />
          )}
          {actions?.secondary && (
            <AlertButton {...actions.secondary} appearance={APPEARANCE_TO_COLOR_MAP[appearance]} variant='simple' />
          )}
        </div>
      )}
    </div>
  );
}
