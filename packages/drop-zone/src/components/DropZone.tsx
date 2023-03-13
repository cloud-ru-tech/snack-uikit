import { extractSupportProps, WithSupportProps } from '@snack-ui/utils';
import cn from 'classnames';
import { ChangeEvent, DragEvent, ReactNode, useRef, useState } from 'react';

import classNames from './styles.module.scss';

enum UploadMode {
  Single = 'Single',
  Multiple = 'Multiple',
}

export type DropZoneProps = WithSupportProps<{
  className?: string;
  onFilesUpload(files: File[]): void;
  title?: string;
  description?: ReactNode;
  disabled?: boolean;
  mode?: UploadMode;
  accept?: string;
}>;

export function DropZone({
  className,
  onFilesUpload,
  title,
  description,
  disabled = false,
  mode = UploadMode.Multiple,
  accept,
  ...rest
}: DropZoneProps): JSX.Element {
  const [isOver, setIsOver] = useState(false);

  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleAttachFile = () => {
    if (disabled) return;
    hiddenFileInput.current?.click();
  };

  const handleDragLeave = () => {
    if (disabled) return;
    setIsOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLButtonElement>) => {
    if (disabled) return;
    e.preventDefault();

    const filesArray = Array.from(e.dataTransfer.files);
    onFilesUpload(mode === UploadMode.Single ? [filesArray[0]] : filesArray);
    handleDragLeave();
  };

  const handleDragOver = (e: DragEvent<HTMLButtonElement>) => {
    if (disabled) return;
    e.preventDefault();

    setIsOver(true);
  };

  const handleFileSelect = ({ target: { files } }: ChangeEvent<HTMLInputElement>) => {
    if (!files) return;

    const filesArray = Array.from(files);
    onFilesUpload(filesArray);
  };

  return (
    <button
      className={cn(className, classNames.container)}
      type={'button'}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      data-over={isOver || undefined}
      data-disabled={disabled || undefined}
      onClick={handleAttachFile}
      tabIndex={0}
      {...extractSupportProps(rest)}
    >
      <h4 data-test-id='title' className={classNames.title}>
        {title}
      </h4>
      {description && (
        <div data-test-id='description' className={classNames.description}>
          {description}
        </div>
      )}
      <input
        data-test-id='file-input'
        className={classNames.hidden}
        onChange={handleFileSelect}
        multiple={mode === UploadMode.Multiple}
        ref={hiddenFileInput}
        type='file'
        accept={accept}
        // to trigger onChange event when the same files were attached
        onClick={e => {
          (e.target as HTMLInputElement).value = '';
        }}
      />
    </button>
  );
}

DropZone.uploadModes = UploadMode;
