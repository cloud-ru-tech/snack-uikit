import { PopoverPrivate } from '@snack-ui/popover-private';

import { Droplist as DroplistComponent } from './Droplist';
import { DroplistItemExpandable, DroplistItemMultiple, DroplistItemSingle } from './DroplistItem';
import { Size } from './DroplistItem/constants';
import { NoData } from './NoData';

export type {
  DroplistItemSingleProps as ItemSingleProps,
  DroplistItemMultipleProps as ItemMultipleProps,
  DroplistItemExpandableProps as ItemExpandableProps,
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
  ItemExpandable: typeof DroplistItemExpandable;
};

Droplist.sizes = Size;
Droplist.NoData = NoData;
Droplist.triggers = PopoverPrivate.triggers;
Droplist.placements = PopoverPrivate.placements;
Droplist.widthStrategies = PopoverPrivate.widthStrategies;
Droplist.ItemSingle = DroplistItemSingle;
Droplist.ItemMultiple = DroplistItemMultiple;
Droplist.ItemExpandable = DroplistItemExpandable;
