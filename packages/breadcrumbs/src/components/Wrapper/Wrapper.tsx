import cn from 'classnames';
import { forwardRef, PropsWithChildren } from 'react';

import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { Size } from '../../constants';
import { BreadcrumbsContext } from '../../context';
import styles from './styles.module.scss';

export type WrapperProps = PropsWithChildren<
  WithSupportProps<{
    hidden: boolean;
    className?: string;
    size: Size;
    separator: string;
  }>
>;

export const Wrapper = forwardRef<HTMLUListElement, WrapperProps>(function HiddenWrapper(
  { children, className, size, hidden, separator, 'data-test-id': testId, ...rest },
  ref,
) {
  return (
    <nav
      {...extractSupportProps(rest)}
      className={cn(styles.wrapper, className)}
      data-test-id={testId}
      data-hidden={hidden}
      aria-hidden={hidden}
    >
      <BreadcrumbsContext.Provider value={{ hidden, size, separator, testId }}>
        <ul className={styles.row} ref={ref} data-hidden={hidden} data-size={size}>
          {children}
        </ul>
      </BreadcrumbsContext.Provider>
    </nav>
  );
});
