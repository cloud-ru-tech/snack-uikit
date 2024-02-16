export const APPEARANCE = {
  Neutral: 'neutral',
  Error: 'error',
  ErrorCritical: 'errorCritical',
  Warning: 'warning',
  Success: 'success',
} as const;

export const TEST_IDS = {
  label: 'notification-card__label',
  title: 'notification-card__title',
  content: 'notification-card__content',
  link: 'notification-card__link',
  date: 'notification-card__date',
  actions: {
    wrapper: 'notification-card__actions',
    droplist: 'notification-card__droplist',
    droplistTrigger: 'notification-card__droplist-trigger',
    droplistAction: 'notification-card__droplist-action',
  },
  primaryButton: 'notification-card__primary-button',
  secondaryButton: 'notification-card__secondary-button',
};
