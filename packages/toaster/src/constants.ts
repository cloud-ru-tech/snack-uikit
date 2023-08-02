import { ToasterContainer, ToasterContainerProps } from './components';
import { ToasterType } from './types';

export const TOASTER_CONTAINER_DEFAULT_PROPS: Record<ToasterType, ToasterContainerProps> = {
  [ToasterType.SystemEvent]: {
    limit: 5,
    position: ToasterContainer.position.BOTTOM_RIGHT,
    displayCloseAllButton: true,
    type: ToasterType.SystemEvent,
  },
  [ToasterType.UserAction]: {
    limit: 2,
    position: ToasterContainer.position.BOTTOM_CENTER,
    displayCloseAllButton: false,
    type: ToasterType.UserAction,
  },
};

export const AUTO_CLOSE_TIME = {
  [ToasterType.SystemEvent]: 5000,
  [ToasterType.UserAction]: 2000,
};

export const TOASTER_ROOT_ID = 'toaster-root';
export const TOASTER_CONTAINER_PREFIX = 'toaster-container__';
