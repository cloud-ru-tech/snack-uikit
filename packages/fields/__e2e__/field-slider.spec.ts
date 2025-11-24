import type { Locator } from '@playwright/test';

import { expect, test } from '../../../playwright/fixtures';
import { getInput } from './utils';
import { runCommonTests } from './utils/runCommonTests';

test.describe('Field Slider', () => {
  const TEST_ID = 'field-slider-test';
  const COMPONENT_PREFIX = 'field-slider';

  const DATA_ATTRIBUTES = {
    handle: {
      valueMin: 'aria-valuemin',
      valueMax: 'aria-valuemax',
      value: 'aria-valuenow',
      disabled: 'aria-disabled',
    },
  };

  type AttributesRecord = Record<string, string>;

  const getAttributes = <T extends AttributesRecord>(
    element: Locator,
    attributesRecord: T,
  ): Record<keyof T, Promise<string | null>> =>
    Object.entries(attributesRecord).reduce(
      (accAttributesObj, [key, value]) => ({
        ...accAttributesObj,
        [key]: element.getAttribute(value),
      }),
      {} as Record<keyof T, Promise<string | null>>,
    );

  const selectors = {
    getSliderHandle: (handle: Locator) => ({
      handle,
      ...getAttributes<typeof DATA_ATTRIBUTES.handle>(handle, DATA_ATTRIBUTES.handle),
    }),
  };

  const getInputInner = (wrapper: Locator) => getInput(wrapper, COMPONENT_PREFIX);

  const getSliderSingleModeHandle = (wrapper: Locator) => wrapper.locator('.rc-slider-handle');
  const getSliderMarks = (wrapper: Locator) => wrapper.locator('.rc-slider-mark');

  const getSliderRangeMinHandle = (wrapper: Locator) => wrapper.locator('.rc-slider-handle-1');
  const getSliderRangeMaxHandle = (wrapper: Locator) => wrapper.locator('.rc-slider-handle-2');

  const DRAG_OFFSET_X_15PX_OR_3_DIGITS_VALUE = 15;

  const getStory = (props?: Record<string, unknown>) => ({
    group: 'fields',
    name: 'field-slider',
    props: {
      'data-test-id': TEST_ID,
      ...(props || {}),
    },
  });

  runCommonTests(getStory, TEST_ID, {
    componentPrefix: COMPONENT_PREFIX,
    hasCounter: false,
    hasPlaceholder: false,
    hasPrefixIcon: false,
    hasPrefix: true,
    hasPostfix: true,
    hasClearButton: false,
    hasCopyButton: false,
    hasValidationStates: false,
    emptyValue: '10',
  });

  test('Should not accept letters', async ({ gotoStory, getByTestId, page }) => {
    await gotoStory(getStory({ value: 20 }));
    const wrapper = getByTestId(TEST_ID);
    const input = getInputInner(wrapper);

    await input.click();
    await page.keyboard.press('a');
    await page.keyboard.press('Enter');

    await expect(input).toHaveValue('20');
  });

  test('Should allow changing value by editing text input field. Slider handle will not be affected unless "Enter" is clicked or outside click happens. Should support changing value by dragging slider handle', async ({
    gotoStory,
    getByTestId,
    page,
    dragTo,
  }) => {
    await gotoStory(getStory({ value: 20, step: 1, moveByMarks: false }));
    const wrapper = getByTestId(TEST_ID);
    const input = getInputInner(wrapper);
    const sliderHandle = () => selectors.getSliderHandle(getSliderSingleModeHandle(wrapper));

    await expect(await sliderHandle().value).toEqual('20');

    await input.click();
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    await input.pressSequentially('40');

    await expect(await sliderHandle().value).toEqual('20');
    await expect(input).toHaveValue('40');
    await page.keyboard.press('Enter');
    await expect(await sliderHandle().value).toEqual('40');

    await input.click();
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    await input.pressSequentially('30');

    await expect(await sliderHandle().value).toEqual('40');
    await expect(input).toHaveValue('30');

    await getByTestId('field-decorator__hint').click(); // Click somewhere outside input field to trigger the onBlur event
    await expect(await sliderHandle().value).toEqual('30');

    await dragTo(sliderHandle().handle, {
      targetPosition: { x: DRAG_OFFSET_X_15PX_OR_3_DIGITS_VALUE, y: 0 },
    });

    await expect(input).toHaveValue('33');
    await expect(await sliderHandle().value).toEqual('33');
  });

  test('Should correct text input field value to closest valid value in case step does not equal 1. Should support only values separated by provided step when slider handle is dragged', async ({
    gotoStory,
    getByTestId,
    page,
    dragTo,
  }) => {
    await gotoStory(getStory({ value: 20, step: 5, moveByMarks: false }));
    const wrapper = getByTestId(TEST_ID);
    const input = getInputInner(wrapper);
    const sliderHandle = () => selectors.getSliderHandle(getSliderSingleModeHandle(wrapper));

    await expect(await sliderHandle().value).toEqual('20');

    await input.click();
    await page.keyboard.press('Backspace');
    await input.pressSequentially('4');

    await expect(await sliderHandle().value).toEqual('20');
    await expect(input).toHaveValue('24');
    await page.keyboard.press('Enter');
    await expect(input).toHaveValue('25');
    await expect(await sliderHandle().value).toEqual('25');

    await dragTo(sliderHandle().handle, {
      targetPosition: { x: DRAG_OFFSET_X_15PX_OR_3_DIGITS_VALUE, y: 0 },
    });

    await expect(input).toHaveValue('30');
    await expect(await sliderHandle().value).toEqual('30');
  });

  test('Should correct text input field value to lowest minimum in case entered value is lower than minimum. Should also correct text input field value to highest maximum in case entered value is higher than maximum. Should support min and max values only when is dragged over the slider track limits', async ({
    gotoStory,
    getByTestId,
    page,
    dragTo,
  }) => {
    await gotoStory(getStory({ value: 20, min: 10, max: 50, moveByMarks: false }));
    const wrapper = getByTestId(TEST_ID);
    const input = getInputInner(wrapper);
    const sliderHandle = () => selectors.getSliderHandle(getSliderSingleModeHandle(wrapper));

    await expect(await sliderHandle().value).toEqual('20');

    await input.click();
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    await input.pressSequentially('1');

    await expect(await sliderHandle().value).toEqual('20');
    await expect(input).toHaveValue('1');
    await page.keyboard.press('Enter');

    await expect(input).toHaveValue('10');
    await expect(await sliderHandle().value).toEqual('10');

    await input.click();
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    await input.pressSequentially('60');

    await expect(await sliderHandle().value).toEqual('10');
    await expect(input).toHaveValue('60');
    await page.keyboard.press('Enter');

    await expect(input).toHaveValue('50');
    await expect(await sliderHandle().value).toEqual('50');

    await dragTo(sliderHandle().handle, { targetPosition: { x: -500, y: 0 }, steps: 1 });
    await expect(input).toHaveValue('10');
    await expect(await sliderHandle().value).toEqual('10');

    await dragTo(sliderHandle().handle, { targetPosition: { x: 500, y: 0 }, steps: 1 });
    await expect(input).toHaveValue('50');
    await expect(await sliderHandle().value).toEqual('50');
  });

  test('Should automatically change value to closest mark if change value only by marks prop is enabled. Should support only marks when slider handle is dragged', async ({
    gotoStory,
    getByTestId,
    page,
    dragTo,
  }) => {
    await gotoStory(getStory({ value: 20, step: 1, moveByMarks: true }));
    const wrapper = getByTestId(TEST_ID);
    const input = getInputInner(wrapper);
    const sliderHandle = () => selectors.getSliderHandle(getSliderSingleModeHandle(wrapper));

    await expect(await sliderHandle().value).toEqual('20');

    await input.click();
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    await input.pressSequentially('28');
    await expect(await sliderHandle().value).toEqual('20');

    await expect(input).toHaveValue('28');
    await page.keyboard.press('Enter');
    await expect(input).toHaveValue('30');
    await expect(await sliderHandle().value).toEqual('30');

    await dragTo(sliderHandle().handle, { targetPosition: { x: 50, y: 0 } });
    await expect(input).toHaveValue('40');
    await expect(await sliderHandle().value).toEqual('40');
  });

  test('Should not display scale bar in case it is turned off. Should still allow changing value by text input or dragging slider handle', async ({
    gotoStory,
    getByTestId,
    page,
    dragTo,
  }) => {
    await gotoStory(getStory({ value: 20, step: 1, showScaleBar: false }));
    const wrapper = getByTestId(TEST_ID);
    const input = getInputInner(wrapper);
    const marks = getSliderMarks(wrapper);
    const sliderHandle = () => selectors.getSliderHandle(getSliderSingleModeHandle(wrapper));

    await expect(marks).not.toBeVisible();

    await expect(await sliderHandle().value).toEqual('20');

    await input.click();
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    await input.pressSequentially('21');
    await expect(await sliderHandle().value).toEqual('20');

    await expect(input).toHaveValue('21');
    await page.keyboard.press('Enter');
    await expect(input).toHaveValue('21');
    await expect(await sliderHandle().value).toEqual('21');

    await dragTo(sliderHandle().handle, { targetPosition: { x: 20, y: 0 } });
    await expect(input).toHaveValue('24');
    await expect(await sliderHandle().value).toEqual('24');

    await dragTo(sliderHandle().handle, { targetPosition: { x: -500, y: 0 }, steps: 1 });
    await expect(input).toHaveValue('10');
    await expect(await sliderHandle().value).toEqual('10');

    await dragTo(sliderHandle().handle, { targetPosition: { x: 500, y: 0 }, steps: 1 });
    await expect(input).toHaveValue('50');
    await expect(await sliderHandle().value).toEqual('50');
  });

  test('Should support non-linear marks', async ({ gotoStory, getByTestId, page, dragTo }) => {
    await gotoStory(getStory({ value: 10, storyMarks: 'non-linear' }));
    const wrapper = getByTestId(TEST_ID);
    const input = getInputInner(wrapper);
    const sliderHandle = () => selectors.getSliderHandle(getSliderSingleModeHandle(wrapper));

    await expect(input).toHaveValue('1gb');
    await expect(await sliderHandle().value).toEqual('10');

    await dragTo(sliderHandle().handle, { targetPosition: { x: 50, y: 0 } });
    await expect(input).toHaveValue('2gb');
    await expect(await sliderHandle().value).toEqual('20');

    await dragTo(sliderHandle().handle, { targetPosition: { x: 100, y: 0 } });
    await expect(input).toHaveValue('4gb');
    await expect(await sliderHandle().value).toEqual('30');

    await dragTo(sliderHandle().handle, { targetPosition: { x: 200, y: 0 } });
    await expect(input).toHaveValue('16gb');
    await expect(await sliderHandle().value).toEqual('50');

    await input.focus();
    await input.selectText();
    await page.keyboard.press('4');
    await page.keyboard.press('Enter');
    await expect(input).toHaveValue('4gb');
    await expect(await sliderHandle().value).toEqual('30');

    await input.focus();
    await input.selectText();
    await page.keyboard.press('7');
    await page.keyboard.press('Enter');
    await expect(input).toHaveValue('4gb');
    await expect(await sliderHandle().value).toEqual('30');
  });

  test('Should not allow changing value by editing text input field in range mode. Should support changing values only by dragging slider handles', async ({
    gotoStory,
    getByTestId,
    dragTo,
  }) => {
    await gotoStory(getStory({ value: [10, 30], step: 1, range: true, moveByMarks: false }));
    const wrapper = getByTestId(TEST_ID);
    const input = getInputInner(wrapper);
    const sliderMinHandle = () => selectors.getSliderHandle(getSliderRangeMinHandle(wrapper));
    const sliderMaxHandle = () => selectors.getSliderHandle(getSliderRangeMaxHandle(wrapper));

    await expect(await sliderMinHandle().value).toEqual('10');
    await expect(await sliderMaxHandle().value).toEqual('30');

    await expect(input).toHaveValue('10 – 30');
    await expect(input).toHaveAttribute('readonly', '');

    await dragTo(sliderMaxHandle().handle, {
      targetPosition: { x: DRAG_OFFSET_X_15PX_OR_3_DIGITS_VALUE, y: 0 },
    });

    await expect(await sliderMaxHandle().value).toEqual('33');
    await expect(input).toHaveValue('10 – 33');

    await dragTo(sliderMinHandle().handle, {
      targetPosition: { x: DRAG_OFFSET_X_15PX_OR_3_DIGITS_VALUE, y: 0 },
      steps: 20,
    });
    await expect(await sliderMinHandle().value).toEqual('13');
    await expect(input).toHaveValue('13 – 33');
  });
});
