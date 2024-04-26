import cn from 'classnames';
import { MouseEvent, useMemo } from 'react';
import { ToastContentProps as RtToastContentProps } from 'react-toastify';

import { CrossSVG } from '@snack-uikit/icons';
import { Link } from '@snack-uikit/link';
import { TruncateString } from '@snack-uikit/truncate-string';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { AUTO_CLOSE_TIME, TOASTER_TYPE } from '../../constants';
import { ButtonAction, ButtonActionProps } from '../../helperComponents/ButtonAction';
import { TOAST_SYSTEM_EVENT_TEST_IDS } from '../../testIds';
import { APPEARANCE_TO_ON_COLOR_MAP } from './constants';
import styles from './styles.module.scss';
import { ToastSystemEventAppearance } from './types';
import { getIcon } from './utils';

export type ToastSystemEventLink = {
  text: string;
  href: string;
  onClick?(e: MouseEvent<HTMLAnchorElement>): void;
};

export type ToastSystemEventProps = Partial<RtToastContentProps> &
  WithSupportProps<{
    title: string;
    description?: string;
    appearance?: ToastSystemEventAppearance;
    link?: ToastSystemEventLink;
    progressBar?: boolean;
    closable?: boolean;
    className?: string;
    onCloseClick?(e: MouseEvent<HTMLButtonElement>, close?: () => void): void;
    action?: ButtonActionProps[];
    loading?: never;
  }>;

export function ToastSystemEvent({
  appearance = 'neutral',
  onCloseClick,
  progressBar = true,
  closable = true,
  title,
  description,
  link,
  closeToast,
  className,
  action,
  ...rest
}: ToastSystemEventProps) {
  const handleCloseClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onCloseClick ? onCloseClick(e, closeToast) : closeToast?.();
  };

  const icon = useMemo(() => getIcon(appearance), [appearance]);

  return (
    <div className={cn(styles.container, className)} {...extractSupportProps(rest)} data-appearance={appearance}>
      <div className={styles.body}>
        <div className={styles.icon}>{icon}</div>

        <div className={styles.contentLayout}>
          <div>
            <span className={styles.title}>
              <TruncateString text={title} maxLines={2} hideTooltip data-test-id={TOAST_SYSTEM_EVENT_TEST_IDS.title} />
            </span>

            {description && (
              <span className={styles.description}>
                <TruncateString
                  maxLines={4}
                  text={description}
                  hideTooltip
                  data-test-id={TOAST_SYSTEM_EVENT_TEST_IDS.description}
                />
              </span>
            )}
          </div>

          {link && (
            <Link
              text={link.text}
              href={link.href}
              size='m'
              onClick={link.onClick}
              appearance={APPEARANCE_TO_ON_COLOR_MAP[appearance]}
              data-test-id={TOAST_SYSTEM_EVENT_TEST_IDS.link}
              textMode={appearance === 'errorCritical' ? 'on-accent' : 'accent'}
            />
          )}
        </div>

        {closable && (
          <button
            type='button'
            className={styles.buttonClose}
            onClick={handleCloseClick}
            data-test-id={TOAST_SYSTEM_EVENT_TEST_IDS.buttonClose}
            // TODO add translations
            aria-label='close notification'
          >
            <CrossSVG />
          </button>
        )}
      </div>

      {progressBar && (
        <div
          role='progressbar'
          // TODO add translations
          aria-label='progressbar'
          data-test-id={TOAST_SYSTEM_EVENT_TEST_IDS.progressbar}
          className={styles.progress}
          style={{ animationDuration: `${AUTO_CLOSE_TIME[TOASTER_TYPE.SystemEvent]}ms` }}
        />
      )}

      {Array.isArray(action) && action.length > 0 && (
        <div className={styles.footer}>
          {action.map(buttonProps => (
            <ButtonAction key={buttonProps.label} {...buttonProps} critical={appearance === 'errorCritical'} />
          ))}
        </div>
      )}
    </div>
  );
}
