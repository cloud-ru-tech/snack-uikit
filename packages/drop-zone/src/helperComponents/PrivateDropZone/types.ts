import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

import { ValueOf, WithSupportProps } from '@snack-uikit/utils';

import { UPLOAD_MODE } from './constants';

export type DragAndDropEventNames = 'onDragLeave' | 'onDragOver' | 'onDrop';

export type UploadMode = ValueOf<typeof UPLOAD_MODE>;

export type PrivateDropZoneProps = WithSupportProps<{
  isOver: boolean;
  /** Колбек загрузки файла */
  onFilesUpload(files: File[]): void;
  /** Заголовок */
  title?: string;
  /** Описание */
  description?: ReactNode;
  /** Деактивирован ли компонент */
  disabled?: boolean;
  /**
   * Режим
   * @default multiple
   */
  mode?: UploadMode;
  /** Режим */
  accept?: string;
  /** CSS-класс */
  className?: string;
}> &
  Pick<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, DragAndDropEventNames>;
