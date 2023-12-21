import { MouseEvent, ReactElement } from 'react';

import { APPEARANCE_TO_COLOR_MAP } from '../../constants';
import { Appearance } from '../../types';
import styles from './styles.module.scss';

export type AlertButtonProps = {
  appearance: Appearance;
  label: string;
  icon?: ReactElement;
  onClick(e: MouseEvent<HTMLButtonElement>): void;
};

export function AlertButton({ appearance, label, icon, onClick }: AlertButtonProps) {
  return (
    <button
      onClick={onClick}
      className={styles.alertButton}
      data-color={APPEARANCE_TO_COLOR_MAP[appearance]}
      data-test-id='alert__action-button'
    >
      <span>{label}</span>
      {icon}
    </button>
  );
}
