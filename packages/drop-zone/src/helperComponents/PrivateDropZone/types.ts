import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

import { WithSupportProps } from '@snack-ui/utils';

export type DragAndDropEventNames = 'onDragLeave' | 'onDragOver' | 'onDrop';

export enum UploadMode {
  Single = 'Single',
  Multiple = 'Multiple',
}

export type PrivateDropZoneProps = WithSupportProps<{
  isOver: boolean;
  className?: string;
  onFilesUpload(files: File[]): void;
  title?: string;
  description?: ReactNode;
  disabled?: boolean;
  mode?: UploadMode;
  accept?: string;
}> &
  Pick<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, DragAndDropEventNames>;
