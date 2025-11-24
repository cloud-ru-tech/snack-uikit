import { expect, test } from '../../../playwright/fixtures';

const TEST_ID = 'hidden-drop-zone';

test.describe('Hidden Drop Zone', () => {
  test('After dropping the file, the values in the form remain', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'hidden-drop-zone',
      story: 'hidden-drop-zone',
      group: 'drop-zone',
      props: {
        'data-test-id': TEST_ID,
      },
    });
    const form = page.locator('#form');
    const firstName = page.locator('#firstName');
    const lastName = page.locator('#lastName');

    const dropZone = getByTestId(TEST_ID);

    await firstName.fill('Имя');
    await lastName.fill('Фамилия');

    await expect(form).toBeVisible();
    await form.dispatchEvent('dragover');
    await dropZone.dispatchEvent('dragleave');

    await expect(firstName).toHaveValue('Имя');
    await expect(lastName).toHaveValue('Фамилия');
  });
});
