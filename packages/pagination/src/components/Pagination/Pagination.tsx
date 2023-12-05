import { useEffect, useRef, useState } from 'react';

import { ButtonFunction } from '@snack-uikit/button';
import { ChevronLeftSVG, ChevronRightSVG } from '@snack-uikit/icons';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { getPaginationEntries, PaginationEntry, PaginationEntryKind } from '../../utils';
import { PageMoreButton } from '../PageMoreButton';
import { PageNumberButton } from '../PageNumberButton';
import styles from './styles.module.scss';

export type PaginationProps = WithSupportProps<{
  /** Общее количество страниц */
  total: number;
  /** Текущая страница */
  page: number;
  /** Колбек смены значения */
  onChange(page: number): void;
  className?: string;
}>;

const FIRST_PAGE = 1;
const ARROW_STEP = 1;
const MAX_LENGTH = 7;

export function Pagination({ total, page, onChange, className, ...rest }: PaginationProps) {
  const entries = getPaginationEntries({
    firstPage: FIRST_PAGE,
    lastPage: total,
    currentPage: page,
    maxLength: MAX_LENGTH,
  });

  const buttonRefs = useRef<(HTMLButtonElement | undefined)[]>([]);
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
            setButtonRef={(el: HTMLButtonElement) => {
              buttonRefs.current[entry.page] = el;
            }}
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
    <nav className={className} {...extractSupportProps(rest)}>
      <ul className={styles.pagination}>
        <li>
          <ButtonFunction
            icon={<ChevronLeftSVG />}
            onClick={handlePreviousPageButtonClick}
            disabled={page === FIRST_PAGE}
            data-test-id='page-prev-button'
          />
        </li>
        {entries.map(renderEntry)}
        <li>
          <ButtonFunction
            icon={<ChevronRightSVG />}
            onClick={handleNextPageButtonClick}
            disabled={page === total}
            data-test-id='page-next-button'
          />
        </li>
      </ul>
    </nav>
  );
}
