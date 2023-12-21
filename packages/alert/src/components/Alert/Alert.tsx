import cn from 'classnames';

import { CrossSVG } from '@snack-uikit/icons';
import { Link } from '@snack-uikit/link';
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
  /** Текст ссылки */
  link?: string;
  /** Ссылка */
  href?: string;
  /** Колбек закрытия */
  onClose?: () => void;
  /** Внешний вид */
  appearance?: Appearance;
  /** CSS-класс */
  className?: string;
  /** Свойства, описывающие кнопки в футере алерта */
  action?: Pick<AlertButtonProps, 'label' | 'onClick' | 'icon'>[];
}>;

/**
 * Компонент для отображения уведомления.
 */
export function Alert({
  icon = true,
  title,
  href,
  link,
  description,
  onClose,
  appearance = APPEARANCE.Neutral,
  className,
  action,
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
                href={href}
                text={link}
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
          <button
            onClick={onClose}
            className={styles.closeButton}
            data-color={APPEARANCE_TO_COLOR_MAP[appearance]}
            data-test-id='alert__close-button'
          >
            <CrossSVG />
          </button>
        )}
      </div>

      {Array.isArray(action) && action.length > 0 && (
        <div className={styles.footer}>
          {action.map(buttonProps => (
            <AlertButton key={buttonProps.label} {...buttonProps} appearance={appearance} />
          ))}
        </div>
      )}
    </div>
  );
}
