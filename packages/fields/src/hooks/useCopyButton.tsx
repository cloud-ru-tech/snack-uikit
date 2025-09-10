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
  onCopyButtonClick?(): void;
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
  onCopyButtonClick,
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
      render: ({ key, ...props }) => (
        <ButtonCopyValue
          key={key}
          {...props}
          size={BUTTON_SIZE_MAP[size]}
          valueToCopy={(prefix ?? '') + valueToCopy + (postfix ?? '')}
          onValueRequest={onValueRequest}
          onClick={onCopyButtonClick}
          disabled={disabled}
        />
      ),
    }),
    [copyButtonRef, showCopyButton, size, prefix, valueToCopy, postfix, onValueRequest, onCopyButtonClick, disabled],
  );
}
