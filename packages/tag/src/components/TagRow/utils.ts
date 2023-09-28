import { Appearance } from '../../constants';
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
    color: Appearance.Neutral,
  };
};
