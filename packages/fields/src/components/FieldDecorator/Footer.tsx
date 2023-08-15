import { AlarmFilledSVG, CheckFilledSVG, CrossFilledSVG, InfoFilledSVG } from '@snack-ui/icons';
import { TruncateString } from '@snack-ui/truncate-string';

import { Size, ValidationState } from '../../constants';
import styles from './styles.module.scss';

export type FooterProps = {
  length?: {
    current: number;
    max?: number;
  };
  hint?: string;
  validationState?: ValidationState;
  size?: Size;
  showHintIcon?: boolean;
  disabled?: boolean;
  readonly?: boolean;
};

function getValidationIcon(props: Pick<FooterProps, 'showHintIcon' | 'validationState'>) {
  let Component: typeof InfoFilledSVG;
  let showIcon: boolean;

  switch (props.validationState) {
    case ValidationState.Success:
      Component = CheckFilledSVG;
      showIcon = true;
      break;
    case ValidationState.Error:
      Component = CrossFilledSVG;
      showIcon = true;
      break;
    case ValidationState.Warning:
      Component = AlarmFilledSVG;
      showIcon = true;
      break;
    case ValidationState.Default:
    default:
      Component = InfoFilledSVG;
      showIcon = false;
      break;
  }

  return props.showHintIcon ?? showIcon ? (
    <Component size={16} data-validation={props.validationState} className={styles.hintIcon} />
  ) : null;
}

export function Footer({ length, hint, size, validationState = ValidationState.Default, showHintIcon }: FooterProps) {
  const isReverseContainer = !hint && length;
  const limitExceeded = length && length.max && length.current > length.max;

  return (
    <span className={styles.footer} data-reverse={isReverseContainer || undefined} data-size={size}>
      {hint && (
        <span className={styles.hintLayout}>
          {getValidationIcon({ validationState, showHintIcon })}
          <span className={styles.hint} data-validation={validationState} data-test-id='field-decorator__hint'>
            <TruncateString text={hint} />
          </span>
        </span>
      )}
      {length && (
        <span data-test-id='field-decorator__counter'>
          <span
            data-validation={validationState}
            data-limit-exceeded={limitExceeded || undefined}
            className={styles.counterCurrentValue}
            data-test-id='field-decorator__counter-current-value'
          >
            {length.current}
          </span>
          <span
            data-validation={validationState}
            data-limit-exceeded={limitExceeded || undefined}
            className={styles.counterLimitValue}
            data-test-id='field-decorator__counter-limit-value'
          >
            /{length.max}
          </span>
        </span>
      )}
    </span>
  );
}
