import { HeartFilledSVG, HeartSVG, StarFilledSVG, StarSVG } from '@snack-ui/icons';

import { FavoriteIcon, LabelPosition, Size, Width } from '../../constants';
import { ToggleProps } from '../../types';
import { getVisualStateAttributes } from '../../utils';
import { TogglePrivate } from '../TogglePrivate';
import styles from './styles.module.scss';

const CHECKED_ICONS = {
  [FavoriteIcon.Star]: StarFilledSVG,
  [FavoriteIcon.Heart]: HeartFilledSVG,
};

const UNCHECKED_ICONS = {
  [FavoriteIcon.Star]: StarSVG,
  [FavoriteIcon.Heart]: HeartSVG,
};

export type FavoriteProps = Omit<ToggleProps, 'disabled'> & {
  /** Иконка */
  icon?: FavoriteIcon;
};

export function Favorite({
  inputRef,
  'data-test-id': dataTestId,
  size = Size.M,
  icon = FavoriteIcon.Heart,
  ...restProps
}: FavoriteProps) {
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
            <Icon className={styles.icon} {...data} />
          </div>
        );
      }}
    />
  );
}

Favorite.labelPositions = LabelPosition;
Favorite.sizes = Size;
Favorite.width = Width;
