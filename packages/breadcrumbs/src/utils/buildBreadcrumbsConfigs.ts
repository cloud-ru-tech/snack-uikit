import { ElementType, ItemRenderMode } from '../constants';
import { BreadcrumbsConfig, InnerItem, Item, SizeMap } from '../types';

type Chain = InnerItem[];

const RENDER_MODE_WEIGHT = {
  [ItemRenderMode.Full]: 0,
  [ItemRenderMode.ShortLabel]: 1,
  [ItemRenderMode.Ellipsis]: 100,
  [ItemRenderMode.Collapsed]: 10000,
};

const RENDER_MODE_WITH_WIDTH = [ItemRenderMode.Full, ItemRenderMode.ShortLabel, ItemRenderMode.Ellipsis];

const startsWith =
  (renderMode: ItemRenderMode) =>
  (item: InnerItem, tail: Chain): Chain => [{ ...item, renderMode }, ...tail];
const startsWithFull = startsWith(ItemRenderMode.Full);
const startsWithShortLabel = startsWith(ItemRenderMode.ShortLabel);
const startsWithEllipsis = startsWith(ItemRenderMode.Ellipsis);
const startsWithCollapsed = startsWith(ItemRenderMode.Collapsed);

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
    return { ...element, renderMode: lastItem ? lastElementRenderMode : ItemRenderMode.Collapsed };
  });

export function buildBreadcrumbsConfigs(items: Item[], sizeMap: SizeMap): BreadcrumbsConfig[] {
  const chains: InnerItem[][] = [];
  const [first, ...rest] = items.map(item => ({ ...item, renderMode: ItemRenderMode.Full }));

  buildSubChain(rest, { useCollapse: true, useEllipse: true }).forEach(subset => {
    chains.push(startsWithFull(first, subset));
    first.shortLabel && chains.push(startsWithShortLabel(first, subset));
  });

  /** Первый элемент можно схлопывать/сокращать только когда уже сокращено все что можно */
  chains.push(startsWithEllipsis(first, collapseAllRest(ItemRenderMode.Full, rest)));
  chains.push(startsWithEllipsis(first, collapseAllRest(ItemRenderMode.Ellipsis, rest)));
  chains.push(startsWithCollapsed(first, collapseAllRest(ItemRenderMode.Full, rest)));
  chains.push(startsWithCollapsed(first, collapseAllRest(ItemRenderMode.Ellipsis, rest)));

  return chains.map(chain =>
    chain.reduce<BreadcrumbsConfig>(
      (acc, item, index) => {
        const { renderMode } = item;

        if (index && RENDER_MODE_WITH_WIDTH.includes(renderMode)) {
          acc.width += sizeMap.separator;
          acc.chain.push({ element: ElementType.Separator, width: sizeMap.separator });
        }

        if (!acc.hasCollapsed && renderMode === ItemRenderMode.Collapsed) {
          if (index) {
            acc.width += sizeMap.separator;
            acc.chain.push({ element: ElementType.Separator, width: sizeMap.separator });
          }
          acc.hasCollapsed = true;
          acc.width += sizeMap.collapse;
          acc.chain.push({ element: ElementType.Collapse, width: sizeMap.collapse });
        }

        const width = sizeMap.items[item.id][renderMode];
        acc.weight += RENDER_MODE_WEIGHT[item.renderMode];
        acc.width += width;
        acc.chain.push({ element: ElementType.Item, item, width });

        return acc;
      },
      { chain: [], weight: 0, width: 0, hasCollapsed: false },
    ),
  );
}
