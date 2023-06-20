import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { Trigger } from '../../popover-private/src/constants';
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
  t: TestController,
  { click, focus, hover, strongFocus }: { click?: boolean; hover?: boolean; focus?: boolean; strongFocus?: boolean },
) => {
  await verifyClickTrigger({ t, popoverId: POPOVER_TEST_ID, targetId: BUTTON_TEST_ID, enabled: click });
  await verifyHoverTrigger({ t, popoverId: POPOVER_TEST_ID, targetId: BUTTON_TEST_ID, enabled: hover });
  await verifyFocusTrigger({ t, popoverId: POPOVER_TEST_ID, targetId: BUTTON_TEST_ID, enabled: focus });

  if (strongFocus) {
    await verifyClickWithFocusTrigger({ t, popoverId: POPOVER_TEST_ID, targetId: BUTTON_TEST_ID });
  }
};

const getPage = (props: Record<string, unknown> = {}) =>
  getTestcafeUrl({
    name: 'popover',
    props: {
      'data-test-id': POPOVER_TEST_ID,
      ...props,
    },
  });

fixture('Popover').skipJsErrors(args => Boolean(args?.message?.includes('ResizeObserver loop')));

test.page(getPage({ outsideClick: true }))('Should close by outside click when outsideClick = true', async t => {
  const button = Selector(dataTestIdSelector(BUTTON_TEST_ID));

  await t.click(button);

  await t.expect(Selector(dataTestIdSelector(POPOVER_TEST_ID)).exists).ok('popover should be open');

  await t.click(ACTIVITY_REMOVAL_ITEM);

  await t.expect(Selector(dataTestIdSelector(POPOVER_TEST_ID)).exists).notOk('popover should close');
});

test.page(getPage({ outsideClick: false }))('Should not close by outside click when outsideClick = false', async t => {
  const button = Selector(dataTestIdSelector(BUTTON_TEST_ID));

  await t.click(button);

  await t.expect(Selector(dataTestIdSelector(POPOVER_TEST_ID)).exists).ok('popover should be open');

  await t.click(ACTIVITY_REMOVAL_ITEM);

  await t.expect(Selector(dataTestIdSelector(POPOVER_TEST_ID)).exists).ok('popover should stay open');
});

test.page(getPage({ open: true }))('Should be open when controlled "open" flag is set', async t => {
  const popover = Selector(dataTestIdSelector(POPOVER_TEST_ID));

  await t.expect(popover.exists).ok();
});

// eslint-disable-next-line testcafe-community/missing-expect
test.page(getPage({ trigger: Trigger.Click }))('Opens by click', async t => {
  await verifyPopoverBehavior(t, { click: true });
});

// eslint-disable-next-line testcafe-community/missing-expect
test.page(getPage({ trigger: Trigger.Hover }))('Opens by hover', async t => {
  await verifyPopoverBehavior(t, { hover: true });
});

// eslint-disable-next-line testcafe-community/missing-expect
test.page(getPage({ trigger: Trigger.FocusVisible }))('Opens by focus', async t => {
  await verifyPopoverBehavior(t, { focus: true });
});

// eslint-disable-next-line testcafe-community/missing-expect
test.page(getPage({ trigger: Trigger.ClickAndFocusVisible }))('Opens by click & focus', async t => {
  await verifyPopoverBehavior(t, { click: true, focus: true });
});

// eslint-disable-next-line testcafe-community/missing-expect
test.page(getPage({ trigger: Trigger.HoverAndFocusVisible }))('Opens by hover & focus', async t => {
  await verifyPopoverBehavior(t, { hover: true, focus: true });
});

// eslint-disable-next-line testcafe-community/missing-expect
test.page(getPage({ trigger: Trigger.Focus }))('Opens by strong focus', async t => {
  await verifyPopoverBehavior(t, { focus: true, strongFocus: true });
});

// eslint-disable-next-line testcafe-community/missing-expect
test.page(getPage({ trigger: Trigger.HoverAndFocus }))('Opens by hover & strong focus', async t => {
  await verifyPopoverBehavior(t, { hover: true, focus: true, strongFocus: true });
});

test.page(getPage())('Should disappear on scroll', async t => {
  await t.resizeWindow(1200, 300);

  const button = Selector(dataTestIdSelector(BUTTON_TEST_ID));
  const popover = Selector(dataTestIdSelector(POPOVER_TEST_ID));

  await t.click(button);

  await t.expect(popover.exists).ok();

  await scrollWindow(0, 10);

  await t.expect(popover.exists).notOk();

  await t.resizeWindow(1200, 871);
});
