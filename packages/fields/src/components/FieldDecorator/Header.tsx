import { QuestionSVG } from '@snack-ui/icons';
import { Size } from '@snack-ui/input-private';
import { Tooltip, TooltipProps } from '@snack-ui/tooltip';
import { TruncateString } from '@snack-ui/truncate-string';

import styles from './styles.module.scss';

export type HeaderProps = {
  label?: string;
  labelTooltip?: string;
  labelFor?: string;
  required?: boolean;
  size?: Size;
  labelTooltipPlacement?: TooltipProps['placement'];
};

export function Header({
  label = '',
  labelTooltip,
  labelFor,
  size,
  required = false,
  labelTooltipPlacement = Tooltip.placements.Top,
}: HeaderProps) {
  return (
    <span className={styles.header} data-size={size}>
      {label && (
        <span className={styles.labelLayout}>
          <label className={styles.label} htmlFor={labelFor} data-test-id='field-decorator__label'>
            <TruncateString text={label} />
          </label>
          {required && <span data-test-id='field-decorator__required-sign'>*</span>}
          {labelTooltip && (
            <Tooltip tip={labelTooltip} placement={labelTooltipPlacement} data-test-id='field-decorator__label-tooltip'>
              <QuestionSVG size={16} className={styles.icon} data-test-id='field-decorator__label-tooltip-trigger' />
            </Tooltip>
          )}
        </span>
      )}
    </span>
  );
}
