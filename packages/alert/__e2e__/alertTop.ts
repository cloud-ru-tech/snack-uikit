import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

const TEST_IDS = {
  alertTop: 'alert-top',
  closeButton: 'alert-top__close-button',
  title: 'alert-top__title',
  description: 'alert-top__description',
  link: 'alert-top__link',
  icon: 'alert-top__icon',
};

const getPageUrl = (props: Record<string, unknown> = {}) =>
  getTestcafeUrl({
    name: 'alerttop',
    story: 'alert-top',
    props: {
      'data-test-id': TEST_IDS.alertTop,
      ...props,
    },
    group: 'alert',
  });

fixture('AlertTop');

test.page(getPageUrl())('Rendered', async t => {
  const alertTop = Selector(dataTestIdSelector(TEST_IDS.alertTop));

  await t.expect(alertTop.exists).ok();
});

test.page(getPageUrl({ onClose: undefined }))(`Close button hidden`, async t => {
  await t.expect(Selector(dataTestIdSelector(TEST_IDS.closeButton)).exists).notOk();
});

test.page(getPageUrl({ onCLose: () => {} }))(`Close button visible`, async t => {
  await t.expect(Selector(dataTestIdSelector(TEST_IDS.closeButton)).exists).ok();
});

test.page(getPageUrl({ title: 'Title' }))(`Title = 'Title'`, async t => {
  await t.expect(Selector(dataTestIdSelector(TEST_IDS.title)).exists).ok();
});

test.page(getPageUrl({ title: '' }))(`Title = ''`, async t => {
  await t.expect(Selector(dataTestIdSelector(TEST_IDS.title)).exists).notOk();
});

test.page(getPageUrl({ description: 'Description' }))(`Description = 'Description'`, async t => {
  const description = Selector(dataTestIdSelector(TEST_IDS.description));

  await t.expect(description.exists).ok();
  await t.expect(description.innerText).eql('Description');
});

test.page(getPageUrl({ description: '' }))(`Description = ''`, async t => {
  const description = Selector(dataTestIdSelector(TEST_IDS.description));

  await t.expect(description.exists).ok();
});

test.page(getPageUrl({ link: 'Link Text' }))(`Link is displayed with correct text and href`, async t => {
  const link = Selector(dataTestIdSelector(TEST_IDS.link));

  await t.expect(link.exists).ok();
  await t.expect(link.innerText).eql('Link Text');
});

test.page(getPageUrl({ link: '' }))(`Link is not displayed when link prop is empty`, async t => {
  const link = Selector(dataTestIdSelector(TEST_IDS.link));

  await t.expect(link.exists).notOk();
});

test.page(getPageUrl({ icon: true }))(`Icon is displayed when icon prop is true`, async t => {
  const icon = Selector(dataTestIdSelector(TEST_IDS.icon));

  await t.expect(icon.exists).ok();
});

test.page(getPageUrl({ icon: false }))(`Icon is not displayed when icon prop is false`, async t => {
  const icon = Selector(dataTestIdSelector(TEST_IDS.icon));

  await t.expect(icon.exists).notOk();
});
