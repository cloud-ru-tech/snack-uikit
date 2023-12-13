import { ButtonFilledProps, ButtonOutlineProps, ButtonSimpleProps } from '@snack-uikit/button';
import { LinkProps } from '@snack-uikit/link';

import { ALIGN, SIZE } from '../../constants';
import { ModalBodyProps, ModalHeaderImage, ModalHeaderProps } from '../../helperComponents';
import { Align } from '../../types';
import { ModalCustomProps } from '../ModalCustom';

type BaseModalProps = Omit<ModalCustomProps, 'children' | 'size'> & {
  /** Заголовок модального окна */
  title: string;
  /** Всплывающая подсказка для заголовка */
  titleTooltip?: ModalHeaderProps['titleTooltip'];
  /** Подзаголовок */
  subtitle?: string;
  /** Содержимое модального окна */
  content?: ModalBodyProps['content'];
  /** Основная кнопка действия */
  approveButton: Omit<ButtonFilledProps, 'size' | 'data-test-id'>;
  /** Кнопка отмены */
  cancelButton?: Omit<ButtonOutlineProps, 'size' | 'data-test-id'>;
  /** Вторая кнопка действия */
  additionalButton?: Omit<ButtonSimpleProps, 'size' | 'data-test-id'>;
  /** Небольшой текст под кнопками футера с возможностью передать дополнительно ссылку */
  disclaimer?: {
    text: string;
    link?: Pick<LinkProps, 'text' | 'href' | 'target'>;
  };
};

export type ModalSProps = BaseModalProps & {
  /** Размер */
  size?: typeof SIZE.S;
  /**
   * Выравнивание, для разных размеров доступны разные значения
   * <br> для size=`s` - все
   */
  align?: Align;
  /** Можно передать иконку из пакета `@snack-uikit/icon-predefined`, или путь к картинке и атрибут `alt` */
  picture?: ModalHeaderProps['picture'];
};

export type ModalMProps = BaseModalProps & {
  size?: typeof SIZE.M;
  /** <br> для size=`m` - align=`default | center` */
  align?: typeof ALIGN.Default | typeof ALIGN.Center;
  picture?: ModalHeaderImage;
};

export type ModalLProps = BaseModalProps & {
  size?: typeof SIZE.L;
  /** <br> для size=`l` - align=`default` */
  align?: typeof ALIGN.Default;
  picture?: ModalHeaderImage;
};
