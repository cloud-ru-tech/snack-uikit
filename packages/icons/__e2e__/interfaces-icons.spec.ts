import { expect, test } from '../../../playwright/fixtures';
import { getIconsDataTestIds } from './utils';

const InterfaceIcons = getIconsDataTestIds('svgs/interface-icons');

const size = 30;

test.describe('Icons: Interfaces', () => {
  test.beforeEach(async ({ gotoStory }) => {
    await gotoStory({
      name: 'interfaces',
      group: 'icons',
      props: { size },
    });
  });

  test('Rendered', async ({ getByTestId }) => {
    for (const icon of InterfaceIcons) {
      const iconElement = getByTestId(icon);
      await expect(iconElement).toBeVisible();
      await expect(iconElement).toHaveCSS('width', `${size}px`);
      await expect(iconElement).toHaveCSS('height', `${size}px`);
    }
  });
});
