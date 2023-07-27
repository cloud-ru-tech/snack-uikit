import { CrossSSVG } from '@snack-ui/icons';
import { Link } from '@snack-ui/link';
import { TruncateString } from '@snack-ui/truncate-string';
import { extractSupportProps } from '@snack-ui/utils';

import { Appearance, APPEARANCE_TO_COLOR_MAP } from '../../constants';
import { getIcon } from '../../utils';
import styles from './styles.module.scss';

export type AlertProps = {
  icon?: boolean;
  title?: string;
  description: string;
  link?: string;
  href?: string;
  onClose?: () => void;
  appearance?: Appearance;
};

export function Alert({
  icon = true,
  title,
  href,
  link,
  description,
  onClose,
  appearance = Appearance.Neutral,
  ...rest
}: AlertProps) {
  return (
    <div
      data-test-id='alert'
      className={styles.alert}
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
          <CrossSSVG />
        </button>
      )}
    </div>
  );
}

Alert.appearances = Appearance;
