import cn from 'classnames';

import { CrossSVG } from '@snack-uikit/icons';
import { Link } from '@snack-uikit/link';
import { TruncateString } from '@snack-uikit/truncate-string';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { APPEARANCE, APPEARANCE_TO_COLOR_MAP } from '../../constants';
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
  ...rest
}: AlertProps) {
  return (
    <div
      className={cn(styles.alert, className)}
      {...extractSupportProps(rest)}
      data-color={APPEARANCE_TO_COLOR_MAP[appearance]}
    >
      {icon && (
        <div className={styles.icon} data-color={APPEARANCE_TO_COLOR_MAP[appearance]} data-test-id='alert__icon'>
          {getIcon(appearance)}
        </div>
      )}
      <div className={styles.content}>
        <div className={styles.textlayout}>
          {title && <TruncateString text={title} maxLines={1} className={styles.title} data-test-id='alert__title' />}
          <span data-test-id='alert__description' className={styles.description}>
            {description}
          </span>
        </div>

        {link && (
          <span>
            <Link
              href={href}
              text={link}
              onSurface='decor'
              external
              onColor={APPEARANCE_TO_COLOR_MAP[appearance]}
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
  );
}
