import { Dictionary } from '../types';

export const en_GB = {
  Table: {
    searchPlaceholder: 'Search',
    noData: {
      title: 'No data',
    },
    noResults: {
      title: 'Nothing found',
      description: 'Try entering another query',
    },
    errorData: {
      title: 'Error loading data',
      description: 'Try refreshing the page',
    },
    rowsOptionsLabel: 'Rows volume',
    export: 'Export to ',
    groupSelectButton: {
      hide: 'Hide all',
      show: 'Show all',
    },
    settingsHeaderLabel: 'Display settings',
  },
  List: {
    noData: {
      description: 'No data',
    },
    noResults: {
      description: 'Nothing found',
    },
    errorData: {
      description: 'Error loading data',
    },
    groupSelectButton: {
      reset: 'Reset all',
      select: 'Select all',
    },
  },
  Chips: {
    allLabel: 'All',
    apply: 'Apply',
    cancel: 'Cancel',
    add: 'Add',
    clear: 'Clear',
    resetFilter: 'Reset filter value',
    addButtonDisabledTip: 'No more filters to add',
  },
  Fields: {
    limitTooltip: {
      max: 'Value should be less or equal ',
      min: 'Value should be greater or equal ',
    },
  },
  SearchPrivate: {
    placeholder: 'Search',
  },
  ColorPicker: {
    apply: 'Apply',
    cancel: 'Cancel',
  },
  Calendar: {
    current: 'Current',
    time: 'Time',
    presets: 'Presets',
    defaultPresets: {
      lastWeek: 'Last 7 days',
      lastTwoWeeks: 'Last 14 days',
      lastMonth: 'Last 30 days',
      lastQuarter: 'Last 90 days',
      lastThird: 'Last 120 days',
      lastYear: 'Last 1 year',
      lastTwoYears: 'Last 2 years',
    },
  },
  Toolbar: {
    hideFilters: 'Hide filters',
    showFilters: 'Show filters',
  },
  ToastUpload: {
    title: {
      loading: 'Loading...',
      error: 'Error loading...',
      pause: 'Paused loading',
      errorUploaded: 'Error uploaded',
      uploaded: 'Uploaded',
    },
  },
} satisfies Dictionary;
