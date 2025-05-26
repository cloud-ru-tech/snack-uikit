import { MouseEventHandler, useEffect, useRef, useState } from 'react';

import { copyToClipboard } from '@cloud-ru/ft-copy-to-clipboard';
import { ButtonFunction, ButtonFunctionProps } from '@snack-uikit/button';
import { CheckSVG, CopySVG } from '@snack-uikit/icons';
import { useLocale } from '@snack-uikit/locale';
import { Tooltip } from '@snack-uikit/tooltip';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import styles from './styles.module.scss';

export type CopyButtonProps = WithSupportProps<{
  valueToCopy: string | number;
  size?: ButtonFunctionProps['size'];
  className?: string;
  onClick?(): void;
}>;

export function CopyButton({ valueToCopy, size = 's', className, onClick, ...rest }: CopyButtonProps) {
  const { t } = useLocale();
  const [isChecked, setIsCheckedOpen] = useState(false);
  const timerId = useRef<NodeJS.Timeout>();
  const openChecked = () => setIsCheckedOpen(true);
  const closeChecked = () => setIsCheckedOpen(false);

  const handleClick: MouseEventHandler<HTMLButtonElement> = event => {
    event.stopPropagation();
    valueToCopy && copyToClipboard(String(valueToCopy));
    openChecked();
    clearTimeout(timerId.current);
    timerId.current = setTimeout(closeChecked, 1000);
    onClick?.();
  };

  useEffect(
    () => () => {
      closeChecked();
      clearTimeout(timerId.current);
    },
    [],
  );

  return (
    <Tooltip tip={t('CodeEditor.copyButtonToolTip')}>
      <ButtonFunction
        {...extractSupportProps(rest)}
        onClick={handleClick}
        className={className}
        data-test-id='button-copy-value'
        type='button'
        icon={isChecked ? <CheckSVG className={styles.checkIcon} /> : <CopySVG />}
        size={size}
      />
    </Tooltip>
  );
}
