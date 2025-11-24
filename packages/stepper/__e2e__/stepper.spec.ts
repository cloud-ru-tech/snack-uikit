import type { Page } from '@playwright/test';

import { expect, test } from '../../../playwright/fixtures';

const TEST_ID = 'stepper';
const TAIL_TEST_ID = `${TEST_ID}_element-tail`;
const STEP_TEST_ID = `${TEST_ID}_element-step`;
const NEXT_BUTTON = 'next';
const PREV_BUTTON = 'prev';
const IS_COMPLETED = 'is-completed';

const getTextView = async (page: Page) => {
  const elements = page.locator(`[data-test-id^="${TEST_ID}_element"]`);
  const count = await elements.count();
  const texts: string[] = [];

  for (let i = 0; i < count; i++) {
    const element = elements.nth(i);
    const testId = await element.getAttribute('data-test-id');
    switch (testId) {
      case TAIL_TEST_ID:
        if ((await element.getAttribute('data-completed')) === 'true') {
          texts.push('==');
        } else {
          texts.push('--');
        }
        break;
      case STEP_TEST_ID: {
        const state = await element.getAttribute('data-state');
        const textContent = await element.textContent();
        const text = (textContent || '').split('\n').slice(0, 3).join(' ');
        const view: Record<string, string> = {
          completed: `(V${text})`,
          rejected: `(X${text})`,
          current: `((${text}))`,
          loading: `(O${text})`,
          waiting: `(${text})`,
        };

        const textView = state ? view[state] || '!!!' : '!!!';
        texts.push(textView);
        break;
      }
      default:
        break;
    }
  }

  return texts.join('');
};

test.describe('Stepper', () => {
  test('Should be rendered', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'stepper',
      props: {
        'data-test-id': TEST_ID,
        validationTimeout: 0,
      },
    });

    const mainElementSelector = getByTestId(TEST_ID);
    await expect(mainElementSelector).toBeVisible();

    const textView = await getTextView(page);
    expect(textView).toEqual('((1))--(2)--(3)--(4)--(5)');
  });

  test('Should go to the next step and go back', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'stepper',
      props: {
        'data-test-id': TEST_ID,
        validationTimeout: 0,
      },
    });

    const mainElementSelector = getByTestId(TEST_ID);
    await expect(mainElementSelector).toBeVisible();

    await getByTestId(NEXT_BUTTON).click();
    const textView1 = await getTextView(page);
    expect(textView1).toEqual('(V)==((2))--(3)--(4)--(5)');

    await getByTestId(PREV_BUTTON).click();
    const textView2 = await getTextView(page);
    expect(textView2).toEqual('((1))--(2)--(3)--(4)--(5)');
  });

  test('Should show spinner while waiting validation promise', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'stepper',
      props: {
        'data-test-id': TEST_ID,
        validationTimeout: 9999999999,
      },
    });

    const mainElementSelector = getByTestId(TEST_ID);
    await expect(mainElementSelector).toBeVisible();

    await getByTestId(NEXT_BUTTON).click();
    const textView1 = await getTextView(page);
    expect(textView1).toEqual('(O)--(2)--(3)--(4)--(5)');
  });

  test('Should call complete callback if all steps are done', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'stepper',
      props: {
        'data-test-id': TEST_ID,
        validationTimeout: 0,
      },
    });

    const mainElementSelector = getByTestId(TEST_ID);
    await expect(mainElementSelector).toBeVisible();

    const isCompletedBefore = await getByTestId(IS_COMPLETED).textContent();
    expect(isCompletedBefore).toEqual('isCompleted: no');

    await getByTestId(NEXT_BUTTON).click();
    await getByTestId(NEXT_BUTTON).click();
    await getByTestId(NEXT_BUTTON).click();
    await getByTestId(NEXT_BUTTON).click();
    await getByTestId(NEXT_BUTTON).click();

    const textView1 = await getTextView(page);
    expect(textView1).toEqual('(V)==(V)==(V)==(V)==(V)');

    const isCompletedAfter = await getByTestId(IS_COMPLETED).textContent();
    expect(isCompletedAfter).toEqual('isCompleted: yes');
  });

  test('Go next by clicking next step', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'stepper',
      props: {
        'data-test-id': TEST_ID,
        validationTimeout: 0,
        defaultCurrentStepIndex: 1,
      },
    });

    const mainElementSelector = getByTestId(TEST_ID);
    await expect(mainElementSelector).toBeVisible();

    const textView1 = await getTextView(page);
    expect(textView1).toEqual('(V)==((2))--(3)--(4)--(5)');
    await getByTestId(STEP_TEST_ID).nth(2).click();
    const textView2 = await getTextView(page);
    expect(textView2).toEqual('(V)==(V)==((3))--(4)--(5)');
  });

  test('Going next by clicking should fail if step invalid', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'stepper',
      props: {
        'data-test-id': TEST_ID,
        validationTimeout: 0,
        defaultCurrentStepIndex: 1,
        isValid: false,
      },
    });

    const mainElementSelector = getByTestId(TEST_ID);
    await expect(mainElementSelector).toBeVisible();

    const textView1 = await getTextView(page);
    expect(textView1).toEqual('(V)==((2))--(3)--(4)--(5)');
    await getByTestId(STEP_TEST_ID).nth(2).click();
    const textView2 = await getTextView(page);
    expect(textView2).toEqual('(V)==(X)--(3)--(4)--(5)');
  });

  test('Go back by clicking completed step', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'stepper',
      props: {
        'data-test-id': TEST_ID,
        validationTimeout: 0,
        defaultCurrentStepIndex: 3,
      },
    });

    const mainElementSelector = getByTestId(TEST_ID);
    await expect(mainElementSelector).toBeVisible();

    const textView1 = await getTextView(page);
    expect(textView1).toEqual('(V)==(V)==(V)==((4))--(5)');
    await getByTestId(STEP_TEST_ID).nth(1).click();
    const textView2 = await getTextView(page);
    expect(textView2).toEqual('(V)==((2))--(3)--(4)--(5)');
  });
});
