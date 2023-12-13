import cn from 'classnames';
import { AnchorHTMLAttributes, MouseEventHandler } from 'react';

import { ArrowLinksSVG } from '@snack-uikit/icons';
import { TruncateString } from '@snack-uikit/truncate-string';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { ON_COLOR, ON_SURFACE, SIZE } from './constants';
import styles from './styles.module.scss';
import { OnColor, OnSurface, Size } from './types';

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
  /** Размер */
  size?: Size;
  /** Ведет ли ссылка на внешний ресурс (добавляет иконку если true) */
  external?: boolean;
  /** Стилизует ссылку для размещения на цветном фоне */
  onColor?: OnColor;
  /** Тип поверхности, на которой размещена ссылка */
  onSurface?: OnSurface;
}>;

/** Компонент ссылка */
export function Link({
  text = '',
  className,
  href = '#',
  target = '_blank',
  download,
  onClick,
  onSurface = ON_SURFACE.Background,
  size = SIZE.S,
  external,
  onColor = ON_COLOR.Primary,
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
      data-on-surface={onSurface}
      data-color={onColor}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
    >
      <TruncateString text={text} maxLines={1} />
      {external && <ArrowLinksSVG data-test-id='link__external-icon' className={styles.icon} />}
    </a>
  );
}
