import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';

import { generateRows } from './helpers';
import { StubData } from './types';

export function useInfiniteLoading({
  rowsAmount,
  infiniteLoading,
  filteredData,
  setFilteredData,
}: {
  rowsAmount: number;
  infiniteLoading?: boolean;
  filteredData: StubData[];
  setFilteredData: Dispatch<SetStateAction<StubData[]>>;
}) {
  const observer = useRef<IntersectionObserver>();
  const timeout = useRef<NodeJS.Timeout>();

  const scrollRef = useRef<HTMLElement>(null);

  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const rowsAmountForInfiniteLoading = rowsAmount + 20;

  useEffect(() => {
    if (!infiniteLoading) return;

    if (filteredData.length > rowsAmountForInfiniteLoading) {
      setHasMore(false);
      setLoading(false);
      clearTimeout(timeout.current);
      return;
    }
  }, [rowsAmountForInfiniteLoading, filteredData.length, infiniteLoading]);

  const fetchMore = useCallback(async () => {
    if (filteredData.length > rowsAmountForInfiniteLoading) {
      return;
    }

    setLoading(true);
    timeout.current = setTimeout(() => {
      setFilteredData(items => items.concat(generateRows(10)));

      setLoading(false);
    }, 2000);
  }, [filteredData.length, rowsAmountForInfiniteLoading, setFilteredData]);

  useEffect(() => {
    if (!infiniteLoading) return;

    const handleObserver = (entities: IntersectionObserverEntry[]) => {
      const target = entities[0];

      if (target.isIntersecting && hasMore && !loading) {
        setLoading(true);
        fetchMore();
      }
    };

    observer.current = new IntersectionObserver(handleObserver);

    if (scrollRef.current) {
      observer.current.observe(scrollRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [fetchMore, hasMore, infiniteLoading, loading]);

  return {
    loading,
    scrollRef,
  };
}
