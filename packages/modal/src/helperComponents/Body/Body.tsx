import cn from 'classnames';
import { ReactNode } from 'react';

import { Scroll } from '@snack-ui/scroll';
import { extractSupportProps, WithSupportProps } from '@snack-ui/utils';

import { ContentAlign, TEST_IDS } from '../../constants';
import styles from './styles.module.scss';

export type ModalBodyProps = WithSupportProps<{
  /** Содержимое модального окна */
  content: ReactNode;
  /** Выравнивание контента */
  align?: ContentAlign;
  className?: string;
}>;

export function ModalBody({ content, align = ContentAlign.Default, className, ...rest }: ModalBodyProps) {
  return (
    <Scroll
      size={Scroll.sizes.M}
      className={cn(styles.modalBody, className)}
      {...extractSupportProps(rest)}
      data-align={align}
      data-test-id={TEST_IDS.content}
    >
      {content}
    </Scroll>
  );
}

ModalBody.aligns = ContentAlign;
