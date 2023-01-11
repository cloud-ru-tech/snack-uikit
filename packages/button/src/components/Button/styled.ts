import { styled } from '@linaria/react';

import { TEXT_2_STYLES } from '@sbercloud/uikit-product-typography';
import { DEFAULT_STYLES } from '@sbercloud/uikit-product-utils';

import {
  THEME_BASE,
  THEME_GREEN,
  THEME_GREENDARK,
  THEME_PURPLE,
  THEME_PURPLEDARK,
  TOKENS_COMPONENTS_BUTTON_BUTTON_FILLED,
} from '../../../../../tokens';
import { Variant } from './constants';

THEME_BASE;
THEME_GREEN;
THEME_GREENDARK;
THEME_PURPLE;
THEME_PURPLEDARK;
TOKENS_COMPONENTS_BUTTON_BUTTON_FILLED;

export const StyledButtonPrivate = styled.button`
  ${DEFAULT_STYLES.COMMON};
  ${DEFAULT_STYLES.BORDERLESS};

  cursor: pointer;
  text-transform: none;
  color: inherit;
  background-color: transparent;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: max-content;
  min-width: max-content;
  text-decoration: none;
  font-weight: normal;

  height: 44px;
  padding: 12px 16px;
  border-radius: 4px;

  ${TEXT_2_STYLES};

  &[data-variant='${Variant.Filled}'] {
    fill: var(--button-filled-primary-size-s-label-icon-enabled-fill);
    background-color: var(--button-filled-primary-size-s-label-icon-enabled-fill);
    color: var(--button-filled-primary-size-s-text-enabled-fill);

    :hover {
      fill: var(--button-filled-primary-size-s-label-icon-hovered-fill);
      background-color: var(--button-filled-primary-size-s-label-icon-hovered-fill);
      color: var(--button-filled-primary-size-s-text-hovered-fill);
    }

    :active {
      fill: var(--button-filled-primary-size-s-label-icon-pressed-fill);
      background-color: var(--button-filled-primary-size-s-label-icon-pressed-fill);
      color: var(--button-filled-primary-size-s-text-pressed-fill);
    }

    :disabled,
    &[disabled] {
      fill: var(--button-filled-primary-size-s-label-icon-disabled-fill);
      background-color: var(--button-filled-primary-size-s-label-icon-disabled-fill);
      color: var(--button-filled-primary-size-s-text-disabled-fill);
    }
  }
`;

/*
export const StyledButtonPrivate = styled.button`
  ${DEFAULT_STYLES.COMMON};
  ${DEFAULT_STYLES.BORDERLESS};

  cursor: pointer;
  text-transform: none;
  color: inherit;
  background-color: transparent;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: max-content;
  min-width: max-content;
  text-decoration: none;
  font-weight: normal;

  height: 44px;
  padding: 12px 16px;
  border-radius: 4px;

  ${TEXT_2_STYLES};

  &[data-variant='${Variant.Filled}'] {
    fill: var(${COLORS.ButtonFilledPrimarySizeSLabelIconEnabledFill});
    background-color: var(${COLORS.ButtonFilledPrimarySizeSLabelIconEnabledFill});
    color: var(${COLORS.ButtonFilledPrimarySizeSLabelIconEnabledFill});

    :hover {
      fill: var(${COLORS.ButtonFilledPrimarySizeSLabelIconHoveredFill});
      background-color: var(${COLORS.ButtonFilledPrimarySizeSLabelIconHoveredFill});
      color: var(${COLORS.ButtonFilledPrimarySizeSLabelIconHoveredFill});
    }

    :active {
      fill: var(${COLORS.ButtonFilledPrimarySizeSLabelIconPressedFill});
      background-color: var(${COLORS.ButtonFilledPrimarySizeSLabelIconPressedFill});
      color: var(${COLORS.ButtonFilledPrimarySizeSLabelIconPressedFill});
    }

    :disabled,
    &[disabled] {
      fill: var(${COLORS.ButtonFilledPrimarySizeSLabelIconDisabledFill});
      background-color: var(${COLORS.ButtonFilledPrimarySizeSLabelIconDisabledFill});
      color: var(${COLORS.ButtonFilledPrimarySizeSLabelIconDisabledFill});
    }
  }
`;*/

export const IconWrapper = styled.div`
  margin-left: 8px;
`;
