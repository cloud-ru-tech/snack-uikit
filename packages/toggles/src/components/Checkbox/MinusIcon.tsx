import { MinusSVG } from '@snack-ui/icons';

import { IconSize, Size } from '../../constants';

type CheckIconProps = {
  size: Size;
};

const SIZE_TO_ICON_MAP = {
  [Size.M]: <MinusSVG size={IconSize[Size.M]} />,
  [Size.S]: <MinusSVG size={IconSize[Size.S]} />,
};

export function MinusIcon({ size }: CheckIconProps) {
  return SIZE_TO_ICON_MAP[size];
}
