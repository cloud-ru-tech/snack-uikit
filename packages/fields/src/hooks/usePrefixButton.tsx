import { ReactElement, useMemo, useRef } from 'react';

import { ButtonProps, InactiveItem, Size } from '@snack-uikit/input-private';

import { ButtonField, ButtonFieldList, ButtonFieldProps } from '../helperComponents';
import { Button } from '../types';

export function usePrefixButton({
  button,
  prefixIcon,
  size,
  disabled,
  readonly,
  onFocus,
  onBlur,
}: {
  button?: Button;
  prefixIcon?: ReactElement;
  size: Size;
  disabled?: boolean;
  readonly?: boolean;
} & Pick<ButtonFieldProps, 'onFocus' | 'onBlur'>): ButtonProps {
  const buttonListRef = useRef<HTMLButtonElement>(null);

  const prefixIconProps: InactiveItem = useMemo(
    () => ({
      id: 'prefixIcon',
      active: false,
      show: Boolean(prefixIcon && !button),
      render: () => <>{prefixIcon}</>,
    }),
    [button, prefixIcon],
  );

  const prefixButtonProps: InactiveItem = useMemo(
    () => ({
      id: 'prefixButton',
      active: false,
      show: Boolean(button && button.variant === 'before'),
      render: renderProps => {
        const buttonProps: ButtonFieldProps = {
          ...renderProps,
          variant: 'before',
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

  return button ? prefixButtonProps : prefixIconProps;
}
