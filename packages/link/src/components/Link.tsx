import cn from 'classnames';
import { AnchorHTMLAttributes, MouseEventHandler } from 'react';

import { ArrowLinksSVG } from '@snack-ui/icons';
import { extractSupportProps, WithSupportProps } from '@snack-ui/utils';

import { OnColor, OnSurface, Size, Target } from './constants';
import styles from './styles.module.scss';

const getExternalIcon = (size: Size) => {
  const dataTestId = 'external-icon';

  if (size === Size.L) {
    return <ArrowLinksSVG size={24} data-test-id={dataTestId} />;
  }
  return <ArrowLinksSVG size={16} data-test-id={dataTestId} />;
};

export type LinkProps = WithSupportProps<{
  /** Текст ссылки */
  text?: string;
  /** CSS-класс */
  className?: string;
  /** Ссылка */
  href?: string;
  /** HTML-атрибут target */
  target?: AnchorHTMLAttributes<HTMLAnchorElement>['target'];
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
  text,
  className,
  href = '#',
  target = Target.Blank,
  onClick,
  onSurface = OnSurface.Background,
  size = Size.S,
  external,
  onColor = OnColor.Primary,
  ...rest
}: LinkProps) {
  return (
    <a
      className={cn(styles.link, className)}
      href={href}
      target={target}
      onClick={onClick}
      data-size={size}
      data-on-surface={onSurface}
      data-color={onColor}
      rel={target === Target.Blank ? 'noopener noreferrer' : undefined}
      {...extractSupportProps(rest)}
    >
      {text}
      {external && getExternalIcon(size)}
    </a>
  );
}

Link.sizes = Size;
Link.targets = Target;
Link.onColors = OnColor;
Link.onSurfaces = OnSurface;
