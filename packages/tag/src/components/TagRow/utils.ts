import { APPEARANCE } from '../../constants';
import { TagRowItem, TagRowItemInner } from '../../types';

export const mapTagRowItem = ({ label, appearance }: TagRowItem): TagRowItemInner => {
  if (appearance) {
    return { label, appearance };
  }

  return {
    label,
    appearance: APPEARANCE.Neutral,
  };
};
