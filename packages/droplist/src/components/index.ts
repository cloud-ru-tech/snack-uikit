import { PopoverPrivate } from '@snack-ui/popover-private';

import { Size } from '../constants';
import { Droplist as DroplistComponent } from './Droplist';
import { useKeyboardNavigation } from './Droplist/hooks';
import { DroplistItemMultiple, DroplistItemSingle } from './DroplistItem';
import { NoData } from './NoData';

export * from './Dropdown';

export type {
  DroplistItemSingleProps as ItemSingleProps,
  DroplistItemMultipleProps as ItemMultipleProps,
} from './DroplistItem';

export type { DroplistNoDataProps as NoDataProps } from './NoData';

export type { DroplistProps } from './Droplist';

export const Droplist = DroplistComponent as typeof DroplistComponent & {
  sizes: typeof Size;
  NoData: typeof NoData;
  triggers: typeof PopoverPrivate.triggers;
  placements: typeof PopoverPrivate.placements;
  widthStrategies: typeof PopoverPrivate.widthStrategies;
  ItemSingle: typeof DroplistItemSingle;
  ItemMultiple: typeof DroplistItemMultiple;
  useKeyboardNavigation: typeof useKeyboardNavigation;
};

Droplist.sizes = Size;
Droplist.NoData = NoData;
Droplist.triggers = PopoverPrivate.triggers;
Droplist.placements = PopoverPrivate.placements;
Droplist.widthStrategies = PopoverPrivate.widthStrategies;
Droplist.ItemSingle = DroplistItemSingle;
Droplist.ItemMultiple = DroplistItemMultiple;
Droplist.useKeyboardNavigation = useKeyboardNavigation;
