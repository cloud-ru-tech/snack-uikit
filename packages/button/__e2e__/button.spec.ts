import { expect, test } from '../../../playwright/fixtures';

type ButtonTestSpec = {
  name: string;
  story: string;
  testId: string;
  iconBefore?: boolean;
};
type StoryCounterProps = {
  counterValue: number;
  counterAppearance?: string;
  counterVariant?: string;
  counterPlusLimit?: string;
};

const buttons: ButtonTestSpec[] = [
  {
    name: 'button-filled',
    story: 'button-filled',
    testId: 'button-filled',
  },
  {
    name: 'button-outline',
    story: 'button-outline',
    testId: 'button-outline',
  },
  {
    name: 'button-tonal',
    story: 'button-tonal',
    testId: 'button-tonal',
  },
  {
    name: 'button-simple',
    story: 'button-simple',
    testId: 'button-simple',
  },
  {
    name: 'button-function',
    story: 'button-function',
    testId: 'button-function',
    iconBefore: true,
  },
];
const buttonsWithCounter: ButtonTestSpec['name'][] = ['button-function'];
const counterTestStoryProps: StoryCounterProps = { counterValue: 7 };

buttons.forEach(({ name, story, testId, iconBefore }) => {
  test(`${story} - Should render`, async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name,
      story,
      group: 'button',
      props: {
        'data-test-id': testId,
        testMode: true,
        label: testId,
        icon: 'PlaceholderSVG',
        ...counterTestStoryProps,
      },
    });
    const button = getByTestId(testId);
    await expect(button).toBeVisible();
    const label = button.locator(`[data-test-id="label"]`);
    await expect(label).toBeVisible();
    const icon = button.locator(`[data-test-id="icon"]`);
    await expect(icon).toBeVisible();
    const counter = button.locator(`[data-test-id="${testId}__counter"]`);

    if (buttonsWithCounter.includes(name)) {
      await expect(counter).toBeVisible();
    } else {
      await expect(counter).not.toBeVisible();
    }
  });

  test(`${story} - Should have data-disabled attribute`, async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name,
      story,
      group: 'button',
      props: {
        'data-test-id': testId,
        testMode: true,
        disabled: true,
      },
    });
    const button = getByTestId(testId);
    await expect(button).toHaveAttribute('data-disabled', 'true');
  });

  test(`${story} - Should have data-loading attribute`, async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name,
      story,
      group: 'button',
      props: {
        'data-test-id': testId,
        testMode: true,
        loading: true,
      },
    });
    const button = getByTestId(testId);
    await expect(button).toHaveAttribute('data-loading');
  });

  test(`${story} - Should have data-variant = "label-only"`, async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name,
      story,
      group: 'button',
      props: {
        'data-test-id': testId,
        testMode: true,
        label: 'label',
        icon: 'none',
      },
    });
    const button = getByTestId(testId);
    await expect(button).toHaveAttribute('data-variant', 'label-only');
  });

  test(`${story} - Should have data-variant = "icon-only"`, async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name,
      story,
      group: 'button',
      props: {
        'data-test-id': testId,
        testMode: true,
        label: undefined,
        icon: 'none',
      },
    });
    const button = getByTestId(testId);
    await expect(button).toHaveAttribute('data-variant', 'icon-only');
  });

  test(`${story} - Should have data-variant = "icon-after"`, async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name,
      story,
      group: 'button',
      props: {
        'data-test-id': testId,
        testMode: true,
        label: 'label',
        icon: 'PlaceholderSVG',
      },
    });
    const button = getByTestId(testId);
    await expect(button).toHaveAttribute('data-variant', 'icon-after');
  });

  if (iconBefore) {
    test(`${story} - Should have data-variant = "icon-before"`, async ({ gotoStory, getByTestId }) => {
      await gotoStory({
        name,
        story,
        group: 'button',
        props: {
          'data-test-id': testId,
          testMode: true,
          label: 'label',
          icon: 'PlaceholderSVG',
          iconPosition: 'before',
        },
      });
      const button = getByTestId(testId);
      await expect(button).toHaveAttribute('data-variant', 'icon-before');
    });
  }

  test(`${story} - Should have label opacity = 0 with loading prop`, async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name,
      story,
      group: 'button',
      props: {
        'data-test-id': testId,
        testMode: true,
        loading: true,
        label: 'label',
        icon: 'none',
      },
    });
    const button = getByTestId(testId);
    const label = button.locator(`[data-test-id="label"]`);
    await expect(label).toHaveCSS('opacity', '0');
  });

  test(`${story} - Should render loading-icon with loading & icon props`, async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name,
      story,
      group: 'button',
      props: {
        'data-test-id': testId,
        testMode: true,
        loading: true,
        label: 'label',
        icon: 'PlaceholderSVG',
      },
    });
    const button = getByTestId(testId);
    const loadingIcon = button.locator(`[data-test-id="loading-icon"]`);
    await expect(loadingIcon).toBeVisible();
  });

  test(`${story} - Should render loading-icon with loading prop`, async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name,
      story,
      group: 'button',
      props: {
        'data-test-id': testId,
        testMode: true,
        loading: true,
        label: 'label',
        icon: 'none',
      },
    });
    const button = getByTestId(testId);
    const loadingIcon = button.locator(`[data-test-id="loading-icon"]`);
    await expect(loadingIcon).toBeVisible();
  });

  test(`${story} - Should render as <a>`, async ({ page, gotoStory }) => {
    await gotoStory({
      name,
      story,
      group: 'button',
      props: {
        'data-test-id': testId,
        testMode: true,
        label: 'label',
        href: 'test',
      },
    });
    await expect(page.locator(`a[data-test-id="${testId}"]`)).toBeVisible();
  });

  test(`${story} - Should be clickable`, async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name,
      story,
      group: 'button',
      props: {
        'data-test-id': testId,
        testMode: true,
        disabled: false,
        loading: false,
        label: 'label',
        icon: 'PlaceholderSVG',
      },
    });
    const button = getByTestId(testId);
    const count = getByTestId('count');

    await expect(button).not.toHaveCSS('cursor', 'not-allowed');
    await button.click();
    await expect(count).toHaveText('1');
  });

  test(`${story} - Should be disabled with disabled prop`, async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name,
      story,
      group: 'button',
      props: {
        'data-test-id': testId,
        testMode: true,
        disabled: true,
        label: 'label',
        icon: 'PlaceholderSVG',
      },
    });
    const button = getByTestId(testId);
    const count = getByTestId('count');

    await expect(button).toHaveCSS('cursor', 'not-allowed');
    await button.click({ force: true });
    await expect(count).toHaveText('0');
  });

  test(`${story} - Should be disabled with loading prop`, async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name,
      story,
      group: 'button',
      props: {
        'data-test-id': testId,
        testMode: true,
        loading: true,
        label: 'label',
        icon: 'PlaceholderSVG',
      },
    });
    const button = getByTestId(testId);
    const count = getByTestId('count');
    await expect(button).toHaveCSS('cursor', 'not-allowed');
    await button.click({ force: true });
    await expect(count).toHaveText('0');
  });
});
