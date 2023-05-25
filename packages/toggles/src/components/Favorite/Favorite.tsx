import {
  HeartFilledSSVG,
  HeartFilledXsSVG,
  HeartSSVG,
  HeartXsSVG,
  StarFilledSSVG,
  StarFilledXsSVG,
  StarSSVG,
  StarXsSVG,
} from '@snack-ui/icons';

import { FavoriteIcon, IconSize, LabelPosition, Size, Width } from '../../constants';
import { ToggleProps } from '../../types';
import { getVisualStateAttributes } from '../../utils';
import { TogglePrivate } from '../TogglePrivate';
import styles from './styles.module.scss';

const CHECKED_ICONS = {
  [Size.M]: {
    [FavoriteIcon.Star]: StarFilledSSVG,
    [FavoriteIcon.Heart]: HeartFilledSSVG,
  },
  [Size.S]: {
    [FavoriteIcon.Star]: StarFilledXsSVG,
    [FavoriteIcon.Heart]: HeartFilledXsSVG,
  },
};

const UNCHECKED_ICONS = {
  [Size.M]: {
    [FavoriteIcon.Star]: StarSSVG,
    [FavoriteIcon.Heart]: HeartSSVG,
  },
  [Size.S]: {
    [FavoriteIcon.Star]: StarXsSVG,
    [FavoriteIcon.Heart]: HeartXsSVG,
  },
};

export type FavoriteProps = Omit<ToggleProps, 'disabled'> & {
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
        const Icon = visualState.checked ? CHECKED_ICONS[size][icon] : UNCHECKED_ICONS[size][icon];
        const data = getVisualStateAttributes({ ...visualState, icon });
        return (
          <div className={styles.container} {...data}>
            <Icon className={styles.icon} size={IconSize[size]} {...data} />
          </div>
        );
      }}
    />
  );
}

Favorite.labelPositions = LabelPosition;
Favorite.sizes = Size;
Favorite.width = Width;
