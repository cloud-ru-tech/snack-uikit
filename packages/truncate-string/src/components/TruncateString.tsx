import { Tooltip } from '@snack-uikit/tooltip';

import {
  TruncateStringEnd,
  TruncateStringEndProps,
  TruncateStringMiddle,
  TruncateStringMiddleProps,
} from '../helperComponents';
import { Variant } from './constants';

export type TruncateStringProps =
  | ({
      /** Вариант обрезания строки: <br> - `End` - с конца */
      variant?: Variant.End;
    } & TruncateStringEndProps)
  | ({
      /** <br> - `Middle` - по середине */
      variant: Variant.Middle;
    } & TruncateStringMiddleProps);

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
