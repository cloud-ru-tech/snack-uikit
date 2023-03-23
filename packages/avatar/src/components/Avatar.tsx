import { useEffect, useState } from 'react';

import { StatusIndicator, StatusIndicatorProps } from '@snack-ui/status';
import { extractSupportProps, WithSupportProps } from '@snack-ui/utils';

import { Appearance, Shape, Size } from './constants';
import styles from './styles.module.scss';
import { getAbbreviation } from './utils';

export type AvatarProps = WithSupportProps<{
  name: string;
  src?: string;
  appearance?: Appearance;
  size?: Size;
  shape?: Shape;
  indicator?: StatusIndicatorProps['appearance'];
  showTwoSymbols?: boolean;
}>;

const statusIndicatorSizeMap = {
  [Size.Xxs]: StatusIndicator.sizes.Xxs,
  [Size.Xs]: StatusIndicator.sizes.Xs,
  [Size.S]: StatusIndicator.sizes.Xs,
  [Size.M]: StatusIndicator.sizes.M,
  [Size.L]: StatusIndicator.sizes.M,
  [Size.Xl]: StatusIndicator.sizes.L,
  [Size.Xxl]: StatusIndicator.sizes.L,
};

export function Avatar({
  name,
  appearance = Appearance.Red,
  size = Size.S,
  shape = Shape.Round,
  indicator,
  showTwoSymbols,
  src,
  ...rest
}: AvatarProps) {
  const [imageError, setImageError] = useState(false);
  const numberOfSymbols = size !== Size.Xxs && showTwoSymbols ? 2 : 1;

  useEffect(() => {
    setImageError(false);
  }, [src]);

  return (
    <div
      className={styles.avatar}
      data-size={size}
      data-appearance={appearance}
      data-shape={shape}
      {...extractSupportProps(rest)}
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

Avatar.sizes = Size;
Avatar.appearances = Appearance;
Avatar.shapes = Shape;
Avatar.indicators = StatusIndicator.appearances;
