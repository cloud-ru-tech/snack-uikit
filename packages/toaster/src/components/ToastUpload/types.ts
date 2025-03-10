import { LinkProps } from '@snack-uikit/link';
import { ProgressBarProps } from '@snack-uikit/progress-bar';
import { ValueOf } from '@snack-uikit/utils';

import { TOAST_UPLOAD_ITEM_STATUS, TOAST_UPLOAD_STATUS } from './constants';

export type ToastUploadStatus = ValueOf<typeof TOAST_UPLOAD_STATUS>;

export type ToastUploadItemStatus = ValueOf<typeof TOAST_UPLOAD_ITEM_STATUS>;

export type ToastUploadStateSubscription<T> = (subscription: (newValue: T) => void) => () => void;
export type WithStateSubscription<T> = {
  /**Позволяет подписываться на изменения процесса загрузки файла внутри конпонента,
   * тем самым обновляет элементы не зависимо от всего списка
   * (можно использовать для улучшения производительности из-за частых обновлений)
   */
  subscribeToState?: ToastUploadStateSubscription<Partial<T>>;
} & T;

export type ToastUploadItemLink = Pick<LinkProps, 'target' | 'href' | 'onClick' | 'text'>;

export type UploadActions = {
  onCancel?: () => void;
  onPause?: () => void;
  onRetry?: () => void;
  onContinue?: () => void;
};

export type UploadItem = WithStateSubscription<{
  /**
   * Уникальный id элемента
   */
  id?: string;
  /**
   * Название элемента
   */
  title: string;
  /**
   * Статус загрузки
   */
  status: ToastUploadItemStatus;
  /**
   * Описание статуса загрузки
   */
  statusLabel: string;
  /**
   * Процент прогресса
   */
  progress: ProgressBarProps['progress'];
  /**
   * Отображаемый размер файла
   */
  formattedSize: string;
  /**
   * Экшены для управления загрузкой
   */
  actions: UploadActions;
  /**
   * Ссылка на файл
   */
  link?: ToastUploadItemLink;
}>;
