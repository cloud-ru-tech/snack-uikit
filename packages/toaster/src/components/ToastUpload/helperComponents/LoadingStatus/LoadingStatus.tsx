import { CheckFilledSVG, PauseSVG, PlaySVG, UpdateSVG } from '@snack-uikit/icons';

import { ToastUploadStatus, UploadActions } from '../../types';
import { ButtonIcon } from '../ButtonIcon';
import styles from './styles.module.scss';

export type LoadingStatusProps = {
  status: ToastUploadStatus;
  actions: UploadActions;
  isFileItem?: boolean;
};

export function LoadingStatus({ status, actions, isFileItem }: LoadingStatusProps) {
  if (status === 'loading' || (status === 'error' && !isFileItem)) {
    return (
      <ButtonIcon onClick={actions.onPause}>
        <PauseSVG />
      </ButtonIcon>
    );
  }

  if (status === 'pause') {
    return (
      <ButtonIcon onClick={actions.onContinue}>
        <PlaySVG />
      </ButtonIcon>
    );
  }

  if (status === 'uploaded') {
    return <CheckFilledSVG className={styles.successIcon} />;
  }

  return (
    <ButtonIcon onClick={actions.onRetry}>
      <UpdateSVG />
    </ButtonIcon>
  );
}
