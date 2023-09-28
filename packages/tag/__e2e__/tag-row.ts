import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { TAG_ROW_TEST_IDS } from '../src/components/TagRow/constants';

const TEST_ID = 'tag-row-test';
const CLOSE_BUTTON_DATA_TEST_ID = 'tag-remove-button';

type StoryProps = {
  removableMode?: boolean;
  fullWidthMode?: boolean;
  demoTagsAmount?: number;
  moreButtonLabel?: string;
  rowLimit?: number;
};

function getPage(props: Record<string, unknown> & StoryProps) {
  return getTestcafeUrl({
    name: 'tag-row',
    story: 'tag-row',
    group: 'tag',
    props: {
      'data-test-id': TEST_ID,
      ...props,
    },
  });
}

fixture('TagRow');

const getComponent = () => Selector(dataTestIdSelector(TEST_ID));

const getVisibleTagsWrapper = () => getComponent().find(dataTestIdSelector(TAG_ROW_TEST_IDS.visibleTagsWrapper));
const getAmountOfVisibleTags = () => getVisibleTagsWrapper().find('div').count;
const getFirstVisibleTag = () => getVisibleTagsWrapper().child(0);
const getFirstVisibleTagText = () => getFirstVisibleTag().child().child().textContent;

const getTagCloudWrapper = () => Selector(dataTestIdSelector(TAG_ROW_TEST_IDS.droplistTagsWrapper));
const getAmountOfCloudTags = () => getTagCloudWrapper().find('div').count;
const getFirstCloudTag = () => getTagCloudWrapper().child(0);
const getFirstCloudTagText = () => getFirstCloudTag().child().child().textContent;

const getMoreTagsButton = () => getVisibleTagsWrapper().find(dataTestIdSelector(TAG_ROW_TEST_IDS.moreButton));

const getTagDeleteButton = (selector: Selector) => selector.find(dataTestIdSelector(CLOSE_BUTTON_DATA_TEST_ID));

test.page(getPage({ rowLimit: undefined, demoTagsAmount: 50 }))(
  'Should render all 50 preconfigured demo tags in case no limit is specified',
  async t => {
    const component = getComponent();

    await t.expect(component.exists).ok();
    await t.expect(getVisibleTagsWrapper().exists).notOk();
    await t.expect(component.childNodeCount).eql(50);

    await t.expect(Selector(dataTestIdSelector(TAG_ROW_TEST_IDS.moreButton)).exists).notOk();
  },
);

test.page(getPage({ rowLimit: 0, demoTagsAmount: 20 }))(
  'Should render all specified 20 demo tags in case row limit is set to 0',
  async t => {
    const component = getComponent();

    await t.expect(component.exists).ok();
    await t.expect(getVisibleTagsWrapper().exists).notOk();
    await t.expect(component.childNodeCount).eql(20);

    await t.expect(Selector(dataTestIdSelector(TAG_ROW_TEST_IDS.moreButton)).exists).notOk();
  },
);

test.page(getPage({ rowLimit: 1, demoTagsAmount: 50 }))(
  'Should render a single row of tags with more button if the row limit is set to 1. All remaining tags should be available in a droplist once the more button is hovered',
  async t => {
    await t.expect(getComponent().exists).ok();
    await t.expect(getVisibleTagsWrapper().exists).ok();
    await t.expect(getAmountOfVisibleTags()).eql(5);

    await t.expect(getMoreTagsButton().exists).ok();

    await t.expect(getTagCloudWrapper().exists).notOk();
    await t.expect(getMoreTagsButton().textContent).eql('More: 45');

    await t.hover(getMoreTagsButton());

    await t.expect(getTagCloudWrapper().exists).ok();
    await t.expect(getAmountOfCloudTags()).eql(45);
  },
);

test.page(getPage({ rowLimit: 3, demoTagsAmount: 50 }))(
  'Should render 3 rows of tags with more button if the row limit is set to 3. All remaining tags should be available in a droplist once the more button is hovered',
  async t => {
    await t.expect(getComponent().exists).ok();
    await t.expect(getVisibleTagsWrapper().exists).ok();
    await t.expect(getAmountOfVisibleTags()).eql(18);

    await t.expect(getMoreTagsButton().exists).ok();

    await t.expect(getTagCloudWrapper().exists).notOk();
    await t.expect(getMoreTagsButton().textContent).eql('More: 32');

    await t.hover(getMoreTagsButton());

    await t.expect(getTagCloudWrapper().exists).ok();
    await t.expect(getAmountOfCloudTags()).eql(32);
  },
);

test.page(getPage({ moreButtonLabel: 'test' }))('Should support changing button text', async t => {
  await t.expect(getMoreTagsButton().exists).ok();
  await t.expect(getMoreTagsButton().textContent).eql('test38');
});

test.page(getPage({ removableMode: true, demoTagsAmount: 50 }))('Should support deleting tags', async t => {
  await t.expect(getAmountOfVisibleTags()).eql(9);
  await t.expect(getMoreTagsButton().textContent).eql(`More: 41`);

  await t.hover(getMoreTagsButton());
  await t.expect(getAmountOfCloudTags()).eql(41);

  await t.expect(getFirstVisibleTagText()).eql('tag1x');

  await t.click(getTagDeleteButton(getFirstVisibleTag()));
  await t.expect(getFirstVisibleTagText()).eql('tag2xx');
  await t.expect(getAmountOfVisibleTags()).eql(9);
  await t.expect(getMoreTagsButton().textContent).eql('More: 40');

  await t.hover(getMoreTagsButton());
  await t.expect(getAmountOfCloudTags()).eql(40);
  await t.expect(getFirstCloudTagText()).eql('tag11x');

  await t.click(getTagDeleteButton(getFirstCloudTag()));
  await t.expect(getAmountOfVisibleTags()).eql(9);
  await t.expect(getMoreTagsButton().textContent).eql(`More: 39`);

  await t.hover(getMoreTagsButton());
  await t.expect(getAmountOfCloudTags()).eql(39);
  await t.expect(getFirstCloudTagText()).eql('tag12xx');
});
