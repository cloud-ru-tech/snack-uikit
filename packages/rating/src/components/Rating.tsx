import cn from 'classnames';
import { KeyboardEventHandler, useState } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { StarFilledSVG } from '@snack-uikit/icons';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { APPEARANCE, DEFAULT_RATING_VALUE, DEFAULT_STAR_COUNT } from '../constants';
import { Appearance } from '../types';
import styles from './styles.module.scss';

export type RatingProps = WithSupportProps<{
  /** Общее количество звезд */
  count: number;
  /** Значение количества звезд в случае необходимости управления */
  value?: number;
  /** Количество звезд, заполненных по умолчанию */
  defaultValue?: number;
  /** Показывать или нет рейтинг в виде половины звезды */
  allowHalf: boolean;
  /** Разрещает сброс рейтинга при повторном нажатии на звезду */
  allowClear: boolean;
  readonly: boolean;
  appearance?: Appearance;
  onChange?: (value: number) => void;
  className?: string;
}>;

/**
 * Компонент Rating
 */

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
  ...otherProps
}: RatingProps) {
  const [hoverRating, setHoverRating] = useState<null | number>(null);
  const [rating, setRating] = useUncontrolledProp(value, defaultValue, onChange);
  const supportProps = extractSupportProps(otherProps);

  return (
    <div className={className} data-test-id={supportProps['data-test-id']}>
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
