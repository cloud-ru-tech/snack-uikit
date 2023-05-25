import { CheckSSVG, CheckXsSVG } from '@snack-ui/icons';

import { IconSize, LabelPosition, Size, Width } from '../../constants';
import { ToggleProps } from '../../types';
import { getVisualStateAttributes } from '../../utils';
import { TogglePrivate } from '../TogglePrivate';
import styles from './styles.module.scss';

export type CheckboxProps = ToggleProps;

export function Checkbox({ inputRef, 'data-test-id': dataTestId, ...restProps }: CheckboxProps) {
  return (
    <TogglePrivate
      {...restProps}
      data-test-id={dataTestId}
      ref={inputRef}
      render={function Checkbox(visualState) {
        const { size } = visualState;
        const data = getVisualStateAttributes(visualState);
        return (
          <div className={styles.container} {...data}>
            <div className={styles.box} {...data} />
            <div className={styles.icon} {...data}>
              {size === Size.M && <CheckSSVG size={IconSize[size]} />}
              {size === Size.S && <CheckXsSVG size={IconSize[size]} />}
            </div>
          </div>
        );
      }}
    />
  );
}

Checkbox.labelPositions = LabelPosition;
Checkbox.sizes = Size;
Checkbox.width = Width;
