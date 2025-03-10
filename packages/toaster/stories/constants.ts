import { ToastUploadProps } from '@snack-uikit/toaster';

import { UploadItem } from '../src/components/ToastUpload/types';

export const MOCK_TOAST_LOADING_ITEM: UploadItem = {
  id: '1',
  progress: 10,
  formattedSize: '45 MB',
  title: 'file name.extensions',
  status: 'loading',
  statusLabel: 'Loading...',
  actions: {},
};

export const MOCK_TOAST_PAUSED_ITEM: UploadItem = {
  id: '2',
  progress: 20,
  formattedSize: '45 MB',
  title: 'file name.extensions',
  status: 'pause',
  statusLabel: 'Paused',
  actions: {},
};

export const MOCK_TOAST_ERROR_ITEM: UploadItem = {
  id: '3',
  progress: 20,
  formattedSize: '45 MB',
  title: 'file name.extensions',
  status: 'error',
  statusLabel: 'Error',
  actions: {},
};

export const MOCK_TOAST_UPLOADED_ITEM: UploadItem = {
  id: '4',
  progress: 100,
  formattedSize: '45 MB',
  title: 'file name.extensions',
  status: 'uploaded',
  statusLabel: 'Uploaded',
  actions: {},
  link: {
    href: '#',
    text: 'Show',
  },
};

export const MOCK_TOAST_PROPS: Partial<ToastUploadProps> = {
  description: '3 minutes left',
  status: 'loading',
  closable: true,
  progress: {
    current: 4,
    total: 10,
  },
  cancelButton: {
    label: 'Cancel all',
    onClick: () => {},
  },
  generalActions: {
    onContinue: () => {},
    onPause: () => {},
    onRetry: () => {},
  },
};

export const MOCK_UPLOAD_ITEMS_LIST = [
  MOCK_TOAST_LOADING_ITEM,
  MOCK_TOAST_PAUSED_ITEM,
  MOCK_TOAST_ERROR_ITEM,
  MOCK_TOAST_UPLOADED_ITEM,
  {
    ...MOCK_TOAST_UPLOADED_ITEM,
    id: '5',
  },
  {
    ...MOCK_TOAST_UPLOADED_ITEM,
    id: '6',
  },
];
