import { MouseEventHandler } from 'react';

import { DroplistProps, ItemSingleProps } from '@snack-uikit/droplist';
import { WithSupportProps } from '@snack-uikit/utils';

import { BaseChipProps, Size } from '../../types';

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
    /** Отображение кнопки очистки значения @default true*/
    showClearButton?: boolean;
    /** Расположение выпадающего меню */
    placement?: DroplistProps['placement'];
    /**
     * Стратегия управления шириной контейнера поповера
     * <br> - `auto` - соответствует ширине контента,
     * <br> - `gte` - Great Than or Equal, равен ширине таргета или больше ее, если контент в поповере шире,
     * <br> - `eq` - Equal, строго равен ширине таргета.
     * @default gte
     */
    widthStrategy?: DroplistProps['widthStrategy'];
  }
>;
