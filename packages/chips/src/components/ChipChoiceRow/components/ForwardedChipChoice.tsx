import { JSXElementConstructor } from 'react';

import { ChipChoiceProps } from '../types';
import { MAP_CHIP_TYPE_TO_COMPONENT } from './constants';

export function ForwardedChipChoice(props: ChipChoiceProps) {
  const Component = MAP_CHIP_TYPE_TO_COMPONENT[props.type] as unknown as JSXElementConstructor<ChipChoiceProps>;

  return <Component {...props} />;
}
