import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { TEST_IDS } from '../src/constants';
import { STORY_TEST_IDS } from '../stories/testIds';

const getPage = (props: object = {}) =>
  getTestcafeUrl({
    name: 'card',
    props: {
      'data-test-id': STORY_TEST_IDS.main,
      ...props,
    },
  });

fixture('Card');

function getSelectors() {
  return {
    card: Selector(dataTestIdSelector(STORY_TEST_IDS.main)),
    check: Selector(dataTestIdSelector(TEST_IDS.check)),
    functionBadge: Selector(dataTestIdSelector(TEST_IDS.functionBadge)),
    promoBadge: Selector(dataTestIdSelector(TEST_IDS.promoBadge)),
    title: Selector(dataTestIdSelector(TEST_IDS.title)),
    metadata: Selector(dataTestIdSelector(TEST_IDS.metadata)),
    description: Selector(dataTestIdSelector(TEST_IDS.description)),
    toast: Selector(dataTestIdSelector(STORY_TEST_IDS.toaster)),
    droplist: Selector(dataTestIdSelector(TEST_IDS.droplist)),
    option: Selector(dataTestIdSelector(TEST_IDS.option)),
  };
}

const MOCK_DATA = {
  title: 'Title',
  titleLong: 'Title Title Title Title Title Title Title Title Title Title Title',
  description: 'Description',
  descriptionLong: 'Description Description Description Description Description Description Description',
  metadata: 'Metadata',
  metadataLong: 'Metadata Metadata Metadata Metadata Metadata Metadata Metadata Metadata Metadata Metadata',
  promoBadge: 'PromoBadge',
};

test.page(
  getPage({
    title: MOCK_DATA.title,
    metadata: MOCK_DATA.metadata,
    description: MOCK_DATA.description,
    promoBadge: MOCK_DATA.promoBadge,
  }),
)(`Should rendered correctly`, async t => {
  const { card, title, metadata, description, promoBadge, functionBadge } = getSelectors();

  await t.expect(card.exists).ok('Card should be rendered');

  await t.expect(title.exists).ok('Card.Header title should be rendered');
  await t.expect(title.innerText).eql(MOCK_DATA.title, `Card.Header title should be ${MOCK_DATA.title}`);

  await t.expect(description.exists).ok('Card.Header description should be rendered');
  await t
    .expect(description.innerText)
    .eql(MOCK_DATA.description, `Card.Header description should be ${MOCK_DATA.description}`);

  await t.expect(metadata.exists).ok('Card.Header metadata should be rendered');
  await t.expect(metadata.innerText).eql(MOCK_DATA.metadata, `Card.Header metadata should be ${MOCK_DATA.metadata}`);

  await t.expect(promoBadge.exists).ok('Card promoBadge should be rendered');
  await t
    .expect(promoBadge.innerText)
    .eql(MOCK_DATA.promoBadge, `Card.Header promoBadge should be ${MOCK_DATA.promoBadge}`);

  await t.expect(functionBadge.visible).notOk(`Card functionBadge shouldn't be rendered`);
});

test.page(
  getPage({
    title: MOCK_DATA.title,
    metadata: MOCK_DATA.metadata,
    description: MOCK_DATA.description,
  }),
)(`Should show/hide/hover Card.FunctionBadge`, async t => {
  const { card, functionBadge } = getSelectors();

  await t.expect(functionBadge.visible).notOk(`Card.FunctionBadge shouldn't be rendered`);

  await t.hover(card).wait(100).expect(functionBadge.visible).ok(`Card.FunctionBadge should be rendered`);

  await t.pressKey('tab');
  await t.expect(functionBadge.visible).ok(`Card.FunctionBadge should be rendered`);

  await t.pressKey('tab');
  await t.expect(functionBadge.focused).ok(`Card.FunctionBadge should be focused`);
});

test.page(
  getPage({
    title: MOCK_DATA.title,
    metadata: MOCK_DATA.metadata,
    description: MOCK_DATA.description,
  }),
)(`Card.FunctionBadge should be controlled by keyboard`, async t => {
  const { card, functionBadge, droplist, toast } = getSelectors();

  await t.hover(card);
  await t.pressKey('tab').pressKey('tab');
  await t.expect(functionBadge.focused).ok(`Card.FunctionBadge should be focused`);

  await t.pressKey('enter').expect(droplist.exists).ok(`Droplist options should be rendered`);

  await t.pressKey('down').expect(functionBadge.focused).notOk(`Card.FunctionBadge should't be focused`);

  await t.pressKey('up');
  await t.expect(functionBadge.focused).ok(`Card.FunctionBadge should be focused`);
  await t.expect(droplist.exists).notOk(`Droplist options shouldn't be rendered`);

  await t
    .pressKey('down')
    .pressKey('down')
    .pressKey('enter')
    .expect(toast.exists)
    .ok('Toast should be render after option click');
});

test.page(
  getPage({
    title: MOCK_DATA.title,
    metadata: MOCK_DATA.metadata,
    description: MOCK_DATA.description,
    multipleSelection: true,
  }),
)(`Card.Check should appear when card is checked in multipleSelection mode`, async t => {
  const { check, card } = getSelectors();

  await t.expect(check.exists).notOk(`Card.Check shouldn't render`);

  await t.click(card).expect(check.exists).ok(`Card.Check should render after click`);

  await t.click(card).expect(check.exists).notOk(`Card.Check shouldn't render after second click`);
});

test.page(
  getPage({
    title: MOCK_DATA.title,
    metadata: MOCK_DATA.metadata,
    description: MOCK_DATA.description,
    multipleSelection: false,
  }),
)(`Card.Check should not appear when card is checked without multipleSelection mode`, async t => {
  const { check, card } = getSelectors();

  await t.expect(check.exists).notOk(`Card.Check shouldn't render`);

  await t.click(card).expect(check.exists).notOk(`Card.Check shouldn't render after card is checked`);

  await t.click(card).expect(check.exists).notOk(`Card.Check shouldn't render after card is unchecked`);
});
