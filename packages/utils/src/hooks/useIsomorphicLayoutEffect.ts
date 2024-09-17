// eslint-disable-next-line no-restricted-imports
import { useEffect, useLayoutEffect as useLayoutEffectInternal } from 'react';

import { isBrowser } from '../utils';

export const useLayoutEffect = isBrowser() ? useLayoutEffectInternal : useEffect;
