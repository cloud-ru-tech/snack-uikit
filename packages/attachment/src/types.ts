import { CardProps } from '@snack-uikit/card';
import { IconPredefinedProps } from '@snack-uikit/icon-predefined';
import { TruncateStringProps } from '@snack-uikit/truncate-string';
import { WithSupportProps } from '@snack-uikit/utils';

export type Size = 's' | 'm';

export type AttachmentSquareProps = WithSupportProps<{
  /** Файл */
  file?: File;
  /** Колбек на клик по кнопке скачивания */
  onDownload?(file?: File | undefined): void;
  /** Колбек на клик по кнопке удаления */
  onDelete?(file?: File | undefined): void;
  /** Колбек на клик по кнопке повторения */
  onRetry?(): void;
  /**
   * Заголовок
   * @default fileName
   */
  title?: string;
  /**
   * Описание
   * @default fileExtension
   */
  description?: string;
  /** Сообщение об ошибке */
  error?: string;
  /**
   * Вариант обрезания строки:
   * <br> - `End` - с конца;
   * <br> - `Middle` - по середине
   * */
  truncateVariant?: TruncateStringProps['variant'];

  /** Управление состоянием загрузки */
  loading?: boolean;
  /**
   * Иконка для файла
   * @defaultIcon FileSVG
   */
  icon?: IconPredefinedProps['icon'];
  /** Размер */
  size?: Size;
}> &
  Pick<CardProps, 'checked' | 'disabled' | 'onClick' | 'className'>;

export type AttachmentProps = AttachmentSquareProps & {
  truncate?: {
    /**
     * Максимальное кол-во строк заголовка
     * @default 1
     */
    title?: number;
    /**
     * Максимальное кол-во строк описания
     * @default 1
     */
    description?: number;
    /**
     * Максимальное кол-во строк ошибки
     * @default 1
     */
    error?: number;
  };
};
