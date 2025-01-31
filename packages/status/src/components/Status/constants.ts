import { SIZE as StatusIndicatorSize } from '../StatusIndicator/constants';

export const SIZE = {
  Xs: 'xs',
  S: 's',
} as const;

export const STATUS_INDICATOR_SIZE_MAP = {
  [SIZE.Xs]: StatusIndicatorSize.Xs,
  [SIZE.S]: StatusIndicatorSize.S,
};

export const LOADER_SIZE_MAP = {
  [SIZE.Xs]: 'xxs',
  [SIZE.S]: 'xs',
} as const;
