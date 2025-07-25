import {
  arrow,
  autoUpdate,
  flip,
  FloatingNode,
  FloatingPortal,
  FloatingTree,
  hide,
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
import { ForwardedRef, ReactNode, useCallback, useEffect, useRef } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { extractSupportProps, isBrowser, usePopstateSubscription, WithSupportProps } from '@snack-uikit/utils';

import {
  DEFAULT_FALLBACK_PLACEMENTS,
  PLACEMENT,
  POPOVER_HEIGHT_STRATEGY,
  POPOVER_WIDTH_STRATEGY,
} from '../../constants';
import { Placement, PopoverHeightStrategy, PopoverWidthStrategy, Trigger } from '../../types';
import {
  getArrowOffset,
  getPopoverRootElement,
  getPopoverTriggerJSX,
  getTriggerProps,
  mapPopoverActionsToSynthetic,
  referenceActionToEvent,
  stopPropagationMouse,
  stopPropagationTouch,
} from '../../utils';
import { Arrow } from '../Arrow';
import { useOffset } from './hooks';
import styles from './styles.module.scss';

type GetReferencePropsFunc = ReturnType<typeof useInteractions>['getReferenceProps'];

type ChildrenFunction = (params: {
  getReferenceProps: GetReferencePropsFunc;
  ref: (node: ReferenceType | null) => void;
}) => ReactNode;

type OutsideClickHandler = (event: MouseEvent) => boolean;

export type PopoverPrivateProps = WithSupportProps<
  {
    /** Управляет состоянием показан/не показан. */
    open?: boolean;
    /** Колбек отображения компонента. Срабатывает при изменении состояния open. */
    onOpenChange?: (isOpen: boolean) => void;
    /** Закрывать ли при клике вне поповера */
    outsideClick?: boolean | OutsideClickHandler;
    /**
     * Положение поповера относительно своего триггера (children).
     * @default top
     */
    placement: Placement;
    className?: string;
    /** CSS-класс триггера */
    triggerClassName?: string;
    /** Параметр наличия стрелки у поповера. В размеры стрелки встроен отступ. Дополнительный отступ может быть задан параметром `offset`. У элемента стрелки нет цвета, необходимо задавать его через параметр `arrowClassName`. */
    hasArrow?: boolean;

    /** CSS-класс контейнера стрелки поповера */
    arrowContainerClassName?: string;
    /** CSS-класс стрелки поповера */
    arrowElementClassName?: string;
    /**
     * Отступ поповера от его триггер-элемента (в пикселях).
     * @default 0
     */
    offset?: number;
    /** Контент поповера */
    popoverContent: ReactNode | ReactNode[];
    /**
     * Условие отображения поповера:
     * <br> - `click` - открывать по клику
     * <br> - `hover` - открывать по ховеру
     * <br> - `focusVisible` - открывать по focus-visible
     * <br> - `focus` - открывать по фокусу
     * <br> - `hoverAndFocusVisible` - открывать по ховеру и focus-visible
     * <br> - `hoverAndFocus` - открывать по ховеру и фокусу
     * <br> - `clickAndFocusVisible` - открывать по клику и focus-visible
     */
    trigger: Trigger;
    /** Задержка открытия по ховеру */
    hoverDelayOpen?: number;
    /** Задержка закрытия по ховеру */
    hoverDelayClose?: number;
    /**
     * Стратегия управления шириной контейнера поповера
     * <br> - `auto` - соответствует ширине контента,
     * <br> - `gte` - Great Than or Equal, равен ширине таргета или больше ее, если контент в поповере шире,
     * <br> - `eq` - Equal, строго равен ширине таргета.
     * @default auto
     */
    widthStrategy?: PopoverWidthStrategy;
    /**
     * Стратегия управления высотой контейнера поповера
     * <br> - `auto` - соответствует высоте контента,
     * <br> - `lte` - Less Than or Equal, равен высоте таргета или меньше ее, если контент в поповере меньше,
     * <br> - `eq` - Equal, строго равен высоте таргета.
     * @default auto
     */
    heightStrategy?: PopoverHeightStrategy;
    /**
     * Закрывать ли по нажатию на кнопку `Esc`
     * @default true
     */
    closeOnEscapeKey?: boolean;
    /**
     * Вызывается ли попоповер по нажатию клавиш Enter/Space (при trigger = `click`)
     * @default true
     */
    triggerClickByKeys?: boolean;
    /**
     * Цепочка расположений которая будет применяться к поповеру от первого к последнему если при текущем он не влезает.
     */
    fallbackPlacements?: Placement[];
    /**
     * Отключает для `isValidElement` внешнюю обертку триггера
     * <br>
     * Пригодится для элементов с `position: absolute`
     */
    disableSpanWrapper?: boolean;
    /**
     * Закрывать ли поповер при пекреходе по истории браузера
     */
    closeOnPopstate?: boolean;
  } & (
    | {
        /** Ref ссылка на триггер */
        triggerRef?: ForwardedRef<ReferenceType | HTMLElement | null>;
        /** Триггер поповера (подробнее читайте ниже) */
        children: ReactNode | ChildrenFunction;
      }
    | {
        /** Ref ссылка на триггер */
        triggerRef: ForwardedRef<ReferenceType | HTMLElement | null>;
        /** Триггер поповера (подробнее читайте ниже) */
        children?: ReactNode | ChildrenFunction;
      }
  )
>;

function PopoverPrivateComponent({
  className,
  triggerClassName,
  children,
  open: openProp,
  onOpenChange,
  placement: placementProp = PLACEMENT.Top,
  hasArrow,
  offset: offsetProp,
  popoverContent,
  trigger,
  outsideClick,
  hoverDelayOpen,
  hoverDelayClose,
  triggerRef,
  widthStrategy = POPOVER_WIDTH_STRATEGY.Auto,
  heightStrategy = POPOVER_HEIGHT_STRATEGY.Auto,
  closeOnEscapeKey = true,
  triggerClickByKeys = true,
  fallbackPlacements = DEFAULT_FALLBACK_PLACEMENTS,
  arrowContainerClassName,
  arrowElementClassName,
  disableSpanWrapper = false,
  closeOnPopstate,
  ...rest
}: PopoverPrivateProps) {
  const arrowRef = useRef<HTMLDivElement | null>(null);

  const [isOpen, setIsOpen] = useUncontrolledProp(openProp, false, onOpenChange);

  usePopstateSubscription(() => isOpen && setIsOpen(false), Boolean(closeOnPopstate));

  const nodeId = useFloatingNodeId();

  const offsetValue = useOffset({ triggerClassName, offsetProp });

  const arrowOffset = getArrowOffset(arrowRef.current);
  const { floatingStyles, refs, context, middlewareData, placement } = useFloating({
    nodeId,
    placement: placementProp,
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      shift(),
      offset(offsetValue + arrowOffset),
      hasArrow && arrow({ element: arrowRef, padding: (offsetValue + arrowOffset) * 2 }),
      flip({
        fallbackPlacements,
      }),
      size({
        apply({ rects, availableHeight }) {
          const floating = refs.floating.current;
          if (!floating) return;

          switch (heightStrategy) {
            case POPOVER_HEIGHT_STRATEGY.Eq:
              floating.style.height = `${availableHeight}px`;
              break;
            case POPOVER_HEIGHT_STRATEGY.Lte:
              floating.style.maxHeight = `${availableHeight}px`;
              break;
            case POPOVER_HEIGHT_STRATEGY.Auto:
            default:
              break;
          }

          switch (widthStrategy) {
            case POPOVER_WIDTH_STRATEGY.Eq:
              floating.style.width = `${rects.reference.width}px`;
              floating.style.minWidth = '0px';
              break;
            case POPOVER_WIDTH_STRATEGY.Gte:
              floating.style.width = `auto`;
              floating.style.minWidth = `${rects.reference.width}px`;
              break;
            case POPOVER_WIDTH_STRATEGY.Auto:
            default:
              floating.style.width = `auto`;
              floating.style.minWidth = 'auto';
          }
        },
      }),
      hide(),
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
    handleClose: safePolygon({ requireIntent: false }),
    delay: { open: hoverDelayOpen, close: hoverDelayClose },
  });
  const focus = useFocus(context, { enabled: useFocusTrigger, visibleOnly: keyboardOnly });
  const click = useClick(context, { enabled: useClickTrigger, keyboardHandlers: triggerClickByKeys });

  const { getFloatingProps, getReferenceProps } = useInteractions([dismiss, hover, focus, click]);

  const addOrRemoveTriggerRefEvents = useCallback(
    (actions: Record<string, (e: Event) => void>, type: 'add' | 'remove') => {
      if (typeof triggerRef === 'object' && triggerRef?.current) {
        refs.setReference(triggerRef.current);
        Object.entries(actions).map(([key, value]) => {
          const eventKey = referenceActionToEvent(key);

          if (eventKey && isBrowser()) {
            type === 'add' && (triggerRef.current as HTMLElement).addEventListener(eventKey, value);
            type === 'remove' && (triggerRef.current as HTMLElement).removeEventListener(eventKey, value);
          }
        });
      }
    },
    [refs, triggerRef],
  );

  useEffect(() => {
    if (children) {
      return;
    }

    const actions = mapPopoverActionsToSynthetic(getReferenceProps());

    addOrRemoveTriggerRefEvents(actions, 'add');

    return () => addOrRemoveTriggerRefEvents(actions, 'remove');
  }, [children, addOrRemoveTriggerRefEvents, getReferenceProps]);

  const portal = isOpen && (
    <FloatingPortal root={getPopoverRootElement()} key='portal'>
      <div
        role='presentation'
        {...extractSupportProps(rest)}
        className={cn(styles.floating, className, {
          [styles.floatingHidden]: Boolean(middlewareData.hide?.referenceHidden),
        })}
        ref={refs.setFloating}
        style={floatingStyles}
        data-placement={placement}
        {...getFloatingProps({
          onClick: stopPropagationMouse,
          onMouseDown: stopPropagationMouse,
          onMouseUp: stopPropagationMouse,
          onTouchStart: stopPropagationTouch,
          onTouchEnd: stopPropagationTouch,
          onTouchMove: stopPropagationTouch,
        })}
      >
        {popoverContent}
        {middlewareData.arrow && (
          <Arrow
            placement={placement}
            x={middlewareData.arrow.x}
            y={middlewareData.arrow.y}
            arrowContainerClassName={arrowContainerClassName}
            arrowElementClassName={arrowElementClassName}
            arrowRef={arrowRef}
          />
        )}
      </div>
    </FloatingPortal>
  );

  return (
    <FloatingNode id={nodeId}>
      {children &&
        getPopoverTriggerJSX({
          validElementWrapperClassName: cn(triggerClassName),
          getReferenceProps,
          children,
          setReference,
          disableSpanWrapper,
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
