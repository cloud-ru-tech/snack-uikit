export const BREAKPOINTS = {
  mobile: 767,
  tablet: 1023,
  smallDesktop: 1279,
  desktop: 1439,
};

export const CSS_BREAKPOINTS = {
  mobile: `(max-width: ${BREAKPOINTS.mobile}px)`,
  tablet: `(max-width: ${BREAKPOINTS.tablet}px)`,
  smallDesktop: `(max-width: ${BREAKPOINTS.smallDesktop}px)`,
  desktop: `(max-width: ${BREAKPOINTS.desktop}px)`,
  large: `(min-width: ${BREAKPOINTS.desktop + 1}px)`,
};
