import { PopoverPrivate } from '@snack-ui/popover-private';

import { Droplist as DroplistContainer, DroplistProps } from './Droplist';
import {
  DroplistItemExpandable,
  DroplistItemExpandableProps,
  DroplistItemMultiple,
  DroplistItemMultipleProps,
  DroplistItemSingle,
  DroplistItemSingleProps,
} from './DroplistItem';
import { Size } from './DroplistItem/constants';
import { DroplistNoDataProps, NoData as DroplistItemNoData } from './NoData';

export namespace Droplist {
  export const Container = DroplistContainer;
  export type ContainerProps = DroplistProps;
  export const ItemSingle = DroplistItemSingle;
  export type ItemSingleProps = DroplistItemSingleProps;
  export const ItemMultiple = DroplistItemMultiple;
  export type ItemMultipleProps = DroplistItemMultipleProps;
  export const ItemExpandable = DroplistItemExpandable;
  export type ItemExpandableProps = DroplistItemExpandableProps;
  export const NoData = DroplistItemNoData;
  export type NoDataProps = DroplistNoDataProps;

  export const sizes = Size;

  export const placements = PopoverPrivate.placements;
  export const triggers = PopoverPrivate.triggers;
  export const widthStrategies = PopoverPrivate.widthStrategies;
}
