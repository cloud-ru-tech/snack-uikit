import { css } from '@linaria/core';

import { Themes } from '../types/theme';
import { greenDeprecated } from './DEPRECATED/green';

export const green = css`
  :global() {
    [data-theme='${Themes.Green}'] {
      ${greenDeprecated};
    }
  }
`;
