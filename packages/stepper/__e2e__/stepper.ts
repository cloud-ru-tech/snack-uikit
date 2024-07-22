import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

const TEST_ID = 'stepper';
const TAIL_TEST_ID = `${TEST_ID}_element-tail`;
const STEP_TEST_ID = `${TEST_ID}_element-step`;
const NEXT_BUTTON = 'next';
const PREV_BUTTON = 'prev';
const IS_COMPLETED = 'is-completed';

const getTextView = async () => {
  const elements = await Selector(`[data-test-id^="${TEST_ID}_element"]`);
  const count = await elements.count;
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
      case STEP_TEST_ID:
        const state = await element.getAttribute('data-state');
        const text = (await element.innerText).split('\n').slice(0, 3).join(' ');
        const view: Record<string, string> = {
          completed: `(V${text})`,
          rejected: `(X${text})`,
          current: `((${text}))`,
          loading: `(O${text})`,
          waiting: `(${text})`,
        };

        const textView = state ? view[state] || '!!!' : '!!!';
        texts.push(textView);
      default:
        break;
    }
  }

  return texts.join('');
};

const getPage = (props: object = {}) =>
  getTestcafeUrl({
    name: 'stepper',
    props: {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      validationTimeout: props.validationTimeout || 0,
      'data-test-id': TEST_ID,
      ...props,
    },
  });

fixture('Stepper');

test.page(getPage())('Should be rendered', async t => {
  const textView = await getTextView();
  await t.expect(textView).eql('((1))--(2)--(3)--(4)--(5)');
});

test.page(getPage())('Should go to the next step and go back', async t => {
  await t.click(Selector(dataTestIdSelector(NEXT_BUTTON)));
  const textView1 = await getTextView();
  await t.expect(textView1).eql('(V)==((2))--(3)--(4)--(5)');

  await t.click(Selector(dataTestIdSelector(PREV_BUTTON)));
  const textView2 = await getTextView();
  await t.expect(textView2).eql('((1))--(2)--(3)--(4)--(5)');
});

test.page(getPage({ validationTimeout: 9999999999 }))(
  'Should show spinner while waiting validation promise',
  async t => {
    await t.click(Selector(dataTestIdSelector(NEXT_BUTTON)));
    const textView1 = await getTextView();
    await t.expect(textView1).eql('(O)--(2)--(3)--(4)--(5)');
  },
);

test.page(getPage())('Should call complete callback if all steps are done', async t => {
  const isCompletedBefore = await Selector(dataTestIdSelector(IS_COMPLETED)).innerText;
  await t.expect(isCompletedBefore).eql('isCompleted: no');

  await t.click(Selector(dataTestIdSelector(NEXT_BUTTON)));
  await t.click(Selector(dataTestIdSelector(NEXT_BUTTON)));
  await t.click(Selector(dataTestIdSelector(NEXT_BUTTON)));
  await t.click(Selector(dataTestIdSelector(NEXT_BUTTON)));
  await t.click(Selector(dataTestIdSelector(NEXT_BUTTON)));

  const textView1 = await getTextView();
  await t.expect(textView1).eql('(V)==(V)==(V)==(V)==(V)');

  const isCompletedAfter = await Selector(dataTestIdSelector(IS_COMPLETED)).innerText;
  await t.expect(isCompletedAfter).eql('isCompleted: yes');
});

test.page(getPage({ defaultCurrentStepIndex: 1 }))('Go next by clicking next step', async t => {
  const textView1 = await getTextView();
  await t.expect(textView1).eql('(V)==((2))--(3)--(4)--(5)');
  await t.click(Selector(`${dataTestIdSelector(STEP_TEST_ID)}`).nth(2));
  const textView2 = await getTextView();
  await t.expect(textView2).eql('(V)==(V)==((3))--(4)--(5)');
});

test.page(getPage({ defaultCurrentStepIndex: 1, isValid: false }))(
  'Going next by clicking should fail if step invalid',
  async t => {
    const textView1 = await getTextView();
    await t.expect(textView1).eql('(V)==((2))--(3)--(4)--(5)');
    await t.click(Selector(`${dataTestIdSelector(STEP_TEST_ID)}`).nth(2));
    const textView2 = await getTextView();
    await t.expect(textView2).eql('(V)==(X)--(3)--(4)--(5)');
  },
);

test.page(getPage({ defaultCurrentStepIndex: 3 }))('Go back by clicking completed step', async t => {
  const textView1 = await getTextView();
  await t.expect(textView1).eql('(V)==(V)==(V)==((4))--(5)');
  await t.click(Selector(`${dataTestIdSelector(STEP_TEST_ID)}`).nth(1));
  const textView2 = await getTextView();
  await t.expect(textView2).eql('(V)==((2))--(3)--(4)--(5)');
});
