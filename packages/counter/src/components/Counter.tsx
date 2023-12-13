import cn from 'classnames';

import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { APPEARANCE, DEFAULT_PLUS_LIMIT, SIZE, VARIANT } from './constants';
import classNames from './styles.module.scss';
import { Appearance, Size, Variant } from './types';
import { formatValue } from './utils';

export type CounterProps = WithSupportProps<{
  /** Значение */
  value: number;
  /** Внешний вид */
  appearance?: Appearance;
  /** Вариант */
  variant?: Variant;
  /** Размер */
  size?: Size;
  /** Порог сокращения значения в формат v+. Например `1500` -> `999+` для 1000 */
  plusLimit?: number;
  /** CSS-класс */
  className?: string;
}>;

/** Компонент счетчик */
export function Counter({
  value,
  appearance = APPEARANCE.Primary,
  variant = VARIANT.Count,
  size = SIZE.S,
  plusLimit = DEFAULT_PLUS_LIMIT,
  className,
  ...rest
}: CounterProps) {
  const formattedValue = formatValue({ value, variant, plusLimit });

  return (
    <div
      className={cn(classNames.counter, className)}
      {...extractSupportProps(rest)}
      data-size={size}
      data-variant={variant}
      data-appearance={appearance}
    >
      {formattedValue}
    </div>
  );
}
