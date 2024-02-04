import copyToClipboard from 'copy-to-clipboard';
import { MouseEventHandler, useEffect, useRef, useState } from 'react';

import { ButtonFunction } from '@snack-uikit/button';
import { CheckSVG, CopySVG } from '@snack-uikit/icons';

export type CopyButtonProps = {
  valueToCopy?: string | number;
  className?: string;
};

export function CopyButton({ valueToCopy, className }: CopyButtonProps) {
  const [isChecked, setIsCheckedOpen] = useState(false);
  const timerId = useRef<ReturnType<typeof setTimeout>>();
  const openChecked = () => setIsCheckedOpen(true);
  const closeChecked = () => setIsCheckedOpen(false);

  const handleClick: MouseEventHandler<HTMLButtonElement> = event => {
    event.stopPropagation();
    valueToCopy && copyToClipboard(String(valueToCopy), { format: 'text/plain' });
    openChecked();
    clearTimeout(timerId.current);
    timerId.current = setTimeout(closeChecked, 1000);
  };

  useEffect(
    () => () => {
      closeChecked();
      clearTimeout(timerId.current);
    },
    [],
  );

  return (
    <ButtonFunction
      onClick={handleClick}
      data-test-id='button-copy-value'
      type='button'
      icon={isChecked ? <CheckSVG /> : <CopySVG />}
      size='s'
      className={className}
    />
  );
}
