import { extractSupportProps, WithSupportProps } from '@snack-ui/utils';

import { Appearance, DEFAULT_PLUS_LIMIT, Size, Variant } from './constants';
import classNames from './styles.module.scss';
import { formatValue } from './utils';

export type CounterProps = WithSupportProps<{
  value: number;
  appearance?: Appearance;
  variant?: Variant;
  size?: Size;
  plusLimit?: number;
}>;

export function Counter({
  value,
  appearance = Appearance.Primary,
  variant = Variant.Count,
  size = Size.S,
  plusLimit = DEFAULT_PLUS_LIMIT,
  ...rest
}: CounterProps) {
  const formattedValue = formatValue({ value, variant, plusLimit });

  return (
    <div
      className={classNames.counter}
      data-size={size}
      data-variant={variant}
      data-appearance={appearance}
      {...extractSupportProps(rest)}
    >
      {formattedValue}
    </div>
  );
}

Counter.appearances = Appearance;
Counter.variants = Variant;
Counter.sizes = Size;