import { ReactElement } from 'react';

import { APPEARANCE_TO_COLOR_MAP_INVERT } from '../../components/AlertTop/constants';
import { Appearance } from '../../types';
import styles from './styles.module.scss';

export type AlertTopButtonProps = {
  appearance: Appearance;
  buttonText: string;
  buttonIcon?: ReactElement;
  buttonOnClick?: () => void;
};

export function AlertTopButton({ appearance, buttonText, buttonIcon, buttonOnClick }: AlertTopButtonProps) {
  return (
    <button
      onClick={buttonOnClick}
      className={styles.alertTopButton}
      data-color={APPEARANCE_TO_COLOR_MAP_INVERT[appearance]}
    >
      <span>{buttonText}</span>
      {buttonIcon}
    </button>
  );
}
