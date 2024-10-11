import { RefObject, useMemo } from 'react';

import { BUTTON_SIZE_MAP, ButtonProps, Size } from '@snack-uikit/input-private';

import { ButtonCopyValue } from '../helperComponents';
import { AsyncValueRequest } from '../types';

type UseCopyButtonProps = {
  copyButtonRef: RefObject<HTMLButtonElement>;
  showCopyButton: boolean;
  valueToCopy: string;
  size: Size;
  onValueRequest?(): AsyncValueRequest;
  disabled?: boolean;
  prefix?: string;
  postfix?: string;
};

export function useCopyButton({
  copyButtonRef,
  showCopyButton,
  size,
  valueToCopy,
  onValueRequest,
  disabled,
  prefix = '',
  postfix = '',
}: UseCopyButtonProps): ButtonProps {
  return useMemo(
    () => ({
      id: 'copy',
      active: true,
      ref: copyButtonRef,
      show: showCopyButton,
      render: props => (
        <ButtonCopyValue
          {...props}
          size={BUTTON_SIZE_MAP[size]}
          valueToCopy={(prefix ?? '') + valueToCopy + (postfix ?? '')}
          onValueRequest={onValueRequest}
          disabled={disabled}
        />
      ),
    }),
    [copyButtonRef, disabled, onValueRequest, showCopyButton, size, valueToCopy, prefix, postfix],
  );
}
