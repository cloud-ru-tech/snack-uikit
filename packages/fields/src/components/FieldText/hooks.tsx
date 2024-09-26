import { ReactNode, useMemo, useRef } from 'react';

import { ButtonProps, Size } from '@snack-uikit/input-private';

import { ButtonField, ButtonFieldList, ButtonFieldProps } from '../../helperComponents';
import styles from './styles.module.scss';
import { Button } from './types';

export function usePostfix({ postfix }: { postfix?: ReactNode }): ButtonProps {
  return useMemo(
    () => ({
      id: 'postfix',
      active: false,
      show: Boolean(postfix),
      render: () => <div className={styles.postfix}>{postfix}</div>,
    }),
    [postfix],
  );
}

export function usePostfixButton({
  button,
  size,
  disabled,
  readonly,
}: {
  button?: Button;
  size: Size;
  disabled?: boolean;
  readonly?: boolean;
}): ButtonProps {
  const buttonRef = useRef<HTMLButtonElement>(null);

  return useMemo(
    () => ({
      ref: buttonRef,
      id: 'postfixButton',
      active: true,
      show: Boolean(button && button.variant === 'after'),
      render: renderProps => {
        const buttonProps: ButtonFieldProps = {
          ...renderProps,
          variant: 'after',
          size,
          content: button?.content,
          disabled: disabled || readonly,
        };

        if (button?.items) {
          return <ButtonFieldList {...buttonProps} items={button.items} />;
        }

        return <ButtonField {...buttonProps} />;
      },
    }),
    [button, size, disabled, readonly],
  );
}
