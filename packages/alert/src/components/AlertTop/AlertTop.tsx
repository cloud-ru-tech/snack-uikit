import cn from 'classnames';
import { ReactElement } from 'react';

import { CrossSVG } from '@snack-uikit/icons';
import { Link } from '@snack-uikit/link';
import { TruncateString } from '@snack-uikit/truncate-string';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { APPEARANCE, APPEARANCE_TO_COLOR_MAP } from '../../constants';
import { AlertTopButton } from '../../helperComponents';
import { Appearance } from '../../types';
import { getIcon } from '../../utils';
import { APPEARANCE_TO_COLOR_MAP_INVERT } from './constants';
import styles from './styles.module.scss';

export type AlertTopProps = WithSupportProps<{
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
  /** Текст кнопки */
  buttonText?: string;
  /** Колбек клика по кнопке */
  buttonOnClick?: () => void;
  /** Иконка в кнопке */
  buttonIcon?: ReactElement;
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
  href,
  onClose,
  appearance = APPEARANCE.Neutral,
  buttonText,
  buttonOnClick,
  buttonIcon,
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
            {getIcon(appearance)}
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
                <TruncateString text={title} maxLines={1} />
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
                textMode='on-accent'
                href={href}
                text={link}
                external
                appearance={APPEARANCE_TO_COLOR_MAP[appearance]}
                size='m'
                data-test-id='alert-top__link'
              />
            </span>
          )}
        </div>
      </div>
      <div className={styles.actions}>
        {buttonText && (
          <AlertTopButton
            buttonIcon={buttonIcon}
            buttonOnClick={buttonOnClick}
            buttonText={buttonText}
            appearance={appearance}
          />
        )}

        {onClose && (
          <button
            onClick={onClose}
            className={styles.closeButton}
            data-color={APPEARANCE_TO_COLOR_MAP_INVERT[appearance]}
            data-test-id='alert-top__close-button'
          >
            <CrossSVG />
          </button>
        )}
      </div>
    </div>
  );
}
