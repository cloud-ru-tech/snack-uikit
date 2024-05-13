import cn from 'classnames';
import { useState } from 'react';

import { Card } from '@snack-uikit/card';
import { extractSupportProps } from '@snack-uikit/utils';

import { AttachmentContext, AttachmentFocusActionsContext } from '../../contexts';
import { getBaseFileName, getFileExtension } from '../../helpers';
import { useImage } from '../../hooks';
import { AttachmentSquareProps } from '../../types';
import { HoverContent, LoadingContent, MainContent } from './components';
import styles from './styles.module.scss';

export function AttachmentSquare({
  file,
  loading,
  icon,
  title: titleProp,
  description: descriptionProp,
  error,
  disabled,
  truncateVariant,
  checked,
  onDownload,
  onDelete,
  onClick,
  onRetry,
  size = 's',
  className,
  ...rest
}: AttachmentSquareProps) {
  const { loading: loadingImage, imageData } = useImage(file);
  const isLoading = loading || loadingImage;

  const title = titleProp || getBaseFileName(file?.name);
  const description = descriptionProp || getFileExtension(file?.name);

  const [hasFocusedActions, setHasFocusedActions] = useState<boolean>(false);

  return (
    <Card
      {...extractSupportProps(rest)}
      outline
      disabled={!loading && disabled}
      size={size}
      className={cn(className, styles.wrapper, {
        [styles.sizeS]: size === 's',
        [styles.sizeM]: size === 'm',
        [styles.hasFocusedActions]: hasFocusedActions,
      })}
      checked={!loading && checked}
      multipleSelection
      onClick={!isLoading && !disabled ? onClick : undefined}
      header={
        <AttachmentContext.Provider value={{ file, truncateVariant, onDelete, onDownload, onRetry, disabled, size }}>
          <AttachmentFocusActionsContext.Provider
            value={{
              focused: hasFocusedActions,
              setFocused: setHasFocusedActions,
            }}
          >
            {!isLoading && !disabled && !error && (
              <MainContent title={title} icon={icon} imageData={imageData} className={styles.main} />
            )}

            {!isLoading && (
              <HoverContent title={title} description={description} error={error} className={styles.hover} />
            )}

            {isLoading && <LoadingContent />}
          </AttachmentFocusActionsContext.Provider>
        </AttachmentContext.Provider>
      }
    />
  );
}
