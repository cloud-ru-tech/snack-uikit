import { Selector } from 'testcafe';

import { dataTestIdSelector } from '../../../testcafe/utils';
import { TEST_IDS as CARD_TEST_IDS } from '../src/components/NotificationCard/constants';
import { TEST_IDS as PANEL_TEST_IDS } from '../src/components/NotificationPanel/constants';
import { STORY_TEST_IDS } from '../stories/constants';

export const SELECTORS = {
  getCard: () => {
    const card = Selector(dataTestIdSelector(STORY_TEST_IDS.card));

    return {
      card,
      label: card.find(dataTestIdSelector(CARD_TEST_IDS.label)),
      title: card.find(dataTestIdSelector(CARD_TEST_IDS.title)),
      content: card.find(dataTestIdSelector(CARD_TEST_IDS.content)),
      link: card.find(dataTestIdSelector(CARD_TEST_IDS.link)),
      date: card.find(dataTestIdSelector(CARD_TEST_IDS.date)),
      actions: {
        wrapper: card.find(dataTestIdSelector(CARD_TEST_IDS.actions.wrapper)),
        droplist: Selector(dataTestIdSelector(CARD_TEST_IDS.actions.droplist)),
        droplistTrigger: card.find(dataTestIdSelector(CARD_TEST_IDS.actions.droplistTrigger)),
        droplistAction: Selector(dataTestIdSelector(CARD_TEST_IDS.actions.droplistAction)),
      },
      primaryButton: card.find(dataTestIdSelector(CARD_TEST_IDS.primaryButton)),
      secondaryButton: card.find(dataTestIdSelector(CARD_TEST_IDS.secondaryButton)),
    };
  },
  getPanel: () => {
    const panel = Selector(dataTestIdSelector(STORY_TEST_IDS.panel));

    return {
      panel,
      panelTitle: panel.find(dataTestIdSelector(PANEL_TEST_IDS.title)),
      settings: {
        droplist: Selector(dataTestIdSelector(PANEL_TEST_IDS.settings.droplist)),
        droplistTrigger: panel.find(dataTestIdSelector(PANEL_TEST_IDS.settings.droplistTrigger)),
        droplistAction: Selector(dataTestIdSelector(PANEL_TEST_IDS.settings.droplistAction)),
      },
      blank: Selector(dataTestIdSelector(STORY_TEST_IDS.blank)),
      segments: panel.find(`[data-test-id*="${PANEL_TEST_IDS.segments}"]`),
      readAllButton: panel.find(dataTestIdSelector(PANEL_TEST_IDS.readAll)),
      footerButton: panel.find(dataTestIdSelector(PANEL_TEST_IDS.footerButton)),
      skeleton: panel.find(dataTestIdSelector(PANEL_TEST_IDS.skeleton)),
    };
  },
};
