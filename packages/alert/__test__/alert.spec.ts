import { expect, test } from '../../../playwright/fixtures';

const TEST_IDS = {
  alert: 'alert',
  closeButton: 'alert__close-button',
  title: 'alert__title',
  description: 'alert__description',
  link: 'alert__link',
  icon: 'alert__icon',
  actionButton: 'alert__action-button',
};

test.describe('Alert', () => {
  test('Rendered', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'alert',
      story: 'alert',
      group: 'alert',
      props: {
        'data-test-id': TEST_IDS.alert,
      },
    });
    const alert = getByTestId(TEST_IDS.alert);
    await expect(alert).toBeVisible();
  });

  test('Close button hidden', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'alert',
      story: 'alert',
      group: 'alert',
      props: {
        'data-test-id': TEST_IDS.alert,
        onClose: undefined,
      },
    });
    await expect(getByTestId(TEST_IDS.closeButton)).not.toBeVisible();
  });

  test('Close button visible', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'alert',
      story: 'alert',
      group: 'alert',
      props: {
        'data-test-id': TEST_IDS.alert,
        onCLose: () => {},
      },
    });
    await expect(getByTestId(TEST_IDS.closeButton)).toBeVisible();
  });

  test(`Title = 'Title'`, async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'alert',
      story: 'alert',
      group: 'alert',
      props: {
        'data-test-id': TEST_IDS.alert,
        title: 'Title',
      },
    });
    await expect(getByTestId(TEST_IDS.title)).toBeVisible();
  });

  test(`Title = ''`, async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'alert',
      story: 'alert',
      group: 'alert',
      props: {
        'data-test-id': TEST_IDS.alert,
        title: '',
      },
    });
    await expect(getByTestId(TEST_IDS.title)).not.toBeVisible();
  });

  test(`Description = 'Description'`, async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'alert',
      story: 'alert',
      group: 'alert',
      props: {
        'data-test-id': TEST_IDS.alert,
        description: 'Description',
      },
    });
    const description = getByTestId(TEST_IDS.description);

    await expect(description).toBeVisible();
    await expect(description).toHaveText('Description');
  });

  test(`Description = ''`, async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'alert',
      story: 'alert',
      group: 'alert',
      props: {
        'data-test-id': TEST_IDS.alert,
        description: '',
      },
    });
    const description = getByTestId(TEST_IDS.description);

    await expect(description).toBeAttached();
    await expect(description).not.toBeVisible();
  });

  test(`Link is displayed with correct text and href`, async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'alert',
      story: 'alert',
      group: 'alert',
      props: {
        'data-test-id': TEST_IDS.alert,
        link: 'Link text',
      },
    });
    const link = getByTestId(TEST_IDS.link);

    await expect(link).toBeVisible();
    await expect(link).toHaveText('Link text');
  });

  test(`Link is not displayed when link prop is empty`, async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'alert',
      story: 'alert',
      group: 'alert',
      props: {
        'data-test-id': TEST_IDS.alert,
        link: '',
      },
    });
    const link = getByTestId(TEST_IDS.link);

    await expect(link).not.toBeVisible();
  });

  test(`Icon is displayed when icon prop is true`, async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'alert',
      story: 'alert',
      group: 'alert',
      props: {
        'data-test-id': TEST_IDS.alert,
        icon: true,
      },
    });
    const icon = getByTestId(TEST_IDS.icon);

    await expect(icon).toBeVisible();
  });

  test(`Icon is not displayed when icon prop is false`, async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'alert',
      story: 'alert',
      group: 'alert',
      props: {
        'data-test-id': TEST_IDS.alert,
        icon: false,
      },
    });
    const icon = getByTestId(TEST_IDS.icon);

    await expect(icon).not.toBeVisible();
  });

  test(`Action buttons are displayed`, async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'alert',
      story: 'alert',
      group: 'alert',
      props: {
        'data-test-id': TEST_IDS.alert,
        showActionButtons: true,
      },
    });
    const actionButton = getByTestId(TEST_IDS.actionButton);

    await expect(actionButton.nth(0)).toHaveText('Primary');
    await expect(actionButton.nth(1)).toHaveText('Secondary');
  });
});
