import { css } from '@linaria/core';

import { Themes } from '../types/theme';
import { greenDarkDeprecated } from './DEPRECATED/green-dark';

export const greenDark = css`
  :global() {
    [data-theme='${Themes.GreenDark}'] {
      ${greenDarkDeprecated};
    }
  }
`;
