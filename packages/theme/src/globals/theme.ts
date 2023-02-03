import { BLUE_GREY, GREEN, GREY, PURPLE } from '../color/vars';
import { Themes } from '../types/theme';

export const GLOBAL_CSS_COLOR = {
  TEXT: '--general-text-color',
  BACKGROUND: '--general-background-color',
  BACKGROUND_ACCENT: '--general-background-accent-color',
  BACKGROUND_SECONDARY: '--general-background-secondary-color',
  BACKGROUND_DARK: '--general-background-dark-color',
};

export const globalCSSTheme = `
    body[data-theme='${Themes.Purple}'] {
      ${GLOBAL_CSS_COLOR.TEXT}: var(${GREY[800]});
      ${GLOBAL_CSS_COLOR.BACKGROUND}: var(${GREY[50]});
      ${GLOBAL_CSS_COLOR.BACKGROUND_ACCENT}: var(${PURPLE[100]});
      ${GLOBAL_CSS_COLOR.BACKGROUND_DARK}: var(${BLUE_GREY[90]});
      ${GLOBAL_CSS_COLOR.BACKGROUND_SECONDARY}: var(${GREY[0]});
    }
    body[data-theme='${Themes.PurpleDark}'] {
      ${GLOBAL_CSS_COLOR.TEXT}: var(${GREY[200]});
      ${GLOBAL_CSS_COLOR.BACKGROUND}: var(${GREY[800]});
      ${GLOBAL_CSS_COLOR.BACKGROUND_ACCENT}: var(${PURPLE[100]});
      ${GLOBAL_CSS_COLOR.BACKGROUND_DARK}: var(${BLUE_GREY[80]});
      ${GLOBAL_CSS_COLOR.BACKGROUND_SECONDARY}: var(${GREY[800]});
    }
    body[data-theme='${Themes.Green}'] {
      ${GLOBAL_CSS_COLOR.TEXT}: var(${GREY[800]});
      ${GLOBAL_CSS_COLOR.BACKGROUND}: var(${GREY[50]});
      ${GLOBAL_CSS_COLOR.BACKGROUND_ACCENT}: var(${BLUE_GREY[80]});
      ${GLOBAL_CSS_COLOR.BACKGROUND_DARK}: var(${BLUE_GREY[90]});
      ${GLOBAL_CSS_COLOR.BACKGROUND_SECONDARY}: var(${GREY[0]});
    }
    body[data-theme='${Themes.GreenDark}'] {
      ${GLOBAL_CSS_COLOR.TEXT}: var(${GREY[200]});
      ${GLOBAL_CSS_COLOR.BACKGROUND}: var(${GREY[800]});
      ${GLOBAL_CSS_COLOR.BACKGROUND_ACCENT}: var(${GREEN[125]});
      ${GLOBAL_CSS_COLOR.BACKGROUND_DARK}: var(${BLUE_GREY[80]});
      ${GLOBAL_CSS_COLOR.BACKGROUND_SECONDARY}: var(${GREY[800]});
    }
`;
