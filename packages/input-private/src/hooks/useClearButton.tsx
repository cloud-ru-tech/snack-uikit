import { MouseEventHandler, RefObject, useMemo } from 'react';

import { useEventHandler } from '@snack-ui/utils';

import { BUTTON_SIZE_MAP, Size } from '../constants';
import { ButtonClearValue } from '../helperComponents';
import { ButtonProps } from './types';

type UseClearButtonProps = {
  clearButtonRef: RefObject<HTMLButtonElement>;
  showClearButton: boolean;
  onClear: MouseEventHandler<HTMLButtonElement>;
  size: Size;
};

/**
 * Позволяет использовать кнопку сброса значения
 * @function hook
 */
export function useClearButton({ clearButtonRef, showClearButton, size, onClear }: UseClearButtonProps): ButtonProps {
  const clearEventHandler = useEventHandler(onClear);

  return useMemo(
    () => ({
      id: 'clear',
      ref: clearButtonRef,
      show: showClearButton,
      render: props => {
        const handleClear: MouseEventHandler<HTMLButtonElement> = event => {
          props.onClick(event);
          clearEventHandler(event);
        };
        return <ButtonClearValue {...props} size={BUTTON_SIZE_MAP[size]} onClick={handleClear} />;
      },
    }),
    [clearButtonRef, clearEventHandler, showClearButton, size],
  );
}
