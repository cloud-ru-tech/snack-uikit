import cn from 'classnames';

import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { LOADER_SIZE } from '../constants';
import { LoaderSize } from '../types';
import styles from './styles.module.scss';

export type SpinnerProps = WithSupportProps<{
  /** Размер */
  size?: LoaderSize;
  /** CSS-класс */
  className?: string;
}>;

/** Компонент спиннер */
export function Spinner({ size = LOADER_SIZE.S, className, ...rest }: SpinnerProps) {
  if (size === LOADER_SIZE.XXS) {
    return (
      <svg
        viewBox='0 0 8 8'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className={cn(styles.spinner, className)}
        {...extractSupportProps(rest)}
        data-size={size}
      >
        <mask id='spinnerMask'>
          <circle opacity='0.24' cx='4' cy='4' r='3' strokeWidth='1.5' />
          <path d='M1 4C1 2.34315 2.34315 1 4 1' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
        </mask>
        <g mask='url(#spinnerMask)'>
          <path d='M0 0H8V8H0V0Z' />
        </g>
      </svg>
    );
  }

  if (size === LOADER_SIZE.XS) {
    return (
      <svg
        width='16'
        height='16'
        viewBox='0 0 16 16'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className={cn(styles.spinner, className)}
        {...extractSupportProps(rest)}
        data-size={size}
      >
        <mask id='spinnerMask'>
          <circle opacity='0.24' cx='8' cy='8.7951' r='6' strokeWidth='1.5' />
          <path
            d='M2 8.79511C2 5.4814 4.68629 2.7951 8 2.7951'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </mask>
        <g mask='url(#spinnerMask)'>
          <path d='M0 0.795105H16V16.7951H0V0.795105Z' />
        </g>
      </svg>
    );
  }
  return (
    <svg
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={cn(styles.spinner, className)}
      {...extractSupportProps(rest)}
      data-size={size}
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
