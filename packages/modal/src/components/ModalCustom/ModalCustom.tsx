import cn from 'classnames';
import { CSSProperties, ReactNode, useEffect, useState } from 'react';
import RCModal from 'react-modal';

import { isBrowser, useModalOpenState, WithSupportProps } from '@snack-uikit/utils';

import { ANIMATION_STATE, MODE, SIZE } from '../../constants';
import {
  ButtonClose,
  ModalBody,
  ModalBodyProps,
  ModalFooter,
  ModalFooterProps,
  ModalHeader,
  ModalHeaderProps,
  OverlayElement,
} from '../../helperComponents';
import { AnimationState, Mode, Size } from '../../types';
import styles from './styles.module.scss';
import { getDataTestAttributes } from './utils';

export type ModalCustomProps = WithSupportProps<{
  /** Управляет состоянием показан/не показан. */
  open: boolean;
  /** Колбек закрытия компонента. */
  onClose(): void;
  /**
   * Режим отображения модального окна:
   * <br> - __`Regular`__ -  есть кнопка закрытия, клик на оверлей и нажатие кнопки `Esc` закрывают модалку
   * <br> - __`Aggressive`__ - есть кнопка закрытия, но выключен клик на оверлей и не работает закрытие по клавише `Esc`
   * <br> - __`Forced`__ - закрыть модальное окно можно только по нажатию на кнопку действия в нижней части
   * @default Mode.Regular
   */
  mode?: Mode;
  /**
   * Размер модального окна
   * @default Size.S
   */
  size?: Size;
  /** CSS-класс */
  className?: string;
  /** Контент */
  children: ReactNode;
  /** Закрывать при переходе по истории браузера */
  closeOnPopstate?: boolean;
  /**
   * Длительность анимации открытия/закрытия в миллисекундах.
   * Если не передан — анимации нет.
   */
  animationDuration?: number;
  /**
   * Разница в процентах между появлением модального окна и оверлей
   * можно ставить от 0 до 1
   */
  animationDurationPercent?: number;
}>;

export function ModalCustom({
  open,
  onClose,
  size = SIZE.S,
  mode = MODE.Regular,
  children,
  className,
  closeOnPopstate,
  animationDuration,
  animationDurationPercent = 0.4,
  ...rest
}: ModalCustomProps) {
  const animDuration = animationDuration ?? 0;
  const isAnimated = animDuration > 0;

  const [shouldRender, setShouldRender] = useState(open);
  const [animationState, setAnimationState] = useState<AnimationState>(ANIMATION_STATE.Entering);

  useEffect(() => {
    if (!isAnimated) return;

    if (open) {
      setShouldRender(true);
      setAnimationState(ANIMATION_STATE.Entering);
    } else {
      setAnimationState(ANIMATION_STATE.Exiting);
      const closeTotalDuration = animDuration + Math.round(animDuration * animationDurationPercent);
      const timer = setTimeout(() => setShouldRender(false), closeTotalDuration);
      return () => clearTimeout(timer);
    }
  }, [open, isAnimated, animDuration, animationDurationPercent]);

  const handleCloseButtonClick = () => {
    onClose();
  };

  const handleClose = () => {
    if (mode === MODE.Regular) {
      onClose();
    }
  };

  const hasCloseButton = mode !== MODE.Forced;

  useModalOpenState(open, () => hasCloseButton && onClose(), {
    closeOnPopstate,
  });

  const isRendered = isAnimated ? shouldRender : open;

  if (!isRendered) {
    return null;
  }

  const animDelay = Math.round(animDuration * animationDurationPercent);
  const contentStyle: CSSProperties | undefined = isAnimated
    ? ({
        '--_modal-anim-duration': `${animDuration}ms`,
        '--_modal-anim-delay': `${animDelay}ms`,
      } as CSSProperties)
    : undefined;

  return (
    <RCModal
      data={{ ...getDataTestAttributes(rest), size }}
      isOpen
      onRequestClose={handleClose}
      appElement={isBrowser() ? document.body : undefined}
      overlayElement={(_, content) => (
        <OverlayElement
          blur={([MODE.Forced, MODE.Aggressive] as Mode[]).includes(mode)}
          content={content}
          onClose={handleClose}
          animationDuration={isAnimated ? animDuration : undefined}
          animationState={isAnimated ? animationState : undefined}
        />
      )}
      className={cn(
        styles.modal,
        className,
        isAnimated && {
          [styles.entering]: animationState === ANIMATION_STATE.Entering,
          [styles.exiting]: animationState === ANIMATION_STATE.Exiting,
        },
      )}
      style={contentStyle ? { content: contentStyle } : undefined}
    >
      {hasCloseButton && (
        <div className={styles.headerElements}>
          <ButtonClose onClick={handleCloseButtonClick} />
        </div>
      )}

      {children}
    </RCModal>
  );
}

export namespace ModalCustom {
  export type HeaderProps = ModalHeaderProps;
  export type BodyProps = ModalBodyProps;
  export type FooterProps = ModalFooterProps;
  export const Header = ModalHeader;
  export const Body = ModalBody;
  export const Footer = ModalFooter;
}
