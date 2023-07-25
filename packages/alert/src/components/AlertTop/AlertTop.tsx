import { ReactElement } from 'react';

import { CrossSSVG } from '@snack-ui/icons';
import { LinkOnSurfacePrivate } from '@snack-ui/linkonsurface-private';
import { TruncateString } from '@snack-ui/truncate-string';

import { Appearance, APPEARANCE_TO_COLOR_MAP } from '../../constants';
import { AlertTopButton } from '../../helperComponents/AlertTopButton';
import { getIcon } from '../../utils';
import { APPEARANCE_TO_COLOR_MAP_INVERT } from './constants';
import styles from './styles.module.scss';

export type AlertTopProps = {
  icon?: boolean;
  title?: string;
  description: string;
  link?: string;
  href?: string;
  onClose?: () => void;
  appearance?: Appearance;
  buttonText?: string;
  buttonOnClick?: () => void;
  buttonIcon?: ReactElement;
};

export function AlertTop({
  icon = true,
  title,
  description,
  link,
  href,
  onClose,
  appearance = Appearance.Neutral,
  buttonText,
  buttonOnClick,
  buttonIcon,
}: AlertTopProps) {
  return (
    <div data-test-id='alert-top' className={styles.alertTop} data-color={APPEARANCE_TO_COLOR_MAP_INVERT[appearance]}>
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
              <LinkOnSurfacePrivate
                onSurface={LinkOnSurfacePrivate.onSurfaces.Accent}
                href={href}
                text={link}
                external
                onColor={APPEARANCE_TO_COLOR_MAP[appearance]}
                size={LinkOnSurfacePrivate.sizes.M}
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
            <CrossSSVG />
          </button>
        )}
      </div>
    </div>
  );
}

AlertTop.appearances = Appearance;
