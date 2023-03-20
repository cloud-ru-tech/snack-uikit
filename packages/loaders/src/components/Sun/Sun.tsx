import { extractSupportProps, WithSupportProps } from '@snack-ui/utils';

import { LoaderSize } from '../constants';
import styles from './styles.module.scss';

export type SunProps = WithSupportProps<{
  size?: LoaderSize;
}>;

export function Sun({ size = LoaderSize.SizeS, ...rest }: SunProps) {
  return (
    <svg
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      id='SunSVG'
      className={styles.sun}
      data-size={size}
      {...extractSupportProps(rest)}
    >
      <path d='M12 4V7' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M6.34302 6.34314L8.46434 8.46446' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M4 12L7 12' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M6.34302 17.6569L8.46434 15.5355' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M12 17V20' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M15.5354 15.5355L17.6567 17.6568' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M17 12L20 12' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M15.5354 8.46448L17.6567 6.34316' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
}

Sun.sizes = LoaderSize;