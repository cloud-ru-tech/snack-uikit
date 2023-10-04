import cn from 'classnames';

import { CrossSVG } from '@snack-ui/icons';
import { Link } from '@snack-ui/link';
import { TruncateString } from '@snack-ui/truncate-string';
import { extractSupportProps, WithSupportProps } from '@snack-ui/utils';

import { Appearance, APPEARANCE_TO_COLOR_MAP } from '../../constants';
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
  appearance = Alert.appearances.Neutral,
  className,
  ...rest
}: AlertProps) {
  return (
    <div
      className={cn(styles.alert, className)}
      data-color={APPEARANCE_TO_COLOR_MAP[appearance]}
      {...extractSupportProps(rest)}
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
              onSurface={Link.onSurfaces.Decor}
              external
              onColor={APPEARANCE_TO_COLOR_MAP[appearance]}
              size={Link.sizes.M}
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

Alert.appearances = Appearance;
