import { Card } from '@snack-uikit/card';
import { extractSupportProps } from '@snack-uikit/utils';

import { AttachmentContext } from '../../contexts';
import { Actions, TextBlock } from '../../helperComponents';
import { getBaseFileName, getFileExtension } from '../../helpers';
import { useImage } from '../../hooks';
import { AttachmentProps } from '../../types';
import { Emblem } from './components';
import styles from './styles.module.scss';

export function Attachment({
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
  truncate,
  className,
  ...rest
}: AttachmentProps) {
  const { loading: loadingImage, imageData } = useImage(file);
  const isLoading = loading || loadingImage;

  const title = titleProp || getBaseFileName(file?.name);
  const description = descriptionProp || getFileExtension(file?.name);

  return (
    <Card
      {...extractSupportProps(rest)}
      outline
      disabled={!loading && disabled}
      checked={!loading && checked}
      multipleSelection
      className={className}
      size={size}
      onClick={!isLoading && !disabled ? onClick : undefined}
      header={
        <AttachmentContext.Provider
          value={{ file, truncateVariant, onDelete, onDownload, onRetry, disabled, size, truncate }}
        >
          <div className={styles.composition} data-size={size}>
            <Emblem title={title} loading={isLoading} icon={icon} imageData={imageData} />
            <TextBlock title={title} description={description} error={error} />
            <Actions hideDownload={isLoading || Boolean(error)} hideRetry={isLoading || !Boolean(error)} />
          </div>
        </AttachmentContext.Provider>
      }
    />
  );
}
