import { JSXElementConstructor, MouseEventHandler } from 'react';

import { ValueOf } from '@snack-uikit/utils';

import { ELEMENT_TYPE, ITEM_RENDER_MODE, SIZE } from './constants';

export type Size = ValueOf<typeof SIZE>;

export type ElementType = ValueOf<typeof ELEMENT_TYPE>;

export type ItemRenderMode = ValueOf<typeof ITEM_RENDER_MODE>;

export type Item = {
  id: string;
  label: string;
  icon?: JSXElementConstructor<{ size: number }>;
  href?: string;
  shortLabel?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
};

export type InnerItem = Item & {
  renderMode: ItemRenderMode;
};

export type ItemSizeMap = {
  [ITEM_RENDER_MODE.ShortLabel]: number;
  [ITEM_RENDER_MODE.Collapsed]: number;
  [ITEM_RENDER_MODE.Ellipsis]: number;
  [ITEM_RENDER_MODE.Full]: number;
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
      element: typeof ELEMENT_TYPE.Collapse;
      width: number;
    }
  | {
      element: typeof ELEMENT_TYPE.Separator;
      width: number;
    }
  | {
      element: typeof ELEMENT_TYPE.Item;
      width: number;
      item: InnerItem;
    }
>;

export type CurrentConfigState = {
  chain: BreadcrumbsConfigChain;
  chainWidth: number;
  containerWidth: number;
};

export type BreadcrumbsConfig = {
  chain: BreadcrumbsConfigChain;
  hasCollapsed: boolean;
  weight: number;
  width: number;
};
