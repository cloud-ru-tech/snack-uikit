import { ItemRenderMode } from '../constants';
import { ItemSizeMap, SizeMap } from '../types';

const getEmptyItemSizeMap = (): ItemSizeMap => ({
  [ItemRenderMode.ShortLabel]: 0,
  [ItemRenderMode.Collapsed]: 0,
  [ItemRenderMode.Ellipsis]: 0,
  [ItemRenderMode.Full]: 0,
});

export function buildSizeMap(container?: Element): SizeMap | undefined {
  if (!container) {
    return;
  }

  const children = container.children as unknown as ArrayLike<HTMLElement>;

  const [separator, collapse, ...itemElements] = Array.from(children);

  return {
    separator: separator.offsetWidth,
    collapse: collapse.offsetWidth,
    items: itemElements.reduce((result, element) => {
      const id = element.getAttribute('data-id') as string;
      const renderMode = element.getAttribute('data-render-mode') as ItemRenderMode;
      result[id] = result[id] || getEmptyItemSizeMap();
      result[id][renderMode] = element.offsetWidth;
      return result;
    }, {} as SizeMap['items']),
  };
}
