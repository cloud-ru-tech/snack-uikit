import { useMemo } from 'react';

import { HeartFilledSVG, HeartSVG, StarFilledSVG, StarSVG } from '@snack-uikit/icons';

import { FAVORITE_ICON, SIZE } from '../../constants';
import { FavoriteIcon, ToggleProps } from '../../types';
import { getIconSize, getVisualStateAttributes } from '../../utils';
import { TogglePrivate } from '../TogglePrivate';
import styles from './styles.module.scss';

const CHECKED_ICONS = {
  [FAVORITE_ICON.Star]: StarFilledSVG,
  [FAVORITE_ICON.Heart]: HeartFilledSVG,
};

const UNCHECKED_ICONS = {
  [FAVORITE_ICON.Star]: StarSVG,
  [FAVORITE_ICON.Heart]: HeartSVG,
};

export type FavoriteProps = Omit<ToggleProps, 'disabled'> & {
  /** Иконка */
  icon?: FavoriteIcon;
};

export function Favorite({
  inputRef,
  'data-test-id': dataTestId,
  size = SIZE.M,
  icon = FAVORITE_ICON.Heart,
  ...restProps
}: FavoriteProps) {
  const iconSize = useMemo(() => getIconSize(size), [size]);

  return (
    <TogglePrivate
      {...restProps}
      data-test-id={dataTestId}
      ref={inputRef}
      size={size}
      render={function Favorite(visualState) {
        const Icon = visualState.checked ? CHECKED_ICONS[icon] : UNCHECKED_ICONS[icon];
        const data = getVisualStateAttributes({ ...visualState, icon });
        return (
          <div className={styles.container} {...data}>
            <Icon className={styles.icon} {...data} size={iconSize} />
          </div>
        );
      }}
    />
  );
}
