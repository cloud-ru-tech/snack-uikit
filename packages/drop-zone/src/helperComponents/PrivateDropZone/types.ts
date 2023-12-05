import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

import { WithSupportProps } from '@snack-uikit/utils';

export type DragAndDropEventNames = 'onDragLeave' | 'onDragOver' | 'onDrop';

export enum UploadMode {
  Single = 'Single',
  Multiple = 'Multiple',
}

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
   * @default UploadMode.Multiple
   */
  mode?: UploadMode;
  /** Режим */
  accept?: string;
  /** CSS-класс */
  className?: string;
}> &
  Pick<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, DragAndDropEventNames>;
