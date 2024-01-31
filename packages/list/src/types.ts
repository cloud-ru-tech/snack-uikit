import { RefObject } from 'react';

export type SearchState = {
  placeholder?: string;
  value?: string;
  onChange(value: string): void;
  loading?: boolean;
};

export type ScrollProps = {
  /** Включить ли скролл для основной части списка */
  scroll?: boolean;
  /** Ссылка на элемент, обозначающий самый конец прокручиваемого списка */
  scrollRef?: RefObject<HTMLElement>;
  /** Ссылка на контейнер, который скроллится */
  scrollContainerRef?: RefObject<HTMLElement>;
};
