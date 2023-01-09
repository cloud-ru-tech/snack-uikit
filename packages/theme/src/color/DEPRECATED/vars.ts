const COLORS = {
  GRAY_1: '--color-default-gray-1',
  GRAY_2: '--color-default-gray-2',
  GRAY_3: '--color-default-gray-3',
  GRAY_4: '--color-default-gray-4',
  GRAY_5: '--color-default-gray-5',
  GRAY_6: '--color-default-gray-6',
  GRAY_7: '--color-default-gray-7',
  GRAY_8: '--color-default-gray-8',
  GRAY_9: '--color-default-gray-9',
  GRAY_10: '--color-default-gray-10',
  GRAY_11: '--color-default-gray-11',
  BLACK_1: '--color-default-black-1',
  BLACK_2: '--color-default-black-2',
  WHITE: '--color-default-white',
  VIOLET_1: '--color-default-violet-1',
  VIOLET_2: '--color-default-violet-2',
  VIOLET_3: '--color-default-violet-3',
  VIOLET_4: '--color-default-violet-4',
  VIOLET_5: '--color-default-violet-5',
  VIOLET_6: '--color-default-violet-6',
  VIOLET_7: '--color-default-violet-7',
  VIOLET_8: '--color-default-violet-8',
  PURPLE: '--color-default-purple',
  GREEN_1: '--color-default-green-1',
  GREEN_2: '--color-default-green-2',
  GREEN_3: '--color-default-green-3',
  GREEN_4: '--color-default-green-4',
  GREEN_5: '--color-default-green-5',
  GREEN_6: '--color-default-green-6',
  GREEN_7: '--color-default-green-7',
  GREEN_8: '--color-default-green-8',
  BLUE_1: '--color-default-blue-1',
  BLUE_2: '--color-default-blue-2',
  RED_1: '--color-default-red-1',
  RED_2: '--color-default-red-2',
  YELLOW: '--color-default-yellow',
};

const COLORS_PRESET = {
  GREEN: '--color-preset-green',
  BLUE: '--color-preset-blue',
  PURPLE: '--color-preset-purple',
  PINK: '--color-preset-pink',
  RED: '--color-preset-red',
  GRAY_DEFAULT: '--color-preset-gray-default',
  GRAY: '--color-preset-gray',
  BROWN: '--color-preset-brown',
  ORANGE: '--color-preset-orange',
  YELLOW: '--color-preset-yellow',
  YELLOW_GREEN: '--color-preset-yellow-green',
  BLUE_GREEN: '--color-preset-blue-green',
};

const COLORS_BRAND = {
  GREEN: '--color-brand-green',
  GREEN_GRADIENT: '--color-brand-green-gradient',
  BLACK: '--color-brand-black',
  GRAY: '--color-brand-gray',
};

const COLORS_TAG = {
  RED: '--color-tag-red',
  PINK: '--color-tag-pink',
  PURPLE: '--color-tag-purple',
  BLUE: '--color-tag-blue',
  GREEN: '--color-tag-green',
  YELLOW: '--color-tag-yellow',
  ORANGE: '--color-tag-orange',
  BROWN: '--color-tag-brown',
  GRAY_1: '--color-tag-gray-1',
  GRAY_2: '--color-tag-gray-2',
  TAG_TEXT_COLOR: '--tag-text-color',
  TAG_BG_GREEN: '--tag-bg-green',
  TAG_BG_BLUE: '--tag-bg-blue',
  TAG_BG_PURPLE: '--tag-bg-purple',
  TAG_BG_PINK: '--tag-bg-pink',
  TAG_BG_RED: '--tag-bg-red',
  TAG_BG_GRAY_DEFAULT: '--tag-bg-gray-default',
  TAG_BG_GRAY: '--tag-bg-gray',
  TAG_BG_BROWN: '--tag-bg-brown',
  TAG_BG_ORANGE: '--tag-bg-orange',
  TAG_BG_YELLOW: '--tag-bg-yellow',
  TAG_BG_YELLOW_GREEN: '--tag-bg-yellow-green',
  TAG_BG_BLUE_GREEN: '--tag-bg-blue-green',
  TAG_TYPE_CARD_BACKGROUND: '--tag-type-card-background',
  TAG_TYPE_CARD_COLOR: '--tag-type-card-color',
};

const COLORS_GENERAL = {
  BACKGROUND: '--color-default-background',
  TEXT: '--color-default-text',
};

const COLORS_TYPOGRAPHY = {
  LINK: '--color-typography-link',
};

