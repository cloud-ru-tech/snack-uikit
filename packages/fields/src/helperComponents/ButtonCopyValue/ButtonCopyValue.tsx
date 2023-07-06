import copyToClipboard from 'copy-to-clipboard';
import { MouseEventHandler, useEffect, useRef, useState } from 'react';

import { CopySSVG, CopyXsSVG } from '@snack-ui/icons';
import { Tooltip } from '@snack-ui/tooltip';

import { ButtonSize } from '../../components/constants';
import styles from './styles.module.scss';

type ButtonCopyValueProps = {
  size: ButtonSize;
  valueToCopy?: string;
};

export function ButtonCopyValue({ size, valueToCopy }: ButtonCopyValueProps) {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const timerId = useRef<ReturnType<typeof setTimeout>>();
  const openTooltip = () => setIsTooltipOpen(true);
  const closeTooltip = () => setIsTooltipOpen(false);

  const handleClick: MouseEventHandler<HTMLButtonElement> = event => {
    event.stopPropagation();
    valueToCopy && copyToClipboard(valueToCopy, { format: 'text/plain' });
    openTooltip();
    clearTimeout(timerId.current);
    timerId.current = setTimeout(closeTooltip, 2000);
  };

  useEffect(
    () => () => {
      closeTooltip();
      clearTimeout(timerId.current);
    },
    [],
  );

  return (
    <Tooltip
      tip={'Скопировано!'}
      open={isTooltipOpen}
      placement={Tooltip.placements.Bottom}
      data-test-id='button-copy-value__tooltip'
    >
      <button
        className={styles.buttonCopyValue}
        data-size={size}
        onClick={handleClick}
        data-test-id='button-copy-value'
        onMouseLeave={closeTooltip}
      >
        {size === ButtonSize.S && <CopyXsSVG size={16} />}
        {size === ButtonSize.M && <CopySSVG size={24} />}
      </button>
    </Tooltip>
  );
}