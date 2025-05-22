import { ReactElement, useMemo, useRef } from 'react';

import { ButtonProps, InactiveItem, Size } from '@snack-uikit/input-private';

import { ButtonField, ButtonFieldList, ButtonFieldProps } from '../../helperComponents';
import { Button, ButtonVariant } from '../../types';

export type UseAddonProps = {
  button?: Button;
  size: Size;
  icon?: ReactElement;
  disabled?: boolean;
  readonly?: boolean;
  variant: ButtonVariant;
  type: 'prefix' | 'postfix';
} & Pick<ButtonFieldProps, 'onFocus' | 'onBlur'>;

export function useAddonButton({
  variant,
  button,
  icon,
  size,
  disabled,
  readonly,
  type,
  onFocus,
  onBlur,
}: UseAddonProps): ButtonProps {
  const buttonListRef = useRef<HTMLButtonElement>(null);

  const addonIconProps: InactiveItem = useMemo(
    () => ({
      id: `${type}Icon`,
      active: false,
      show: Boolean(icon && !button),
      render: () => <>{icon}</>,
    }),
    [button, icon, type],
  );

  const addonButtonProps: InactiveItem = useMemo(
    () => ({
      id: `${type}Button`,
      active: false,
      show: Boolean(button && button.variant === variant),
      render: renderProps => {
        const buttonProps: ButtonFieldProps = {
          ...renderProps,
          variant,
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
              search={button.search}
              items={button.items}
              selection={button.selection}
              open={button.open}
              scroll={button.scroll}
              onOpenChange={button.onOpenChange}
            />
          );
        }

        const buttonField = <ButtonField {...buttonProps} hasArrow={button?.hasArrow} arrowOpen={button?.arrowOpen} />;
        return button?.wrapper ? button.wrapper(buttonField) : buttonField;
      },
    }),
    [type, button, variant, size, disabled, readonly, onFocus, onBlur],
  );

  return button ? addonButtonProps : addonIconProps;
}
