import { QuestionXsSVG } from '@snack-ui/icons';
import { Tooltip } from '@snack-ui/tooltip';
import { TruncateString } from '@snack-ui/truncate-string';

import { Size } from '../../constants';
import styles from './styles.module.scss';

export type HeaderProps = {
  label?: string;
  labelTooltip?: string;
  labelFor?: string;
  required?: boolean;
  size?: Size;
};

export function Header({ label = '', labelTooltip, labelFor, size, required = false }: HeaderProps) {
  return (
    <span className={styles.header} data-size={size}>
      {label && (
        <span className={styles.labelLayout}>
          <label className={styles.label} htmlFor={labelFor} data-test-id='field-decorator__label'>
            <TruncateString text={label} />
          </label>
          {required && <span data-test-id='field-decorator__required-sign'>*</span>}
          {labelTooltip && (
            <Tooltip
              tip={labelTooltip}
              placement={Tooltip.placements.Right}
              data-test-id='field-decorator__label-tooltip'
            >
              <QuestionXsSVG size={16} className={styles.icon} data-test-id='field-decorator__label-tooltip-trigger' />
            </Tooltip>
          )}
        </span>
      )}
    </span>
  );
}
