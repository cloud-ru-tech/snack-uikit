import { MouseEventHandler } from 'react';

import { DroplistProps, ItemSingleProps } from '@snack-ui/droplist';
import { WithSupportProps } from '@snack-ui/utils';

import { Size } from '../../constants';
import { BaseChipProps } from '../../types';

export type FilterOption = Pick<ItemSingleProps, 'caption' | 'description' | 'tagLabel' | 'icon' | 'avatar'> & {
  label: string;
  value: string;
};

export type ChipChoiceCommonProps = WithSupportProps<
  Partial<BaseChipProps> & {
    /** Размер */
    size?: Size;
    /** Колбек обработки клика */
    onClick?: MouseEventHandler<HTMLButtonElement | HTMLDivElement>;
    /** Отображение кнопки очистки значения */
    showClearButton?: boolean;
    /** Расположение выпадающего меню */
    placement?: DroplistProps['placement'];
    /**
     * Стратегия управления шириной контейнера поповера
     * <br> - `Auto` - соответствует ширине контента,
     * <br> - `Gte` - Great Than or Equal, равен ширине таргета или больше ее, если контент в поповере шире,
     * <br> - `Eq` - Equal, строго равен ширине таргета.
     * @default Gte
     */
    widthStrategy?: DroplistProps['widthStrategy'];
  }
>;
