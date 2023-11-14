import { Selector, test } from 'testcafe';

import { dataTestIdSelector } from '../../../../testcafe/utils';

export type VisitCallback = (props?: Record<string, unknown>) => string;

type GetComponent = () => { chip: Selector; label: Selector; value?: Selector; icon: Selector; spinner: Selector };

const LABEL_TEXT = 'Test text';
const ICON_NAME = 'PlaceholderSVG';
const CLICK_COUNTER_TEST_ID = 'click__counter';

export const validateNoIconForSizeXs = (visit: VisitCallback, getComponent: GetComponent, checkValue = false) => {
  test.page(visit({ label: LABEL_TEXT, size: 'xs', icon: ICON_NAME }))(
    'should have no icon when prop size === "xs"',
    async t => {
      const { label, value, icon } = getComponent();

      if (checkValue && value) {
        await t.expect(value.exists).ok();
      } else {
        await t.expect(label.exists).ok();
      }
      await t.expect(icon.exists).notOk();
    },
  );
};

export const runCommonTests = (visit: VisitCallback, getComponent: GetComponent) => {
  test.page(visit({ label: LABEL_TEXT, icon: ICON_NAME }))('should render with icon', async t => {
    const { label, icon } = getComponent();

    await t.expect(label.exists).ok();
    await t.expect(icon.exists).ok();
  });

  test.page(visit({ label: LABEL_TEXT, loading: true, icon: ICON_NAME }))(
    'icon should change to spinner when loading',
    async t => {
      const { label, icon, spinner } = getComponent();

      await t.expect(label.exists).ok();
      await t.expect(spinner.exists).ok();
      await t.expect(icon.exists).notOk();
    },
  );

  test.page(visit({ label: LABEL_TEXT, loading: true }))('label should hide when loading', async t => {
    const { label, spinner } = getComponent();

    await t.expect(label.getStyleProperty('opacity')).eql('0');
    await t.expect(spinner.exists).ok();
  });

  validateNoIconForSizeXs(visit, getComponent);
};

export const validateClicks = (visit: VisitCallback, getComponent: GetComponent) => {
  const count = Selector(dataTestIdSelector(CLICK_COUNTER_TEST_ID));

  test.page(visit())(`click is working`, async t => {
    const { chip } = getComponent();

    await t.click(chip);
    await t.expect(count.innerText).eql('1');
  });

  test.page(visit({ disabled: true }))('should be disabled and click is ignored', async t => {
    const { chip } = getComponent();

    const hasDisabledAttribute = (await chip.hasAttribute('disabled')) || (await chip.hasAttribute('data-disabled'));
    await t.expect(hasDisabledAttribute).ok();
    await t.expect(chip.getStyleProperty('cursor')).eql('not-allowed');

    await t.click(chip);
    await t.expect(count.innerText).eql('0');
  });
};
