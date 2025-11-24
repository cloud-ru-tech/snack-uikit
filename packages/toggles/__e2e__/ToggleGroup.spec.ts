import { Locator } from '@playwright/test';

import { expect, test } from '../../../playwright/fixtures';
import { SELECTION_MODE } from '../src/constants';

test.describe('ToggleGroup', () => {
  const selectItem = (getByTestId: (testId: string) => Locator, index: number) => getByTestId(`item-${index}`);
  const validateState = (getByTestId: (testId: string) => Locator) => async (items: boolean[], title: string) => {
    for (const [index, checked] of Object.entries(items)) {
      const isChecked = await selectItem(getByTestId, Number(index) + 1).getAttribute('data-checked');
      await expect(isChecked, `${title}: wrong checked state of item: ${index}`).toBe(String(checked));
    }
  };

  test('Single mode - can select the only one item', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'toggles-toggle-group',
      story: 'toggle-group',
      props: {
        selectionMode: SELECTION_MODE.Single,
      },
    });
    await validateState(getByTestId)([false, false, false, false], 'Initial state');
    await selectItem(getByTestId, 3).click();
    await validateState(getByTestId)([false, false, true, false], 'After click to 3');
    await selectItem(getByTestId, 2).click();
    await validateState(getByTestId)([false, true, false, false], 'After click to 2');
    await selectItem(getByTestId, 2).click();
    await validateState(getByTestId)([false, false, false, false], 'After second click to 2');
  });

  test('Multiple mode - can select several items', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'toggles-toggle-group',
      story: 'toggle-group',
      props: {
        selectionMode: SELECTION_MODE.Multiple,
      },
    });
    await validateState(getByTestId)([false, false, false, false], 'Initial state');
    await selectItem(getByTestId, 3).click();
    await validateState(getByTestId)([false, false, true, false], 'After click to 3');
    await selectItem(getByTestId, 2).click();
    await validateState(getByTestId)([false, true, true, false], 'After click to 2');
    await selectItem(getByTestId, 2).click();
    await validateState(getByTestId)([false, false, true, false], 'After second click to 2');
  });
});
