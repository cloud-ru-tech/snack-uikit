import { PropsWithChildren } from 'react';

import { Tooltip, TooltipProps } from '@snack-uikit/tooltip';

type WithTooltipProps = PropsWithChildren<{
  tooltip?: TooltipProps;
}>;

export function WithTooltip({ tooltip, children }: WithTooltipProps) {
  if (!tooltip) {
    return children;
  }

  return <Tooltip {...tooltip}>{children}</Tooltip>;
}