const COLORS_BUTTON = {
  FOCUS_SHADOW: '--button-focus-shadow',

  FILLED_COLOR: '--button-filled-color',
  FILLED_ICON_COLOR: '--button-filled-icon-color',
  FILLED_BG: '--button-filled-bg',
  FILLED_HOVER_BG: '--button-filled-hover-bg',
  FILLED_ACTIVE_BG: '--button-filled-active-bg',
  FILLED_DISABLED_COLOR: '--button-filled-disabled-color',
  FILLED_DISABLED_BG: '--button-filled-disabled-bg',
  FILLED_FOCUS_BG: '--button-filled-focus-bg',

  OUTLINED_COLOR: '--button-outlined-color',
  OUTLINED_BORDER: '--button-outlined-border',
  OUTLINED_HOVER_COLOR: '--button-outlined-hover-color',
  OUTLINED_HOVER_BORDER: '--button-outlined-hover-border',
  OUTLINED_ACTIVE_COLOR: '--button-outlined-active-color',
  OUTLINED_ACTIVE_BORDER: '--button-outlined-active-border',
  OUTLINED_DISABLED_COLOR: '--button-outlined-disabled-color',
  OUTLINED_DISABLED_BORDER: '--button-outlined-disabled-border',
  OUTLINED_FOCUS_COLOR: '--button-outlined-focus-color',
  OUTLINED_FOCUS_BORDER: '--button-outlined-focus-border',

  TRANSPARENT_COLOR: '--button-transparent-color',
  TRANSPARENT_HOVER_BG: '--button-transparent-hover-bg',
  TRANSPARENT_HOVER_COLOR: '--button-transparent-hover-color',
  TRANSPARENT_ACTIVE_BG: '--button-transparent-active-bg',
  TRANSPARENT_ACTIVE_COLOR: '--button-transparent-active-color',
  TRANSPARENT_DISABLED_COLOR: '--button-transparent-disables-color',
  TRANSPARENT_FOCUS_COLOR: '--button-transparent-focus-color',
  TRANSPARENT_FOCUS_BG: '--button-transparent-focus-bg',
  TRANSPARENT_FOCUS_BORDER: '--button-transparent-focus-border',

  FILLED_BRAND_COLOR: '--button-filled-brand-color',
  FILLED_BRAND_BG: '--button-filled-brand-bg',
  FILLED_BRAND_HOVER_BG: '--button-filled-brand-hover-bg',
  FILLED_BRAND_ACTIVE_BG: '--button-filled-brand-active-bg',
  FILLED_BRAND_DISABLED_COLOR: '--button-filled-brand-disabled-color',
  FILLED_BRAND_DISABLED_BG: '--button-filled-brand-disabled-bg',
  FILLED_BRAND_FOCUS_BG: '--button-filled-brand-focus-bg',

  TABLE_MENU_BUTTON_COLOR: '--button-table-menu-color',
  TABLE_MENU_BUTTON_HOVER_COLOR: '--button-table-menu-hover-color',
  TABLE_MENU_BUTTON_DISABLED_COLOR: '--button-table-menu-disabled-color',
  TABLE_MENU_BUTTON_ACTIVE_COLOR: '--button-table-menu-active-color',

  WHITE_COLOR: '--button-white-color',
  WHITE_BG: '--button-white-bg',
  WHITE_HOVER_BG: '--button-white-hover-bg',
  WHITE_HOVER_COLOR: '--button-white-hover-color',
  WHITE_ACTIVE_BG: '--button-white-active-bg',
  WHITE_ACTIVE_COLOR: '--button-white-active-color',
  WHITE_DISABLED_COLOR: '--button-white-disabled-color',
  WHITE_DISABLED_BG: '--button-white-disabled-bg',
  WHITE_FOCUS_COLOR: '--button-white-focus-color',
  WHITE_FOCUS_BG: '--button-white-focus-bg',
  WHITE_FOCUS_OUTLINE: '--button-white-focus-outline',
  WHITE_FOCUS_BORDER: '--button-white-focus-border',

  ALARM_COLOR: '--button-alarm-color',
  ALARM_ICON_COLOR: '--button-alarm-icon-color',
  ALARM_BG: '--button-alarm-background',
  ALARM_HOVER_BG: '--button-alarm-hover-background',
  ALARM_ACTIVE_BG: '--button-alarm-active-background',
  ALARM_DISABLED_COLOR: '--button-alarm-disabled-color',
  ALARM_DISABLED_BG: '--button-alarm-disabled-background',
  ALARM_FOCUS_BG: '--button-alarm-disabled-focus-background',

  ROUNDED_COLOR: '--button-rounded-color',
  ROUNDED_BG: '--button-rounded-bg',
  ROUNDED_HOVER_BG: '--button-rounded-hover-bg',
  ROUNDED_DISABLED_BG: '--button-rounded-disabled-bg',

  DISABLED_COLOR: '--button-disabled-color',
  DISABLED_BG: '--button-disabled-bg',
};

