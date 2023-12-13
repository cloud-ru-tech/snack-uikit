import cn from 'classnames';
import { ReactNode } from 'react';
import RCModal from 'react-modal';

import { WithSupportProps } from '@snack-uikit/utils';

import { MODE, SIZE } from '../../constants';
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
import { Mode, Size } from '../../types';
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
}>;

export function ModalCustom({
  open,
  onClose,
  size = SIZE.S,
  mode = MODE.Regular,
  children,
  className,
  ...rest
}: ModalCustomProps) {
  const handleCloseButtonClick = () => {
    onClose();
  };

  const handleClose = () => {
    if (mode === MODE.Regular) {
      onClose();
    }
  };

  return (
    <RCModal
      data={{ ...getDataTestAttributes(rest), size }}
      isOpen={open}
      onRequestClose={handleClose}
      appElement={document.body}
      overlayElement={(_, content) => (
        <OverlayElement
          blur={([MODE.Forced, MODE.Aggressive] as Mode[]).includes(mode)}
          content={content}
          onClose={handleClose}
        />
      )}
      className={cn(styles.modal, className)}
    >
      {mode !== MODE.Forced && (
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
