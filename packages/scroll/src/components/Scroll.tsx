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

import { WithSupportProps } from '@snack-ui/utils';

import {
  AUTOSCROLL_ENABLE_LIMIT,
  AutoscrollTo,
  BAR_AUTO_HIDE_DELAY_MS,
  BarHideStrategy,
  Resize,
  Size,
} from '../constants';
import styles from './styles.module.scss';

export type ScrollProps = WithSupportProps<
  PropsWithChildren<{
    className?: string;
    size?: Size;
    clickScrolling?: boolean;
    autoscrollTo?: AutoscrollTo;
    barHideStrategy?: BarHideStrategy;
    onScroll?: (event?: Event) => void;
    resize?: Resize;
    untouchableScrollbars?: boolean;
  }>
>;

type PositionsRef = {
  scrolledToRight: boolean;
  scrolledToBottom: boolean;
};

const ScrollComponent = forwardRef<HTMLElement, ScrollProps>(function Scroll(
  {
    children,
    className,
    onScroll: onScrollProp,
    size = Size.M,
    resize = Resize.None,
    clickScrolling = true,
    barHideStrategy = BarHideStrategy.Leave,
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
    const instance = getOSInstance();
    if (instance && isOverlayScrollbarInited) {
      syncPositions();
      autoscrollTo === AutoscrollTo.Bottom && instance.scroll({ y: '100%' }, 0);
      autoscrollTo === AutoscrollTo.Right && instance.scroll({ x: '100%' }, 0);
    }
    /* здесь умышленно autoscrollTo не входит в депсы хука, потому что его значение интересно только на момент маунта,
    но в дальнейшем не должно триггерить эту функцию */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getOSInstance, isOverlayScrollbarInited, syncPositions]);

  const onInitialized = useCallback(() => setOverlayScrollbarInited(true), []);

  const onScroll = useCallback(
    (event?: UIEvent) => {
      onScrollProp?.(event);
      syncPositions();
    },
    [onScrollProp, syncPositions],
  );

  const onContentSizeChanged = useCallback(() => {
    const instance = getOSInstance();
    if (instance) {
      if (lastPositionsRef.current.scrolledToBottom && autoscrollTo === AutoscrollTo.Bottom) {
        instance.scroll({ y: '100%' }, 0);
      }
      if (lastPositionsRef.current.scrolledToRight && autoscrollTo === AutoscrollTo.Right) {
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

export const Scroll = ScrollComponent as typeof ScrollComponent & {
  sizes: typeof Size;
  barHideStrategies: typeof BarHideStrategy;
  resizes: typeof Resize;
  autoscrollTo: typeof AutoscrollTo;
};

Scroll.sizes = Size;
Scroll.barHideStrategies = BarHideStrategy;
Scroll.resizes = Resize;
Scroll.autoscrollTo = AutoscrollTo;
