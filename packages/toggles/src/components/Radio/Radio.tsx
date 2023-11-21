import { Mode, Size } from '../../constants';
import { ToggleProps } from '../../types';
import { getVisualStateAttributes } from '../../utils';
import { TogglePrivate } from '../TogglePrivate';
import styles from './styles.module.scss';

export type RadioProps = ToggleProps;

export function Radio({ inputRef, 'data-test-id': dataTestId, ...restProps }: RadioProps) {
  return (
    <TogglePrivate
      {...restProps}
      data-test-id={dataTestId}
      mode={Mode.Radio}
      ref={inputRef}
      render={function Radio(visualState) {
        const data = getVisualStateAttributes(visualState);
        return (
          <div className={styles.container} {...data}>
            <div className={styles.box} {...data}>
              <div className={styles.flag} {...data} />
            </div>
          </div>
        );
      }}
    />
  );
}

Radio.sizes = Size;
