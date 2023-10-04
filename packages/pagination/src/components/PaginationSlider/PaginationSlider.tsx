import { extractSupportProps, WithSupportProps } from '@snack-ui/utils';

import { getRange } from '../../utils';
import { PageSliderButton } from '../PageSliderButton';
import styles from './styles.module.scss';

export type PaginationSliderProps = WithSupportProps<{
  /** Общее количество страниц */
  total: number;
  /** Текущая страница */
  page: number;
  /** Колбек смены значения */
  onChange(page: number): void;
  className?: string;
}>;

const FIRST_PAGE = 1;

export function PaginationSlider({ total, page, onChange, className, ...rest }: PaginationSliderProps) {
  return (
    <nav className={className} {...extractSupportProps(rest)}>
      <ul className={styles.paginationSlider}>
        {getRange(FIRST_PAGE, total).map(value => (
          <li key={value}>
            <PageSliderButton
              activated={value === page}
              onClick={() => onChange(value)}
              data-test-id={`page-button-slider-${value}`}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}
