import {
  arrow,
  autoUpdate,
  flip,
  FloatingPortal,
  offset as offsetMiddleware,
  ReferenceType,
  safePolygon,
  shift,
  size,
  useClick,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
} from '@floating-ui/react';
import cn from 'classnames';
import { ForwardedRef, ReactNode, useCallback, useRef } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { extractSupportProps, WithSupportProps } from '@snack-ui/utils';

import { ArrowSize, Placement, PopoverWidthStrategy, Trigger } from '../../constants';
import { getArrowOffset, getPopoverContent, getPopoverRootElement, getTriggerProps } from '../../utils';
import { Arrow } from '../Arrow';
import styles from './styles.module.scss';

type GetReferencePropsFunc = ReturnType<typeof useInteractions>['getReferenceProps'];

type ChildrenFunction = (params: {
  getReferenceProps: GetReferencePropsFunc;
  ref: (node: ReferenceType | null) => void;
}) => ReactNode;

type OutsideClickHandler = (event: MouseEvent) => boolean;

export type PopoverPrivateProps = WithSupportProps<{
  open?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  outsideClick?: boolean | OutsideClickHandler;
  placement: Placement;
  className?: string;
  triggerClassName?: string;
  hasArrow?: boolean;
  arrowSize?: ArrowSize;
  arrowClassName?: string;
  offset?: number;
  children: ReactNode | ChildrenFunction;
  popoverContent: ReactNode | ReactNode[];
  trigger: Trigger;
  hoverDelayOpen?: number;
  hoverDelayClose?: number;
  triggerRef?: ForwardedRef<ReferenceType | null>;
  widthStrategy?: PopoverWidthStrategy;
  closeOnEscapeKey?: boolean;
}>;

export function PopoverPrivate({
  className,
  triggerClassName,
  children,
  open: openProp,
  onOpenChange,
  placement: placementProp = Placement.Top,
  hasArrow,
  arrowSize,
  arrowClassName,
  offset: offsetProp = 0,
  popoverContent,
  trigger,
  outsideClick,
  hoverDelayOpen,
  hoverDelayClose,
  triggerRef,
  widthStrategy = PopoverWidthStrategy.Auto,
  closeOnEscapeKey = true,
  ...rest
}: PopoverPrivateProps) {
  const widthStrategyRef = useRef<PopoverWidthStrategy>(widthStrategy);
  widthStrategyRef.current = widthStrategy;
  const arrowRef = useRef<HTMLDivElement | null>(null);

  const [isOpen, setIsOpen] = useUncontrolledProp(openProp, false, onOpenChange);

  const arrowOffset = getArrowOffset(arrowRef.current);
  const { x, y, strategy, refs, context, middlewareData, placement } = useFloating({
    placement: placementProp,
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      shift(),
      offsetMiddleware(offsetProp + arrowOffset),
      hasArrow && arrow({ element: arrowRef }),
      flip(),
      size({
        apply({ rects }) {
          const floating = refs.floating.current;
          if (!floating) return;
          switch (widthStrategyRef.current) {
            case PopoverWidthStrategy.Eq:
              floating.style.width = `${rects.reference.width}px`;
              floating.style.minWidth = '0px';
              break;
            case PopoverWidthStrategy.Gte:
              floating.style.width = `auto`;
              floating.style.minWidth = `${rects.reference.width}px`;
              break;
            case PopoverWidthStrategy.Auto:
            default:
              floating.style.width = `auto`;
              floating.style.minWidth = 'auto';
          }
        },
      }),
    ],
  });

  const setReference: typeof refs.setReference = useCallback(
    node => {
      refs.setReference(node);
      if (triggerRef) {
        typeof triggerRef === 'function' ? triggerRef(node) : (triggerRef.current = node);
      }
    },
    [triggerRef, refs],
  );

  const { useHoverTrigger, useFocusTrigger, useClickTrigger, keyboardOnly } = getTriggerProps(trigger);

  const dismiss = useDismiss(context, {
    outsidePress: outsideClick,
    ancestorScroll: true,
    escapeKey: closeOnEscapeKey,
  });
  const hover = useHover(context, {
    enabled: useHoverTrigger,
    handleClose: safePolygon(),
    delay: { open: hoverDelayOpen, close: hoverDelayClose },
  });
  const focus = useFocus(context, { enabled: useFocusTrigger, keyboardOnly });
  const click = useClick(context, { enabled: useClickTrigger });

  const { getFloatingProps, getReferenceProps } = useInteractions([dismiss, hover, focus, click]);

  return (
    <>
      {getPopoverContent({
        validElementWrapperClassName: cn(styles.ref, triggerClassName),
        getReferenceProps,
        children,
        setReference,
      })}
      {isOpen && (
        <FloatingPortal root={getPopoverRootElement()}>
          <div
            {...extractSupportProps(rest)}
            {...getFloatingProps()}
            className={className}
            ref={refs.setFloating}
            style={{
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
            }}
          >
            {popoverContent}
            {middlewareData.arrow && (
              <Arrow
                size={arrowSize}
                placement={placement}
                x={middlewareData.arrow.x}
                y={middlewareData.arrow.y}
                className={arrowClassName}
                arrowRef={arrowRef}
              />
            )}
          </div>
        </FloatingPortal>
      )}
    </>
  );
}

PopoverPrivate.placements = Placement;
PopoverPrivate.arrowSizes = ArrowSize;
PopoverPrivate.triggers = Trigger;
PopoverPrivate.widthStrategies = PopoverWidthStrategy;
