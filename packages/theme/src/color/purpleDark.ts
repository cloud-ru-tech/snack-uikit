import { css } from '@linaria/core';

import { Themes } from '../types/theme';
import { purpleDarkDeprecated } from './DEPRECATED/purple-dark';

export const purpleDark = css`
  :global() {
    [data-theme='${Themes.PurpleDark}'] {
      ${purpleDarkDeprecated};
    }
  }
`;
