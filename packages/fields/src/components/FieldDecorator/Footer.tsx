import { useMemo } from 'react';

import { AlarmFilledSVG, CheckFilledSVG, CrossFilledSVG, InfoFilledSVG } from '@snack-uikit/icons';
import { Size } from '@snack-uikit/input-private';

import { VALIDATION_STATE } from '../../constants';
import { ValidationState } from '../../types';
import styles from './styles.module.scss';

export type FooterProps = {
  /** Допустимая длинна текста */
  length?: {
    /** Текущая */
    current: number;
    /** Максимальная */
    max?: number;
  };
  /** Подсказка внизу */
  hint?: string;
  /** Состояние валидации */
  validationState?: ValidationState;
  /** Размер */
  size?: Size;
  /** Отображать иконку подсказки */
  showHintIcon?: boolean;
  /** Является ли поле деактивированным */
  disabled?: boolean;
  /** Доступно ли поле только на чтение */
  readonly?: boolean;
};

function getValidationIcon(props: Pick<FooterProps, 'showHintIcon' | 'validationState'>) {
  let Component: typeof InfoFilledSVG;
  let showIcon: boolean;

  switch (props.validationState) {
    case VALIDATION_STATE.Success:
      Component = CheckFilledSVG;
      showIcon = true;
      break;
    case VALIDATION_STATE.Error:
      Component = CrossFilledSVG;
      showIcon = true;
      break;
    case VALIDATION_STATE.Warning:
      Component = AlarmFilledSVG;
      showIcon = true;
      break;
    case VALIDATION_STATE.Default:
    default:
      Component = InfoFilledSVG;
      showIcon = false;
      break;
  }

  return props.showHintIcon ?? showIcon ? (
    <Component size={16} data-validation={props.validationState} className={styles.hintIcon} />
  ) : null;
}

export function Footer({ length, hint, size, validationState = VALIDATION_STATE.Default, showHintIcon }: FooterProps) {
  const isReverseContainer = !hint && length;
  const limitExceeded = length && length.max && length.current > length.max;

  const icon = useMemo(() => getValidationIcon({ validationState, showHintIcon }), [showHintIcon, validationState]);

  if (!hint && !length) {
    return null;
  }

  return (
    <span className={styles.footer} data-reverse={isReverseContainer || undefined} data-size={size}>
      {hint && (
        <span className={styles.hintLayout}>
          {icon && (
            <span className={styles.hintIconContainer} data-size={size}>
              {icon}
            </span>
          )}
          <span className={styles.hint} data-validation={validationState} data-test-id='field-decorator__hint'>
            {hint}
          </span>
        </span>
      )}
      {length && (
        <span data-test-id='field-decorator__counter' className={styles.counterLimit}>
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
            data-test-id='field-decorator__counter-limit-value'
          >
            /{length.max}
          </span>
        </span>
      )}
    </span>
  );
}
