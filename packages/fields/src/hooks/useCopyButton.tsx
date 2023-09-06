import { RefObject, useMemo } from 'react';

import { BUTTON_SIZE_MAP, ButtonProps, Size } from '@snack-ui/input-private';

import { ButtonCopyValue } from '../helperComponents';

type UseCopyButtonProps = {
  copyButtonRef: RefObject<HTMLButtonElement>;
  showCopyButton: boolean;
  valueToCopy: string;
  size: Size;
};

export function useCopyButton({ copyButtonRef, showCopyButton, size, valueToCopy }: UseCopyButtonProps): ButtonProps {
  return useMemo(
    () => ({
      id: 'copy',
      ref: copyButtonRef,
      show: showCopyButton,
      render: props => <ButtonCopyValue {...props} size={BUTTON_SIZE_MAP[size]} valueToCopy={valueToCopy} />,
    }),
    [copyButtonRef, showCopyButton, size, valueToCopy],
  );
}
