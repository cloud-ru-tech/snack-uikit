import cn from 'classnames';
import { ReactNode } from 'react';

import { extractSupportProps, WithSupportProps } from '@snack-ui/utils';

import { Size } from '../../constants';
import { SearchProps } from '../Search';
import styles from './styles.module.scss';

export type SearchDecoratorProps = WithSupportProps<
  {
    children: ReactNode;
    focused?: boolean;
    className?: string;
  } & Pick<SearchProps, 'outline' | 'size'>
>;

export function SearchDecorator({
  children,
  outline,
  size = Size.S,
  focused,
  className,
  ...rest
}: SearchDecoratorProps) {
  return (
    <div
      className={cn(styles.decorator, className)}
      data-outline={outline || undefined}
      data-size={size}
      data-focused={focused || undefined}
      {...extractSupportProps(rest)}
    >
      {children}
    </div>
  );
}

SearchDecorator.sizes = Size;
