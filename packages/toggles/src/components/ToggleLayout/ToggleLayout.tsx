import cn from 'classnames';
import { PropsWithChildren } from 'react';

import { Typography } from '@snack-ui/typography';

import { LabelPosition, Size, Width } from '../../constants';
import { InputVisualState } from '../../types';
import { getVisualStateAttributes } from '../../utils';
import styles from './styles.module.scss';

export type ToggleLayoutProps = PropsWithChildren<{
  label?: string;
  labelPosition: LabelPosition;
  width: Width;
  size: Size;
  visualState: InputVisualState;
  onHover: (hover: boolean) => void;
  className?: string;
  'data-test-id'?: string;
}>;

export function ToggleLayout({
  className,
  children,
  label,
  width,
  labelPosition,
  size,
  visualState,
  onHover,
  'data-test-id': testId,
}: ToggleLayoutProps) {
  return (
    <label
      className={cn(className, styles.toggleLayout)}
      data-width={label ? width : Width.Auto}
      data-labelposition={labelPosition}
      data-size={size}
      data-test-id={testId}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      {...getVisualStateAttributes(visualState)}
    >
      <div className={styles.toggleLayout__toggle}>{children}</div>
      {label && (
        <div className={styles.toggleLayout__label}>
          <Typography
            tag={Typography.tags.span}
            role={Typography.roles.Body}
            family={Typography.families.Sans}
            size={size}
          >
            {label}
          </Typography>
        </div>
      )}
    </label>
  );
}
