import { render } from 'react-dom';
import { toast, ToastOptions as RtToastOptions } from 'react-toastify';

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
} from './constants';
import {
  OpenToast,
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
}: {
  type: T;
  toasterProps?: ToasterPropsMap[T];
  toastOptions?: ToastOptions;
  containerId?: ToasterContainerProps['containerId'];
}): RtToastOptions {
  return {
    toastId: toastOptions?.id,
    autoClose: AUTO_CLOSE_TIME[type],
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
    case ToasterType.UserAction:
      return <ToastUserAction {...(toasterProps as ToastUserActionProps)} />;
    case ToasterType.SystemEvent:
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

export const dismissToast = toast.dismiss;
export const isToastActive = toast.isActive;

const userAction = {
  success(options: UserActionOptions) {
    return openToast({
      type: ToasterType.UserAction,
      toasterProps: { ...options, appearance: ToastUserAction.appearances.Success },
    });
  },

  neutral(options: UserActionOptions) {
    return openToast({
      type: ToasterType.UserAction,
      toasterProps: { ...options, appearance: ToastUserAction.appearances.Neutral },
    });
  },

  error(options: UserActionOptions) {
    return openToast({
      type: ToasterType.UserAction,
      toasterProps: { ...options, appearance: ToastUserAction.appearances.Error },
    });
  },

  warning(options: UserActionOptions) {
    return openToast({
      type: ToasterType.UserAction,
      toasterProps: { ...options, appearance: ToastUserAction.appearances.Warning },
    });
  },

  update: {
    success(id: ToasterId, options: UserActionOptions) {
      updateToast(id, {
        type: ToasterType.UserAction,
        toasterProps: { ...options, appearance: ToastUserAction.appearances.Success },
      });
    },

    neutral(id: ToasterId, options: UserActionOptions) {
      updateToast(id, {
        type: ToasterType.UserAction,
        toasterProps: { ...options, appearance: ToastUserAction.appearances.Neutral },
      });
    },

    warning(id: ToasterId, options: UserActionOptions) {
      updateToast(id, {
        type: ToasterType.UserAction,
        toasterProps: { ...options, appearance: ToastUserAction.appearances.Warning },
      });
    },

    error(id: ToasterId, options: UserActionOptions) {
      updateToast(id, {
        type: ToasterType.UserAction,
        toasterProps: { ...options, appearance: ToastUserAction.appearances.Error },
      });
    },
  },

  dismiss(id?: ToasterId) {
    return toast.dismiss(id);
  },
};

const systemEvent = {
  success(options: ToastSystemEventProps) {
    return openToast({
      type: ToasterType.SystemEvent,
      toasterProps: { ...options, appearance: ToastSystemEvent.appearances.Success },
    });
  },

  neutral(options: ToastSystemEventProps) {
    return openToast({
      type: ToasterType.SystemEvent,
      toasterProps: { ...options, appearance: ToastSystemEvent.appearances.Neutral },
    });
  },

  warning(options: ToastSystemEventProps) {
    return openToast({
      type: ToasterType.SystemEvent,
      toasterProps: { ...options, appearance: ToastSystemEvent.appearances.Warning },
    });
  },

  error(options: ToastSystemEventProps) {
    return openToast({
      type: ToasterType.SystemEvent,
      toasterProps: { ...options, appearance: ToastSystemEvent.appearances.Error },
    });
  },

  errorCritical(options: ToastSystemEventProps) {
    return openToast({
      type: ToasterType.SystemEvent,
      toasterProps: { ...options, appearance: ToastSystemEvent.appearances.ErrorCritical },
    });
  },

  update: {
    success(id: ToasterId, options: ToastSystemEventProps) {
      return updateToast(id, {
        type: ToasterType.SystemEvent,
        toasterProps: { ...options, appearance: ToastSystemEvent.appearances.Success },
      });
    },

    neutral(id: ToasterId, options: ToastSystemEventProps) {
      return updateToast(id, {
        type: ToasterType.SystemEvent,
        toasterProps: { ...options, appearance: ToastSystemEvent.appearances.Neutral },
      });
    },

    warning(id: ToasterId, options: ToastSystemEventProps) {
      return updateToast(id, {
        type: ToasterType.SystemEvent,
        toasterProps: { ...options, appearance: ToastSystemEvent.appearances.Warning },
      });
    },

    error(id: ToasterId, options: ToastSystemEventProps) {
      return updateToast(id, {
        type: ToasterType.SystemEvent,
        toasterProps: { ...options, appearance: ToastSystemEvent.appearances.Error },
      });
    },

    errorCritical(id: ToasterId, options: ToastSystemEventProps) {
      return updateToast(id, {
        type: ToasterType.SystemEvent,
        toasterProps: { ...options, appearance: ToastSystemEvent.appearances.ErrorCritical },
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
