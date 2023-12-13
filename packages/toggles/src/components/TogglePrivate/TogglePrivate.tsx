import cn from 'classnames';
import { forwardRef, useState } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { MODE, SIZE } from '../../constants';
import { TogglePrivateProps } from '../../types';
import { getVisualStateAttributes } from '../../utils';
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
    size = SIZE.M,
    mode = MODE.Checkbox,
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
    <span
      className={cn(className, styles.toggleLayout)}
      data-size={size}
      data-test-id={testId}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...getVisualStateAttributes(visualState)}
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
    </span>
  );
});
