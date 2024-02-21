import { JSXElementConstructor } from 'react';

import { Tooltip, TooltipProps } from '@snack-uikit/tooltip';

export function useButtonWithTooltip<T>({
  Button,
  tooltip,
}: {
  tooltip?: TooltipProps;
  Button: JSXElementConstructor<T>;
}) {
  if (tooltip) {
    return function ButtonWithTooltip(props: T) {
      return (
        <Tooltip {...tooltip}>
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          <Button {...props} />
        </Tooltip>
      );
    };
  }

  return Button;
}
