import { extractSupportProps, WithSupportProps } from '@snack-ui/utils';

import { LoaderSize } from '../constants';
import styles from './styles.module.scss';

export type SpinnerProps = WithSupportProps<{
  size?: LoaderSize;
}>;

export function Spinner({ size = LoaderSize.S, ...rest }: SpinnerProps) {
  return (
    <svg
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={styles.spinner}
      data-size={size}
      {...extractSupportProps(rest)}
    >
      <mask id='spinnerMask'>
        <circle opacity='0.24' cx='11.8926' cy='12' r='9' strokeWidth='1.5' />
        <path
          d='M2.89258 12C2.89258 7.02944 6.92202 3 11.8926 3'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </mask>
      <g mask='url(#spinnerMask)'>
        <path d='M0 0H24V24H0V0Z' />
      </g>
    </svg>
  );
}

Spinner.sizes = LoaderSize;