const COLORS_ICON = {
  FILL: '--icon-fill',
  HOVER_FILL: '--icon-hover-fill',
  ACTIVE_FILL: '--icon-active-fill',
};

const COLORS_DIVIDER = {
  COLOR_LIGHT: '--divider-color-light',
  COLOR_MIDDLE: '--divider-color-middle',
  COLOR_DARK: '--divider-color-dark',
};

const COLORS_SPIN = {
  BORDER: '--spin-border',
  BORDER_TOP: '--spin-border-top',
  TEXT_COLOR: '--spin-text-color',
  BORDER_REV: '--spin-border-rev',
  BORDER_REV_TOP: '--spin-border-rev-top',
  TEXT_REV_COLOR: '--spin-text-rev-color',
};

const COLORS_MODAL = {
  BG: '--modal-bg',
  TITLE_COLOR: '--modal-title-color',
  DESCRIPTION_COLOR: '--modal-description-color',
  PREVIEW_BG: '--modal-preview-bg',
  PREVIEW_CLOSE_ICON_COLOR: '--modal-preview-close-icon-color',
  PREVIEW_CLOSE_ICON_HOVER_COLOR: '--modal-preview-close-icon-hover-color',
};

const COLORS_TOOLTIP = {
  CONTAINER_COLOR: '--tooltip-container-color',
  CONTAINER_BG: '--tooltip-container-bg',
  MENU_BG: '--tooltip-menu-bg',
  MENU_ITEM_HOVER_BG: '--tooltip-menu-item-hover-bg',
  MENU_ITEM_ICON_FILL: '--tooltip-menu-item-icon-fill',
  ICON_FILL: '--tooltip-icon-fill',
  ICON_HOVER_FILL: '--tooltip-icon-hover-fill',
};

const COLORS_INPUT = {
  INPUT_BG: '--input-bg',
  INPUT_BORDER: '--input-border',
  INPUT_ERROR_BORDER: '--input-error-border',
  INPUT_PLACEHOLDER_COLOR: '--input-placeholder',
  INPUT_TEXT_COLOR: '--input-text',
  INPUT_FOCUS_BORDER: '--input-focus-border',
  INPUT_FOCUS_BACKGROUND: '--input-focus-bg',
  INPUT_HOVER_BORDER: '--input-hover-border',
  INPUT_HOVER_PLACEHOLDER_COLOR: '--input-hover-placeholder-color',
  INPUT_HOVER_BACKGROUND: '--input-hover-bg',
  INPUT_ERROR: '--input-error',
  INPUT_DISABLED_BACKGROUND: '--input-disabled-bg',
  INPUT_DISABLED_COLOR: '--input-disabled-color',
  INPUT_DISABLED_BORDER: '--input-disabled-border',
  INPUT_ICON_COLOR: '--input-icon-color',
  INPUT_ICON_HOVER_COLOR: '--input-icon-hover-color',
  COPY_INPUT_BACKGROUND: '--input-copy-background',
  COPY_INPUT_COLOR: '--input-copy-color',
  COPY_INPUT_ICON_COLOR: '--input-copy-icon-color',
  COPY_INPUT_ICON_HOVER_COLOR: '--input-copy-icon-hover-color',
  COPY_INPUT_ICON_BACKGROUND_COLOR: '--input-copy-icon-background-color',
};

const COLORS_RADIO = {
  COLOR: '--radio-color',
  SECONDARY_COLOR: '--radio-secondary-color',
  DISABLED_COLOR: '--radio-disabled-color',
  HOVER_BG: '--radio-hover-bg',
  CHECKED_BG: '--radio-checked-bg',
  ICON_COLOR: '--radio-icon-color',
  ICON_BG: '--radio-icon-bg',
  ICON_HOVER_COLOR: '--radio-icon-hover-color',
  ICON_DISABLED_COLOR: '--radio-icon-disabled-color',
  CHECKED_ICON_COLOR: '--radio-checked-icon-color',
  CHECKED_ICON_HOVER_COLOR: '--radio-checked-icon-hover-color',
  CHECKED_ICON_DISABLED_COLOR: '--radio-checked-icon-disabled-color',
};

