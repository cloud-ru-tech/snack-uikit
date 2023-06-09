import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { getIconsDataTestIds } from './utils';

const InterfaceIcons = getIconsDataTestIds('svgs/interface-icons');

const size = 30;

fixture('Icons: Interfaces').page(
  getTestcafeUrl({ category: 'documentation', name: 'interfaces', group: 'icons', props: { size } }),
);

test('Rendered', async t => {
  for (const icon of InterfaceIcons) {
    const iconElement = Selector(dataTestIdSelector(icon));
    await t.expect(iconElement.exists).ok();
    await t.expect(iconElement.getStyleProperty('width')).eql(`${size}px`);
    await t.expect(iconElement.getStyleProperty('height')).eql(`${size}px`);
  }
});
