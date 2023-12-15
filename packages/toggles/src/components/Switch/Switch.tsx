import { CheckSVG, CrossSVG } from '@snack-uikit/icons';

import { SIZE } from '../../constants';
import { Spinner } from '../../helperComponents';
import { ToggleProps } from '../../types';
import { getVisualStateAttributes } from '../../utils';
import { TogglePrivate } from '../TogglePrivate';
import styles from './styles.module.scss';

export type SwitchProps = ToggleProps & {
  /** Показывать ли иконку в переключателе */
  showIcon?: boolean;
  loading?: boolean;
};

export function Switch({
  inputRef,
  'data-test-id': dataTestId,
  showIcon,
  loading,
  size = SIZE.M,
  ...restProps
}: SwitchProps) {
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
              {(showIcon || loading) && (
                <>
                  <div className={styles.flag_icon_off} {...data}>
                    {loading ? <Spinner /> : <CrossSVG size={16} />}
                  </div>
                  <div className={styles.flag_icon_on} {...data}>
                    {loading ? <Spinner /> : <CheckSVG size={16} />}
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
