import cn from 'classnames';
import { useEffect, useState } from 'react';

import { StatusIndicator, StatusIndicatorProps } from '@snack-uikit/status';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { APPEARANCE, SHAPE, SIZE } from './constants';
import styles from './styles.module.scss';
import { Appearance, Shape, Size } from './types';
import { getAbbreviation } from './utils';

export type AvatarProps = WithSupportProps<{
  /** Имя */
  name: string;
  /** src аттрибут изображеня */
  src?: string;
  /** Внешний вид */
  appearance?: Appearance;
  /** Размер */
  size?: Size;
  /** Форма: круглая или квадратная */
  shape?: Shape;
  /** Индикатор */
  indicator?: StatusIndicatorProps['appearance'];
  /** Отображение двух заглавных символов имени */
  showTwoSymbols?: boolean;
  /** CSS-класс */
  className?: string;
}>;

const statusIndicatorSizeMap: Record<Size, StatusIndicatorProps['size']> = {
  [SIZE.Xxs]: 'xxs',
  [SIZE.Xs]: 'xs',
  [SIZE.S]: 'xs',
  [SIZE.M]: 'm',
  [SIZE.L]: 'm',
  [SIZE.Xl]: 'l',
  [SIZE.Xxl]: 'l',
};

/**
 * Компонент отображения аватара пользователя.
 * @constructor
 */
export function Avatar({
  name,
  appearance = APPEARANCE.Red,
  size = SIZE.S,
  shape = SHAPE.Round,
  indicator,
  showTwoSymbols,
  src,
  className,
  ...rest
}: AvatarProps) {
  const [imageError, setImageError] = useState(false);
  const numberOfSymbols = size !== SIZE.Xxs && showTwoSymbols ? 2 : 1;

  useEffect(() => {
    setImageError(false);
  }, [src]);

  return (
    <div
      className={cn(styles.avatar, className)}
      {...extractSupportProps(rest)}
      data-size={size}
      data-appearance={appearance}
      data-shape={shape}
    >
      {src && !imageError ? (
        <img data-test-id='image' className={styles.image} src={src} onError={() => setImageError(true)} alt='' />
      ) : (
        <div data-test-id='abbreviation'>{getAbbreviation(name, numberOfSymbols)}</div>
      )}
      {indicator && (
        <div className={styles.indicatorWrapper}>
          <StatusIndicator data-test-id='indicator' appearance={indicator} size={statusIndicatorSizeMap[size]} />
        </div>
      )}
    </div>
  );
}
