import mergeRefs from 'merge-refs';
import { useCallback, useEffect, useRef } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { LabelPosition, Size, Width } from '../../constants';
import { ToggleProps } from '../../types';
import { getVisualStateAttributes } from '../../utils';
import { TogglePrivate } from '../TogglePrivate';
import { CheckIcon } from './CheckIcon';
import { MinusIcon } from './MinusIcon';
import styles from './styles.module.scss';

export type CheckboxProps = ToggleProps & {
  /** Состояние частичного выбора */
  indeterminate?: boolean;
  /** Состояние частичного выбора по-умолчанию */
  indeterminateDefault?: boolean;
};

export function Checkbox({
  inputRef,
  indeterminate: indeterminateProp,
  indeterminateDefault,
  onChange: onChangeProp,
  'data-test-id': dataTestId,
  ...restProps
}: CheckboxProps) {
  const localRef = useRef<HTMLInputElement>(null);
  const ref = mergeRefs<HTMLInputElement>(localRef, inputRef);

  const [indeterminate, setIndeterminate] = useUncontrolledProp(indeterminateProp, indeterminateDefault);

  const onChange = useCallback(
    (checked: boolean) => {
      onChangeProp?.(checked);
      setIndeterminate(false);
    },
    [onChangeProp, setIndeterminate],
  );

  useEffect(() => {
    if (localRef.current) {
      localRef.current.indeterminate = Boolean(indeterminate);
    }
  }, [localRef, indeterminate]);

  return (
    <TogglePrivate
      {...restProps}
      onChange={onChange}
      data-test-id={dataTestId}
      ref={ref}
      render={function Checkbox(visualState) {
        const { size } = visualState;
        const data = getVisualStateAttributes({ ...visualState, indeterminate: Boolean(indeterminate) });
        return (
          <div className={styles.container} {...data}>
            <div className={styles.box} {...data} />
            <div className={styles.icon} {...data}>
              {indeterminate ? <MinusIcon size={size} /> : <CheckIcon size={size} />}
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
