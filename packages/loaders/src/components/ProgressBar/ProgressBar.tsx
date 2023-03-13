import { extractSupportProps, WithSupportProps } from '@snack-ui/utils';

import classNames from './styles.module.scss';

enum Size {
  SizeS = 'size-s',
  SizeXS = 'size-xs',
}

export type ProgressBarProps = WithSupportProps<{
  progress: number;
  size: Size;
}>;

export function ProgressBar({ progress, size, ...rest }: ProgressBarProps) {
  return (
    <div className={classNames.progressBarContainer} {...extractSupportProps(rest)} data-size={size}>
      <div className={classNames.progressBarFiller} style={{ '--progress': `${progress}%` }} />
    </div>
  );
}

ProgressBar.sizes = Size;
