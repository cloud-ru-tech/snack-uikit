import { ReactElement, useMemo, useRef } from 'react';

import { ButtonProps, InactiveItem, Size } from '@snack-uikit/input-private';

import { ButtonField, ButtonFieldList, ButtonFieldProps } from '../helperComponents';
import { Button } from '../types';

export function usePostfixButton({
  button,
  size,
  postfixIcon,
  disabled,
  readonly,
  onFocus,
  onBlur,
}: {
  button?: Button;
  size: Size;
  postfixIcon?: ReactElement;
  disabled?: boolean;
  readonly?: boolean;
} & Pick<ButtonFieldProps, 'onFocus' | 'onBlur'>): ButtonProps {
  const buttonListRef = useRef<HTMLButtonElement>(null);

  const postfixIconProps: InactiveItem = useMemo(
    () => ({
      id: 'postfixIcon',
      active: false,
      show: Boolean(postfixIcon && !button),
      render: () => <>{postfixIcon}</>,
    }),
    [button, postfixIcon],
  );

  const postfixButtonProps: InactiveItem = useMemo(
    () => ({
      id: 'postfixButton',
      active: false,
      show: Boolean(button && button.variant === 'after'),
      render: renderProps => {
        const buttonProps: ButtonFieldProps = {
          ...renderProps,
          variant: 'after',
          size,
          content: button?.content,
          disabled: disabled || readonly,
          onFocus,
          onBlur,
        };

        if (button?.items) {
          return (
            <ButtonFieldList
              {...buttonProps}
              ref={buttonListRef}
              onClick={() => {
                setTimeout(() => buttonListRef.current?.focus(), 0);
              }}
              items={button.items}
              selection={button.selection}
              open={button.open}
              onOpenChange={button.onOpenChange}
            />
          );
        }

        return <ButtonField {...buttonProps} />;
      },
    }),
    [button, size, disabled, readonly, onFocus, onBlur],
  );

  return button ? postfixButtonProps : postfixIconProps;
}
