import mergeRefs from 'merge-refs';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { CheckSVG, MinusSVG } from '@snack-uikit/icons';

import { SIZE } from '../../constants';
import { ToggleProps } from '../../types';
import { getIconSize, getVisualStateAttributes } from '../../utils';
import { TogglePrivate } from '../TogglePrivate';
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
  size = SIZE.M,
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

  const iconSize = useMemo(() => getIconSize(size), [size]);

  return (
    <TogglePrivate
      {...restProps}
      size={size}
      onChange={onChange}
      data-test-id={dataTestId}
      ref={ref}
      render={function Checkbox(visualState) {
        const data = getVisualStateAttributes({ ...visualState, indeterminate: Boolean(indeterminate) });
        return (
          <div className={styles.container} {...data}>
            <div className={styles.box} {...data} />
            <div className={styles.icon} {...data}>
              {indeterminate ? <MinusSVG size={iconSize} /> : <CheckSVG size={iconSize} />}
            </div>
          </div>
        );
      }}
    />
  );
}