const COLORS_SELECT = {
  TEXT_COLOR: '--select-text-color',
  TEXT_OPTION_DISABLED_COLOR: '--select-option-disabled-text-color',
  GROUP_HEADING_TEXT_COLOR: '--select-group-heading-text-color',
  PLACEHOLDER_TEXT_COLOR: '--select-placeholder-text-color',
  BACKGROUND: '--select-bg-color',
  BACKGROUND_HOVER: '--select-bg-hover-color',
  BACKGROUND_WITH_LOGO: '--select-bg-whith-logo-color',
  BACKGROUND_WITH_LOGO_HOVER: '--select-bg-with-logo-hover-color',
  BORDER_COLOR: '--select-border-color',
  BORDER_HOVER_COLOR: '--select-border-hover-color',
  BORDER_FOCUS_COLOR: '--select-border-focus-color',
  BORDER_ERROR_COLOR: '--select-border-error-color',
  DISABLED_TEXT_COLOR: '--select-disabled-text-color',
  DISABLED_BORDER_COLOR: '--select-disabled-border-color',
  DISABLED_BACKGROUND: '--select-disabled-background',
  DROPDOWN_BACKGROUND: '--select-dropdown-background',
  DROPDOWN_HOVER_BACKGROUND: '--select-dropdown-hover-background',
  DROPDOWN_FOCUS_BACKGROUND: '--select-dropdown-focus-background',
  DROPDOWN_ICON_COLOR: '--select-dropdown-icon-color',
  DROPDOWN_ICON_HOVER_COLOR: '--select-dropdown-icon-hover-color',
  TAG_NAME_NOT_VALID_MESSAGE: '--select-tag-name-validate-message-error-color',
  TAG_NAME_DISABLED_BUTTON_FILL: '--select-tag-name-disabled-button-fill',
};

const COLORS_BADGE = {
  DEFAULT_BACKGROUND: '--badge-default-background',
  BORDER_COLOR: '--badge-border-color',
  TEXT_COLOR: '--badge-text-color',
};

const COLORS_TOOLBAR = {
  BACKGROUND: '--toolbar-background',
  INPUT_BORDER: '--toolbar-border-color',
  ACTIVE_BUTTON: '--toolbar-active-button',
  PLACEHOLDER_COLOR: '--toolbar-placeholder-color',
};

const COLORS_CHECKBOX = {
  CHECKBOX_COLOR: '--checkbox-color',
  CHECKBOX_HOVER_COLOR: '--checkbox-hover-color',
  CHECKBOX_DISABLED_COLOR: '--checkbox-disabled-color',
  CHECKBOX_FILLED_COLOR: '--checkbox-filled-color',
  CHECKBOX_FILLED_HOVER_COLOR: '--checkbox-filled-hover-color',
  CHECKBOX_FILLED_DISABLED_COLOR: '--checkbox-filled-disabled-color',
  CHECKBOX_PART_CHECKED_RECT_COLOR: '--checkbox-part-checked-rect-color',
  CHECKBOX_DISABLED_TEXT_COLOR: '--checkbox-disabled-text-color',
};

const COLORS_CARD = {
  CARD_BACKGROUND: '--card-background',
  CARD_HOVER_BACKGROUND: '--card-hover-background',
  CARD_SELECTED_BACKGROUND: '--card-selected-background',
  CARD_HOVER_SHADOW: '--card-hover-shadow',
  CARD_FAVOURITE_ICON_COLOR: '--card-favourite-icon-color',
  CARD_FAVOURITE_ICON_HOVER_COLOR: '--card-favourite-icon-hover-color',
  CARD_FAVOURITE_ICON_FILLED_COLOR: '--card-favourite-icon-filled-color',
};

const COLORS_PAGINATE = {
  PAGINATE_ACTIVE_COLOR: '--paginate-active-color',
  PAGINATE_DISABLED_COLOR: '--paginate-disabled-color',
  PAGINATE_WHITE_COLOR: '--paginate-white-color',
};

const COLORS_COLLAPSE_PANEL = {
  COLLAPSE_PANEL_BACKGROUND: '--collapse-panel-background',
  COLLAPSE_PANEL_FAVOURITE_ICON_COLOR: '--collapse-panel-favourite-icon-color',
  COLLAPSE_PANEL_FAVOURITE_ICON_HOVER_COLOR: '--collapse-panel-favourite-icon-hover-color',
  COLLAPSE_PANEL_FAVOURITE_ICON_FILLED_COLOR: '--collapse-panel-favourite-icon-filled-color',
  COLLAPSE_PANEL_BACKGROUND_HOVER: '--collapse-panel-background-hover',
};

