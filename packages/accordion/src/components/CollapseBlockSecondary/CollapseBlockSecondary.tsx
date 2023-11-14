import cn from 'classnames';

import { extractSupportProps } from '@snack-ui/utils';

import { CollapseBlockHeaderContainer, CollapseBlockPrivate } from '../../helperComponents';
import { useAccordion } from '../../hooks';
import { CollapseBlockProps } from '../../types';
import styles from './styles.module.scss';

export function CollapseBlockSecondary({ header, children, id, actions, className, ...rest }: CollapseBlockProps) {
  const { isExpanded, handleExpandedChange } = useAccordion(id);

  return (
    <CollapseBlockPrivate
      className={cn(styles.container, className)}
      header={
        <CollapseBlockHeaderContainer expanded={isExpanded} toggleExpanded={handleExpandedChange} actions={actions}>
          {header}
        </CollapseBlockHeaderContainer>
      }
      expanded={isExpanded}
      {...extractSupportProps(rest)}
    >
      {children}
    </CollapseBlockPrivate>
  );
}
