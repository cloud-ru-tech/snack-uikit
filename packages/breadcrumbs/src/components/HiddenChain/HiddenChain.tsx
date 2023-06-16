import { memo, useEffect, useRef } from 'react';

import { ItemRenderMode, Size } from '../../constants';
import { BreadcrumbsConfig, RawItem } from '../../types';
import { buildBreadcrumbsConfigs, buildSizeMap } from '../../utils';
import { Collapse } from '../Collapse';
import { Crumb } from '../Crumb';
import { Separator } from '../Separator';
import { Wrapper } from '../Wrapper';

export type HiddenChainProps = {
  separator: string;
  items: RawItem[];
  size: Size;
  onConfigsBuilt(config: BreadcrumbsConfig[]): void;
};

export const HiddenChain = memo(function HiddenChain({ size, separator, items, onConfigsBuilt }: HiddenChainProps) {
  const containerRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const observer = new ResizeObserver(([{ target }]) => {
        const sizeMap = buildSizeMap(target);
        if (sizeMap) {
          onConfigsBuilt(buildBreadcrumbsConfigs(items, sizeMap));
        }
      });
      observer.observe(container);

      return () => {
        observer.disconnect();
      };
    }
  }, [items, onConfigsBuilt]);

  return (
    <Wrapper size={size} hidden ref={containerRef} separator={separator} data-test-id='hidden-wrapper'>
      <Separator />
      <Collapse currentConfig={[]} />
      {items.map(item =>
        [
          [ItemRenderMode.ShortLabel, item.shortLabel],
          [ItemRenderMode.Ellipsis, item.label],
          [ItemRenderMode.Full, item.label],
        ].map(([mode, modeLabel]) => {
          if (modeLabel?.length) {
            return <Crumb renderMode={mode as ItemRenderMode} key={item.id + mode} item={item} />;
          }
        }),
      )}
    </Wrapper>
  );
});
