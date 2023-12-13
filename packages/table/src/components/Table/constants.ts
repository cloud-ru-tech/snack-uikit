import { CrossSVG, SearchSVG } from '@snack-uikit/icons';

import { TableEmptyStateProps } from '../TableEmptyState';

export const DEFAULT_NO_DATA_TABLE_STATE: TableEmptyStateProps = {
  icon: CrossSVG,
  appearance: 'red',
  title: 'Data collection error',
  description: 'Try refreshing the page',
} as const;

export const DEFAULT_NO_RESULTS_TABLE_STATE: TableEmptyStateProps = {
  icon: SearchSVG,
  appearance: 'neutral',
  title: 'Not found',
  description: 'Try entering another query',
} as const;
