import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
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
  t: TestController,
  { click, focus, hover, strongFocus }: { click?: boolean; hover?: boolean; focus?: boolean; strongFocus?: boolean },
) => {
  await verifyClickTrigger({ t, popoverId: POPOVER_TEST_ID, targetId: BUTTON_TEST_ID, enabled: click });
  await verifyHoverTrigger({ t, popoverId: POPOVER_TEST_ID, targetId: BUTTON_TEST_ID, enabled: hover });
  await verifyFocusTrigger({ t, popoverId: POPOVER_TEST_ID, enabled: focus });

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

const getRenderWithoutWrappingTargetText = (renderWithoutWrappingTarget: boolean) => {
  if (renderWithoutWrappingTarget) {
    return 'rendering without wrapping the target object';
  }

  return 'rendering with wrapping the target object';
};

fixture('Popover');

[false, true].forEach(renderWithoutWrappingTarget => {
  test.page(getPage({ renderWithoutWrappingTarget, outsideClick: true }))(
    `Should close by outside click when outsideClick = true, ${getRenderWithoutWrappingTargetText(renderWithoutWrappingTarget)}`,
    async t => {
      const button = Selector(dataTestIdSelector(BUTTON_TEST_ID));

      await t.click(button);

      await t.expect(Selector(dataTestIdSelector(POPOVER_TEST_ID)).exists).ok('popover should be open');

      await t.click(ACTIVITY_REMOVAL_ITEM);

      await t.expect(Selector(dataTestIdSelector(POPOVER_TEST_ID)).exists).notOk('popover should close');
    },
  );

  test.page(getPage({ renderWithoutWrappingTarget, outsideClick: false }))(
    `Should not close by outside click when outsideClick = false, ${getRenderWithoutWrappingTargetText(renderWithoutWrappingTarget)}`,
    async t => {
      const button = Selector(dataTestIdSelector(BUTTON_TEST_ID));

      await t.click(button);

      await t.expect(Selector(dataTestIdSelector(POPOVER_TEST_ID)).exists).ok('popover should be open');

      await t.click(ACTIVITY_REMOVAL_ITEM);

      await t.expect(Selector(dataTestIdSelector(POPOVER_TEST_ID)).exists).ok('popover should stay open');
    },
  );

  test.page(getPage({ renderWithoutWrappingTarget, open: true }))(
    `Should be open when controlled "open" flag is set, ${getRenderWithoutWrappingTargetText(renderWithoutWrappingTarget)}`,
    async t => {
      const popover = Selector(dataTestIdSelector(POPOVER_TEST_ID));

      await t.expect(popover.exists).ok();
    },
  );

  test.page(getPage({ renderWithoutWrappingTarget, trigger: TRIGGER.Click }))(
    `Opens by click, ${getRenderWithoutWrappingTargetText(renderWithoutWrappingTarget)}`,
    async t => {
      await t.expect(Selector(dataTestIdSelector(BUTTON_TEST_ID)).exists).ok();

      await verifyPopoverBehavior(t, { click: true });
    },
  );

  test.page(getPage({ renderWithoutWrappingTarget, trigger: TRIGGER.Hover }))(
    `Opens by hover, ${getRenderWithoutWrappingTargetText(renderWithoutWrappingTarget)}`,
    async t => {
      await t.expect(Selector(dataTestIdSelector(BUTTON_TEST_ID)).exists).ok();

      await verifyPopoverBehavior(t, { hover: true });
    },
  );

  test.page(getPage({ renderWithoutWrappingTarget, trigger: TRIGGER.FocusVisible }))(
    `Opens by focus, ${getRenderWithoutWrappingTargetText(renderWithoutWrappingTarget)}`,
    async t => {
      await t.expect(Selector(dataTestIdSelector(BUTTON_TEST_ID)).exists).ok();

      await verifyPopoverBehavior(t, { focus: true });
    },
  );

  test.page(getPage({ renderWithoutWrappingTarget, trigger: TRIGGER.ClickAndFocusVisible }))(
    `Opens by click & focus, ${getRenderWithoutWrappingTargetText(renderWithoutWrappingTarget)}`,
    async t => {
      await t.expect(Selector(dataTestIdSelector(BUTTON_TEST_ID)).exists).ok();

      await verifyPopoverBehavior(t, { click: true, focus: true });
    },
  );

  test.page(getPage({ renderWithoutWrappingTarget, trigger: TRIGGER.HoverAndFocusVisible }))(
    `Opens by hover & focus, ${getRenderWithoutWrappingTargetText(renderWithoutWrappingTarget)}`,
    async t => {
      await t.expect(Selector(dataTestIdSelector(BUTTON_TEST_ID)).exists).ok();

      await verifyPopoverBehavior(t, { hover: true, focus: true });
    },
  );

  test.page(getPage({ renderWithoutWrappingTarget, trigger: TRIGGER.Focus }))(
    `Opens by strong focus, ${getRenderWithoutWrappingTargetText(renderWithoutWrappingTarget)}`,
    async t => {
      await t.expect(Selector(dataTestIdSelector(BUTTON_TEST_ID)).exists).ok();

      await verifyPopoverBehavior(t, { focus: true, strongFocus: true });
    },
  );

  test.page(getPage({ renderWithoutWrappingTarget, trigger: TRIGGER.HoverAndFocus }))(
    `Opens by hover & strong focus, ${getRenderWithoutWrappingTargetText(renderWithoutWrappingTarget)}`,
    async t => {
      await t.expect(Selector(dataTestIdSelector(BUTTON_TEST_ID)).exists).ok();

      await verifyPopoverBehavior(t, { hover: true, focus: true, strongFocus: true });
    },
  );

  test.page(getPage({ renderWithoutWrappingTarget }))(
    `Should not disappear on scroll, ${getRenderWithoutWrappingTargetText(renderWithoutWrappingTarget)}`,
    async t => {
      await t.resizeWindow(1200, 300);

      const button = Selector(dataTestIdSelector(BUTTON_TEST_ID));
      const popover = Selector(dataTestIdSelector(POPOVER_TEST_ID));

      await t.click(button);

      await t.expect(popover.exists).ok();

      await scrollWindow(0, 10);

      await t.expect(popover.exists).ok();

      await t.resizeWindow(1200, 871);
    },
  );
});
