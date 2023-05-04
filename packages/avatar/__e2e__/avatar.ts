import { fixture, Selector, test } from 'testcafe';

import { AvatarProps } from '@snack-ui/avatar';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { Size } from '../src/components/constants';

const TEST_ID = 'avatar';
const ABBREVIATION_TEST_ID = 'abbreviation';
const IMAGE_TEST_ID = 'image';
const INDICATOR_TEST_ID = 'indicator';

const nameAndSurname = 'John Smith';
const nameAndSurnameAbbr = 'JS';
const nameOnly = 'John';
const nameOnlyAbbr = 'JO';

const getPage = (props: Partial<AvatarProps> & { showImage?: boolean; customSrc?: string } = {}) =>
  getTestcafeUrl({
    name: 'avatar',
    props: {
      'data-test-id': TEST_ID,
      ...props,
    },
  });

fixture('Avatar');

test.page(getPage())('should render', async t => {
  const avatar = Selector(dataTestIdSelector(TEST_ID));

  await t.expect(avatar.exists).ok();
  await t.expect(avatar.find(dataTestIdSelector(ABBREVIATION_TEST_ID)).exists).ok();
  await t.expect(avatar.find(dataTestIdSelector(IMAGE_TEST_ID)).exists).notOk();
  await t.expect(avatar.find(dataTestIdSelector(INDICATOR_TEST_ID)).exists).notOk();
});

test.page(getPage({ indicator: 'red' as AvatarProps['indicator'] }))('should render with indicator', async t => {
  const avatar = Selector(dataTestIdSelector(TEST_ID));
  const indicator = avatar.find(dataTestIdSelector(INDICATOR_TEST_ID));

  await t.expect(indicator.exists).ok();
});

test.page(getPage({ showImage: true }))('should render with image', async t => {
  const avatar = Selector(dataTestIdSelector(TEST_ID));
  const image = avatar.find(dataTestIdSelector(IMAGE_TEST_ID));
  const abbreviation = avatar.find(dataTestIdSelector(ABBREVIATION_TEST_ID));

  await t.expect(image.exists).ok();
  await t.expect(abbreviation.exists).notOk();
});

test.page(getPage({ showImage: true, customSrc: 'x' }))(
  'should fallback to abbreviation when the link is broken',
  async t => {
    const avatar = Selector(dataTestIdSelector(TEST_ID));
    const image = avatar.find(dataTestIdSelector(IMAGE_TEST_ID));
    const abbreviation = avatar.find(dataTestIdSelector(ABBREVIATION_TEST_ID));

    await t.expect(image.exists).notOk();
    await t.expect(abbreviation.exists).ok();
  },
);

test.page(getPage({ showTwoSymbols: false }))('should render with 1 symbol', async t => {
  const avatar = Selector(dataTestIdSelector(TEST_ID));
  const abbreviation = await avatar.find(dataTestIdSelector(ABBREVIATION_TEST_ID)).textContent;

  await t.expect(abbreviation.length).eql(1);
});

test.page(getPage({ showTwoSymbols: true }))('should render with 2 symbols', async t => {
  const avatar = Selector(dataTestIdSelector(TEST_ID));
  const abbreviation = await avatar.find(dataTestIdSelector(ABBREVIATION_TEST_ID)).textContent;

  await t.expect(abbreviation.length).eql(2);
});

test.page(getPage({ size: Size.Xxs, showTwoSymbols: true }))(
  'should always render with 1 symbol for size = xxs',
  async t => {
    const avatar = Selector(dataTestIdSelector(TEST_ID));
    const abbreviation = await avatar.find(dataTestIdSelector(ABBREVIATION_TEST_ID)).textContent;

    await t.expect(abbreviation.length).eql(1);
  },
);

test.page(getPage({ name: nameOnly, showTwoSymbols: true }))('should select first 2 symbols for name only', async t => {
  const avatar = Selector(dataTestIdSelector(TEST_ID));
  const abbreviation = avatar.find(dataTestIdSelector(ABBREVIATION_TEST_ID));

  await t.expect(abbreviation.textContent).eql(nameOnlyAbbr);
});

test.page(getPage({ name: nameAndSurname, showTwoSymbols: true }))(
  'should select 1st symbol of name and 1st symbol of surname when available',
  async t => {
    const avatar = Selector(dataTestIdSelector(TEST_ID));
    const abbreviation = avatar.find(dataTestIdSelector(ABBREVIATION_TEST_ID));

    await t.expect(abbreviation.textContent).eql(nameAndSurnameAbbr);
  },
);
