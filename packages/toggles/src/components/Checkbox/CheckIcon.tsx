import { CheckSSVG, CheckXsSVG } from '@snack-ui/icons';

import { IconSize, Size } from '../../constants';

type CheckIconProps = {
  size: Size;
};

const SIZE_TO_ICON_MAP = {
  [Size.M]: <CheckSSVG size={IconSize[Size.M]} />,
  [Size.S]: <CheckXsSVG size={IconSize[Size.S]} />,
};

export function CheckIcon({ size }: CheckIconProps) {
  return SIZE_TO_ICON_MAP[size];
}
