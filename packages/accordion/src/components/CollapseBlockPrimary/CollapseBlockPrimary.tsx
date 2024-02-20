import cn from 'classnames';

import { useToggleGroup } from '@snack-uikit/toggles';
import { extractSupportProps } from '@snack-uikit/utils';

import { CollapseBlockHeaderContainer, CollapseBlockPrivate } from '../../helperComponents';
import { CollapseBlockPrimaryProps } from '../../types';
import styles from './styles.module.scss';

export function CollapseBlockPrimary({
  id,
  header,
  children,
  actions,
  className,
  outline,
  ...rest
}: CollapseBlockPrimaryProps) {
  const { isChecked: isExpanded, handleClick: handleExpandedChange } = useToggleGroup({ value: id });

  return (
    <CollapseBlockPrivate
      className={cn(
        styles.containerBase,
        { [styles.container]: !outline, [styles.containerOutline]: outline },
        className,
      )}
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
