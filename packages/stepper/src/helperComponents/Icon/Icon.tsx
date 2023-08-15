import cn from 'classnames';

import { CheckSVG, CrossSVG } from '@snack-ui/icons';
import { Spinner } from '@snack-ui/loaders';

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
      return <Spinner size={Spinner.sizes.S} />;
    default:
      return number;
  }
}

export function Icon({ state, number, className }: IconProps) {
  return (
    <div data-state={state} className={cn(styles.icon, className)}>
      {getContent(state, number)}
    </div>
  );
}
