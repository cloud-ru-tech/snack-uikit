import cn from 'classnames';

import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { Appearance, DEFAULT_PLUS_LIMIT, Size, Variant } from './constants';
import classNames from './styles.module.scss';
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
  appearance = Appearance.Primary,
  variant = Variant.Count,
  size = Size.S,
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

Counter.appearances = Appearance;
Counter.variants = Variant;
Counter.sizes = Size;
