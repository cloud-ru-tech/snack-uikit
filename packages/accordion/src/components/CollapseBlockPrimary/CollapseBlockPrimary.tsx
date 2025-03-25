import cn from 'classnames';

import { extractSupportProps } from '@snack-uikit/utils';

import { CollapseBlockHeaderContainer, CollapseBlockPrivate } from '../../helperComponents';
import { useExpanded } from '../../hooks';
import { CollapseBlockPrimaryProps } from '../../types';
import styles from './styles.module.scss';

export function CollapseBlockPrimary({
  id,
  header,
  children,
  actions,
  className,
  outline,
  shape = 'round',
  removeContentFromDOM,
  onClick,
  ...rest
}: CollapseBlockPrimaryProps) {
  const { isExpanded, isExpandedDebounced, handleToggleExpanded } = useExpanded(id);

  return (
    <CollapseBlockPrivate
      className={cn(
        styles.containerBase,
        { [styles.container]: !outline, [styles.containerOutline]: outline },
        className,
      )}
      shape={shape}
      header={
        <CollapseBlockHeaderContainer
          id={id}
          onClick={onClick}
          expanded={isExpanded}
          toggleExpanded={handleToggleExpanded}
          actions={actions}
        >
          {header}
        </CollapseBlockHeaderContainer>
      }
      expanded={isExpanded}
      expandedDebounced={isExpandedDebounced}
      removeContentFromDOM={removeContentFromDOM}
      {...extractSupportProps(rest)}
    >
      {children}
    </CollapseBlockPrivate>
  );
}
