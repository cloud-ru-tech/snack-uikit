import cn from 'classnames';
import { KeyboardEventHandler, useState } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { StarFilledSVG } from '@snack-uikit/icons';

import { APPEARANCE, DEFAULT_RATING_VALUE, DEFAULT_STAR_COUNT } from '../constants';
import { Appearance } from '../types';
import styles from './styles.module.scss';

export type RatingProps = {
  count: number;
  value?: number;
  defaultValue?: number;
  allowHalf: boolean;
  allowClear: boolean;
  readonly: boolean;
  appearance?: Appearance;
  onChange?: (value: number) => void;
  className?: string;
};

export function Rating({
  className,
  count = DEFAULT_STAR_COUNT,
  value,
  defaultValue = DEFAULT_RATING_VALUE,
  allowHalf = false,
  allowClear = false,
  readonly = false,
  appearance = APPEARANCE.Yellow,
  onChange,
}: RatingProps) {
  const [hoverRating, setHoverRating] = useState<null | number>(null);
  const [rating, setRating] = useUncontrolledProp(value, defaultValue, onChange);

  return (
    <div className={className}>
      {[...Array(count)].map((star, index) => {
        const currentRating = index + 1;
        const isHalfFilled =
          allowHalf &&
          Math.floor(hoverRating ?? rating ?? 0) + 1 === currentRating &&
          currentRating < Math.floor((hoverRating ?? rating) + 0.5) + 1;
        const isFullFilled = currentRating <= (hoverRating ?? rating);
        const styleMods = {
          [styles.starHalf]: isHalfFilled,
          [styles.starFull]: isFullFilled,
          [styles.starDisabled]: readonly,
        };
        const onMouseLeave = () => {
          if (!readonly) {
            setHoverRating(null);
          }
        };

        const onMouseEnter = () => {
          if (!readonly) {
            setHoverRating(currentRating);
          }
        };

        const onClick = () => {
          if (!readonly) {
            const value = rating === currentRating && allowClear ? 0 : currentRating;
            setRating(value);
          }
        };

        const onKeyDown: KeyboardEventHandler<HTMLDivElement> = e => {
          if (e.code === 'Enter' || e.code === 'Space') {
            e.stopPropagation();
            const value = rating === currentRating && allowClear ? 0 : currentRating;
            setRating(value);
          }
        };

        return (
          <div
            className={cn(styles.rating, styleMods)}
            key={index}
            role={readonly ? undefined : 'radio'}
            tabIndex={readonly ? undefined : 0}
            aria-checked={readonly ? undefined : isFullFilled}
            onKeyDown={onKeyDown}
          >
            <div className={styles.firstStarContainer} data-appearance={appearance}>
              <StarFilledSVG onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={onClick} />
            </div>
            <div className={styles.secondStarContainer} data-appearance={appearance}>
              <StarFilledSVG onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={onClick} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
