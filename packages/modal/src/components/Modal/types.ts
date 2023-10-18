import { ButtonFilledProps, ButtonOutlineProps, ButtonSimpleProps } from '@snack-ui/button';
import { LinkProps } from '@snack-ui/link';

import { Align, Size } from '../../constants';
import { ModalBodyProps, ModalHeaderImage, ModalHeaderProps } from '../../helperComponents';
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
  size?: Size.S;
  /**
   * Выравнивание, для разных размеров доступны разные значения
   * <br> для `Size.S` - все
   */
  align?: Align;
  /** Можно передать иконку из пакета `@snack-ui/icon-predefined`, или путь к картинке и атрибут `alt` */
  picture?: ModalHeaderProps['picture'];
};

export type ModalMProps = BaseModalProps & {
  size?: Size.M;
  /** <br> для `Size.M` - `Align.Default | Align.Center` */
  align?: Align.Default | Align.Center;
  picture?: ModalHeaderImage;
};

export type ModalLProps = BaseModalProps & {
  size?: Size.L;
  /** <br> для `Size.L` - `Align.Default` */
  align?: Align.Default;
  picture?: ModalHeaderImage;
};
