import { memo, useMemo, useRef } from 'react';

import { WithSupportProps } from '@snack-uikit/utils';

import { ELEMENT_TYPE, ITEM_RENDER_MODE, SEPARATOR, SIZE } from '../../constants';
import { useBreadcrumbsLayout } from '../../hooks';
import { Item, Size } from '../../types';
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
   * @default s
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

  lastEmpty?: boolean;
}>;

/**
 * Компонент хлебных крошек
 */
export const Breadcrumbs = memo(function Breadcrumbs({
  items: itemsProps,
  size = SIZE.S,
  separator = SEPARATOR,
  className,
  firstItemIconOnly = false,
  inactiveLastItem = false,
  lastEmpty = false,
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
        lastEmpty={lastEmpty}
      />
      <Wrapper {...rest} ref={containerRef} hidden={false} size={size} separator={separator} className={className}>
        {currentConfig?.chain.map((block, index, array) => {
          const isLastElement = index === array.length - 1;

          switch (block.element) {
            case ELEMENT_TYPE.Separator:
              return <Separator key={index} />;
            case ELEMENT_TYPE.Collapse:
              return <Collapse key={index} currentConfig={currentConfig.chain} />;
            case ELEMENT_TYPE.Item: {
              const { renderMode, id } = block.item;
              if (renderMode !== ITEM_RENDER_MODE.Collapsed) {
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
              break;
            }
            default:
              return null;
          }
        })}
      </Wrapper>
    </>
  );
});
