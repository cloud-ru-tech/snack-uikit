import cn from 'classnames';

import { extractSupportProps } from '@snack-ui/utils';

import { CollapseBlockPrivate, CollapseBlockTitle } from '../../helperComponents';
import { useAccordion } from '../../hooks';
import { CollapseBlockProps } from '../../types';
import styles from './styles.module.scss';

export function CollapseBlockPrimary({
  id,
  title,
  description,
  tip,
  children,
  actions,
  className,
  ...rest
}: CollapseBlockProps) {
  const { isExpanded, handleExpandedChange } = useAccordion(id);

  return (
    <CollapseBlockPrivate
      className={cn(styles.container, className)}
      header={
        <CollapseBlockTitle
          title={title}
          description={description}
          expanded={isExpanded}
          toggleExpanded={handleExpandedChange}
          tip={tip}
          actions={actions}
        />
      }
      expanded={isExpanded}
      {...extractSupportProps(rest)}
    >
      {children}
    </CollapseBlockPrivate>
  );
}
