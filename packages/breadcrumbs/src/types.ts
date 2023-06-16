import { JSXElementConstructor } from 'react';

import { ElementType, ItemRenderMode } from './constants';

export type RawItem = {
  id: string;
  label: string;
  icon?: JSXElementConstructor<{ size: number }>;
  href?: string;
  shortLabel?: string;
  onClick?(): void;
};

export type Item = RawItem & {
  renderMode: ItemRenderMode;
};

export type ItemSizeMap = {
  [ItemRenderMode.ShortLabel]: number;
  [ItemRenderMode.Collapsed]: number;
  [ItemRenderMode.Ellipsis]: number;
  [ItemRenderMode.Full]: number;
};

export type SizeMap = {
  separator: number;
  collapse: number;
  items: {
    [key: string]: ItemSizeMap;
  };
};

export type BreadcrumbsConfigChain = Array<
  | {
      element: ElementType.Collapse;
      width: number;
    }
  | {
      element: ElementType.Separator;
      width: number;
    }
  | {
      element: ElementType.Item;
      width: number;
      item: Item;
    }
>;

export type BreadcrumbsConfig = {
  chain: BreadcrumbsConfigChain;
  hasCollapsed: boolean;
  weight: number;
  width: number;
};
