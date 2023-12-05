import { CheckSVG, CopySVG } from '@snack-uikit/icons';
import { ButtonSize } from '@snack-uikit/input-private';

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
