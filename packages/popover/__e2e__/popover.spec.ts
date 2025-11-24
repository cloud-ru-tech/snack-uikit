import { Locator, Page } from '@playwright/test';

import { expect, test } from '../../../playwright/fixtures';
import { TRIGGER } from '../../popover-private/src/constants';
import {
  ACTIVITY_REMOVAL_ITEM,
  scrollWindow,
  verifyClickTrigger,
  verifyClickWithFocusTrigger,
  verifyFocusTrigger,
  verifyHoverTrigger,
} from './utils';

const POPOVER_TEST_ID = 'popover';
const BUTTON_TEST_ID = 'button-with-popover';

const verifyPopoverBehavior = async (
  page: Page,
  getByTestId: (testId: string) => Locator,
  { click, focus, hover, strongFocus }: { click?: boolean; hover?: boolean; focus?: boolean; strongFocus?: boolean },
) => {
  await verifyClickTrigger({ page, getByTestId, popoverId: POPOVER_TEST_ID, targetId: BUTTON_TEST_ID, enabled: click });
  await verifyHoverTrigger({ page, getByTestId, popoverId: POPOVER_TEST_ID, targetId: BUTTON_TEST_ID, enabled: hover });
  await verifyFocusTrigger({ page, getByTestId, popoverId: POPOVER_TEST_ID, enabled: focus });

  if (strongFocus) {
    await verifyClickWithFocusTrigger({ page, getByTestId, popoverId: POPOVER_TEST_ID, targetId: BUTTON_TEST_ID });
  }
};

const getRenderWithoutWrappingTargetText = (renderWithoutWrappingTarget: boolean) => {
  if (renderWithoutWrappingTarget) {
    return 'rendering without wrapping the target object';
  }

  return 'rendering with wrapping the target object';
};

