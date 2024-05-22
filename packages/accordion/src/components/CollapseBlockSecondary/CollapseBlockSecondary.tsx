import cn from 'classnames';

import { extractSupportProps } from '@snack-uikit/utils';

import { CollapseBlockHeaderContainer, CollapseBlockPrivate } from '../../helperComponents';
import { useExpanded } from '../../hooks';
import { CollapseBlockSecondaryProps } from '../../types';
import styles from './styles.module.scss';

export function CollapseBlockSecondary({
  header,
  children,
  id,
  actions,
  className,
  ...rest
}: CollapseBlockSecondaryProps) {
  const { isExpanded, isExpandedDebounced, handleToggleExpanded } = useExpanded(id);

  return (
    <CollapseBlockPrivate
      className={cn(styles.container, className)}
      header={
        <CollapseBlockHeaderContainer expanded={isExpanded} toggleExpanded={handleToggleExpanded} actions={actions}>
          {header}
        </CollapseBlockHeaderContainer>
      }
      expanded={isExpanded}
      expandedDebounced={isExpandedDebounced}
      {...extractSupportProps(rest)}
    >
      {children}
    </CollapseBlockPrivate>
  );
}