const COLORS_TABS = {
  TAB_BORDER_COLOR: '--tab-border-color',
  TAB_GRAY_BORDER_COLOR: '--tab-gray-border-color',
  TAB_ACTIVE_COLOR: '--tab-active-color',
  TAB_TEXT_COLOR: '--tab-text-color',
  TAB_DISABLED_TEXT_COLOR: '--tab-disabled-text-color',
};

const COLORS_STATUS = {
  COLOR: '--status-color',
  FAILED_BG: '--status-failed-bg',
  SUCCESS_BG: '--status-success-bg',
  WARNING_BG: '--status-warning-bg',
  UNACTIVE_BG: '--status-unactive-bg',
};

const COLORS_SWITCH = {
  UNACTIVE_BG: '--switch-unactive-bg',
  UNACTIVE_HOVER_BG: '--switch-unactive-hover-bg',
  UNACTIVE_DISABLED_BG: '--switch-unactive-disabled-bg',
  ACTIVE_BG: '--switch-active-bg',
  ACTIVE_HOVER_BG: '--switch-active-hover-bg',
  ACTIVE_DISABLED_BG: '--switch-active-disabled-bg',
};

const COLORS_BREADCRUMBS = {
  ACTIVE_COLOR: '--breadcrumbs-active-color',
  INACTIVE_COLOR: '--breadcrumbs-inactive-color',
};

const COLORS_FORM_GROUP = {
  NUMBER_COLOR: '--form-group-number-color',
  NUMBER_BG: '--form-group-number-bg',
  HINT_COLOR: '--form-group-hint-color',
};

const COLORS_FORM_FIELD = {
  HINT_COLOR: '--form-field-hint-color',
  ERROR_COLOR: '--form-field-error-color',
  REQUIRED_COLOR: '--form-field-required-color',
  DESCRIPTION_COLOR: '--form-field-description-color',
};

const COLORS_DRAWER = {
  HEADER_TEXT_COLOR: '--drawer-text-color',
  BACKGROUND: '--drawer-background',
  BORDER_COLOR: '--drawer-border',
};

const COLORS_TOAST = {
  INFO_COLOR: '--toast-info-color',
  INFO_BG: '--toast-info-bg',
  INFO_SECONDARY_COLOR: '--toast-info-secondary-color',
  INFO_ICON_BG: '--toast-info-icon-bg',
  INFO_ACTION_COLOR: '--toast-info-action-color',
  INFO_ACTION_HOVER_COLOR: '--toast-info-action-hover-color',
  ERROR_COLOR: '--toast-error-color',
  ERROR_BG: '--toast-error-bg',
  ERROR_SECONDARY_COLOR: '--toast-error-secondary-color',
  ERROR_ICON_BG: '--toast-error-icon-bg',
  ERROR_ACTION_COLOR: '--toast-error-action-color',
  ERROR_ACTION_HOVER_COLOR: '--toast-error-action-hover-color',
};

const COLORS_AVATAR = {
  COLOR: '--avatar-color',
  BG: '--avatar-bg',
  TEXT_COLOR: '--avatar-text-color',
  BG_GREEN: '--avatar-bg-green-color',
  BG_BLUE: '--avatar-bg-blue-color',
  BG_PURPLE: '--avatar-bg-purple-color',
  BG_PINK: '--avatar-bg-pink-color',
  BG_RED: '--avatar-bg-red-color',
  BG_GRAY_DEFAULT: '--avatar-bg-gray-default-color',
  BG_GRAY: '--avatar-bg-gray-color',
  BG_BROWN: '--avatar-bg-brown-color',
  BG_ORANGE: '--avatar-bg-orange-color',
  BG_YELLOW: '--avatar-bg-yellow-color',
  BG_YELLOW_GREEN: '--avatar-bg-yellow-green-color',
  BG_BLUE_GREEN: '--avatar-bg-blue-green-color',
};

const COLORS_SLIDER = {
  BG: '--slider-bg',
  BG_HOVER: '--slider-bg-hover',
  BG_ACTIVE: '--slider-bg-active',
  INACTIVE_BG: '--slider-inactive-bg',
};

