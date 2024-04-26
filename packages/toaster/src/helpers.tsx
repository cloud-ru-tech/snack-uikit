// eslint-disable-next-line react/no-deprecated
import { render } from 'react-dom';
import { Id, toast, ToastOptions as RtToastOptions } from 'react-toastify';

import {
  ToasterContainer,
  ToasterContainerProps,
  ToastSystemEvent,
  ToastSystemEventProps,
  ToastUserAction,
  ToastUserActionProps,
} from './components';
import {
  AUTO_CLOSE_TIME,
  TOASTER_CONTAINER_DEFAULT_PROPS,
  TOASTER_CONTAINER_PREFIX,
  TOASTER_ROOT_ID,
  TOASTER_TYPE,
} from './constants';
import {
  OpenToast,
  SystemEventOptions,
  Toaster,
  ToasterId,
  ToasterPropsMap,
  ToasterType,
  ToastOptions,
  UpdateToast,
  UserActionOptions,
} from './types';

function getToasterContainer({
  type,
  toasterParent,
  containerProps,
}: {
  type: ToasterType;
  toasterParent: HTMLElement;
  containerProps?: ToasterContainerProps;
}) {
  const containerId = containerProps?.containerId || `${TOASTER_CONTAINER_PREFIX}${type}`;

  const toasterContainerProps = {
    ...TOASTER_CONTAINER_DEFAULT_PROPS[type],
    ...(containerProps || {}),
    containerId,
  };

  const toasterRootId = `${TOASTER_ROOT_ID}__${type}`;

  let rootInDOM = toasterParent.querySelector(`#${toasterRootId}`);

  if (!rootInDOM) {
    rootInDOM = document.createElement('div');
    rootInDOM.id = toasterRootId;
    toasterParent.appendChild(rootInDOM);
  }

  return {
    toasterContainer: rootInDOM,
    toasterContainerProps,
  };
}

function getToastOptions<T extends keyof ToasterPropsMap>({
  type,
  toastOptions,
  containerId,
  toasterProps,
}: {
  type: T;
  toasterProps?: ToasterPropsMap[T];
  toastOptions?: ToastOptions;
  containerId?: ToasterContainerProps['containerId'];
}): RtToastOptions {
  return {
    toastId: toastOptions?.id,
    onClose: ((data: { id: ToasterId }) => {
      toasterProps?.onClose?.(data?.id);
    }) as RtToastOptions['onClose'],
    autoClose: toasterProps?.loading ? false : AUTO_CLOSE_TIME[type],
    containerId: containerId || `${TOASTER_CONTAINER_PREFIX}${type}`,
  };
}

function getToastComponent<T extends keyof ToasterPropsMap>({
  type,
  toasterProps,
}: {
  type: T;
  toasterProps: ToasterPropsMap[T];
}) {
  switch (type) {
    case TOASTER_TYPE.UserAction:
      return <ToastUserAction {...(toasterProps as ToastUserActionProps)} />;
    case TOASTER_TYPE.SystemEvent:
      return <ToastSystemEvent {...(toasterProps as ToastSystemEventProps)} />;
    default:
      return undefined;
  }
}

export const openToast: OpenToast = ({
  type,
  toasterProps,
  containerProps,
  toastOptions,
  toasterParent = document.body,
}) => {
  const { toasterContainer, toasterContainerProps } = getToasterContainer({
    type,
    toasterParent,
    containerProps,
  });

  const options = getToastOptions({
    type,
    toasterProps,
    toastOptions,
    containerId: toasterContainerProps.containerId,
  });

  const toasterComponent = getToastComponent({
    type,
    toasterProps,
  });

  return new Promise(resolve => {
    render(<ToasterContainer {...toasterContainerProps} />, toasterContainer, () => {
      setTimeout(() => {
        resolve(toast(toasterComponent, options));
      }, 0);
    });
  });
};

export const updateToast: UpdateToast = (id, { type, toasterProps, toastOptions, containerId }) => {
  const options = getToastOptions({ type, toasterProps, toastOptions, containerId });

  const toastComponent = getToastComponent({
    type,
    toasterProps,
  });

  return toast.update(id, {
    ...options,
    render: toastComponent,
  });
};

export const dismissToast = (params?: Id) => toast.dismiss(params);
export const isToastActive = toast.isActive;

