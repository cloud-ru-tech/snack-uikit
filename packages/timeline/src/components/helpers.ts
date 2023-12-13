import { Position, TrackItem, TrackItemProps } from '../helperComponents/TrackItem';
import { notReachable } from '../helpers';

export const getRole = (index: number, total: number): TrackItemProps['role'] => {
  if (index < 1) {
    return TrackItem.roles.Start;
  }

  if (index < total - 1) {
    return TrackItem.roles.Center;
  }

  return TrackItem.roles.End;
};

export const getContentPosition = (
  contentPosition: Position,
  index: number,
  itemPosition?: TrackItemProps['contentPosition'],
  alternate?: boolean,
): TrackItemProps['contentPosition'] => {
  if (itemPosition) {
    return itemPosition;
  }

  if (!alternate) {
    return contentPosition;
  }

  switch (contentPosition) {
    case TrackItem.contentPositions.Right:
      return index % 2 ? TrackItem.contentPositions.Left : TrackItem.contentPositions.Right;
    case TrackItem.contentPositions.Left:
      return index % 2 ? TrackItem.contentPositions.Right : TrackItem.contentPositions.Left;

    default:
      return notReachable(contentPosition);
  }
};
