import { WithSupportProps } from '@snack-ui/utils';

import { Appearance, Size } from '../../constants';
import { TagRowSimple, TagRowTruncated } from '../../helperComponents';
import { TagRowItem } from '../../types';
import { mapTagRowItem } from './utils';

export type TagRowProps = WithSupportProps<{
  /** Массив тэгов */
  items: TagRowItem[];
  /** Лимит количества рядов тэгов. При достижении лимита тэги скрываются под кнопкой. Отсутствие лимита или значение равное нулю отобразит весь список */
  rowLimit?: number;
  /** Размер */
  size?: Size;
  /** Текст кнопки, при наведении на которую отображается список скрытых тэгов */
  moreButtonLabel?: string;
  /** CSS-класс */
  className?: string;
  /** Коллбэк на клик по удалению тэга */
  onItemRemove?(item: string): void;
}>;

export function TagRow({ items, rowLimit, size = Size.Xs, ...props }: TagRowProps) {
  const coloredItems = items.map(mapTagRowItem);

  if (rowLimit) {
    return <TagRowTruncated items={coloredItems} rowLimit={rowLimit} size={size} {...props} />;
  }

  return <TagRowSimple items={coloredItems} size={size} {...props} />;
}

TagRow.sizes = Size;
TagRow.appearances = Appearance;
