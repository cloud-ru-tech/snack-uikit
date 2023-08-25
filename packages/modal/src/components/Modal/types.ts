import { ButtonFilledProps, ButtonLightProps, ButtonTonalProps } from '@snack-ui/button';
import { LinkProps } from '@snack-ui/link';

import { Align, Size } from '../../constants';
import { ModalBodyProps, ModalHeaderImage, ModalHeaderProps } from '../../helperComponents';
import { ModalCustomProps } from '../ModalCustom';

type BaseModalProps = Omit<ModalCustomProps, 'children' | 'size'> & {
  title: string;
  titleTooltip?: ModalHeaderProps['titleTooltip'];
  subtitle?: string;
  content?: ModalBodyProps['content'];
  approveButton: Omit<ButtonFilledProps, 'size' | 'data-test-id'>;
  cancelButton?: Omit<ButtonTonalProps, 'size' | 'data-test-id'>;
  additionalButton?: Omit<ButtonLightProps, 'size' | 'data-test-id'>;
  disclaimer?: {
    text: string;
    link?: Pick<LinkProps, 'text' | 'href' | 'target'>;
  };
};

export type ModalSProps = BaseModalProps & {
  size?: Size.S;
  align?: Align;
  picture?: ModalHeaderProps['picture'];
};

export type ModalMProps = BaseModalProps & {
  size?: Size.M;
  align?: Align.Default | Align.Center;
  picture?: ModalHeaderImage;
};

export type ModalLProps = BaseModalProps & {
  size?: Size.L;
  align?: Align.Default;
  picture?: ModalHeaderImage;
};
