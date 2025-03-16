import { APPEARANCE } from '../../constants';
import { TagRowItem, TagRowItemInner } from '../../types';

export const mapTagRowItem = ({ appearance = APPEARANCE.Neutral, ...props }: TagRowItem): TagRowItemInner => ({
  ...props,
  appearance,
});
