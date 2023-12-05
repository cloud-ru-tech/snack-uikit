import { SortDirection } from '@tanstack/react-table';

import { ArrowDownSVG, ArrowUpSVG } from '@snack-uikit/icons';

export function getSortingIcon(sort?: SortDirection | false) {
  switch (sort) {
    case 'asc':
      return <ArrowUpSVG size={16} />;
    case 'desc':
      return <ArrowDownSVG size={16} />;
    default:
      return null;
  }
}