const COLORS_ICON_BUTTON = {
  BLUE_COLOR: '--icon-button-blue-color',
  BLUE_BORDER_COLOR: '--icon-button-blue-border-color',
  BLUE_COLOR_HOVER: '--icon-button-blue-color-hover',
  BLUE_BORDER_COLOR_HOVER: '--icon-button-blue-border-color-hover',
  BLUE_COLOR_ACTIVE: '--icon-button-blue-color-active',
  BLUE_BORDER_COLOR_ACTIVE: '--icon-button-blue-border-color-active',
  BLUE_COLOR_DISABLED: '--icon-button-blue-color-disabled',
  BLUE_BORDER_COLOR_DISABLED: '--icon-button-blue-border-color-disabled',
  BLUE_COLOR_FOCUS: '--icon-button-blue-color-focus',
  BLUE_BORDER_COLOR_FOCUS: '--icon-button-border-blue-color-focus',
  BLUE_FOCUS_SHADOW: '--icon-button-blue-focus-shadow',

  WHITE_COLOR: '--icon-button-white-color',
  WHITE_COMMON_BG: '--icon-button-white-common-bg',
  WHITE_BORDER_COLOR: '--icon-button-white-border-color',
  WHITE_COLOR_HOVER: '--icon-button-white-color-hover',
  WHITE_BORDER_COLOR_HOVER: '--icon-button-white-border-color-hover',
  WHITE_COLOR_ACTIVE: '--icon-button-white-color-active',
  WHITE_BORDER_COLOR_ACTIVE: '--icon-button-white-border-color-active',
  WHITE_COLOR_DISABLED: '--icon-button-white-color-disabled',
  WHITE_BORDER_COLOR_DISABLED: '--icon-button-white-border-color-disabled',
  WHITE_COLOR_FOCUS: '--icon-button-white-color-focus',
  WHITE_BORDER_COLOR_FOCUS: '--icon-button-border-white-color-focus',
  WHITE_FOCUS_SHADOW: '--icon-button-white-focus-shadow',

  HEADER_COLOR: '--icon-button-header-color',
  HEADER_COLOR_HOVER: '--icon-button-header-color-hover',

  HEADER_MENU_COLOR: '--icon-button-header-menu-color',
  HEADER_MENU_COLOR_HOVER: '--icon-button-header-menu-color-hover',

  SIDEBAR_COLOR: '--icon-button-sidebar-color',
  SIDEBAR_COLOR_HOVER: '--icon-button-sidebar-color-hover',

  POPUP_COLOR: '--icon-button-popup-color',
  POPUP_COLOR_HOVER: '--icon-button-popup-color-hover',
};

const COLORS_LOGS_VIEW = {
  BG: '--logs-view-bg',
};

const COLORS_TABLE = {
  TABLE_BORDER: '--table-border',
  TABLE_ROW_BACKGROUND: '--table-row-background',
  TABLE_ROW_COLOR: '--table-row-color',
  TABLE_ROW_ODD_BACKGROUND: '--table-row-odd-background',
  TABLE_ROW_HOVER_SHADOW_LEFT: '--table-row-hover-shadow-left',
  TABLE_ROW_HOVER_SHADOW_TOP_BOTTOM: '--table-row-hover-shadow-top-bottom',
  TABLE_ROW_SELECTED_BACKGROUND: '--table-row-selected-background',
  TABLE_HEADER_BACKGROUND: '--table-header-background',
  TABLE_HEADER_COLOR: '--table-header-color',
  TABLE_HEADER_RESIZE_ICON_COLOR: '--table-header-resize-icon-color',

  TABLE_FAVOURITE_ICON_COLOR: '--table-favourite-icon-color',
  TABLE_FAVOURITE_ICON_HOVER_COLOR: '--table-favourite-icon-hover-color',
  TABLE_FAVOURITE_ICON_FILLED_COLOR: '--table-favourite-icon-filled-color',
  TABLE_RADIO_ICON_DISABLED_COLOR: '--table-radio-icon-disabled-color',
  TABLE_HELP_ICON_COLOR: '--table-help-icon-color',
  TABLE_HELP_ICON_HOVER_COLOR: '--table-help-icon-hover-color',
};

const TABLE_BUTTON_COLORS = {
  TEXT_ICON_CONTENT: '--table-button-text-icon-content',
  TEXT_ICON_CONTENT_DISABLED: '--table-button-text-icon-content-disabled',
  TEXT_ICON_BACKGROUND: '--table-button-text-icon-background',
  TEXT_ICON_BACKGROUND_DISABLED: '--table-button-text-icon-background-disabled',
  TEXT_ICON_BACKGROUND_HOVER: '--table-button-text-icon-background-hover',
  TEXT_ICON_BACKGROUND_FOCUS: '--table-button-text-icon-background-focus',
  TEXT_ICON_BACKGROUND_ACTIVE: '--table-button-text-icon-background-active',
  TEXT_ICON_BACKGROUND_IN_PROGRESS: '--table-button-text-icon-background-in-progress',

  ICON_CONTENT: '--table-button-icon-content',
  ICON_CONTENT_DISABLED: '--table-button-icon-content-disabled',
  ICON_BACKGROUND: '--table-button-icon-background',
  ICON_BACKGROUND_DISABLED: '--table-button-icon-background-disabled',
  ICON_BACKGROUND_HOVER: '--table-button-icon-background-hover',
  ICON_BACKGROUND_FOCUS: '--table-button-icon-background-focus',
  ICON_BACKGROUND_ACTIVE: '--table-button-icon-background-active',
  ICON_BACKGROUND_IN_PROGRESS: '--table-button-icon-background-in-progress',
};

