import cn from 'classnames';
import { ReactNode } from 'react';

import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { SIZE } from '../../constants';
import { SearchBaseProps } from '../../types';
import styles from './styles.module.scss';

export type SearchDecoratorProps = WithSupportProps<
  {
    children: ReactNode;
    focused?: boolean;
    className?: string;
  } & Pick<SearchBaseProps, 'outline' | 'size' | 'postfix'>
>;

export function SearchDecorator({
  children,
  outline,
  size = SIZE.S,
  focused,
  className,
  postfix,
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
      {postfix}
    </div>
  );
}
