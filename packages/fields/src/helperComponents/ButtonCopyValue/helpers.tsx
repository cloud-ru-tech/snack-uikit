import { CheckSVG, CopySVG } from '@snack-uikit/icons';
import { BUTTON_SIZE, ButtonSize } from '@snack-uikit/input-private';

type GetIconProps = {
  size: ButtonSize;
  isChecked: boolean;
};

export function getIcon({ size, isChecked }: GetIconProps) {
  switch (size) {
    case BUTTON_SIZE.S: {
      return isChecked ? <CheckSVG size={16} /> : <CopySVG size={16} />;
    }
    case BUTTON_SIZE.M:
    default: {
      return isChecked ? <CheckSVG size={24} /> : <CopySVG size={24} />;
    }
  }
}