const COLORS_FILTER = {
  FILTER_BACKGROUND: '--filter-background',
  FILTER_ACTION_BUTTON_COLOR: '--filter-action-button-color',
  FILTER_ACTION_BUTTON_FILLED: '--filter-action-button-filled',
  FILTER_ACTION_BUTTON_HOVER_COLOR: '--filter-action-button-hover-color',
  FILTER_ACTION_BUTTON_HOVER_FILLED: '--filter-action-button-hover-filled',
  FILTER_ACTION_BUTTON_DISABLED_COLOR: '--filter-action-button-disabledr-color',
  FILTER_ACTION_BUTTON_DISABLED_FILLED: '--filter-action-button-disabled-filled',
};

const COLORS_NO_DATA_PAGE = {
  ICON_FILL: '--nodatapage-icon-fill',
  TITLE_COLOR: '--nodatapage-title-color',
  CONTENT_COLOR: '--nodatapage-content-color',
};

const COLORS_DATEPICKER = {
  BACKGROUND_COLOR: '--datepicker-background-color',
  DATE_COLOR: '--datepicker-date-color',
  DATE_HOVER_BACKGROUND_COLOR: '--datepicker-date-hover-background-color-color',
  TODAY_COLOR: '--datepicker-today-color',
  TODAY_BORDER_COLOR: '--datepicker-today-border-color',
  DAY_NAME_COLOR: '--datepicker-day-name-color',
  BORDER_COLOR: '--datepicker-border-color',
  HIGHLITED_COLOR: '--datepicker-highlighted-color',
  MUTED_COLOR: '--datepicker-muted-color',
  SELECTED_COLOR: '--datepicker-selected-color',
  SELECTED_BACKGROUND_COLOR: '--datepicker-selected-background-color',
  SELECTED_BACKGROUND_HOVER_COLOR: '--datepicker-selected-background-hover-color',
  TEXT_COLOR: '--datepicker-text-color',
  HEADER_COLOR: '--datepicker-header-color',
  NAVIGATION_COLOR: '--datepicker-navigation-color',
  NAVIGATION_DISABLED_COLOR: '--datepicker-navigation-disabled-color',
  INPUT_BACKGROUND_COLOR: '--datepicker-input-background-color',
  INPUT_BORDER_COLOR: '--datepicker-input-border-color',
  INPUT_FOCUS_BORDER: '--datepicker-input-focus-border',
  INPUT_FOCUS_BACKGROUND: '--datepicker-input-focus-bg',
  INPUT_HOVER_BORDER: '--datepicker-input-hover-border',
  INPUT_HOVER_PLACEHOLDER_COLOR: '--datepicker-input-hover-placeholder-color',
  INPUT_HOVER_BACKGROUND: '--datepicker-input-hover-bg',
  INPUT_ERROR: '--datepicker-input-error',
  INPUT_ERROR_BORDER: '--datepicker-input-error-border',
  SELECT_TEXT: '--datepicker-select-text-color',
  SELECT_HOVER_TEXT: '--datepicker-select-hover-text-color',
  SELECT_SELECTED_TEXT: '--datepicker-select-selected-text-color',
  SELECT_DISABLED_TEXT: '--datepicker-select-disabled-text-color',
  SELECT_BACKGROUND: '--datepicker-select-background-color',
  SELECT_HOVER_BACKGROUND: '--datepicker-select-hover-background-color',
  SELECT_SELECTED_BACKGROUND: '--datepicker-select-selected-background-color',
  DATE_INPUT_ICON_FILL: '--datepicker-date-input-icon-fill-color',
  TIME_INPUT_ICON_FILL: '--datepicker-time-input-icon-fill-color',
  TIME_INPUT_DISABLED_ICON_FILL: '--datepicker-time-input-disabled-icon-fill-color',
  TIME_INPUT_DISABLED_COLOR: '--datepicker-time-input-disabled-color',
  TIME_INPUT_DISABLED_BACKGROUND_COLOR: '--datepicker-time-input-disabled-background-color',
  INPUT_EDITABLE_TEXT: '--datepicker-input-editable-color',
  INPUT_EDITABLE_BACKGROUND: '--datepicker-input-editable-background-color',
};

