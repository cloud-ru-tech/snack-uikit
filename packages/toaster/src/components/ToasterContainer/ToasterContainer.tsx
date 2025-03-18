import './style.css';

import cn from 'classnames';
import { useEffect, useState } from 'react';
import {
  toast,
  ToastContainer as RtToastContainer,
  ToastContainerProps as RtToastContainerProps,
  ToastItem,
  ToastPosition,
} from 'react-toastify';

import { TOASTER_CONTAINER_PREFIX, TOASTER_TYPE } from '../../constants';
import { TOAST_SYSTEM_EVENT_TEST_IDS } from '../../testIds';
import { ToasterType } from '../../types';
import styles from './styles.module.scss';

export type ToasterContainerProps = {
  position?: ToastPosition;
  limit?: number;
  containerId?: RtToastContainerProps['containerId'];
  displayCloseAllButton?: boolean;
  type?: ToasterType;
};

export function ToasterContainer({
  position = 'bottom-right',
  limit = 5,
  containerId,
  displayCloseAllButton,
  type = TOASTER_TYPE.SystemEvent,
}: ToasterContainerProps) {
  const [notificationCounter, setNotificationCounter] = useState(0);
  const [isCloseAllButtonHidden, setIsCloseAllButtonHidden] = useState(false);
  const closeAll = () => {
    toast.dismiss();
    setIsCloseAllButtonHidden(true);
  };

  useEffect(() => {
    const unsubscribe = toast.onChange(({ status, containerId }: ToastItem) => {
      if (containerId === `${TOASTER_CONTAINER_PREFIX}${TOASTER_TYPE.SystemEvent}`) {
        if (status === 'added') {
          setIsCloseAllButtonHidden(false);
          setNotificationCounter(prev => prev + 1);
        }
        if (status === 'removed') {
          setNotificationCounter(prev => prev - 1);
        }
      }
    });

    return unsubscribe;
  }, []);

  const hasCloseAllButton = displayCloseAllButton && notificationCounter > 2 && !isCloseAllButtonHidden;

  return (
    <>
      <RtToastContainer
        hideProgressBar
        closeOnClick={false}
        autoClose={false}
        closeButton={false}
        draggable={false}
        className={cn('osThemeSnack', styles[position], {
          [styles.containerWithCloseAllButton]: hasCloseAllButton,
          'osThemeSnack__toast-container__system-event': type === TOASTER_TYPE.SystemEvent,
          'osThemeSnack__toast-container__user-action': type === TOASTER_TYPE.UserAction,
          'osThemeSnack__toast-container__upload': type === TOASTER_TYPE.Upload,
        })}
        toastClassName={styles.toaster}
        bodyClassName={styles.toaster}
        position={position}
        limit={limit}
        containerId={containerId}
      />

      {hasCloseAllButton && (
        <div className={cn(styles.buttonCloseColumnWrapper, styles[position])}>
          <button
            type='button'
            className={styles.buttonCloseColumn}
            onClick={closeAll}
            data-test-id={TOAST_SYSTEM_EVENT_TEST_IDS.buttonCloseColumn}
          >
            {/* TODO add translations */}
            Закрыть все
          </button>
        </div>
      )}
    </>
  );
}
