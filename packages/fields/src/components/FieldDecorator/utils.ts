import { FieldDecoratorProps } from './FieldDecorator';

export function extractFieldDecoratorProps<T extends Partial<FieldDecoratorProps>>({
  error,
  required,
  readonly,
  label,
  labelTooltip,
  labelTooltipPlacement,
  labelFor,
  hint,
  disabled,
  showHintIcon,
  size,
  validationState,
  className,
}: T) {
  return {
    error,
    required,
    readonly,
    label,
    labelTooltip,
    labelTooltipPlacement,
    labelFor,
    hint,
    disabled,
    showHintIcon,
    size,
    validationState,
    className,
  };
}
