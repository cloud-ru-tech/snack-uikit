import { MouseEvent } from 'react';

import { ButtonFunction } from '@snack-uikit/button';
import { DownloadSVG, TrashSVG, UpdateSVG } from '@snack-uikit/icons';

import { useAttachmentContext, useAttachmentFocusActionsContext } from '../../contexts';
import { TEST_IDS } from '../../testIds';
import styles from './styles.module.scss';

type ActionsProps = {
  hideDownload?: boolean;
  hideDelete?: boolean;
  hideRetry?: boolean;
};

const noop = () => {};

export function Actions({ hideDelete, hideDownload, hideRetry }: ActionsProps) {
  const { onDelete, onDownload, file, disabled, onRetry } = useAttachmentContext();
  const { setFocused = noop } = useAttachmentFocusActionsContext();

  const showDownload = onDownload && !hideDownload;
  const showDelete = onDelete && !hideDelete;
  const showRetry = onRetry && !hideRetry;

  const handleFocus = () => {
    setFocused(true);
  };
  const handleBlur = () => {
    setFocused(false);
  };

  const handleRetry = (e: MouseEvent<HTMLButtonElement>) => {
    onRetry?.();
    e.stopPropagation();
  };

  const handleDownload = (e: MouseEvent<HTMLButtonElement>) => {
    onDownload?.(file);
    e.stopPropagation();
  };

  const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
    onDelete?.(file);
    e.stopPropagation();
  };

  if (!showDownload && !showDelete) {
    return null;
  }

  return (
    <div className={styles.actions}>
      {showDownload && (
        <ButtonFunction
          disabled={disabled}
          size='xs'
          icon={<DownloadSVG />}
          onClick={handleDownload}
          onFocus={handleFocus}
          onBlur={handleBlur}
          data-test-id={TEST_IDS.downloadAction}
        />
      )}
      {showRetry && (
        <ButtonFunction
          disabled={disabled}
          size='xs'
          icon={<UpdateSVG />}
          onClick={handleRetry}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={styles.retryAction}
          data-test-id={TEST_IDS.retryAction}
        />
      )}
      {showDelete && (
        <ButtonFunction
          disabled={disabled}
          size='xs'
          icon={<TrashSVG />}
          onClick={handleDelete}
          onFocus={handleFocus}
          onBlur={handleBlur}
          data-test-id={TEST_IDS.deleteAction}
        />
      )}
    </div>
  );
}
