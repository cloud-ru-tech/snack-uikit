import cn from 'classnames';
import { useMemo } from 'react';

import { CheckSVG, CrossSVG } from '@snack-ui/icons';
import { Sun } from '@snack-ui/loaders';
import { Typography } from '@snack-ui/typography';

import { StepState } from '../../constants';
import styles from './styles.module.scss';

export type IconProps = {
  state: StepState;
  number: number;
  className?: string;
};

function getContent(state: StepState, number: number) {
  switch (state) {
    case StepState.Completed:
      return <CheckSVG />;
    case StepState.Rejected:
      return <CrossSVG />;
    case StepState.Loading:
      return <Sun size={Sun.sizes.S} />;
    default:
      return number;
  }
}

export function Icon({ state, number, className }: IconProps) {
  const content = useMemo(() => getContent(state, number), [number, state]);

  return (
    <div data-state={state} className={cn(styles.icon, className)}>
      {typeof content === 'number' ? <Typography.SansLabelL>{content}</Typography.SansLabelL> : content}
    </div>
  );
}
