import { Id, ToastOptions as RtToastOptions } from 'react-toastify';

import { ToasterContainerProps, ToastSystemEventProps, ToastUserActionProps } from './components';

export type ToasterId = Id;
export type PromisedId = Promise<ToasterId>;

export type ToastOptions = {
  id?: ToasterId;
  autoClose?: RtToastOptions['autoClose'];
  onClose?: RtToastOptions['onClose'];
};

export enum ToasterType {
  SystemEvent = 'system-event',
  UserAction = 'user-action',
}

export type ToasterPropsMap = {
  [ToasterType.UserAction]: ToastUserActionProps;
  [ToasterType.SystemEvent]: ToastSystemEventProps;
};

type OpenNotificationProps<T extends keyof ToasterPropsMap> = {
  type: T;
  toasterProps?: ToasterPropsMap[T];
  containerProps?: ToasterContainerProps;
  toastOptions?: ToastOptions;
  toasterParent?: HTMLDivElement;
};

type DefaultToasterProps<T extends keyof ToasterPropsMap> = {
  toasterProps: ToasterPropsMap[T];
};

export type OpenToast = <T extends keyof ToasterPropsMap>(
  props: DefaultToasterProps<T> & OpenNotificationProps<T>,
) => PromisedId;

export type UpdateToast = <T extends keyof ToasterPropsMap>(
  id: string | number,
  props: {
    type: T;
    toasterProps: ToasterPropsMap[T];
    toastOptions?: ToastOptions;
    containerId?: ToasterContainerProps['containerId'];
  },
) => void;

export type UserActionOptions = Omit<ToastUserActionProps, 'appearance'> & Pick<ToastOptions, 'id'>;
export type SystemEventOptions = Omit<ToastSystemEventProps, 'appearance'> & Pick<ToastOptions, 'id'>;

export type Toaster = {
  userAction: {
    success(options: UserActionOptions): PromisedId;
    neutral(options: UserActionOptions): PromisedId;
    warning(options: UserActionOptions): PromisedId;
    error(options: UserActionOptions): PromisedId;
    update: {
      success(id: ToasterId, options: UserActionOptions): void;
      neutral(id: ToasterId, options: UserActionOptions): void;
      warning(id: ToasterId, options: UserActionOptions): void;
      error(id: ToasterId, options: UserActionOptions): void;
    };
    dismiss(id?: ToasterId): void;
  };
  systemEvent: {
    success(options: SystemEventOptions): PromisedId;
    neutral(options: SystemEventOptions): PromisedId;
    warning(options: SystemEventOptions): PromisedId;
    error(options: SystemEventOptions): PromisedId;
    errorCritical(options: SystemEventOptions): PromisedId;
    update: {
      success(id: ToasterId, options: SystemEventOptions): void;
      neutral(id: ToasterId, options: SystemEventOptions): void;
      warning(id: ToasterId, options: SystemEventOptions): void;
      error(id: ToasterId, options: SystemEventOptions): void;
      errorCritical(id: ToasterId, options: SystemEventOptions): void;
    };
    dismiss(id?: ToasterId): void;
  };
};
