import { MouseEventHandler, ReactElement } from 'react';

import { TEST_IDS } from '../../constants';
import styles from './styles.module.scss';

export type OverlayElementProps = {
  onClose(): void;
  content: ReactElement;
  blur?: boolean;
};

export function OverlayElement({ onClose, content, blur = false }: OverlayElementProps) {
  const handleClick: MouseEventHandler = e => {
    e.stopPropagation();
    onClose();
  };

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        className={styles.modalOverlay}
        data-blur={blur || undefined}
        onClick={handleClick}
        data-test-id={TEST_IDS.overlay}
      />
      {content}
    </>
  );
}
