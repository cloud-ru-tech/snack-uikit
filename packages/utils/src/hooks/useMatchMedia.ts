import { useLayoutEffect, useState } from 'react';

import { CSS_BREAKPOINTS } from '../styles/breakpoints';

enum QueriesTitle {
  IsMobile = 'isMobile',
  IsTablet = 'isTablet',
  IsSmallDesktop = 'isSmallDesktop',
  IsDesktop = 'isDesktop',
  IsLarge = 'isLarge',
}

const queries: Record<QueriesTitle, string> = {
  [QueriesTitle.IsMobile]: CSS_BREAKPOINTS.mobile,
  [QueriesTitle.IsTablet]: CSS_BREAKPOINTS.tablet,
  [QueriesTitle.IsSmallDesktop]: CSS_BREAKPOINTS.smallDesktop,
  [QueriesTitle.IsDesktop]: CSS_BREAKPOINTS.desktop,
  [QueriesTitle.IsLarge]: CSS_BREAKPOINTS.large,
};

const initialQueriesValue = {
  [QueriesTitle.IsMobile]: false,
  [QueriesTitle.IsTablet]: false,
  [QueriesTitle.IsSmallDesktop]: false,
  [QueriesTitle.IsDesktop]: false,
  [QueriesTitle.IsLarge]: false,
};

const mediaQueries = Object.entries(queries).reduce(
  (acc, [key, q]) => ({ ...acc, [key]: window.matchMedia(q) }),
  {},
) as Record<QueriesTitle, MediaQueryList>;

const mediaQueryLists = Object.entries(mediaQueries) as Array<[QueriesTitle, MediaQueryList]>;

const getMediaQueryValue = () =>
  mediaQueryLists.reduce((acc, [key, q]) => ({ ...acc, [key]: q.matches }), initialQueriesValue);

export const useMatchMedia = (): Record<QueriesTitle, boolean> => {
  const [value, setValue] = useState(getMediaQueryValue);

  useLayoutEffect(() => {
    const handler = () => setValue(getMediaQueryValue);

    mediaQueryLists.forEach(([, mql]) => mql.addEventListener('change', handler));

    return (): void => mediaQueryLists.forEach(([, mql]) => mql.removeEventListener('change', handler));
  }, []);

  return value;
};
