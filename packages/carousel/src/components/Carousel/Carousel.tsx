import cn from 'classnames';
import { ReactElement, useCallback, useEffect, useMemo, useRef } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { PaginationSlider } from '@snack-uikit/pagination';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { TEST_IDS } from '../../testIds';
import { Control } from '../Control';
import { ItemProvider } from '../ItemProvider';
import styles from './styles.module.scss';

export type CarouselProps = WithSupportProps<{
  /** CSS - класснейм */
  className?: string;
  /** Массив айтемов */
  children: ReactElement[];
  /** Кол-во отображаемых единовременно айтемов @default 1 */
  showItems?: number;
  /** Сдвиг айтемов при смене 1 страницы @default Math.trunc(show) */
  scrollBy?: number;
  /** Время переключения 1 страницы (в s) @default 0.4 */
  transition?: number;
  /** Переключение страниц свайпом @default true */
  swipe?: boolean;
  /** Автоматическое переключение слайдов в секундах */
  autoSwipe?: number;
  /** Минимальная длина в px для активации свайпа @default 48 */
  swipeActivateLength?: number;
  /** Использовать стрелки для переключения страниц @default true */
  arrows?: boolean;
  /** Использовать пагинацию для переключения страниц @default true */
  pagination?: boolean;
  /** Расстояние между айтемами @default var(--dimension-2m)*/
  gap?: string;
  /** Управление состоянием извне */
  state?: {
    page: number;
    onChange(page: number): void;
  };
  /** Цикличная прокрутка @default false*/
  infiniteScroll?: boolean;
  /** Управление видимостью стрелок: 'hover' — по ховеру, 'always' — всегда @default 'hover' */
  controlsVisibility?: 'hover' | 'always';
}>;

export function Carousel({
  children: items,
  showItems = 1,
  scrollBy: scrollByProp,
  transition = 0.4,
  swipe = true,
  arrows = true,
  pagination = true,
  className,
  gap,
  state,
  infiniteScroll = false,
  swipeActivateLength = 48,
  autoSwipe,
  controlsVisibility = 'hover',
  ...rest
}: CarouselProps) {
  const timerRef = useRef<NodeJS.Timeout>();

  const scrollBy = useMemo(() => scrollByProp ?? Math.trunc(showItems), [showItems, scrollByProp]);

  const [page, setPage] = useUncontrolledProp<number>(state?.page, state?.page ?? 0, newPage => {
    const result = typeof newPage === 'function' ? newPage(page) : newPage;
    state?.onChange(result);
  });

  const total = useMemo(() => {
    if (items.length <= showItems) {
      return 1;
    }
    return 1 + Math.ceil((items.length - showItems) / scrollBy);
  }, [items.length, scrollBy, showItems]);

  const onLeftArrowClick = useCallback(() => {
    setPage((page: number) => (infiniteScroll ? (total + page - 1) % total : Math.max(0, page - 1)));
  }, [infiniteScroll, setPage, total]);

  const onRightArrowClick = useCallback(() => {
    setPage((page: number) => (infiniteScroll ? (page + 1) % total : Math.min(total - 1, page + 1)));
  }, [infiniteScroll, setPage, total]);

  const slideCallback = useCallback(
    (direction: number) => {
      if (direction < 0) {
        onRightArrowClick();
        return;
      }

      onLeftArrowClick();
    },
    [onLeftArrowClick, onRightArrowClick],
  );

  useEffect(() => {
    if (!autoSwipe || !infiniteScroll) {
      return;
    }

    timerRef.current = setTimeout(() => onRightArrowClick(), autoSwipe * 1000);

    return () => clearTimeout(timerRef.current);
  }, [autoSwipe, infiniteScroll, onRightArrowClick]);

  return (
    <div
      className={cn(styles.carousel, className)}
      data-controls-visibility={controlsVisibility}
      {...extractSupportProps(rest)}
    >
      <div className={styles.carouselBase}>
        <ItemProvider
          showItems={showItems}
          scrollBy={scrollBy}
          swipe={swipe}
          transition={transition}
          items={items}
          slideCallback={slideCallback}
          page={page}
          gap={gap}
          swipeActivateLength={swipeActivateLength}
        />

        {arrows && (
          <>
            {(infiniteScroll || page > 0) && (
              <Control
                onClick={onLeftArrowClick}
                variant='prev'
                data-test-id={TEST_IDS.arrowPrev}
                className={styles.control}
              />
            )}
            {(infiniteScroll || page + 1 < total) && (
              <Control
                onClick={onRightArrowClick}
                variant='next'
                data-test-id={TEST_IDS.arrowNext}
                className={styles.control}
              />
            )}
          </>
        )}
      </div>

      {pagination && (
        <div className={styles.pagination}>
          <PaginationSlider
            data-test-id={TEST_IDS.pagination}
            page={page + 1}
            onChange={(page: number) => {
              setPage(page - 1);
            }}
            total={total}
          />
        </div>
      )}
    </div>
  );
}
