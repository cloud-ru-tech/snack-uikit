import cn from 'classnames';

import { Accordion } from '../../helperComponents';
import { AccordionProps } from '../../types';
import styles from './styles.module.scss';

export function AccordionSecondary({ className, ...rest }: AccordionProps) {
  return <Accordion className={cn(styles.accordionSecondary, className)} {...rest} />;
}
