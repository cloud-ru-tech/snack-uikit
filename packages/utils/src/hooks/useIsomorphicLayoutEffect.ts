// eslint-disable-next-line no-restricted-imports
import { useEffect, useLayoutEffect as useLayoutEffectInternal } from 'react';

import { isBrowser } from '../utils';

/**
 * Хук используется вместо стандартного useLayoutEffect-а,
 * нужен для корректной работы SSR
 * @function React hook
 */
export const useLayoutEffect = isBrowser() ? useLayoutEffectInternal : useEffect;
