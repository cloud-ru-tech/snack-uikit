import FuzzySearch from 'fuzzy-search';
import { KeyboardEvent, KeyboardEventHandler, useCallback } from 'react';

import { AccordionOption, BaseOption, ContentRenderProps, FilterOption, NestListOption } from './types';

type UseHandleOnKeyDownProps = {
  setOpen(open: boolean): void;
};

export function useHandleOnKeyDown({ setOpen }: UseHandleOnKeyDownProps) {
  return useCallback(
    (onKeyDown?: KeyboardEventHandler<HTMLElement>) => (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.code === 'Space') {
        e.stopPropagation();
      } else {
        onKeyDown?.(e);
      }

      if (['ArrowDown'].includes(e.key)) {
        e.preventDefault();
        setOpen(true);
      }

      if (['ArrowUp'].includes(e.key)) {
        e.preventDefault();
        setOpen(false);
      }

      if (e.key === 'Tab') {
        setOpen(false);
      }
    },
    [setOpen],
  );
}

const DEFAULT_MIN_SEARCH_INPUT_LENGTH = 2;

/**
 * Нечеткий поиск среди айтемов по полям 'content.option', 'content.caption', 'content.description', 'label'
 */
export function useFuzzySearch<T extends ContentRenderProps = ContentRenderProps>(
  options: FilterOption<T>[],
  flatMapOptions: (BaseOption<T> | AccordionOption<T> | NestListOption<T>)[],
  minSearchInputLength?: number,
) {
  return useCallback(
    (search: string) => {
      const searcher = new FuzzySearch(
        flatMapOptions,
        ['label', 'contentRenderProps.description', 'contentRenderProps.caption'],
        {},
      );

      return search.length > (minSearchInputLength ?? DEFAULT_MIN_SEARCH_INPUT_LENGTH)
        ? searcher.search(search)
        : options;
    },
    [flatMapOptions, minSearchInputLength, options],
  );
}
