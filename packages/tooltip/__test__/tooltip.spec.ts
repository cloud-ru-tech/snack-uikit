import { expect, Locator, Page, test } from '../../../playwright/fixtures';
import { TRIGGER } from '../../popover-private/src/constants';
import {
  clickWithoutFocus,
  scrollWindow,
  verifyClickTrigger,
  verifyClickWithFocusTrigger,
  verifyFocusTrigger,
  verifyHoverTrigger,
} from './utils';

const TOOLTIP_TEST_ID = 'tooltip';
const BUTTON_TEST_ID = 'button-with-tooltip';
const ON_OPEN_CHANGE_CALL_COUNT_TEST_ID = 'on-open-change-call-count';

const verifyTooltipBehavior = async (
  page: Page,
  getByTestId: (testId: string) => Locator,
  { click, focus, hover, strongFocus }: { click?: boolean; hover?: boolean; focus?: boolean; strongFocus?: boolean },
) => {
  await verifyClickTrigger({ page, getByTestId, popoverId: TOOLTIP_TEST_ID, targetId: BUTTON_TEST_ID, enabled: click });
  await verifyHoverTrigger({ getByTestId, popoverId: TOOLTIP_TEST_ID, targetId: BUTTON_TEST_ID, enabled: hover });
  await verifyFocusTrigger({ getByTestId, popoverId: TOOLTIP_TEST_ID, targetId: BUTTON_TEST_ID, enabled: focus });

  if (strongFocus) {
    await verifyClickWithFocusTrigger({ getByTestId, popoverId: TOOLTIP_TEST_ID, targetId: BUTTON_TEST_ID });
  }
};

test.describe('Tooltip', () => {
  test('Should be open when controlled "open" flag is set', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'tooltip',
      props: {
        'data-test-id': TOOLTIP_TEST_ID,
        open: true,
      },
    });
    const tooltip = getByTestId(TOOLTIP_TEST_ID);

    await expect(tooltip).toBeVisible();
  });

  test('Opens by click', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'tooltip',
      props: {
        'data-test-id': TOOLTIP_TEST_ID,
        trigger: TRIGGER.Click,
      },
    });
    await expect(getByTestId(BUTTON_TEST_ID)).toBeVisible();

    await verifyTooltipBehavior(page, getByTestId, { click: true });
  });

  test('Opens by hover', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'tooltip',
      props: {
        'data-test-id': TOOLTIP_TEST_ID,
        trigger: TRIGGER.Hover,
      },
    });
    await expect(getByTestId(BUTTON_TEST_ID)).toBeVisible();
    await page.locator('body').click({ position: { x: 0, y: 0 } });

    await verifyTooltipBehavior(page, getByTestId, { hover: true });
  });

  test('Opens by focus', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'tooltip',
      props: {
        'data-test-id': TOOLTIP_TEST_ID,
        trigger: TRIGGER.Focus,
      },
    });
    await expect(getByTestId(BUTTON_TEST_ID)).toBeVisible();

    await verifyTooltipBehavior(page, getByTestId, { focus: true });
  });

  test('Opens by click & focus', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'tooltip',
      props: {
        'data-test-id': TOOLTIP_TEST_ID,
        trigger: TRIGGER.ClickAndFocusVisible,
      },
    });
    await expect(getByTestId(BUTTON_TEST_ID)).toBeVisible();

    await verifyTooltipBehavior(page, getByTestId, { click: true, focus: true });
  });

  test('Opens by hover & focus', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'tooltip',
      props: {
        'data-test-id': TOOLTIP_TEST_ID,
        trigger: TRIGGER.HoverAndFocus,
      },
    });
    await expect(getByTestId(BUTTON_TEST_ID)).toBeVisible();

    await verifyTooltipBehavior(page, getByTestId, { hover: true, focus: true });
  });

  test('Opens by strong focus', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'tooltip',
      props: {
        'data-test-id': TOOLTIP_TEST_ID,
        trigger: TRIGGER.Focus,
      },
    });
    await expect(getByTestId(BUTTON_TEST_ID)).toBeVisible();

    await verifyTooltipBehavior(page, getByTestId, { focus: true, strongFocus: true });
  });

  test('Opens by hover & strong focus', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'tooltip',
      props: {
        'data-test-id': TOOLTIP_TEST_ID,
        trigger: TRIGGER.HoverAndFocus,
      },
    });
    await expect(getByTestId(BUTTON_TEST_ID)).toBeVisible();

    await verifyTooltipBehavior(page, getByTestId, { hover: true, focus: true, strongFocus: true });
  });

  test('onOpenChange fires once per open and close when trigger is hover', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'tooltip',
      props: {
        'data-test-id': TOOLTIP_TEST_ID,
        trigger: TRIGGER.Hover,
      },
    });

    const callCount = getByTestId(ON_OPEN_CHANGE_CALL_COUNT_TEST_ID);
    const tooltip = getByTestId(TOOLTIP_TEST_ID);
    const button = getByTestId(BUTTON_TEST_ID);

    await page.locator('body').click({ position: { x: 0, y: 0 } });
    await expect(callCount).toHaveText('0');

    await button.hover();
    await expect(tooltip).toBeVisible();
    await expect(callCount).toHaveText('1');

    await getByTestId('activity-removal').click();
    await expect(tooltip).not.toBeVisible();
    await expect(callCount).toHaveText('2');
  });

  test('onOpenChange fires once per open and close when trigger is click', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'tooltip',
      props: {
        'data-test-id': TOOLTIP_TEST_ID,
        trigger: TRIGGER.Click,
      },
    });

    const callCount = getByTestId(ON_OPEN_CHANGE_CALL_COUNT_TEST_ID);
    const tooltip = getByTestId(TOOLTIP_TEST_ID);

    await clickWithoutFocus(page, getByTestId, BUTTON_TEST_ID);
    await expect(tooltip).toBeVisible();
    await expect(callCount).toHaveText('1');

    await clickWithoutFocus(page, getByTestId, BUTTON_TEST_ID);
    await expect(tooltip).not.toBeVisible();
    await expect(callCount).toHaveText('2');
  });

  test('Should not disappear on scroll', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'tooltip',
      props: {
        'data-test-id': TOOLTIP_TEST_ID,
      },
    });
    await page.setViewportSize({ width: 1200, height: 300 });

    const button = getByTestId(BUTTON_TEST_ID);
    const tooltip = getByTestId(TOOLTIP_TEST_ID);

    await button.click();

    await expect(tooltip).toBeVisible();

    await scrollWindow(page, 0, 10);

    await expect(tooltip).toBeVisible();

    await page.setViewportSize({ width: 1200, height: 871 });
  });
});
