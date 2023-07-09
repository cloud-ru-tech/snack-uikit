import { Selector } from 'testcafe';

import { dataTestIdSelector } from '../../../../testcafe/utils';

type VisitCallback = (props: Record<string, unknown>) => string;

type Options = {
  dropListTestId: string;
  iconTestId: string;
};

export const runTestsForOpenableFields = (visit: VisitCallback, testId: string, options: Options) => {
  const getIcon = (wrapper: Selector) => wrapper.find(dataTestIdSelector(options.iconTestId));
  const getDropList = () => Selector(dataTestIdSelector(options.dropListTestId));

  // open/close
  test.page(visit({ value: '' }))('Should open/close drop list by click & keyboard', async t => {
    const wrapper = Selector(dataTestIdSelector(testId));
    const icon = getIcon(wrapper);
    const dropList = getDropList();

    await t.expect(dropList.exists).notOk("drop list is present although shouldn't");

    await t.click(wrapper);
    await t.expect(dropList.exists).ok('drop list is not present after click');
    await t.click(wrapper);
    await t.expect(dropList.exists).notOk("drop list still present after click although shouldn't");

    await t.click(icon);
    await t.expect(dropList.exists).ok('drop list is not present after clicking on icon');

    await t.pressKey('space');
    await t.expect(dropList.exists).notOk("drop list is present after space although shouldn't");

    await t.pressKey('enter');
    await t.expect(dropList.exists).ok('drop list is not present after enter');

    await t.pressKey('esc');
    await t.expect(dropList.exists).notOk('drop list is still present after esc');
  });

  // open/close & readonly
  test.page(visit({ value: '', readonly: true }))("Shouldn't open when readonly", async t => {
    const wrapper = Selector(dataTestIdSelector(testId));
    const dropList = getDropList();

    await t.expect(dropList.exists).notOk("drop list is present although shouldn't");

    await t.click(wrapper);

    await t.expect(dropList.exists).notOk("drop list is present after click although shouldn't");
  });

  // open/close & disabled
  test.page(visit({ value: '', disabled: true }))("Shouldn't open when disabled", async t => {
    const wrapper = Selector(dataTestIdSelector(testId));
    const dropList = getDropList();

    await t.expect(dropList.exists).notOk("drop list is present although shouldn't");

    await t.click(wrapper);

    await t.expect(dropList.exists).notOk("drop list is present after click although shouldn't");
  });
};
