import { memo, useMemo, useRef } from 'react';

import { WithSupportProps } from '@snack-ui/utils';

import { ElementType, ItemRenderMode, SEPARATOR, Size } from '../../constants';
import { useBreadcrumbsLayout } from '../../hooks';
import { Item } from '../../types';
import { Collapse } from '../Collapse';
import { Crumb } from '../Crumb';
import { HiddenChain } from '../HiddenChain';
import { Separator } from '../Separator';
import { Wrapper } from '../Wrapper';

export type BreadcrumbsProps = WithSupportProps<{
  /** Массив айтемов */
  items: Item[];
  /** CSS-класс */
  className?: string;
  /**
   * Разделитель
   * @default "›"
   */
  separator?: string;
  /**
   * Размер
   * @default Breadcrumbs.sizes.S
   */
  size?: Size;
  /**
   * Использовать иконку без лейбла в первом айтеме
   * @default false
   */
  firstItemIconOnly?: boolean;
  /**
   * Делает некликабельным последний элемент, даже если для него переданы `href` или `onClick`
   * @default false
   */
  inactiveLastItem?: boolean;
}>;

/**
 * Компонент хлебных крошек
 */
const BreadcrumbsComponent = memo(function Breadcrumbs({
  items: itemsProps,
  size = Size.S,
  separator = SEPARATOR,
  className,
  firstItemIconOnly = false,
  inactiveLastItem = false,
  ...rest
}: BreadcrumbsProps) {
  const containerRef = useRef<HTMLUListElement>(null);

  const { setConfigs, currentConfig } = useBreadcrumbsLayout(containerRef);

  const items = useMemo(
    () =>
      inactiveLastItem
        ? itemsProps.map((item, index) =>
            index === itemsProps.length - 1 ? { ...item, onClick: undefined, href: undefined } : item,
          )
        : itemsProps,
    [inactiveLastItem, itemsProps],
  );

  return (
    <>
      <HiddenChain
        items={items}
        size={size}
        separator={separator}
        onConfigsBuilt={setConfigs}
        firstItemIconOnly={firstItemIconOnly}
      />
      <Wrapper {...rest} ref={containerRef} hidden={false} size={size} separator={separator} className={className}>
        {currentConfig?.chain.map((block, index, array) => {
          const isLastElement = index === array.length - 1;

          switch (block.element) {
            case ElementType.Separator:
              return <Separator key={index} />;
            case ElementType.Collapse:
              return <Collapse key={index} currentConfig={currentConfig.chain} />;
            case ElementType.Item:
              const { renderMode, id } = block.item;
              if (renderMode !== ItemRenderMode.Collapsed) {
                return (
                  <Crumb
                    useIconOnly={!index && firstItemIconOnly}
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
