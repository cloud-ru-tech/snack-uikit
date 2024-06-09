import { memo, useEffect, useRef } from 'react';

import { BreadcrumbsConfig, Item, Size } from '../../types';
import { buildBreadcrumbsConfigs, buildSizeMap } from '../../utils';
import { Collapse } from '../Collapse';
import { Separator } from '../Separator';
import { Wrapper } from '../Wrapper';
import { useItemModesRender } from './hooks';

export type HiddenChainProps = {
  separator: string;
  items: Item[];
  size: Size;
  onConfigsBuilt(config: BreadcrumbsConfig[]): void;
  firstItemIconOnly?: boolean;
  lastEmpty?: boolean;
};

export const HiddenChain = memo(function HiddenChain({
  size,
  separator,
  items,
  onConfigsBuilt,
  firstItemIconOnly = false,
  lastEmpty = false,
}: HiddenChainProps) {
  const containerRef = useRef<HTMLUListElement>(null);
  const itemsRef = useRef<Item[]>(items);

  itemsRef.current = items;

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const observer = new ResizeObserver(([{ target }]) => {
        const sizeMap = buildSizeMap(target);
        if (sizeMap) {
          onConfigsBuilt(buildBreadcrumbsConfigs(itemsRef.current, sizeMap, lastEmpty));
        }
      });
      observer.observe(container);

      return () => {
        observer.disconnect();
      };
    }
  }, [items, lastEmpty, onConfigsBuilt]);

  const renderItemModes = useItemModesRender({ firstItemIconOnly });

  return (
    <Wrapper size={size} hidden ref={containerRef} separator={separator} data-test-id='hidden-wrapper'>
      <Separator />
      <Collapse currentConfig={[]} />
      {items.map(renderItemModes)}
    </Wrapper>
  );
});
