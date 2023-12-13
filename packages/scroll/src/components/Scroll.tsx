import 'overlayscrollbars/css/OverlayScrollbars.css';

import cn from 'classnames';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import {
  forwardRef,
  PropsWithChildren,
  useCallback,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { WithSupportProps } from '@snack-uikit/utils';

import {
  AUTOSCROLL_ENABLE_LIMIT,
  AUTOSCROLL_TO,
  BAR_AUTO_HIDE_DELAY_MS,
  BAR_HIDE_STRATEGY,
  RESIZE,
  SIZE,
} from '../constants';
import { AutoscrollTo, BarHideStrategy, Resize, Size } from '../types';
import styles from './styles.module.scss';

export type ScrollProps = WithSupportProps<
  PropsWithChildren<{
    className?: string;
    /** Размер скролбаров */
    size?: Size;
    /** Скролить ли по клику в скроллбар. */
    clickScrolling?: boolean;
    /**
     * Включает автоскрол при маунте и изменении размера контента:
     * <br> - `bottom` - автоскрол вниз,
     * <br> - `right` - автоскрол вправо,
     */
    autoscrollTo?: AutoscrollTo;
    /**
     * Управление скрытием скролл баров:
     * <br> - `Never` - показывать всегда
     * <br> - `Leave` - скрывать когда курсор покидает компонент
     * <br> - `Scroll` - показывать только когда происходит скроллинг
     * <br> - `Move` - показывать при движении курсора над компонентом
     */
    barHideStrategy?: BarHideStrategy;
    /** Колбек события скрола. */
    onScroll?: (event?: Event) => void;
    /**
     * Настройка возможности регулировать Scroll-контейнер:
     * <br> - `None` - нельзя изменять размер
     * <br> - `Horizontal` - можно изменять размер только по горизонтали
     * <br> - `Vertical` - можно изменять размер только по вертикали
     * <br> - `Both` - можно изменять размер в обеих координатах
     */
    resize?: Resize;
    /** Отключает возможность взаимодействовать со скролбарами мышью. */
    untouchableScrollbars?: boolean;
  }>
>;

type PositionsRef = {
  scrolledToRight: boolean;
  scrolledToBottom: boolean;
};

export const Scroll = forwardRef<HTMLElement, ScrollProps>(function Scroll(
  {
    children,
    className,
    onScroll: onScrollProp,
    size = SIZE.M,
    resize = RESIZE.None,
    clickScrolling = true,
    barHideStrategy = BAR_HIDE_STRATEGY.Leave,
    autoscrollTo,
    untouchableScrollbars = false,
    ...rest
  },
  ref,
) {
  const overlayScrollbarsRef = useRef<OverlayScrollbarsComponent | null>(null);
  const [isOverlayScrollbarInited, setOverlayScrollbarInited] = useState(false);
  const getOSInstance = useCallback(
    (overlayScrollbars = overlayScrollbarsRef.current) => overlayScrollbars?.osInstance(),
    [overlayScrollbarsRef],
  );

  useImperativeHandle<HTMLElement | null, HTMLElement | null>(
    ref,
    () => (overlayScrollbarsRef.current?.osInstance()?.getElements('viewport') ?? null) as HTMLElement | null,
  );

  const lastPositionsRef = useRef<PositionsRef>({ scrolledToBottom: false, scrolledToRight: false });

  const syncPositions = useCallback(
    (scrollbars?: OverlayScrollbarsComponent | null) => {
      const instance = getOSInstance(scrollbars);
      if (instance) {
        const { viewport } = instance.getElements();
        const gapToBottom = viewport.scrollHeight - (viewport.offsetHeight + viewport.scrollTop);
        const gapToRight = viewport.scrollWidth - (viewport.offsetWidth + viewport.scrollLeft);
        const hasYScroll = viewport.scrollHeight > viewport.offsetHeight;
        const hasXScroll = viewport.scrollWidth > viewport.offsetWidth;
        lastPositionsRef.current.scrolledToBottom = gapToBottom < AUTOSCROLL_ENABLE_LIMIT || !hasYScroll;
        lastPositionsRef.current.scrolledToRight = gapToRight < AUTOSCROLL_ENABLE_LIMIT || !hasXScroll;
      }
    },
    [getOSInstance],
  );

  useLayoutEffect(() => {
    if (!autoscrollTo) return;

    const instance = getOSInstance();
    if (instance && isOverlayScrollbarInited) {
      syncPositions();
      autoscrollTo === AUTOSCROLL_TO.Bottom && instance.scroll({ y: '100%' }, 0);
      autoscrollTo === AUTOSCROLL_TO.Right && instance.scroll({ x: '100%' }, 0);
    }
    /* здесь умышленно autoscrollTo не входит в депсы хука, потому что его значение интересно только на момент маунта,
    но в дальнейшем не должно триггерить эту функцию */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getOSInstance, isOverlayScrollbarInited, syncPositions]);

  const onInitialized = useCallback(() => setOverlayScrollbarInited(true), []);

  const onScroll = useCallback(
    (event?: UIEvent) => {
      onScrollProp?.(event);

      if (autoscrollTo) {
        syncPositions();
      }
    },
    /* autoscrollTo не аффектит на расчеты в syncPositions */
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onScrollProp, syncPositions],
  );

  const onContentSizeChanged = useCallback(() => {
    if (!autoscrollTo) return;

    const instance = getOSInstance();
    if (instance) {
      if (lastPositionsRef.current.scrolledToBottom && autoscrollTo === AUTOSCROLL_TO.Bottom) {
        instance.scroll({ y: '100%' }, 0);
      }
      if (lastPositionsRef.current.scrolledToRight && autoscrollTo === AUTOSCROLL_TO.Right) {
        instance.scroll({ x: '100%' }, 0);
      }
    }
  }, [getOSInstance, autoscrollTo]);

  return (
    <OverlayScrollbarsComponent
      {...rest}
      ref={overlayScrollbarsRef}
      data-size={size}
      data-untouchable-scrollbars={untouchableScrollbars || undefined}
      className={cn(className, styles.scroll, 'osThemeSnack')}
      options={{
        resize,
        scrollbars: {
          autoHide: barHideStrategy,
          autoHideDelay: BAR_AUTO_HIDE_DELAY_MS,
          clickScrolling,
        },
        callbacks: {
          onInitialized,
          onScroll,
          onContentSizeChanged,
        },
      }}
    >
      {children}
    </OverlayScrollbarsComponent>
  );
});
