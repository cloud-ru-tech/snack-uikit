import { Tooltip } from '@snack-ui/tooltip';

import {
  TruncateStringEnd,
  TruncateStringEndProps,
  TruncateStringMiddle,
  TruncateStringMiddleProps,
} from '../helperComponents';
import { Variant } from './constants';

export type TruncateStringProps =
  | ({ variant?: Variant.End } & TruncateStringEndProps)
  | ({ variant: Variant.Middle } & TruncateStringMiddleProps);

export function TruncateString({ variant = Variant.End, ...props }: TruncateStringProps) {
  switch (variant) {
    case Variant.Middle: {
      return <TruncateStringMiddle {...props} />;
    }

    case Variant.End:
    default: {
      return <TruncateStringEnd {...props} />;
    }
  }
}

TruncateString.placements = Tooltip.placements;
TruncateString.variants = Variant;
