import cn from 'classnames';
import { AnchorHTMLAttributes, MouseEventHandler } from 'react';

import { TruncateString, TruncateStringProps } from '@snack-uikit/truncate-string';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { APPEARANCE, SIZE, TEXT_MODE } from './constants';
import styles from './styles.module.scss';
import { Appearance, Size, TextMode } from './types';

export type LinkProps = WithSupportProps<{
  /** Текст ссылки */
  text?: string;
  /** CSS-класс */
  className?: string;
  /** Ссылка */
  href?: string;
  /** HTML-атрибут target */
  target?: AnchorHTMLAttributes<HTMLAnchorElement>['target'];
  /** HTML-атрибут download */
  download?: string;
  /** Колбек обработки клика */
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  /** Размер
   * @default 's'
   */
  size?: Size;
  /** Стилизует ссылку для размещения на цветном фоне
   * @default 'primary'
   */
  appearance?: Appearance;
  /** Тип поверхности, на которой размещена ссылка
   * @default 'default'
   */
  textMode?: TextMode;
  /** Находится ли ссылка внутри текста (и можно ли её переносить) */
  insideText?: boolean;
  /**
   * Вариант обрезания строки:
   * <br> - `end` - с конца;
   * <br> - `middle` - по середине
   * */
  truncateVariant?: TruncateStringProps['variant'];
}>;

/** Компонент ссылка */
export function Link({
  text = '',
  className,
  href = '#',
  target = '_blank',
  download,
  onClick,
  textMode = TEXT_MODE.Default,
  size = SIZE.S,
  appearance = APPEARANCE.Primary,
  insideText = false,
  truncateVariant,
  ...rest
}: LinkProps) {
  return (
    <a
      className={cn(styles.link, className)}
      href={href}
      target={target}
      download={download}
      onClick={onClick}
      {...extractSupportProps(rest)}
      data-size={size}
      data-text-mode={textMode}
      data-appearance={appearance}
      data-inside-text={insideText || undefined}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
    >
      {insideText ? text : <TruncateString text={text} maxLines={1} variant={truncateVariant} />}
    </a>
  );
}
