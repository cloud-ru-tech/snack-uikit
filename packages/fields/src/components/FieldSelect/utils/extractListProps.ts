import { DroplistProps } from '@snack-uikit/list';

import { FieldSelectProps } from '../types';

export function extractListProps({
  dataError,
  noDataState,
  noResultsState,
  errorDataState,
  dataFiltered,
  loading,
  footer,
  widthStrategy,
  scrollToSelectedItem,
  virtualized,
  scrollRef,
  scrollContainerRef,
  onScroll,
}: Partial<FieldSelectProps>): Partial<DroplistProps> {
  return {
    dataError,
    noDataState,
    noResultsState,
    errorDataState,
    dataFiltered,
    loading,
    footer,
    widthStrategy,
    scrollToSelectedItem,
    scrollRef,
    scrollContainerRef,
    onScroll,
    trigger: 'clickAndFocusVisible',
    placement: 'bottom',
    'data-test-id': 'field-select__list',
    virtualized,
    scroll: true,
    marker: true,
  };
}
