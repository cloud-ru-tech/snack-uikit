import type { Locator } from '@playwright/test';

import { expect, test } from '../../../playwright/fixtures';
import { TEST_IDS } from '../src/constants';

const BASE_TEST_ID = 'block-test';

const getStory = (props: object = {}) => ({
  name: 'info-block',
  props: {
    'data-test-id': BASE_TEST_ID,
    ...props,
  },
});

const MOCK_DATA = {
  title: 'Test Title',
  description: 'Test Description',
  footer: 'Custom footer',
};

test.describe('InfoBlock', () => {
  function getSelectors(getByTestId: (testId: string) => Locator) {
    return {
      infoBlock: getByTestId(BASE_TEST_ID),
      title: getByTestId(TEST_IDS.title),
      icon: getByTestId(TEST_IDS.icon),
      description: getByTestId(TEST_IDS.description),
      footer: getByTestId(TEST_IDS.footer),
      primaryButton: getByTestId(TEST_IDS.primaryButton),
      secondaryButton: getByTestId(TEST_IDS.secondaryButton),
    };
  }

  test('Should render correctly', async ({ gotoStory, getByTestId }) => {
    await gotoStory(getStory({ title: MOCK_DATA.title, description: MOCK_DATA.description }));
    const { infoBlock, title, description, footer, icon, primaryButton, secondaryButton } = getSelectors(getByTestId);

    await expect(infoBlock, 'InfoBlock should be rendered').toBeVisible();

    await expect(title, 'Title should be rendered').toBeVisible();
    await expect(title, `Title should be ${MOCK_DATA.title}`).toHaveText(MOCK_DATA.title);

    await expect(description, 'Description should be rendered').toBeVisible();
    await expect(description, `Description should be ${MOCK_DATA.description}`).toHaveText(MOCK_DATA.description);

    await expect(icon, 'Icon should be rendered').toBeVisible();

    await expect(footer, 'Footer should be rendered').toBeVisible();

    await expect(primaryButton, 'Footer primary button should be rendered').toBeVisible();
    await expect(secondaryButton, 'Footer secondary button should be rendered').toBeVisible();
  });

  test('Should render only with description', async ({ gotoStory, getByTestId }) => {
    await gotoStory(
      getStory({ showIcon: false, footerVariant: 'none', title: '!undefined', description: MOCK_DATA.description }),
    );
    const { title, description, footer, icon, primaryButton, secondaryButton } = getSelectors(getByTestId);

    await expect(title, 'Title should not be rendered').not.toBeVisible();

    await expect(description, 'Description should be rendered').toBeVisible();
    await expect(description, `Description should be ${MOCK_DATA.description}`).toHaveText(MOCK_DATA.description);

    await expect(icon, 'Icon should not be rendered').not.toBeVisible();

    await expect(footer, 'Footer should not be rendered').not.toBeVisible();

    await expect(primaryButton, 'Footer primary button should not be rendered').not.toBeVisible();
    await expect(secondaryButton, 'Footer secondary button should not be rendered').not.toBeVisible();
  });

  test('Should render with custom footer content', async ({ gotoStory, getByTestId }) => {
    await gotoStory(getStory({ footerVariant: 'custom', footer: MOCK_DATA.footer }));
    const { footer } = getSelectors(getByTestId);

    await expect(footer, 'Footer should be rendered').toBeVisible();
    await expect(footer, `Footer should be ${MOCK_DATA.footer}`).toHaveText(MOCK_DATA.footer);
  });
});
