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

import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import {
  DEFAULT_FALLBACK_PLACEMENTS,
  Placement,
  PopoverHeightStrategy,
  PopoverWidthStrategy,
  Trigger,
} from '../../constants';
import { getArrowOffset, getPopoverRootElement, getPopoverTriggerJSX, getTriggerProps } from '../../utils';
import { Arrow } from '../Arrow';
import { useOffset } from './hooks';
import styles from './styles.module.scss';

type GetReferencePropsFunc = ReturnType<typeof useInteractions>['getReferenceProps'];

type ChildrenFunction = (params: {
  getReferenceProps: GetReferencePropsFunc;
  ref: (node: ReferenceType | null) => void;
}) => ReactNode;

type OutsideClickHandler = (event: MouseEvent) => boolean;

export type PopoverPrivateProps = WithSupportProps<{
  /** Управляет состоянием показан/не показан. */
  open?: boolean;
  /** Колбек отображения компонента. Срабатывает при изменении состояния open. */
  onOpenChange?: (isOpen: boolean) => void;
  /** Закрывать ли при клике вне поповера */
  outsideClick?: boolean | OutsideClickHandler;
  /**
   * Положение поповера относительно своего триггера (children).
   * @default Placement.Top
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
  /** Триггер поповера (подробнее читайте ниже) */
  children: ReactNode | ChildrenFunction;
  /** Контент поповера */
  popoverContent: ReactNode | ReactNode[];
  /**
   * Условие отображения поповера:
   * <br> - `Click` - открывать по клику
   * <br> - `Hover` - открывать по ховеру
   * <br> - `FocusVisible` - открывать по focus-visible
   * <br> - `Focus` - открывать по фокусу
   * <br> - `HoverAndFocusVisible` - открывать по ховеру и focus-visible
   * <br> - `HoverAndFocus` - открывать по ховеру и фокусу
   * <br> - `ClickAndFocusVisible` - открывать по клику и focus-visible
   */
  trigger: Trigger;
  /** Задержка открытия по ховеру */
  hoverDelayOpen?: number;
  /** Задержка закрытия по ховеру */
  hoverDelayClose?: number;
  /** Ref ссылка на триггер */
  triggerRef?: ForwardedRef<ReferenceType | HTMLElement | null>;
  /**
   * Стратегия управления шириной контейнера поповера
   * <br> - `Auto` - соответствует ширине контента,
   * <br> - `Gte` - Great Than or Equal, равен ширине таргета или больше ее, если контент в поповере шире,
   * <br> - `Eq` - Equal, строго равен ширине таргета.
   * @default PopoverWidthStrategy.Auto
   */
  widthStrategy?: PopoverWidthStrategy;
  /**
   * Стратегия управления высотой контейнера поповера
   * <br> - `Auto` - соответствует высоте контента,
   * <br> - `Lte` - Less Than or Equal, равен высоте таргета или меньше ее, если контент в поповере меньше,
   * <br> - `Eq` - Equal, строго равен высоте таргета.
   * @default PopoverHeightStrategy.Auto
   */
  heightStrategy?: PopoverHeightStrategy;
  /**
   * Закрывать ли по нажатию на кнопку `Esc`
   * @default true
   */
  closeOnEscapeKey?: boolean;
  /**
   * Вызывается ли попоповер по нажатию клавиш Enter/Space (при trigger = `Click`)
   * @default true
   */
  triggerClickByKeys?: boolean;
  /**
   * Цепочка расположений которая будет применяться к поповеру от первого к последнему если при текущем он не влезает.
   */
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
  offset: offsetProp,
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
  arrowContainerClassName,
  arrowElementClassName,
  ...rest
}: PopoverPrivateProps) {
  const arrowRef = useRef<HTMLDivElement | null>(null);

  const [isOpen, setIsOpen] = useUncontrolledProp(openProp, false, onOpenChange);

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
