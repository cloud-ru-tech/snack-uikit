import cn from 'classnames';
import { useMemo } from 'react';

import { CheckSVG, CrossSVG } from '@snack-uikit/icons';
import { Sun } from '@snack-uikit/loaders';
import { Typography } from '@snack-uikit/typography';

import { STEP_STATE } from '../../constants';
import { StepState } from '../../types';
import styles from './styles.module.scss';

export type IconProps = {
  state: StepState;
  number: number;
  className?: string;
};

function getContent(state: StepState, number: number) {
  switch (state) {
    case STEP_STATE.Completed:
      return <CheckSVG />;
    case STEP_STATE.Rejected:
      return <CrossSVG />;
    case STEP_STATE.Loading:
      return <Sun size='s' />;
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
