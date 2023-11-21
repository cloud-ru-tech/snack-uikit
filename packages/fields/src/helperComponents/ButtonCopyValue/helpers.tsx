import { CheckSVG, CopySVG } from '@snack-ui/icons';
import { ButtonSize } from '@snack-ui/input-private';

type GetIconProps = {
  size: ButtonSize;
  isChecked: boolean;
};

export function getIcon({ size, isChecked }: GetIconProps) {
  switch (size) {
    case ButtonSize.S: {
      return isChecked ? <CheckSVG size={16} /> : <CopySVG size={16} />;
    }
    case ButtonSize.M:
    default: {
      return isChecked ? <CheckSVG size={24} /> : <CopySVG size={24} />;
    }
  }
}
