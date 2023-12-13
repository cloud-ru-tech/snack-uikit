import { useMemo } from 'react';

import { CheckSVG, CrossSVG } from '@snack-uikit/icons';

import { SIZE } from '../../constants';
import { ToggleProps } from '../../types';
import { getIconSize, getVisualStateAttributes } from '../../utils';
import { TogglePrivate } from '../TogglePrivate';
import styles from './styles.module.scss';

export type SwitchProps = ToggleProps & {
  /** Показывать ли иконку в переключателе */
  showIcon?: boolean;
};

export function Switch({ inputRef, 'data-test-id': dataTestId, showIcon, size = SIZE.M, ...restProps }: SwitchProps) {
  const iconSize = useMemo(() => getIconSize(size), [size]);

  return (
    <TogglePrivate
      {...restProps}
      size={size}
      data-test-id={dataTestId}
      ref={inputRef}
      render={function Switch(visualState) {
        const data = getVisualStateAttributes(visualState);
        return (
          <div className={styles.container} {...data}>
            <div className={styles.box} {...data} />
            <div className={styles.containerFlag} {...data}>
              <div className={styles.flag} {...data} />
              {showIcon && (
                <>
                  <div className={styles.flag_icon_off} {...data}>
                    <CrossSVG size={iconSize} />
                  </div>
                  <div className={styles.flag_icon_on} {...data}>
                    <CheckSVG size={iconSize} />
                  </div>
                </>
              )}
            </div>
          </div>
        );
      }}
    />
  );
}