test.describe('Popover', () => {
  [false, true].forEach(renderWithoutWrappingTarget => {
    test(`Should close by outside click when outsideClick = true, ${getRenderWithoutWrappingTargetText(renderWithoutWrappingTarget)}`, async ({
      page,
      gotoStory,
      getByTestId,
    }) => {
      await gotoStory({
        name: 'popover',
        props: {
          'data-test-id': POPOVER_TEST_ID,
          renderWithoutWrappingTarget,
          outsideClick: true,
        },
      });
      const button = getByTestId(BUTTON_TEST_ID);

      await button.click();

      await expect(getByTestId(POPOVER_TEST_ID)).toBeVisible();

      await page.locator(ACTIVITY_REMOVAL_ITEM).click();

      await expect(getByTestId(POPOVER_TEST_ID)).not.toBeVisible();
    });

    test(`Should not close by outside click when outsideClick = false, ${getRenderWithoutWrappingTargetText(renderWithoutWrappingTarget)}`, async ({
      page,
      gotoStory,
      getByTestId,
    }) => {
      await gotoStory({
        name: 'popover',
        props: {
          'data-test-id': POPOVER_TEST_ID,
          renderWithoutWrappingTarget,
          outsideClick: false,
        },
      });
      const button = getByTestId(BUTTON_TEST_ID);

      await button.click();

      await expect(getByTestId(POPOVER_TEST_ID)).toBeVisible();

      await page.locator(ACTIVITY_REMOVAL_ITEM).click();

      await expect(getByTestId(POPOVER_TEST_ID)).toBeVisible();
    });

    test(`Should be open when controlled "open" flag is set, ${getRenderWithoutWrappingTargetText(renderWithoutWrappingTarget)}`, async ({
      gotoStory,
      getByTestId,
    }) => {
      await gotoStory({
        name: 'popover',
        props: {
          'data-test-id': POPOVER_TEST_ID,
          renderWithoutWrappingTarget,
          open: true,
        },
      });
      const popover = getByTestId(POPOVER_TEST_ID);

      await expect(popover).toBeVisible();
    });

    test(`Opens by click, ${getRenderWithoutWrappingTargetText(renderWithoutWrappingTarget)}`, async ({
      page,
      gotoStory,
      getByTestId,
    }) => {
      await gotoStory({
        name: 'popover',
        props: {
          'data-test-id': POPOVER_TEST_ID,
          renderWithoutWrappingTarget,
          trigger: TRIGGER.Click,
        },
      });
      await expect(getByTestId(BUTTON_TEST_ID)).toBeVisible();

      await verifyPopoverBehavior(page, getByTestId, { click: true });
    });

    test(`Opens by hover, ${getRenderWithoutWrappingTargetText(renderWithoutWrappingTarget)}`, async ({
      page,
      gotoStory,
      getByTestId,
    }) => {
      await gotoStory({
        name: 'popover',
        props: {
          'data-test-id': POPOVER_TEST_ID,
          renderWithoutWrappingTarget,
          trigger: TRIGGER.Hover,
        },
      });
      await expect(getByTestId(BUTTON_TEST_ID)).toBeVisible();

      await verifyPopoverBehavior(page, getByTestId, { hover: true });
    });

    test(`Opens by focus, ${getRenderWithoutWrappingTargetText(renderWithoutWrappingTarget)}`, async ({
      page,
      gotoStory,
      getByTestId,
    }) => {
      await gotoStory({
        name: 'popover',
        props: {
          'data-test-id': POPOVER_TEST_ID,
          renderWithoutWrappingTarget,
          trigger: TRIGGER.FocusVisible,
        },
      });
      await expect(getByTestId(BUTTON_TEST_ID)).toBeVisible();

      await verifyPopoverBehavior(page, getByTestId, { focus: true });
    });

    test(`Opens by click & focus, ${getRenderWithoutWrappingTargetText(renderWithoutWrappingTarget)}`, async ({
      page,
      gotoStory,
      getByTestId,
    }) => {
      await gotoStory({
        name: 'popover',
        props: {
          'data-test-id': POPOVER_TEST_ID,
          renderWithoutWrappingTarget,
          trigger: TRIGGER.ClickAndFocusVisible,
        },
      });
      await expect(getByTestId(BUTTON_TEST_ID)).toBeVisible();

      await verifyPopoverBehavior(page, getByTestId, { click: true, focus: true });
    });

    test(`Opens by hover & focus, ${getRenderWithoutWrappingTargetText(renderWithoutWrappingTarget)}`, async ({
      page,
      gotoStory,
      getByTestId,
    }) => {
      await gotoStory({
        name: 'popover',
        props: {
          'data-test-id': POPOVER_TEST_ID,
          renderWithoutWrappingTarget,
          trigger: TRIGGER.HoverAndFocusVisible,
        },
      });
      await expect(getByTestId(BUTTON_TEST_ID)).toBeVisible();

      await verifyPopoverBehavior(page, getByTestId, { hover: true, focus: true });
    });

    test(`Opens by strong focus, ${getRenderWithoutWrappingTargetText(renderWithoutWrappingTarget)}`, async ({
      page,
      gotoStory,
      getByTestId,
    }) => {
      await gotoStory({
        name: 'popover',
        props: {
          'data-test-id': POPOVER_TEST_ID,
          renderWithoutWrappingTarget,
          trigger: TRIGGER.Focus,
        },
      });
      await expect(getByTestId(BUTTON_TEST_ID)).toBeVisible();

      await verifyPopoverBehavior(page, getByTestId, { focus: true, strongFocus: true });
    });

    test(`Opens by hover & strong focus, ${getRenderWithoutWrappingTargetText(renderWithoutWrappingTarget)}`, async ({
      page,
      gotoStory,
      getByTestId,
    }) => {
      await gotoStory({
        name: 'popover',
        props: {
          'data-test-id': POPOVER_TEST_ID,
          renderWithoutWrappingTarget,
          trigger: TRIGGER.HoverAndFocus,
        },
      });
      await expect(getByTestId(BUTTON_TEST_ID)).toBeVisible();

      await verifyPopoverBehavior(page, getByTestId, { hover: true, focus: true, strongFocus: true });
    });

    test(`Should not disappear on scroll, ${getRenderWithoutWrappingTargetText(renderWithoutWrappingTarget)}`, async ({
      page,
      gotoStory,
      getByTestId,
    }) => {
      await gotoStory({
        name: 'popover',
        props: {
          'data-test-id': POPOVER_TEST_ID,
          renderWithoutWrappingTarget,
        },
      });
      await page.setViewportSize({ width: 1200, height: 300 });

      const button = getByTestId(BUTTON_TEST_ID);
      const popover = getByTestId(POPOVER_TEST_ID);

      await button.click();

      await expect(popover).toBeVisible();

      await scrollWindow(page, 0, 10);

      await expect(popover).toBeVisible();

      await page.setViewportSize({ width: 1200, height: 871 });
    });
  });
});
