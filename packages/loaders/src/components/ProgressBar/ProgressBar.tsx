import { extractSupportProps, WithSupportProps } from '@snack-ui/utils';

import classNames from './styles.module.scss';

enum Size {
  S = 's',
  XS = 'xs',
}

export type ProgressBarProps = WithSupportProps<{
  progress: number;
  size: Size;
}>;

export function ProgressBar({ progress, size, ...rest }: ProgressBarProps) {
  const roundedProgress = Math.max(Math.min(progress, 100), 0);

  return (
    <div className={classNames.progressBarContainer} {...extractSupportProps(rest)} data-size={size}>
      <div
        className={classNames.progressBarFiller}
        data-test-id='progress-bar-filler'
        style={{ '--progress': `${roundedProgress}%` }}
      />
    </div>
  );
}

ProgressBar.sizes = Size;
