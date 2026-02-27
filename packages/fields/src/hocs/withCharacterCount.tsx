import { ChangeEvent, ComponentType, forwardRef, Ref, useCallback } from 'react';

import { InputPrivateProps } from '@snack-uikit/input-private';

export type WithCharacterCountProps = {
  handleReachLimit?(): void;
};

type FieldProps = Pick<InputPrivateProps, 'onChange' | 'maxLength'>;

export function withCharacterCount<TProps extends FieldProps>(FieldComponent: ComponentType<TProps>) {
  return forwardRef<HTMLInputElement, TProps & WithCharacterCountProps>(
    ({ handleReachLimit, onChange, maxLength, ...restProps }, ref) => {
      const handleLimitedChange = useCallback(
        (value: string, e?: ChangeEvent<HTMLInputElement>) => {
          if (!maxLength || value.length > maxLength) {
            return;
          }

          onChange?.(value, e);

          if (value.length === maxLength && handleReachLimit) {
            handleReachLimit();
          }
        },
        [maxLength, handleReachLimit, onChange],
      );

      return (
        <FieldComponent
          {...(restProps as unknown as TProps)}
          ref={ref as Ref<HTMLInputElement>}
          maxLength={maxLength}
          onChange={handleLimitedChange}
        />
      );
    },
  );
}
