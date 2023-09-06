import { MouseEventHandler, RefObject, useMemo } from 'react';

import { BUTTON_SIZE_MAP, ButtonProps, Size } from '@snack-ui/input-private';
import { useEventHandler } from '@snack-ui/utils';

import { ButtonHideValue } from '../helperComponents';

type UseHideButtonProps = {
  hideButtonRef: RefObject<HTMLButtonElement>;
  showHideButton: boolean;
  toggleHidden: MouseEventHandler<HTMLButtonElement>;
  size: Size;
  disabled: boolean;
  hidden: boolean;
};

export function useHideButton({
  hideButtonRef,
  showHideButton,
  size,
  toggleHidden,
  hidden,
  disabled,
}: UseHideButtonProps): ButtonProps {
  const toggleHiddenEventHandler = useEventHandler(toggleHidden);

  return useMemo(
    () => ({
      id: 'hide',
      ref: hideButtonRef,
      show: showHideButton,
      render: props => {
        const handleClick: MouseEventHandler<HTMLButtonElement> = event => {
          props.onClick(event);
          toggleHiddenEventHandler(event);
        };
        return (
          <ButtonHideValue
            {...props}
            size={BUTTON_SIZE_MAP[size]}
            onClick={handleClick}
            hidden={hidden}
            disabled={disabled}
          />
        );
      },
    }),
    [disabled, hidden, hideButtonRef, showHideButton, size, toggleHiddenEventHandler],
  );
}
