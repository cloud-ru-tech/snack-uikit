import { expect, test } from '../../../playwright/fixtures';

const TEST_IDS = {
  alertTop: 'alert-top',
  closeButton: 'alert-top__close-button',
  title: 'alert-top__title',
  description: 'alert-top__description',
  link: 'alert-top__link',
  icon: 'alert-top__icon',
};

test.describe('AlertTop', () => {
  test('Rendered', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'alerttop',
      story: 'alert-top',
      group: 'alert',
      props: {
        'data-test-id': TEST_IDS.alertTop,
      },
    });
    const alertTop = getByTestId(TEST_IDS.alertTop);

    await expect(alertTop).toBeVisible();
  });

  test('Close button hidden', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'alerttop',
      story: 'alert-top',
      group: 'alert',
      props: {
        'data-test-id': TEST_IDS.alertTop,
        onClose: undefined,
      },
    });
    await expect(getByTestId(TEST_IDS.closeButton)).not.toBeVisible();
  });

  test('Close button visible', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'alerttop',
      story: 'alert-top',
      group: 'alert',
      props: {
        'data-test-id': TEST_IDS.alertTop,
        onClose: () => {},
      },
    });
    await expect(getByTestId(TEST_IDS.closeButton)).toBeVisible();
  });

  test(`Title = 'Title'`, async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'alerttop',
      story: 'alert-top',
      group: 'alert',
      props: {
        'data-test-id': TEST_IDS.alertTop,
        title: 'Title',
      },
    });
    await expect(getByTestId(TEST_IDS.title)).toBeVisible();
  });

  test(`Title = ''`, async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'alerttop',
      story: 'alert-top',
      group: 'alert',
      props: {
        'data-test-id': TEST_IDS.alertTop,
        title: '',
      },
    });
    await expect(getByTestId(TEST_IDS.title)).not.toBeVisible();
  });

  test(`Description = 'Description'`, async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'alerttop',
      story: 'alert-top',
      group: 'alert',
      props: {
        'data-test-id': TEST_IDS.alertTop,
        description: 'Description',
      },
    });
    const description = getByTestId(TEST_IDS.description);

    await expect(description).toBeVisible();
    await expect(description).toHaveText('Description');
  });

  test(`Description = ''`, async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'alerttop',
      story: 'alert-top',
      group: 'alert',
      props: {
        'data-test-id': TEST_IDS.alertTop,
        description: '',
      },
    });
    const description = getByTestId(TEST_IDS.description);

    await expect(description).toBeAttached();
    await expect(description).not.toBeVisible();
  });

  test(`Link is displayed with correct text and href`, async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'alerttop',
      story: 'alert-top',
      group: 'alert',
      props: {
        'data-test-id': TEST_IDS.alertTop,
        link: 'Link text',
      },
    });
    const link = getByTestId(TEST_IDS.link);

    await expect(link).toBeVisible();
    await expect(link).toHaveText('Link text');
  });

  test(`Link is not displayed when link prop is empty`, async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'alerttop',
      story: 'alert-top',
      group: 'alert',
      props: {
        'data-test-id': TEST_IDS.alertTop,
        link: '',
      },
    });
    const link = getByTestId(TEST_IDS.link);

    await expect(link).not.toBeVisible();
  });

  test(`Icon is displayed when icon prop is true`, async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'alerttop',
      story: 'alert-top',
      group: 'alert',
      props: {
        'data-test-id': TEST_IDS.alertTop,
        icon: true,
      },
    });
    const icon = getByTestId(TEST_IDS.icon);

    await expect(icon).toBeVisible();
  });

  test(`Icon is not displayed when icon prop is false`, async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'alerttop',
      story: 'alert-top',
      group: 'alert',
      props: {
        'data-test-id': TEST_IDS.alertTop,
        icon: false,
      },
    });
    const icon = getByTestId(TEST_IDS.icon);

    await expect(icon).not.toBeVisible();
  });
});
