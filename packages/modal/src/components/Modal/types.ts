import { ButtonFilledProps, ButtonLightProps, ButtonTonalProps } from '@snack-ui/button';
import { LinkProps } from '@snack-ui/link';

import { Align, Size } from '../../constants';
import { ModalBodyProps } from '../../helperComponents/Body';
import { ModalHeaderProps } from '../../helperComponents/Header';
import { ModalCustomProps } from '../ModalCustom';

type BaseModalProps = Omit<ModalCustomProps, 'children' | 'size'> & {
  picture?: ModalHeaderProps['picture'];
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
};

export type ModalMProps = BaseModalProps & {
  size?: Size.M;
  align?: Align.Default | Align.Center;
};

export type ModalLProps = BaseModalProps & {
  size?: Size.L;
  align?: Align.Default;
};
