import { ClientFunction, Selector } from 'testcafe';

import { dataTestIdSelector } from '../../../testcafe/utils';

const ACTIVITY_REMOVAL_ITEM = dataTestIdSelector('activity-removal');

const focus = ClientFunction((selector: string) => {
  document.querySelector<HTMLElement>(selector)?.focus();
});

const clickWithoutFocus = ClientFunction((selector: string) => {
  document.querySelector<HTMLElement>(selector)?.click();
});

export const scrollWindow = ClientFunction((x: number, y: number) => {
  window.scroll(x, y);
});

export const verifyClickTrigger = async ({
  t,
  targetId,
  popoverId,
  enabled,
}: {
  t: TestController;
  targetId: string;
  popoverId: string;
  enabled?: boolean;
}) => {
  const targetSelector = dataTestIdSelector(targetId);
  const popover = Selector(dataTestIdSelector(popoverId));

  if (enabled) {
    await clickWithoutFocus(targetSelector);
    await t.expect(popover.exists).ok(`Element "${popoverId}" should be open by click`);
    await clickWithoutFocus(targetSelector);
    await t.expect(popover.exists).notOk(`Element "${popoverId}" is not closed by click`);
  } else {
    await clickWithoutFocus(targetSelector);
    await t.expect(popover.exists).notOk(`Element "${popoverId}" shouldn't be open by click`);
  }
};

export const verifyClickWithFocusTrigger = async ({
  t,
  targetId,
  popoverId,
}: {
  t: TestController;
  targetId: string;
  popoverId: string;
}) => {
  const target = Selector(dataTestIdSelector(targetId));
  const popover = Selector(dataTestIdSelector(popoverId));

  await t.click(target);
  await t.expect(popover.exists).ok(`Element "${popoverId}" should be open by click with focus`);
  await t.click(ACTIVITY_REMOVAL_ITEM);
  await t.expect(popover.exists).notOk(`Element "${popoverId}" is not closed by click with focus`);
};

export const verifyHoverTrigger = async ({
  t,
  targetId,
  popoverId,
  enabled,
}: {
  t: TestController;
  targetId: string;
  popoverId: string;
  enabled?: boolean;
}) => {
  const target = Selector(dataTestIdSelector(targetId));
  const popover = Selector(dataTestIdSelector(popoverId));

  if (enabled) {
    await t.hover(target);
    await t.expect(popover.exists).ok(`Element "${popoverId}" should be open by hover`);
    await t.click(ACTIVITY_REMOVAL_ITEM);
    await t.expect(popover.exists).notOk(`Element "${popoverId}" is not closed by removing hover`);
  } else {
    await t.hover(target);
    await t.expect(popover.exists).notOk(`Element "${popoverId}" shouldn't be open by hover`);
  }
};

export const verifyFocusTrigger = async ({
  t,
  targetId,
  popoverId,
  enabled,
}: {
  t: TestController;
  targetId: string;
  popoverId: string;
  enabled?: boolean;
}) => {
  const targetSelector = dataTestIdSelector(targetId);
  const popover = Selector(dataTestIdSelector(popoverId));

  if (enabled) {
    await focus(targetSelector);
    await t.expect(popover.exists).ok(`Element "${popoverId}" should be open by focus`);
    await t.click(ACTIVITY_REMOVAL_ITEM);
    await t.expect(popover.exists).notOk(`Element "${popoverId}" is not closed by removing focus`);
  } else {
    await focus(targetSelector);
    await t.expect(popover.exists).notOk(`Element "${popoverId}" shouldn't be open by focus`);
  }
};
