import cn from 'classnames';
import { ReactNode } from 'react';
import RCModal from 'react-modal';

import { WithSupportProps } from '@snack-ui/utils';

import { Appearance, Size } from '../../constants';
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
import styles from './styles.module.scss';
import { getDataTestAttributes } from './utils';

export type ModalCustomProps = WithSupportProps<{
  open: boolean;
  onClose(): void;
  appearance?: Appearance;
  size?: Size;
  className?: string;
  children: ReactNode;
}>;

function ModalCustomComponent({
  open,
  onClose,
  size = Size.S,
  appearance = Appearance.Regular,
  children,
  className,
  ...rest
}: ModalCustomProps) {
  const handleCloseButtonClick = () => {
    onClose();
  };

  const handleClose = () => {
    if (appearance === Appearance.Regular) {
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
        <OverlayElement appearance={appearance} content={content} onClose={handleClose} />
      )}
      className={cn(styles.modal, className)}
    >
      {children}

      {appearance !== Appearance.Forced && (
        <div className={styles.headerElements}>
          <ButtonClose onClick={handleCloseButtonClick} />
        </div>
      )}
    </RCModal>
  );
}

export const ModalCustom = ModalCustomComponent as typeof ModalCustomComponent & {
  appearances: typeof Appearance;
  sizes: typeof Size;
  Header: typeof ModalHeader;
  Body: typeof ModalBody;
  Footer: typeof ModalFooter;
};

ModalCustom.appearances = Appearance;
ModalCustom.sizes = Size;
ModalCustom.Header = ModalHeader;
ModalCustom.Body = ModalBody;
ModalCustom.Footer = ModalFooter;

export namespace ModalCustom {
  export type HeaderProps = ModalHeaderProps;
  export type BodyProps = ModalBodyProps;
  export type FooterProps = ModalFooterProps;
}
