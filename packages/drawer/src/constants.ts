export enum Size {
  S = 's',
  M = 'm',
  L = 'l',
}

export const SIZE_AS_VALUES: string[] = Object.values(Size);

export enum Mode {
  Regular = 'regular',
  Soft = 'soft',
}

export enum Position {
  Right = 'right',
  Left = 'left',
}

export const NESTED_DRAWER_PUSH_DISTANCE = 24;

export const TEST_IDS = {
  closeButton: 'drawer__close-button',
  header: 'drawer__header',
  title: 'drawer__title',
  tooltip: 'drawer__title-tooltip',
  subtitle: 'drawer__subtitle',
  image: 'drawer__image',
  content: 'drawer__body',
  footer: 'drawer__footer',
  footerActions: 'drawer__footer-actions',
  approveButton: 'drawer__approve-button',
  cancelButton: 'drawer__cancel-button',
  additionalButton: 'drawer__additional-button',
};
