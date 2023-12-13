import { APPEARANCE } from '../../constants';
import { TagRowItem, TagRowItemInner } from '../../types';

export const mapTagRowItem = ({ label, color }: TagRowItem): TagRowItemInner => {
  if (color) {
    return {
      label,
      color,
    };
  }

  return {
    label,
    color: APPEARANCE.Neutral,
  };
};
