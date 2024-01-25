import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { TEST_IDS } from '../src/constants';

const BASE_TEST_ID = 'block-test';

const getPage = (props: object = {}) =>
  getTestcafeUrl({
    name: 'info-block',
    props: {
      'data-test-id': BASE_TEST_ID,
      ...props,
    },
  });

fixture('InfoBlock');

function getSelectors() {
  return {
    infoBlock: Selector(dataTestIdSelector(BASE_TEST_ID)),
    title: Selector(dataTestIdSelector(TEST_IDS.title)),
    icon: Selector(dataTestIdSelector(TEST_IDS.icon)),
    description: Selector(dataTestIdSelector(TEST_IDS.description)),
    footer: Selector(dataTestIdSelector(TEST_IDS.footer)),
    primaryButton: Selector(dataTestIdSelector(TEST_IDS.primaryButton)),
    secondaryButton: Selector(dataTestIdSelector(TEST_IDS.secondaryButton)),
  };
}

const MOCK_DATA = {
  title: 'Test Title',
  description: 'Test Description',
  footer: 'Custom footer',
};

test.page(
  getPage({
    title: MOCK_DATA.title,
    description: MOCK_DATA.description,
  }),
)('Should render correctly', async t => {
  const { infoBlock, title, description, footer, icon, primaryButton, secondaryButton } = getSelectors();

  await t.expect(infoBlock.exists).ok('InfoBlock should be rendered');

  await t.expect(title.exists).ok('Title should be rendered');
  await t.expect(title.innerText).eql(MOCK_DATA.title, `Title should be ${MOCK_DATA.title}`);

  await t.expect(description.exists).ok('Description should be rendered');
  await t.expect(description.innerText).eql(MOCK_DATA.description, `Description should be ${MOCK_DATA.description}`);

  await t.expect(icon.exists).ok('Icon should be rendered');

  await t.expect(footer.exists).ok('Footer should be rendered');

  await t.expect(primaryButton.exists).ok('Footer primary button should be rendered');
  await t.expect(secondaryButton.exists).ok('Footer secondary button should be rendered');
});

test.page(
  getPage({
    showIcon: false,
    footerVariant: 'none',
    title: '!undefined',
    description: MOCK_DATA.description,
  }),
)('Should render only with description', async t => {
  const { title, description, footer, icon, primaryButton, secondaryButton } = getSelectors();

  await t.expect(title.exists).notOk('Title should not be rendered');

  await t.expect(description.exists).ok('Description should be rendered');
  await t.expect(description.innerText).eql(MOCK_DATA.description, `Description should be ${MOCK_DATA.description}`);

  await t.expect(icon.exists).notOk('Icon should not be rendered');

  await t.expect(footer.exists).notOk('Footer should not be rendered');

  await t.expect(primaryButton.exists).notOk('Footer primary button should not be rendered');
  await t.expect(secondaryButton.exists).notOk('Footer secondary button should not be rendered');
});

test.page(
  getPage({
    footerVariant: 'custom',
    footer: MOCK_DATA.footer,
  }),
)('Should render with custom footer content', async t => {
  const { footer } = getSelectors();

  await t.expect(footer.exists).ok('Footer should be rendered');
  await t.expect(footer.innerText).eql(MOCK_DATA.footer, `Footer should be ${MOCK_DATA.footer}`);
});
