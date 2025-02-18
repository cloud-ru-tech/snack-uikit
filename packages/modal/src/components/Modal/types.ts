import { ElementType } from 'react';

import { ButtonFilledProps, ButtonOutlineProps, ButtonSimpleProps } from '@snack-uikit/button';
import { PickLinkProps } from '@snack-uikit/link';

import { ALIGN, SIZE } from '../../constants';
import { ModalBodyProps, ModalHeaderImage, ModalHeaderProps } from '../../helperComponents';
import { Align } from '../../types';
import { ModalCustomProps } from '../ModalCustom';

type BaseModalProps<LinkElement extends ElementType = 'a'> = Omit<ModalCustomProps, 'children' | 'size'> & {
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
    link?: PickLinkProps<LinkElement, 'text' | 'as'>;
  };
  /**
   *  Максимальное кол-во строк
   * <br> - `title` - в заголовке
   * <br> - `subtitle` - в подзаголовке
   * @default '{ <br>title: 1; <br>subtitle: 2; }'
   */
  truncate?: {
    title?: number;
    subtitle?: number;
  };
};

export type ModalSProps<LinkElement extends ElementType> = BaseModalProps<LinkElement> & {
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

export type ModalMProps<LinkElement extends ElementType> = BaseModalProps<LinkElement> & {
  size?: typeof SIZE.M;
  /** <br> для size=`m` - align=`default | center` */
  align?: typeof ALIGN.Default | typeof ALIGN.Center;
  picture?: ModalHeaderImage;
};

export type ModalLProps<LinkElement extends ElementType> = BaseModalProps<LinkElement> & {
  size?: typeof SIZE.L;
  /** <br> для size=`l` - align=`default` */
  align?: typeof ALIGN.Default;
  picture?: ModalHeaderImage;
};
