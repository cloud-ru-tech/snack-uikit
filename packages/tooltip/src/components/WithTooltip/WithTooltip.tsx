import { Tooltip, TooltipProps } from '../Tooltip';

type WithTooltipProps = {
  /** Настройки для тултипа */
  tooltip?: Omit<TooltipProps, 'children'>;
  children: TooltipProps['children'];
};

export function WithTooltip({ tooltip, children }: WithTooltipProps) {
  if (!tooltip) {
    return <>{children}</>;
  }

  return <Tooltip {...tooltip}>{children}</Tooltip>;
}
