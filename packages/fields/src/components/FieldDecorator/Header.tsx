import { ReactNode } from 'react';

import { QuestionSVG } from '@snack-uikit/icons';
import { Size } from '@snack-uikit/input-private';
import { Tooltip, TooltipProps } from '@snack-uikit/tooltip';
import { TruncateString } from '@snack-uikit/truncate-string';

import styles from './styles.module.scss';

export type HeaderProps = {
  /** Лейбл */
  label?: string;
  /** Подпись справа от лейбла */
  caption?: string;
  /** Всплывающая подсказка лейбла */
  labelTooltip?: ReactNode;
  /** Аттрибут for */
  labelFor?: string;
  /** Является ли поле обязательным */
  required?: boolean;
  /** Размер */
  size?: Size;
  /**
   * Расположение подсказки лейбла
   * @default top
   */
  labelTooltipPlacement?: TooltipProps['placement'];
};

export function Header({
  label = '',
  labelTooltip,
  caption,
  labelFor,
  size,
  required = false,
  labelTooltipPlacement = 'top',
}: HeaderProps) {
  return (
    <span className={styles.header} data-size={size}>
      {label && (
        <span className={styles.labelLayout}>
          <label className={styles.label} htmlFor={labelFor} data-test-id='field-decorator__label'>
            <TruncateString text={label} />
          </label>
          {required && (
            <span className={styles.required} data-test-id='field-decorator__required-sign'>
              *
            </span>
          )}
          {labelTooltip && (
            <Tooltip
              tip={labelTooltip}
              placement={labelTooltipPlacement}
              data-test-id='field-decorator__label-tooltip'
              triggerClassName={styles.labelTooltipTrigger}
            >
              <QuestionSVG size={16} className={styles.icon} data-test-id='field-decorator__label-tooltip-trigger' />
            </Tooltip>
          )}
        </span>
      )}

      {caption && <span className={styles.caption}>{caption}</span>}
    </span>
  );
}
