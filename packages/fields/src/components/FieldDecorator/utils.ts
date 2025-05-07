import { FieldDecoratorProps } from './FieldDecorator';


export function extractFieldDecoratorProps<T extends Partial<FieldDecoratorProps>>({
  error,
  required,
  readonly,
  label,
  labelTooltip,
  labelTooltipPlacement,
  labelFor,
  caption,
  hint,
  disabled,
  showHintIcon,
  size,
  validationState,
  className,
}: T): Partial<FieldDecoratorProps> {
  return {
    error,
    required,
    readonly,
    label,
    labelTooltip,
    labelTooltipPlacement,
    labelFor,
    caption,
    hint,
    disabled,
    showHintIcon,
    size,
    validationState,
    className,
  };
}
