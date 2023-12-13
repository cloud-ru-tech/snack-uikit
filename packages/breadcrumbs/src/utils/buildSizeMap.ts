import { ITEM_RENDER_MODE } from '../constants';
import { ItemRenderMode, ItemSizeMap, SizeMap } from '../types';

const getEmptyItemSizeMap = (): ItemSizeMap => ({
  [ITEM_RENDER_MODE.ShortLabel]: 0,
  [ITEM_RENDER_MODE.Collapsed]: 0,
  [ITEM_RENDER_MODE.Ellipsis]: 0,
  [ITEM_RENDER_MODE.Full]: 0,
});

const getElementWidth = (element: HTMLElement): number => element.getBoundingClientRect().width;

export function buildSizeMap(container?: Element): SizeMap | undefined {
  if (!container) {
    return;
  }

  const children = container.children as unknown as ArrayLike<HTMLElement>;

  const [separator, collapse, ...itemElements] = Array.from(children);

  return {
    separator: getElementWidth(separator),
    collapse: getElementWidth(collapse),
    items: itemElements.reduce((result, element) => {
      const id = element.getAttribute('data-id') as string;
      const renderMode = element.getAttribute('data-render-mode') as ItemRenderMode;
      result[id] = result[id] || getEmptyItemSizeMap();
      result[id][renderMode] = getElementWidth(element);
      return result;
    }, {} as SizeMap['items']),
  };
}
