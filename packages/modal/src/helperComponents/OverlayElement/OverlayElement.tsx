import { MouseEventHandler, ReactElement } from 'react';

import { Appearance, TEST_IDS } from '../../constants';
import styles from './styles.module.scss';

export type OverlayElementProps = {
  onClose(): void;
  content: ReactElement;
  appearance: Appearance;
};

export function OverlayElement({ onClose, content, appearance }: OverlayElementProps) {
  const handleClick: MouseEventHandler = e => {
    e.stopPropagation();
    onClose();
  };

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions,jsx-a11y/no-static-element-interactions */}
      <div
        className={styles.modalOverlay}
        data-appearance={appearance}
        onClick={handleClick}
        data-test-id={TEST_IDS.overlay}
      />
      {content}
    </>
  );
}
