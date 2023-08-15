import { QuestionSVG } from '@snack-ui/icons';

import { Tooltip, TooltipProps } from '../Tooltip';
import { Size } from './constants';
import styles from './styles.module.scss';

export type QuestionTooltipProps = Omit<TooltipProps, 'children'> & {
  size?: Size;
};

const SIZES_MAP = {
  [Size.S]: 16,
  [Size.M]: 24,
};

export function QuestionTooltip({ size = Size.S, ...rest }: QuestionTooltipProps) {
  return (
    <Tooltip {...rest}>
      <span data-size={size} className={styles.questionTooltip}>
        <QuestionSVG size={SIZES_MAP[size]} />
      </span>
    </Tooltip>
  );
}

QuestionTooltip.sizes = Size;
