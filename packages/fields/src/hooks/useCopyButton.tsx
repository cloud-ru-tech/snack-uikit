import { RefObject, useMemo } from 'react';

import { ButtonSizeMap, Size } from '../constants';
import { ButtonCopyValue } from '../helperComponents';
import { ButtonProps } from './types';

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
      render: props => <ButtonCopyValue {...props} size={ButtonSizeMap[size]} valueToCopy={valueToCopy} />,
    }),
    [copyButtonRef, showCopyButton, size, valueToCopy],
  );
}