const userAction = {
  success(options: UserActionOptions) {
    return openToast({
      type: TOASTER_TYPE.UserAction,
      toasterProps: { ...options, appearance: 'success' },
      toastOptions: {
        id: options.id,
      },
    });
  },

  neutral(options: UserActionOptions) {
    return openToast({
      type: TOASTER_TYPE.UserAction,
      toasterProps: { ...options, appearance: 'neutral' },
      toastOptions: {
        id: options.id,
      },
    });
  },

  error(options: UserActionOptions) {
    return openToast({
      type: TOASTER_TYPE.UserAction,
      toasterProps: { ...options, appearance: 'error' },
      toastOptions: {
        id: options.id,
      },
    });
  },

  warning(options: UserActionOptions) {
    return openToast({
      type: TOASTER_TYPE.UserAction,
      toasterProps: { ...options, appearance: 'warning' },
      toastOptions: {
        id: options.id,
      },
    });
  },

  update: {
    success(id: ToasterId, options: UserActionOptions) {
      updateToast(id, {
        type: TOASTER_TYPE.UserAction,
        toasterProps: { ...options, appearance: 'success' },
      });
    },

    neutral(id: ToasterId, options: UserActionOptions) {
      updateToast(id, {
        type: TOASTER_TYPE.UserAction,
        toasterProps: { ...options, appearance: 'neutral' },
      });
    },

    warning(id: ToasterId, options: UserActionOptions) {
      updateToast(id, {
        type: TOASTER_TYPE.UserAction,
        toasterProps: { ...options, appearance: 'warning' },
      });
    },

    error(id: ToasterId, options: UserActionOptions) {
      updateToast(id, {
        type: TOASTER_TYPE.UserAction,
        toasterProps: { ...options, appearance: 'error' },
      });
    },
  },

  dismiss(id?: ToasterId) {
    return toast.dismiss(id);
  },
};

const systemEvent = {
  success(options: SystemEventOptions) {
    return openToast({
      type: TOASTER_TYPE.SystemEvent,
      toasterProps: { ...options, appearance: 'success' },
      toastOptions: {
        id: options.id,
      },
    });
  },

  neutral(options: SystemEventOptions) {
    return openToast({
      type: TOASTER_TYPE.SystemEvent,
      toasterProps: { ...options, appearance: 'neutral' },
      toastOptions: {
        id: options.id,
      },
    });
  },

  warning(options: SystemEventOptions) {
    return openToast({
      type: TOASTER_TYPE.SystemEvent,
      toasterProps: { ...options, appearance: 'warning' },
      toastOptions: {
        id: options.id,
      },
    });
  },

  error(options: SystemEventOptions) {
    return openToast({
      type: TOASTER_TYPE.SystemEvent,
      toasterProps: { ...options, appearance: 'error' },
      toastOptions: {
        id: options.id,
      },
    });
  },

  errorCritical(options: SystemEventOptions) {
    return openToast({
      type: TOASTER_TYPE.SystemEvent,
      toasterProps: { ...options, appearance: 'errorCritical' },
      toastOptions: {
        id: options.id,
      },
    });
  },

  update: {
    success(id: ToasterId, options: SystemEventOptions) {
      return updateToast(id, {
        type: TOASTER_TYPE.SystemEvent,
        toasterProps: { ...options, appearance: 'success' },
      });
    },

    neutral(id: ToasterId, options: SystemEventOptions) {
      return updateToast(id, {
        type: TOASTER_TYPE.SystemEvent,
        toasterProps: { ...options, appearance: 'neutral' },
      });
    },

    warning(id: ToasterId, options: SystemEventOptions) {
      return updateToast(id, {
        type: TOASTER_TYPE.SystemEvent,
        toasterProps: { ...options, appearance: 'warning' },
      });
    },

    error(id: ToasterId, options: SystemEventOptions) {
      return updateToast(id, {
        type: TOASTER_TYPE.SystemEvent,
        toasterProps: { ...options, appearance: 'error' },
      });
    },

    errorCritical(id: ToasterId, options: SystemEventOptions) {
      return updateToast(id, {
        type: TOASTER_TYPE.SystemEvent,
        toasterProps: { ...options, appearance: 'errorCritical' },
      });
    },
  },

  dismiss(id?: ToasterId) {
    return toast.dismiss(id);
  },
};

export const toaster: Toaster = {
  userAction,
  systemEvent,
};
