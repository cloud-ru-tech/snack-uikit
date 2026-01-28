import type { Locator } from '@playwright/test';

import { TEST_IDS as CARD_TEST_IDS } from '../src/components/NotificationCard/constants';
import { TEST_IDS as PANEL_TEST_IDS } from '../src/components/NotificationPanel/constants';
import { STORY_TEST_IDS } from '../stories/constants';

export const SELECTORS = {
  getCard: (getByTestId: (testId: string) => Locator) => {
    const card = getByTestId(STORY_TEST_IDS.card);

    return {
      card,
      label: card.locator(`[data-test-id="${CARD_TEST_IDS.label}"]`),
      title: card.locator(`[data-test-id="${CARD_TEST_IDS.title}"]`),
      content: card.locator(`[data-test-id="${CARD_TEST_IDS.content}"]`),
      link: card.locator(`[data-test-id="${CARD_TEST_IDS.link}"]`),
      date: card.locator(`[data-test-id="${CARD_TEST_IDS.date}"]`),
      actions: {
        wrapper: card.locator(`[data-test-id="${CARD_TEST_IDS.actions.wrapper}"]`),
        droplist: getByTestId(CARD_TEST_IDS.actions.droplist),
        droplistTrigger: card.locator(`[data-test-id="${CARD_TEST_IDS.actions.droplistTrigger}"]`),
        droplistAction: getByTestId(CARD_TEST_IDS.actions.droplistAction),
      },
      primaryButton: card.locator(`[data-test-id="${CARD_TEST_IDS.primaryButton}"]`),
      secondaryButton: card.locator(`[data-test-id="${CARD_TEST_IDS.secondaryButton}"]`),
    };
  },
  getPanel: (getByTestId: (testId: string) => Locator) => {
    const panel = getByTestId(STORY_TEST_IDS.panel);

    return {
      panel,
      panelTitle: panel.locator(`[data-test-id="${PANEL_TEST_IDS.title}"]`),
      settings: {
        droplist: getByTestId(PANEL_TEST_IDS.settings.droplist),
        droplistTrigger: panel.locator(`[data-test-id="${PANEL_TEST_IDS.settings.droplistTrigger}"]`),
        droplistAction: getByTestId(PANEL_TEST_IDS.settings.droplistAction),
      },
      blank: getByTestId(STORY_TEST_IDS.blank),
      segments: panel.locator(`[data-test-id*="${PANEL_TEST_IDS.segments}"]`),
      readAllButton: panel.locator(`[data-test-id="${PANEL_TEST_IDS.readAll}"]`),
      footerButton: panel.locator(`[data-test-id="${PANEL_TEST_IDS.footerButton}"]`),
      skeleton: panel.locator(`[data-test-id="${PANEL_TEST_IDS.skeleton}"]`),
    };
  },
  getCardStack: (getByTestId: (testId: string) => Locator) => {
    const wrapper = getByTestId(PANEL_TEST_IDS.cardStack.wrapper);
    const headline = wrapper.locator(`[data-test-id="${PANEL_TEST_IDS.cardStack.headline}"]`);

    return {
      wrapper,
      title: wrapper.locator(`[data-test-id="${PANEL_TEST_IDS.cardStack.title}"]`),
      openButton: wrapper.locator(`[data-test-id="${PANEL_TEST_IDS.cardStack.openButton}"]`),
      actionsTrigger: headline.locator(`[data-test-id="${CARD_TEST_IDS.actions.droplistTrigger}"]`),
      stackContainer: wrapper.locator('[data-tail-size]'),
    };
  },
};
