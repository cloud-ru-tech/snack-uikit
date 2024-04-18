import { DroplistProps } from '@snack-uikit/list';

import { FieldSelectProps } from '../types';

export function extractListProps({
  dataError,
  noDataState,
  noResultsState,
  errorDataState,
  pinTop,
  pinBottom,
  dataFiltered,
  loading,
  footer,
  widthStrategy,
}: Partial<FieldSelectProps>): Partial<DroplistProps> {
  return {
    dataError,
    noDataState,
    noResultsState,
    errorDataState,
    pinTop,
    pinBottom,
    dataFiltered,
    loading,
    footer,
    widthStrategy,
    trigger: 'clickAndFocusVisible',
    placement: 'bottom',
    'data-test-id': 'field-select__list',
    scroll: true,
    marker: true,
  };
}
