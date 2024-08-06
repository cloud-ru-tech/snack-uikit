import { RefObject } from 'react';

import { ScrollProps as OriginalScrollProps } from '@snack-uikit/scroll';

export type SearchState = {
  placeholder?: string;
  loading?: boolean;
  value?: string;
  onChange(value: string): void;
};

export type ScrollProps = {
  /** Включить ли скролл для основной части списка */
  scroll?: boolean;
  /** Ссылка на элемент, обозначающий самый конец прокручиваемого списка */
  scrollRef?: RefObject<HTMLElement>;
  /** Ссылка на контейнер, который скроллится */
  scrollContainerRef?: RefObject<HTMLElement>;
  /** Колбек на скролл прокручиваемого списка */
  onScroll?: OriginalScrollProps['onScroll'];
};
