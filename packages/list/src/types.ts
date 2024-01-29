import { RefObject } from 'react';

export type SearchState = {
  placeholder?: string;
  value?: string;
  onChange(value: string): void;
  loading?: boolean;
};

export type ScrollProps = {
  scroll?: boolean;
  scrollRef?: RefObject<HTMLElement>;
  scrollContainerRef?: RefObject<HTMLElement>;
};
