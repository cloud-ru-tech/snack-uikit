import FuzzySearch from 'fuzzy-search';
import { KeyboardEvent, KeyboardEventHandler, useCallback } from 'react';

import { ButtonFilled, ButtonFunction } from '@snack-uikit/button';
import { DroplistProps, ItemId } from '@snack-uikit/list';
import { useLocale } from '@snack-uikit/locale';

import { CHIP_CHOICE_TEST_IDS } from '../../constants';
import { Size } from '../../types';
import { DROPLIST_FOOTER_SIZE_MAP } from './constants';
import styles from './styles.module.scss';
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
export function useOptionSearch<T extends ContentRenderProps = ContentRenderProps>({
  options,
  flatMapOptions,
  minSearchInputLength,
  disableFuzzySearch,
}: {
  options: FilterOption<T>[];
  flatMapOptions: (BaseOption<T> | AccordionOption<T> | NestListOption<T>)[];
  minSearchInputLength?: number;
  disableFuzzySearch?: boolean;
}) {
  return useCallback(
    (search: string) => {
      if (search.length < (minSearchInputLength ?? DEFAULT_MIN_SEARCH_INPUT_LENGTH)) return options;

      if (disableFuzzySearch) {
        return options.filter(option => {
          const fieldsForSearch = [option.label];

          if ('contentRenderProps' in option) {
            fieldsForSearch.push(option?.contentRenderProps?.description);
            fieldsForSearch.push(option?.contentRenderProps?.caption);
          }

          return fieldsForSearch
            .filter((v): v is ItemId => Boolean(v))
            .some(value => value.toString().includes(search));
        });
      }

      return new FuzzySearch(
        flatMapOptions,
        ['label', 'contentRenderProps.description', 'contentRenderProps.caption'],
        {},
      ).search(search);
    },
    [disableFuzzySearch, flatMapOptions, minSearchInputLength, options],
  );
}

type UseAutoApplyProps = {
  autoApply: boolean;
  size: Size;
  onApprove: () => void;
  onCancel: () => void;
};

export function useAutoApply({
  autoApply,
  size,
  onApprove,
  onCancel,
}: UseAutoApplyProps): () => DroplistProps['pinBottom'] {
  const { t } = useLocale('Chips');

  return useCallback(() => {
    if (autoApply) {
      return;
    }

    return [
      {
        content: (
          <div className={styles.choiceChipFooter} data-size={size} data-test-id={CHIP_CHOICE_TEST_IDS.footer}>
            <ButtonFunction
              size={DROPLIST_FOOTER_SIZE_MAP[size]}
              appearance='neutral'
              label={t('cancel')}
              onClick={onCancel}
              data-test-id={CHIP_CHOICE_TEST_IDS.cancelButton}
            />
            <ButtonFilled
              size={DROPLIST_FOOTER_SIZE_MAP[size]}
              appearance='primary'
              label={t('apply')}
              onClick={onApprove}
              data-test-id={CHIP_CHOICE_TEST_IDS.approveButton}
            />
          </div>
        ),
        inactive: true,
      },
    ] as DroplistProps['pinBottom'];
  }, [t, autoApply, size, onApprove, onCancel]);
}
