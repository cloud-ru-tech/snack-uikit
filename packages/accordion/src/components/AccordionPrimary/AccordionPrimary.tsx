import cn from 'classnames';

import { ToggleGroup } from '@snack-uikit/toggles';

import { Accordion } from '../../helperComponents';
import { AccordionProps } from '../../types';
import styles from './styles.module.scss';

export function AccordionPrimary({ className, ...rest }: AccordionProps) {
  return <Accordion className={cn(styles.accordionPrimary, className)} {...rest} />;
}

AccordionPrimary.selectionModes = ToggleGroup.selectionModes;
