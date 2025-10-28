import { APPEARANCE } from '../src/components/NotificationCard/constants';

export const STORY_TEST_IDS = {
  panel: 'notification-panel',
  card: 'notification-card',
  toaster: 'toaster',
  blank: 'panel-blank',
};

export const NOTIFICATION_CARD_MOCK = {
  id: 'cardId',
  label: ['Category', 'Subcategory'].join('・'),
  appearance: APPEARANCE.Neutral,
  title: 'Title truncate two line',
  content: `Demo content.

For replacement, use Property: ◆ProdContent. Replace this element with your local component with the original content.`,
  link: {
    text: 'Link to detailed information',
    href: '#',
  },
  date: 'DD.MM.YYYY HH:MM',
  actions: [
    {
      content: { option: 'action 1' },
    },
    {
      content: { option: 'action 2' },
    },
  ],
};

export const NOTIFICATION_PANEL_PROPS_MOCK = {
  amount: 10,
  title: 'Notifications',
  readAllButton: {
    label: 'Mark all as read',
    tooltip: {
      tip: 'Your tip could be here',
    },
  },
  footerButton: {
    label: 'All events',
  },
};
