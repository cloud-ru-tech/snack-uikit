import { IconPredefined } from '@snack-ui/icon-predefined';
import { CrossSVG, SearchSVG } from '@snack-ui/icons';

import { TableEmptyStateProps } from '../TableEmptyState';

export const DEFAULT_NO_DATA_TABLE_STATE: TableEmptyStateProps = {
  icon: CrossSVG,
  appearance: IconPredefined.appearances.Red,
  title: 'Data collection error',
  description: 'Try refreshing the page',
} as const;

export const DEFAULT_NO_RESULTS_TABLE_STATE: TableEmptyStateProps = {
  icon: SearchSVG,
  appearance: IconPredefined.appearances.Neutral,
  title: 'Not found',
  description: 'Try entering another query',
} as const;
