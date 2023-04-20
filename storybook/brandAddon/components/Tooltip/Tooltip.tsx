import {
  FloatingPortal,
  offset,
  Placement,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
} from '@floating-ui/react-dom-interactions';
import React, { MouseEvent, ReactNode } from 'react';

type TooltipProps = {
  open: boolean;
  setOpen(value: boolean): void;
  children: ReactNode;
  tooltip: ReactNode;
  placement?: Placement;
  onReferenceClick?(e: MouseEvent<HTMLDivElement>): void;
  onFloatingClick?(e: MouseEvent<HTMLDivElement>): void;
};

export function Tooltip({
  tooltip,
  children,
  open,
  setOpen,
  placement = 'bottom',
  onReferenceClick,
  onFloatingClick,
}: TooltipProps) {
  const { context, reference, floating, strategy, x, y } = useFloating({
    open,
    onOpenChange: setOpen,
    strategy: 'fixed',
    placement,
    middleware: [offset({ mainAxis: 4 })],
  });
  const { getReferenceProps, getFloatingProps } = useInteractions([useClick(context), useDismiss(context)]);

  return (
    <>
      <div ref={reference} {...getReferenceProps({ onClick: onReferenceClick })}>
        {children}
      </div>
      {open && (
        <FloatingPortal root={document.body}>
          <div
            className={'addon-tooltip'}
            {...getFloatingProps({ onClick: onFloatingClick })}
            ref={floating}
            style={{ position: strategy, left: x ?? 0, top: y ?? 0 }}
          >
            {tooltip}
          </div>
        </FloatingPortal>
      )}
    </>
  );
}
