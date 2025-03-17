import { PropsWithChildren } from 'react';

import { Tooltip, TooltipProps } from '../Tooltip';

type WithTooltipProps = PropsWithChildren<{
  /** Настройки для тултипа */
  tooltip?: TooltipProps;
}>;

export function WithTooltip({ tooltip, children }: WithTooltipProps) {
  if (!tooltip) {
    return <>{children}</>;
  }

  return <Tooltip {...tooltip}>{children}</Tooltip>;
}
