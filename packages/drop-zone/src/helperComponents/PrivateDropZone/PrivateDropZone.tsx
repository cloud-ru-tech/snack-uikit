import cn from 'classnames';
import { ChangeEvent, DragEvent, useRef } from 'react';

import { extractSupportProps } from '@snack-ui/utils';

import classNames from './styles.module.scss';
import { PrivateDropZoneProps, UploadMode } from './types';

export function PrivateDropZone({
  disabled = false,
  className,
  isOver,
  onDragLeave,
  onDragOver,
  onDrop,
  mode = UploadMode.Multiple,
  description,
  title,
  onFilesUpload,
  accept,
  ...rest
}: PrivateDropZoneProps) {
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleAttachFile = () => {
    if (disabled) return;
    hiddenFileInput.current?.click();
  };
  const handleFileSelect = ({ target: { files } }: ChangeEvent<HTMLInputElement>) => {
    if (!files) return;

    const filesArray = Array.from(files);
    onFilesUpload(filesArray);
  };

  const handleDrop = (e: DragEvent<HTMLButtonElement>) => {
    if (disabled) return;
    e.preventDefault();

    const filesArray = Array.from(e.dataTransfer.files);
    onDrop?.(e);
    onFilesUpload(mode === UploadMode.Single ? [filesArray[0]] : filesArray);
  };

  return (
    <button
      className={cn(className, classNames.container)}
      type={'button'}
      data-over={isOver || undefined}
      data-disabled={disabled || undefined}
      onClick={handleAttachFile}
      tabIndex={0}
      onDrop={handleDrop}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
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
