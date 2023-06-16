import { memo, useRef } from 'react';

import { WithSupportProps } from '@snack-ui/utils';

import { ElementType, ItemRenderMode, SEPARATOR, Size } from '../../constants';
import { useBreadcrumbsLayout } from '../../hooks';
import { RawItem } from '../../types';
import { Collapse } from '../Collapse';
import { Crumb } from '../Crumb';
import { HiddenChain } from '../HiddenChain';
import { Separator } from '../Separator';
import { Wrapper } from '../Wrapper';

export type BreadcrumbsProps = WithSupportProps<{
  className?: string;
  separator?: string;
  items: RawItem[];
  size?: Size;
}>;

const BreadcrumbsComponent = memo(function Breadcrumbs({
  items,
  size = Size.S,
  separator = SEPARATOR,
  className,
  ...rest
}: BreadcrumbsProps) {
  const containerRef = useRef<HTMLUListElement>(null);

  const { setConfigs, currentConfig } = useBreadcrumbsLayout(containerRef);

  return (
    <>
      <HiddenChain items={items} size={size} separator={separator} onConfigsBuilt={setConfigs} />
      <Wrapper {...rest} ref={containerRef} hidden={false} size={size} separator={separator} className={className}>
        {currentConfig?.map((block, index, array) => {
          const isLastElement = index === array.length - 1;

          switch (block.element) {
            case ElementType.Separator:
              return <Separator key={index} />;
            case ElementType.Collapse:
              return <Collapse key={index} currentConfig={currentConfig} />;
            case ElementType.Item:
              const { renderMode, id } = block.item;
              if (renderMode !== ItemRenderMode.Collapsed) {
                return (
                  <Crumb
                    current={isLastElement}
                    renderMode={renderMode}
                    minWidth={block.width}
                    item={block.item}
                    key={id}
                  />
                );
              }
            default:
              return null;
          }
        })}
      </Wrapper>
    </>
  );
});

export const Breadcrumbs = BreadcrumbsComponent as typeof BreadcrumbsComponent & {
  sizes: typeof Size;
};

Breadcrumbs.sizes = Size;
