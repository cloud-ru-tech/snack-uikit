import { forwardRef, useState } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { LabelPosition, Mode, Size, Width } from '../../constants';
import { TogglePrivateProps } from '../../types';
import { ToggleLayout } from '../ToggleLayout';
import styles from './styles.module.scss';

export const TogglePrivate = forwardRef<HTMLInputElement, TogglePrivateProps>(function TogglePrivate(
  {
    render,
    checked: checkedProp,
    defaultChecked,
    onChange,
    onBlur,
    onFocus,
    disabled,
    className,
    label,
    size = Size.M,
    labelPosition = LabelPosition.Right,
    width = Width.Auto,
    mode = Mode.Checkbox,
    'data-test-id': testId,
    ...otherProps
  },
  ref,
) {
  const [checked, setChecked] = useUncontrolledProp(checkedProp, Boolean(defaultChecked), onChange);
  const [focusVisible, setFocusVisible] = useState(false);
  const [hover, setHover] = useState(false);

  const visualState = {
    disabled: Boolean(disabled),
    focusVisible,
    checked,
    hover,
    size,
  };

  return (
    <ToggleLayout
      className={className}
      label={label}
      labelPosition={labelPosition}
      width={width}
      size={size}
      data-test-id={testId}
      visualState={visualState}
      onHover={setHover}
    >
      {render(visualState)}
      <input
        {...otherProps}
        data-test-id={`${testId}-native-input`}
        ref={ref}
        type={mode}
        className={styles.togglePrivate}
        checked={checked}
        disabled={disabled}
        onChange={e => setChecked(e.target.checked)}
        onFocus={event => {
          setFocusVisible(event.target.matches(':focus-visible'));
          onFocus?.(event);
        }}
        onBlur={event => {
          setFocusVisible(false);
          onBlur?.(event);
        }}
      />
    </ToggleLayout>
  );
});
