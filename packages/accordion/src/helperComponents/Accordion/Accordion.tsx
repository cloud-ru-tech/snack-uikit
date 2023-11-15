import { ToggleGroup } from '@snack-ui/toggles';
import { extractSupportProps } from '@snack-ui/utils';

import { AccordionProps } from '../../types';

export function Accordion({
  children,
  expanded,
  onExpandedChange,
  expandedDefault,
  selectionMode = ToggleGroup.selectionModes.Single,
  className,
  ...rest
}: AccordionProps) {
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <ToggleGroup
      value={expanded}
      defaultValue={expandedDefault}
      onChange={onExpandedChange}
      selectionMode={selectionMode}
    >
      <div className={className} {...extractSupportProps(rest)}>
        {children}
      </div>
    </ToggleGroup>
  );
}