const COLORS_ATTENTION = {
  NORMAL_IMPORTANCE_LEVEL_LINE: '--attention-normal-importance-level-line',
  HIGH_IMPORTANCE_LEVEL_LINE: '--attention-high-importance-level-line',
};

const COLORS_HIERARCHY_MENU = {
  MENU_BACKGROUND: '--hierarchy-menu-menu-background',

  ACCORDION_NODE_ICON: '--hierarchy-menu-accordion-node-icon',
  ACCORDION_NODE_TEXT: '--hierarchy-menu-accordion-node-text',
  ACCORDION_NODE_HOVER_TEXT: '--hierarchy-menu-accordion-node-hover-text',
  ACCORDION_NODE_ACTIVE_TEXT: '--hierarchy-menu-accordion-node-active-text',

  LEAF_NODE_TEXT: '--hierarchy-menu-leaf-node-text',
  LEAF_NODE_ICON: '--hierarchy-menu-leaf-node-icon',
  LEAF_NODE_HOVER: '--hierarchy-menu-leaf-node-hover',
  LEAF_NODE_ACTIVE: '--hierarchy-menu-leaf-node-active',
};

const COLORS_INTERACTIVE_CHART = {
  BACKGROUND: '--interactive-chart-background',
  CURSOR_AIM: '--interactive-chart-cursor-aim',
  SELECTED_AREA: '--interactive-chart-selected-area',
};

export {
  COLORS,
  COLORS_BRAND,
  COLORS_TAG,
  COLORS_GENERAL,
  COLORS_TYPOGRAPHY,
  COLORS_BUTTON,
  COLORS_ICON,
  COLORS_DIVIDER,
  COLORS_SPIN,
  COLORS_MODAL,
  COLORS_TOOLTIP,
  COLORS_INPUT,
  COLORS_RADIO,
  COLORS_SELECT,
  COLORS_BADGE,
  COLORS_TOOLBAR,
  COLORS_CHECKBOX,
  COLORS_CARD,
  COLORS_PAGINATE,
  COLORS_COLLAPSE_PANEL,
  COLORS_TABS,
  COLORS_STATUS,
  COLORS_SWITCH,
  COLORS_BREADCRUMBS,
  COLORS_FORM_GROUP,
  COLORS_FORM_FIELD,
  COLORS_DRAWER,
  COLORS_TOAST,
  COLORS_AVATAR,
  COLORS_SLIDER,
  COLORS_ICON_BUTTON,
  COLORS_LOGS_VIEW,
  COLORS_TABLE,
  TABLE_BUTTON_COLORS,
  COLORS_FILTER,
  COLORS_NO_DATA_PAGE,
  COLORS_DATEPICKER,
  COLORS_PRESET,
  COLORS_ATTENTION,
  COLORS_HIERARCHY_MENU,
  COLORS_INTERACTIVE_CHART,
};

export const DEPRECATED_EXPORT_VARS = {
  COLORS,
  COLORS_BRAND,
  COLORS_TAG,
  COLORS_GENERAL,
  COLORS_TYPOGRAPHY,
  COLORS_BUTTON,
  COLORS_ICON,
  COLORS_DIVIDER,
  COLORS_SPIN,
  COLORS_MODAL,
  COLORS_TOOLTIP,
  COLORS_INPUT,
  COLORS_RADIO,
  COLORS_SELECT,
  COLORS_BADGE,
  COLORS_TOOLBAR,
  COLORS_CHECKBOX,
  COLORS_CARD,
  COLORS_PAGINATE,
  COLORS_COLLAPSE_PANEL,
  COLORS_TABS,
  COLORS_STATUS,
  COLORS_SWITCH,
  COLORS_BREADCRUMBS,
  COLORS_FORM_GROUP,
  COLORS_FORM_FIELD,
  COLORS_DRAWER,
  COLORS_TOAST,
  COLORS_AVATAR,
  COLORS_SLIDER,
  COLORS_ICON_BUTTON,
  COLORS_LOGS_VIEW,
  COLORS_TABLE,
  TABLE_BUTTON_COLORS,
  COLORS_FILTER,
  COLORS_NO_DATA_PAGE,
  COLORS_DATEPICKER,
  COLORS_PRESET,
  COLORS_ATTENTION,
  COLORS_HIERARCHY_MENU,
  COLORS_INTERACTIVE_CHART,
};
