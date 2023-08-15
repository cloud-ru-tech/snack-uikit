import { CheckSVG, CrossSVG } from '@snack-ui/icons';

import { IconSize, LabelPosition, Size, Width } from '../../constants';
import { ToggleProps } from '../../types';
import { getVisualStateAttributes } from '../../utils';
import { TogglePrivate } from '../TogglePrivate';
import styles from './styles.module.scss';

export type SwitchProps = ToggleProps & {
  showIcon?: boolean;
};

export function Switch({ inputRef, 'data-test-id': dataTestId, showIcon, ...restProps }: SwitchProps) {
  return (
    <TogglePrivate
      {...restProps}
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
                    <CrossSVG size={IconSize[Size.S]} />
                  </div>
                  <div className={styles.flag_icon_on} {...data}>
                    <CheckSVG size={IconSize[Size.S]} />
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

Switch.labelPositions = LabelPosition;
Switch.sizes = Size;
Switch.width = Width;
