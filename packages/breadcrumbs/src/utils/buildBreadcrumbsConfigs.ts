import { ELEMENT_TYPE, ITEM_RENDER_MODE } from '../constants';
import { BreadcrumbsConfig, InnerItem, Item, ItemRenderMode, SizeMap } from '../types';

type Chain = InnerItem[];

const RENDER_MODE_WEIGHT = {
  [ITEM_RENDER_MODE.Full]: 0,
  [ITEM_RENDER_MODE.ShortLabel]: 1,
  [ITEM_RENDER_MODE.Ellipsis]: 100,
  [ITEM_RENDER_MODE.Collapsed]: 10000,
};

const RENDER_MODE_WITH_WIDTH = [
  ITEM_RENDER_MODE.Full,
  ITEM_RENDER_MODE.ShortLabel,
  ITEM_RENDER_MODE.Ellipsis,
] as ItemRenderMode[];

const startsWith =
  (renderMode: ItemRenderMode) =>
  (item: InnerItem, tail: Chain): Chain => [{ ...item, renderMode }, ...tail];
const startsWithFull = startsWith(ITEM_RENDER_MODE.Full);
const startsWithShortLabel = startsWith(ITEM_RENDER_MODE.ShortLabel);
const startsWithEllipsis = startsWith(ITEM_RENDER_MODE.Ellipsis);
const startsWithCollapsed = startsWith(ITEM_RENDER_MODE.Collapsed);

type BuildSubChainOptions = {
  useCollapse: boolean;
  useEllipse: boolean;
};

function buildSubChain(
  [current, ...rest]: Chain,
  { useCollapse = true, useEllipse = true }: BuildSubChainOptions,
): Chain[] {
  const result: Chain[] = [];

  if (!current) {
    return result;
  }

  if (!rest.length) {
    result.push(startsWithFull(current, []));
    current.shortLabel && result.push(startsWithShortLabel(current, []));
    return result;
  }

  buildSubChain(rest, { useCollapse: false, useEllipse: false }).forEach(variant => {
    result.push(startsWithFull(current, variant));
    current.shortLabel && result.push(startsWithShortLabel(current, variant));
  });

  if (useEllipse) {
    buildSubChain(rest, { useCollapse: false, useEllipse: true }).forEach(variant => {
      result.push(startsWithEllipsis(current, variant));
    });
  }

  if (useCollapse) {
    buildSubChain(rest, { useCollapse: true, useEllipse: true }).forEach(variant => {
      result.push(startsWithCollapsed(current, variant));
    });
  }

  return result;
}

const collapseAllRest = (lastElementRenderMode: ItemRenderMode, rest: InnerItem[]) =>
  rest.map((element, index, array) => {
    const lastItem = index === array.length - 1;
    return { ...element, renderMode: lastItem ? lastElementRenderMode : ITEM_RENDER_MODE.Collapsed };
  });

export function buildBreadcrumbsConfigs(items: Item[], sizeMap: SizeMap, lastEmpty?: boolean): BreadcrumbsConfig[] {
  const chains: InnerItem[][] = [];
  const [first, ...rest] = items.map(item => ({ ...item, renderMode: ITEM_RENDER_MODE.Full }));

  buildSubChain(rest, { useCollapse: true, useEllipse: true }).forEach(subset => {
    chains.push(startsWithFull(first, subset));
    first.shortLabel && chains.push(startsWithShortLabel(first, subset));
  });

  /** Первый элемент можно схлопывать/сокращать только когда уже сокращено все что можно */
  chains.push(startsWithEllipsis(first, collapseAllRest(ITEM_RENDER_MODE.Full, rest)));
  chains.push(startsWithEllipsis(first, collapseAllRest(ITEM_RENDER_MODE.Ellipsis, rest)));
  chains.push(startsWithCollapsed(first, collapseAllRest(ITEM_RENDER_MODE.Full, rest)));
  chains.push(startsWithCollapsed(first, collapseAllRest(ITEM_RENDER_MODE.Ellipsis, rest)));

  return chains.map(chain =>
    chain.reduce<BreadcrumbsConfig>(
      (acc, item, index, array) => {
        const { renderMode } = item;

        if (index && RENDER_MODE_WITH_WIDTH.includes(renderMode)) {
          acc.width += sizeMap.separator;
          acc.chain.push({ element: ELEMENT_TYPE.Separator, width: sizeMap.separator });
        }

        if (!acc.hasCollapsed && renderMode === ITEM_RENDER_MODE.Collapsed) {
          if (index) {
            acc.width += sizeMap.separator;
            acc.chain.push({ element: ELEMENT_TYPE.Separator, width: sizeMap.separator });
          }
          acc.hasCollapsed = true;
          acc.width += sizeMap.collapse;
          acc.chain.push({ element: ELEMENT_TYPE.Collapse, width: sizeMap.collapse });
        }

        const width = sizeMap.items[item.id][renderMode];
        acc.weight += RENDER_MODE_WEIGHT[item.renderMode];
        acc.width += width;
        acc.chain.push({ element: ELEMENT_TYPE.Item, item, width });

        if (index === array.length - 1 && lastEmpty) {
          acc.width += sizeMap.separator;
          acc.chain.push({ element: ELEMENT_TYPE.Separator, width: sizeMap.separator });
        }

        return acc;
      },
      { chain: [], weight: 0, width: 0, hasCollapsed: false },
    ),
  );
}
