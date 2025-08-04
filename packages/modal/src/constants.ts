export const SIZE = {
  S: 's',
  M: 'm',
  L: 'l',
} as const;

export const MODE = {
  Regular: 'regular',
  Aggressive: 'aggressive',
  Forced: 'forced',
} as const;

export const ALIGN = {
  Default: 'default',
  Center: 'center',
  Vertical: 'vertical',
} as const;

export const CONTENT_ALIGN = {
  Default: 'default',
  Center: 'center',
} as const;

export const TEST_IDS = {
  overlay: 'modal__overlay',
  closeButton: 'modal__close-button',
  header: 'modal__header',
  title: 'modal__title',
  subtitle: 'modal__subtitle',
  tooltip: 'modal__title-tooltip',
  icon: 'modal__icon',
  image: 'modal__image',
  content: 'modal__body',
  footer: 'modal__footer',
  approveButton: 'modal__approve-button',
  cancelButton: 'modal__cancel-button',
  additionalButton: 'modal__additional-button',
  disclaimer: 'modal__disclaimer',
  disclaimerText: 'modal__disclaimer-text',
  disclaimerLink: 'modal__disclaimer-link',
  loadingSpinner: 'modal__loading-spinner',
};
