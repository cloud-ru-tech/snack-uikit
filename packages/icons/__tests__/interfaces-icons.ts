import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import * as InterfaceIcons from '../src/components/interface-icons';
import { generateDataTestId } from './utils';

const size = 30;

fixture('Icons: Interfaces').page(getTestcafeUrl({ name: 'interfaces', group: 'icons', props: { size } }));

test('Rendered', async t => {
  const iconsArray = Object.keys(InterfaceIcons).map(generateDataTestId);

  for (const icon of iconsArray) {
    const iconElement = Selector(dataTestIdSelector(icon));
    await t.expect(iconElement.exists).ok();
    await t.expect(iconElement.getStyleProperty('width')).eql(`${size}px`);
    await t.expect(iconElement.getStyleProperty('height')).eql(`${size}px`);
  }
});
