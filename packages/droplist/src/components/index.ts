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
  NoData: typeof NoData;
  ItemSingle: typeof DroplistItemSingle;
  ItemMultiple: typeof DroplistItemMultiple;
  useKeyboardNavigation: typeof useKeyboardNavigation;
};

Droplist.NoData = NoData;
Droplist.ItemSingle = DroplistItemSingle;
Droplist.ItemMultiple = DroplistItemMultiple;
Droplist.useKeyboardNavigation = useKeyboardNavigation;
