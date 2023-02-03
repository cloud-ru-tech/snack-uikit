import { css } from '@linaria/core';

import { GLOBAL_CSS_COLOR, globalCSSTheme } from './theme';

export const globals = css`
  :global() {
    ${globalCSSTheme}

    @font-face {
      font-family: 'SB Sans Interface';
      src: url('../fonts/SBSansInterface-Semibold.woff2') format('woff2'),
        url('../fonts/SBSansInterface-Semibold.woff') format('woff');
      font-weight: 600;
      font-style: normal;
      font-display: swap;
    }

    @font-face {
      font-family: 'SB Sans Interface';
      src: url('../fonts/SBSansInterface-Light.woff2') format('woff2'),
        url('../fonts/SBSansInterface-Light.woff') format('woff');
      font-weight: 300;
      font-style: normal;
      font-display: swap;
    }

    @font-face {
      font-family: 'SB Sans Interface';
      src: url('../fonts/SBSansInterface-Bold.woff2') format('woff2'),
        url('../fonts/SBSansInterface-Bold.woff') format('woff');
      font-weight: bold;
      font-style: normal;
      font-display: swap;
    }

    @font-face {
      font-family: 'SB Sans Interface Caps';
      src: url('../fonts/SBSansInterface-Caps.woff2') format('woff2'),
        url('../fonts/SBSansInterface-Caps.woff') format('woff');
      font-weight: normal;
      font-style: normal;
      font-display: swap;
    }

    @font-face {
      font-family: 'SB Sans Interface';
      src: url('../fonts/SBSansInterface-Regular.woff2') format('woff2'),
        url('../fonts/SBSansInterface-Regular.woff') format('woff');
      font-weight: normal;
      font-style: normal;
      font-display: swap;
    }

    @font-face {
      font-family: 'SB Sans Text Mono';
      src: url('../fonts/SBSansTextMono-Bold.woff2') format('woff2'),
        url('../fonts/SBSansTextMono-Bold.woff') format('woff');
      font-weight: bold;
      font-style: normal;
      font-display: swap;
    }

    @font-face {
      font-family: 'SB Sans Text Mono';
      src: url('../fonts/SBSansTextMono-Regular.woff2') format('woff2'),
        url('../fonts/SBSansTextMono-Regular.woff') format('woff');
      font-weight: normal;
      font-style: normal;
      font-display: swap;
    }

    html {
      height: 100%;
    }

    body {
      height: 100%;
      background: var(${GLOBAL_CSS_COLOR.BACKGROUND});

      transition: all 0.4s ease-in-out;
    }

    body,
    button,
    input {
      font-family: SB Sans Interface, Helvetica, Arial, sans-serif;
      color: var(${GLOBAL_CSS_COLOR.TEXT});
      fill: var(${GLOBAL_CSS_COLOR.TEXT});
    }

    a {
      text-decoration: none;
    }
  }
`;
