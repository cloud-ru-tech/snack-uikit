import { MouseEvent, useEffect, useRef, useState } from 'react';

import { ButtonFunction } from '@snack-uikit/button';
import { ChevronLeftSVG, ChevronRightSVG } from '@snack-uikit/icons';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { SIZE, VARIANT } from '../../constants';
import { PaginationContext } from '../../contexts';
import { Size, Variant } from '../../types';
import { getPaginationEntries, PaginationEntry, PaginationEntryKind } from '../../utils';
import { PageMoreButton } from '../PageMoreButton';
import { PageNumberButton } from '../PageNumberButton';
import styles from './styles.module.scss';

export type PaginationProps = WithSupportProps<{
  /** Общее количество страниц */
  total: number;
  /** Текущая страница */
  page: number;
  /** Варианты тега кнопок: <a/> или <button/> */
  variant?: Variant;
  /** Максимальное количество страниц/элементов, помещающихся до транкейта */
  maxLength?: number;
  /** Колбэк смены значения */
  onChange(page: number, event?: MouseEvent<HTMLButtonElement | HTMLAnchorElement>): void;
  /** Колбэк форматирования ссылки */
  hrefFormatter?(page: number): string;
  /** CSS класснейм */
  className?: string;
  /** Размер
   * @default 's'
   */
  size?: Size;
}>;

const FIRST_PAGE = 1;
const ARROW_STEP = 1;
const MAX_LENGTH = 7;

export function Pagination({
  total,
  page,
  onChange,
  hrefFormatter,
  className,
  variant = VARIANT.Button,
  size = SIZE.S,
  maxLength = MAX_LENGTH,
  ...rest
}: PaginationProps) {
  const entries = getPaginationEntries({
    firstPage: FIRST_PAGE,
    lastPage: total,
    currentPage: page,
    maxLength,
  });

  const buttonRefs = useRef<(HTMLButtonElement | HTMLAnchorElement | undefined)[]>([]);
  const [buttonToFocus, setButtonToFocus] = useState(-1);

  useEffect(() => {
    buttonRefs.current[buttonToFocus]?.focus();
  }, [buttonToFocus]);

  const handlePreviousPageButtonClick = () => {
    const newPage = page - ARROW_STEP;
    onChange(newPage);

    if (newPage === FIRST_PAGE) {
      setButtonToFocus(FIRST_PAGE);
    }
  };

  const handleNextPageButtonClick = () => {
    const newPage = page + ARROW_STEP;
    onChange(newPage);

    if (newPage === total) {
      setButtonToFocus(total);
    }
  };

  const handleMoreButtonClick = (start: number, end: number) => {
    const page = Math.floor((start + end) / 2);
    onChange(page);
    setButtonToFocus(page);
  };

  const renderEntry = (entry: PaginationEntry) => {
    if (entry.kind === PaginationEntryKind.Page) {
      return (
        <li key={entry.page}>
          <PageNumberButton
            page={entry.page}
            activated={entry.page === page}
            onClick={onChange}
            setButtonRef={(el: HTMLButtonElement | HTMLAnchorElement) => {
              buttonRefs.current[entry.page] = el;
            }}
            hrefFormatter={hrefFormatter}
          />
        </li>
      );
    }

    if (entry.kind === PaginationEntryKind.Break) {
      return (
        <li key={`${entry.start}-${entry.end}`}>
          <PageMoreButton start={entry.start} end={entry.end} onClick={handleMoreButtonClick} />
        </li>
      );
    }
  };

  return (
    <PaginationContext.Provider value={{ size, variant }}>
      <nav className={className} {...extractSupportProps(rest)}>
        <ul className={styles.pagination}>
          <li>
            <ButtonFunction
              icon={<ChevronLeftSVG />}
              onClick={handlePreviousPageButtonClick}
              disabled={page === FIRST_PAGE}
              data-test-id='page-prev-button'
              size={size}
            />
          </li>
          {entries.map(renderEntry)}
          <li>
            <ButtonFunction
              icon={<ChevronRightSVG />}
              onClick={handleNextPageButtonClick}
              disabled={page === total}
              data-test-id='page-next-button'
              size={size}
            />
          </li>
        </ul>
      </nav>
    </PaginationContext.Provider>
  );
}
