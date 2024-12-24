import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { TRIGGER } from '../../popover-private/src/constants';
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

const getPage = (props: Record<string, unknown> = {}) =>
  getTestcafeUrl({
    name: 'tooltip',
    props: {
      'data-test-id': TOOLTIP_TEST_ID,
      ...props,
    },
  });

fixture('Tooltip');

test.page(getPage({ open: true }))('Should be open when controlled "open" flag is set', async t => {
  const tooltip = Selector(dataTestIdSelector(TOOLTIP_TEST_ID));

  await t.expect(tooltip.exists).ok();
});

test.page(getPage({ trigger: TRIGGER.Click }))('Opens by click', async t => {
  //https://github.com/DevExpress/testcafe/issues/7969
  if (t.browser.name !== 'Firefox') await verifyTooltipBehavior(t, { click: true });
});

test.page(getPage({ trigger: TRIGGER.Hover }))('Opens by hover', async t => {
  await verifyTooltipBehavior(t, { hover: true });
});

test.page(getPage({ trigger: TRIGGER.Focus }))('Opens by focus', async t => {
  await verifyTooltipBehavior(t, { focus: true });
});

test.page(getPage({ trigger: TRIGGER.ClickAndFocusVisible }))('Opens by click & focus', async t => {
  //https://github.com/DevExpress/testcafe/issues/7969
  if (t.browser.name !== 'Firefox') await verifyTooltipBehavior(t, { click: true, focus: true });
});

test.page(getPage({ trigger: TRIGGER.HoverAndFocus }))('Opens by hover & focus', async t => {
  await verifyTooltipBehavior(t, { hover: true, focus: true });
});

test.page(getPage({ trigger: TRIGGER.Focus }))('Opens by strong focus', async t => {
  await verifyTooltipBehavior(t, { focus: true, strongFocus: true });
});

test.page(getPage({ trigger: TRIGGER.HoverAndFocus }))('Opens by hover & strong focus', async t => {
  await verifyTooltipBehavior(t, { hover: true, focus: true, strongFocus: true });
});

test.page(getPage())('Should not disappear on scroll', async t => {
  await t.resizeWindow(1200, 300);

  const button = Selector(dataTestIdSelector(BUTTON_TEST_ID));
  const tooltip = Selector(dataTestIdSelector(TOOLTIP_TEST_ID));

  await t.click(button);

  await t.expect(tooltip.exists).ok();

  await scrollWindow(0, 10);

  await t.expect(tooltip.exists).ok();

  await t.resizeWindow(1200, 871);
});
