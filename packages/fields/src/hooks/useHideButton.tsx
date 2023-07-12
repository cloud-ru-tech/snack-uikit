import { MouseEventHandler, RefObject, useMemo } from 'react';

import { useEventHandler } from '@snack-ui/utils';

import { ButtonSizeMap, Size } from '../constants';
import { ButtonHideValue } from '../helperComponents';
import { ButtonProps } from './types';

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
            size={ButtonSizeMap[size]}
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
