import cn from 'classnames';

import { useToggleGroup } from '@snack-uikit/toggles';
import { extractSupportProps } from '@snack-uikit/utils';

import { CollapseBlockHeaderContainer, CollapseBlockPrivate } from '../../helperComponents';
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
  const { isChecked: isExpanded, handleClick: handleExpandedChange } = useToggleGroup({ value: id });

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
