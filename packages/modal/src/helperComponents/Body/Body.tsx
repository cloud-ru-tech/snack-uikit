import cn from 'classnames';
import { ReactNode } from 'react';

import { Scroll } from '@snack-ui/scroll';

import { ContentAlign, TEST_IDS } from '../../constants';
import styles from './styles.module.scss';

export type ModalBodyProps = {
  content: ReactNode;
  align?: ContentAlign;
  className?: string;
};

export function ModalBody({ content, align = ContentAlign.Default, className }: ModalBodyProps) {
  return (
    <Scroll
      size={Scroll.sizes.M}
      className={cn(styles.modalBody, className)}
      data-align={align}
      data-test-id={TEST_IDS.content}
    >
      {content}
    </Scroll>
  );
}

ModalBody.aligns = ContentAlign;
