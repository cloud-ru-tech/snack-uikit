import {
  arrow,
  autoUpdate,
  flip,
  FloatingNode,
  FloatingPortal,
  FloatingTree,
  offset,
  ReferenceType,
  safePolygon,
  shift,
  size,
  useClick,
  useDismiss,
  useFloating,
  useFloatingNodeId,
  useFloatingParentNodeId,
  useFocus,
  useHover,
  useInteractions,
} from '@floating-ui/react';
import cn from 'classnames';
import { ForwardedRef, ReactNode, useCallback, useRef } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { extractSupportProps, WithSupportProps } from '@snack-ui/utils';

import {
  DEFAULT_FALLBACK_PLACEMENTS,
  Placement,
  PopoverHeightStrategy,
  PopoverWidthStrategy,
  Trigger,
} from '../../constants';
import { getArrowOffset, getPopoverRootElement, getPopoverTriggerJSX, getTriggerProps } from '../../utils';
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
  arrowClassName?: string;
  offset?: number;
  children: ReactNode | ChildrenFunction;
  popoverContent: ReactNode | ReactNode[];
  trigger: Trigger;
  hoverDelayOpen?: number;
  hoverDelayClose?: number;
  triggerRef?: ForwardedRef<ReferenceType | HTMLElement | null>;
  widthStrategy?: PopoverWidthStrategy;
  heightStrategy?: PopoverHeightStrategy;
  closeOnEscapeKey?: boolean;
  triggerClickByKeys?: boolean;
  fallbackPlacements?: Placement[];
}>;

function PopoverPrivateComponent({
  className,
  triggerClassName,
  children,
  open: openProp,
  onOpenChange,
  placement: placementProp = Placement.Top,
  hasArrow,
  arrowClassName,
  offset: offsetProp = 0,
  popoverContent,
  trigger,
  outsideClick,
  hoverDelayOpen,
  hoverDelayClose,
  triggerRef,
  widthStrategy = PopoverWidthStrategy.Auto,
  heightStrategy = PopoverHeightStrategy.Auto,
  closeOnEscapeKey = true,
  triggerClickByKeys = true,
  fallbackPlacements = DEFAULT_FALLBACK_PLACEMENTS,
  ...rest
}: PopoverPrivateProps) {
  const arrowRef = useRef<HTMLDivElement | null>(null);

  const [isOpen, setIsOpen] = useUncontrolledProp(openProp, false, onOpenChange);

  const nodeId = useFloatingNodeId();

  const arrowOffset = getArrowOffset(arrowRef.current);
  const { floatingStyles, refs, context, middlewareData, placement } = useFloating({
    nodeId,
    placement: placementProp,
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      shift(),
      offset(offsetProp + arrowOffset),
      hasArrow && arrow({ element: arrowRef, padding: (offsetProp + arrowOffset) * 2 }),
      flip({
        fallbackPlacements,
      }),
      size({
        apply({ rects, availableHeight }) {
          const floating = refs.floating.current;
          if (!floating) return;

          switch (heightStrategy) {
            case PopoverHeightStrategy.Eq:
              floating.style.height = `${availableHeight}px`;
              break;
            case PopoverHeightStrategy.Lte:
              floating.style.maxHeight = `${availableHeight}px`;
              break;
            case PopoverHeightStrategy.Auto:
            default:
              break;
          }

          switch (widthStrategy) {
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
    ancestorScroll: false,
    escapeKey: closeOnEscapeKey,
  });
  const hover = useHover(context, {
    enabled: useHoverTrigger,
    handleClose: safePolygon(),
    delay: { open: hoverDelayOpen, close: hoverDelayClose },
  });
  const focus = useFocus(context, { enabled: useFocusTrigger, keyboardOnly });
  const click = useClick(context, { enabled: useClickTrigger, keyboardHandlers: triggerClickByKeys });

  const { getFloatingProps, getReferenceProps } = useInteractions([dismiss, hover, focus, click]);

  const portal = isOpen && (
    <FloatingPortal root={getPopoverRootElement()}>
      <div
        {...extractSupportProps(rest)}
        className={cn(styles.floating, className)}
        ref={refs.setFloating}
        style={floatingStyles}
        {...getFloatingProps()}
      >
        {popoverContent}
        {middlewareData.arrow && (
          <Arrow
            placement={placement}
            x={middlewareData.arrow.x}
            y={middlewareData.arrow.y}
            className={arrowClassName}
            arrowRef={arrowRef}
          />
        )}
      </div>
    </FloatingPortal>
  );

  return (
    <FloatingNode id={nodeId}>
      {getPopoverTriggerJSX({
        validElementWrapperClassName: cn(styles.ref, triggerClassName),
        getReferenceProps,
        children,
        setReference,
      })}
      {portal}
    </FloatingNode>
  );
}

export function PopoverPrivate({ children, ...props }: PopoverPrivateProps) {
  const parentNodeId = useFloatingParentNodeId();
  const isTreeRoot = parentNodeId === null;

  if (isTreeRoot) {
    return (
      <FloatingTree>
        <PopoverPrivateComponent {...props}>{children}</PopoverPrivateComponent>
      </FloatingTree>
    );
  }

  return <PopoverPrivateComponent {...props}>{children}</PopoverPrivateComponent>;
}

PopoverPrivate.placements = Placement;
PopoverPrivate.triggers = Trigger;
PopoverPrivate.widthStrategies = PopoverWidthStrategy;
PopoverPrivate.heightStrategies = PopoverHeightStrategy;
