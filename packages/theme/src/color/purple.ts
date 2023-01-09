import { css } from '@linaria/core';

import { Themes } from '../types/theme';
import { purpleDeprecated } from './DEPRECATED/purple';

export const purple = css`
  :global() {
    [data-theme='${Themes.Purple}'] {
      ${purpleDeprecated};
    }
  }
`;
