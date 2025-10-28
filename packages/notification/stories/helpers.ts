import { MouseEventHandler } from 'react';

import { toaster } from '@snack-uikit/toaster';

import { NotificationCardProps } from '../src';
import { APPEARANCE } from '../src/components/NotificationCard/constants';
import { NOTIFICATION_CARD_MOCK, STORY_TEST_IDS } from './constants';

export const handleActionClick: MouseEventHandler = e => {
  toaster.userAction.success({
    label: e.currentTarget.textContent || '',
    'data-test-id': STORY_TEST_IDS.toaster,
  });
};

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const notificationAppearances = Object.values(APPEARANCE);

export function generateCards(amount: number) {
  const res: NotificationCardProps[] = [];

  for (let i = 0; i < amount; ++i) {
    res.push({
      ...NOTIFICATION_CARD_MOCK,
      id: String(i),
      unread: Boolean(randomIntFromInterval(0, 1)),
      appearance: notificationAppearances[randomIntFromInterval(0, notificationAppearances.length - 1)],
      primaryButton: {
        label: 'Primary button',
        onClick: handleActionClick,
      },
      secondaryButton: {
        label: 'Secondary button',
        onClick: handleActionClick,
      },
    });
  }

  return res;
}
