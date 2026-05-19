import cn from 'classnames';
import { CSSProperties, MouseEventHandler, ReactElement } from 'react';

import { ANIMATION_STATE, TEST_IDS } from '../../constants';
import { AnimationState } from '../../types';
import styles from './styles.module.scss';

export type OverlayElementProps = {
  onClose(): void;
  content: ReactElement;
  blur?: boolean;
  animationDuration?: number;
  animationState?: AnimationState;
};

export function OverlayElement({
  onClose,
  content,
  blur = false,
  animationDuration,
  animationState,
}: OverlayElementProps) {
  const handleClick: MouseEventHandler = e => {
    e.stopPropagation();
    onClose();
  };

  // Backdrop появляется сразу при открытии (без задержки).
  // При закрытии: ждет пока модалка исчезнет (exit-delay = 40% от длительности диалога).
  // Длительность backdrop = 62.5% от длительности диалога (пропорция 250ms / 400ms из пресета).
  const backdropDuration = animationDuration !== undefined ? Math.round(animationDuration * 0.625) : undefined;
  const exitDelay = animationDuration !== undefined ? Math.round(animationDuration * 0.4) : 0;

  const overlayStyle: CSSProperties | undefined =
    animationDuration !== undefined
      ? ({
          '--_modal-anim-duration': `${backdropDuration}ms`,
          '--_modal-anim-exit-delay': `${exitDelay}ms`,
        } as CSSProperties)
      : undefined;

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        className={cn(
          styles.modalOverlay,
          animationState && {
            [styles.overlayEntering]: animationState === ANIMATION_STATE.Entering,
            [styles.overlayExiting]: animationState === ANIMATION_STATE.Exiting,
          },
        )}
        data-blur={blur || undefined}
        style={overlayStyle}
        onClick={handleClick}
        data-test-id={TEST_IDS.overlay}
      />
      {content}
    </>
  );
}
