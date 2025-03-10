import { useEffect, useState } from 'react';

import { CrossSVG } from '@snack-uikit/icons';
import { Link } from '@snack-uikit/link';
import { ProgressBar } from '@snack-uikit/progress-bar';
import { TruncateString } from '@snack-uikit/truncate-string';

import { TOAST_UPLOAD_TEST_IDS } from '../../../../testIds';
import { progressBarAppearanceByStatus } from '../../constants';
import { UploadItem } from '../../types';
import { formatPercent } from '../../utils';
import { ButtonIcon } from '../ButtonIcon';
import { LoadingStatus } from '../LoadingStatus';
import styles from './styles.module.scss';

export type FileItemProps = { item: UploadItem };

export function FileItem({ item: initItem }: FileItemProps) {
  const [item, setItem] = useState(initItem);

  const showLink = item.status === 'uploaded' && item.link;

  const showCancelButton = !showLink;

  useEffect(() => {
    if (initItem.subscribeToState) {
      initItem.subscribeToState(newValue => setItem(prev => ({ ...prev, ...newValue })));
    }

    return setItem(initItem);
  }, [initItem]);

  const isError = item.status === 'error';

  return (
    <div className={styles.fileLine} data-test-id={TOAST_UPLOAD_TEST_IDS.uploadItem}>
      <div className={styles.fileHeadLine}>
        <TruncateString text={item.title} className={styles.fileTitle} maxLines={1} />

        {showLink && (
          <Link
            text={item.link?.text}
            href={item.link?.href}
            size='s'
            truncateVariant='end'
            onClick={item.link?.onClick}
            appearance='invert-neutral'
            textMode='accent'
            data-test-id={TOAST_UPLOAD_TEST_IDS.uploadItemLink}
          />
        )}

        {showCancelButton && (
          <ButtonIcon onClick={item.actions.onCancel} data-test-id={TOAST_UPLOAD_TEST_IDS.uploadItemCancel}>
            <CrossSVG />
          </ButtonIcon>
        )}
      </div>

      <ProgressBar
        progress={isError ? 100 : item.progress}
        size='xs'
        appearance={progressBarAppearanceByStatus[item.status]}
      />

      <div className={styles.fileStatusLine}>
        <div className={styles.fileStatusWrap}>
          <LoadingStatus status={item.status} actions={item.actions} isFileItem />

          <TruncateString className={styles.fileStatusDescription} data-status={item.status} text={item.statusLabel} />
        </div>

        <span className={styles.fileSize} data-status={item.status}>
          {item.formattedSize}
        </span>

        <span className={styles.fileStatusPercentage} data-status={item.status}>
          {formatPercent(isError ? 0 : item.progress)}
        </span>
      </div>
    </div>
  );
}
