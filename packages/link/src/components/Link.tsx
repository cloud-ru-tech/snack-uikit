import cn from 'classnames';
import { ElementType } from 'react';

import { TruncateString } from '@snack-uikit/truncate-string';
import { extractSupportProps } from '@snack-uikit/utils';

import { APPEARANCE, SIZE, TARGET, TEXT_MODE } from './constants';
import styles from './styles.module.scss';
import { LinkProps } from './types';

/** Компонент ссылка */
export function Link<T extends ElementType = 'a'>({
  text = '',
  className,
  textMode = TEXT_MODE.Default,
  size = SIZE.S,
  appearance = APPEARANCE.Primary,
  insideText = false,
  truncateVariant,
  as,
  ...rest
}: LinkProps<T>) {
  const Component = as || 'a';

  let fallbackProps;

  if (Component === 'a') {
    /**
     * Обратно совместимые изменения с предыдущей версией.
     */
    fallbackProps = Object.assign(
      { target: rest?.target ?? TARGET.Blank, href: rest.href ?? '#', download: rest.download, onClick: rest.onClick },
      extractSupportProps(rest),
    );
    fallbackProps.rel = fallbackProps.target === TARGET.Blank ? 'noopener noreferrer' : undefined;
  } else {
    fallbackProps = rest;
  }

  return (
    <Component
      className={cn(styles.link, className)}
      {...fallbackProps}
      data-size={size}
      data-text-mode={textMode}
      data-appearance={appearance}
      data-inside-text={insideText || undefined}
    >
      {insideText ? text : <TruncateString text={text} maxLines={1} variant={truncateVariant} />}
    </Component>
  );
}
