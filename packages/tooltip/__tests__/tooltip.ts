import { fixture, Selector, test } from 'testcafe';

import { TooltipProps } from '@snack-ui/tooltip';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { Trigger } from '../../popover-private/src/constants';
import {
  scrollWindow,
  verifyClickTrigger,
  verifyClickWithFocusTrigger,
  verifyFocusTrigger,
  verifyHoverTrigger,
} from './utils';

const TOOLTIP_TEST_ID = 'tooltip';
const BUTTON_TEST_ID = 'button-with-tooltip';

const verifyTooltipBehavior = async (
  t: TestController,
  { click, focus, hover, strongFocus }: { click?: boolean; hover?: boolean; focus?: boolean; strongFocus?: boolean },
) => {
  await verifyClickTrigger({ t, popoverId: TOOLTIP_TEST_ID, targetId: BUTTON_TEST_ID, enabled: click });
  await verifyHoverTrigger({ t, popoverId: TOOLTIP_TEST_ID, targetId: BUTTON_TEST_ID, enabled: hover });
  await verifyFocusTrigger({ t, popoverId: TOOLTIP_TEST_ID, targetId: BUTTON_TEST_ID, enabled: focus });

  if (strongFocus) {
    await verifyClickWithFocusTrigger({ t, popoverId: TOOLTIP_TEST_ID, targetId: BUTTON_TEST_ID });
  }
};

const getPage = (props: Partial<TooltipProps> = {}) =>
  getTestcafeUrl({
    name: 'tooltip',
    props: {
      'data-test-id': TOOLTIP_TEST_ID,
      ...props,
    },
  });

fixture('Tooltip').skipJsErrors(args => Boolean(args?.message.includes('ResizeObserver loop')));

test.page(getPage({ open: true }))('Should be open when controlled "open" flag is set', async t => {
  const tooltip = Selector(dataTestIdSelector(TOOLTIP_TEST_ID));

  await t.expect(tooltip.exists).ok();
});

// eslint-disable-next-line testcafe-community/missing-expect
test.page(getPage({ trigger: Trigger.Click }))('Opens by click', async t => {
  await verifyTooltipBehavior(t, { click: true });
});

// eslint-disable-next-line testcafe-community/missing-expect
test.page(getPage({ trigger: Trigger.Hover }))('Opens by hover', async t => {
  await verifyTooltipBehavior(t, { hover: true });
});

// eslint-disable-next-line testcafe-community/missing-expect
test.page(getPage({ trigger: Trigger.Focus }))('Opens by focus', async t => {
  await verifyTooltipBehavior(t, { focus: true });
});

// eslint-disable-next-line testcafe-community/missing-expect
test.page(getPage({ trigger: Trigger.ClickAndFocusVisible }))('Opens by click & focus', async t => {
  await verifyTooltipBehavior(t, { click: true, focus: true });
});

// eslint-disable-next-line testcafe-community/missing-expect
test.page(getPage({ trigger: Trigger.HoverAndFocus }))('Opens by hover & focus', async t => {
  await verifyTooltipBehavior(t, { hover: true, focus: true });
});

// eslint-disable-next-line testcafe-community/missing-expect
test.page(getPage({ trigger: Trigger.Focus }))('Opens by strong focus', async t => {
  await verifyTooltipBehavior(t, { focus: true, strongFocus: true });
});

// eslint-disable-next-line testcafe-community/missing-expect
test.page(getPage({ trigger: Trigger.HoverAndFocus }))('Opens by hover & strong focus', async t => {
  await verifyTooltipBehavior(t, { hover: true, focus: true, strongFocus: true });
});

test.page(getPage())('Should disappear on scroll', async t => {
  await t.resizeWindow(1200, 300);

  const button = Selector(dataTestIdSelector(BUTTON_TEST_ID));
  const tooltip = Selector(dataTestIdSelector(TOOLTIP_TEST_ID));

  await t.click(button);

  await t.expect(tooltip.exists).ok();

  await scrollWindow(0, 10);

  await t.expect(tooltip.exists).notOk();

  await t.resizeWindow(1200, 871);
});