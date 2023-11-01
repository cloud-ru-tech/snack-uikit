import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { TEST_IDS } from '../src/testIds';

const getPageUrlCollapseBlockPrimary = (props: Record<string, unknown> = {}) =>
  getTestcafeUrl({
    name: 'collapseblockprimary',
    story: 'collapse-block-primary',
    props: {
      'data-test-id': TEST_IDS.collapseBlock,
      ...props,
    },
    group: 'accordion',
  });

const getPageUrlCollapseBlockSecondary = (props: Record<string, unknown> = {}) =>
  getTestcafeUrl({
    name: 'collapseblocksecondary',
    story: 'collapse-block-secondary',
    props: {
      'data-test-id': TEST_IDS.collapseBlock,
      ...props,
    },
    group: 'accordion',
  });

fixture('Accordion Collapse Block');

function getSelectors() {
  return {
    title: Selector(dataTestIdSelector(TEST_IDS.title)),
    description: Selector(dataTestIdSelector(TEST_IDS.description)),
    tooltip: Selector(dataTestIdSelector(TEST_IDS.tooltip)),
    content: Selector(dataTestIdSelector(TEST_IDS.content)),
    collapseBlock: Selector(dataTestIdSelector(TEST_IDS.collapseBlock)),
    chevron: Selector(dataTestIdSelector(TEST_IDS.chevron)),
    header: Selector(dataTestIdSelector(TEST_IDS.header)),
    actions: Selector(dataTestIdSelector(TEST_IDS.actions)),
  };
}

const MOCK_DATA = {
  title: 'Title',
  description: 'Description',
};

[getPageUrlCollapseBlockPrimary, getPageUrlCollapseBlockSecondary].map(getPageUrl => {
  test.page(
    getPageUrl({ title: MOCK_DATA.title, description: MOCK_DATA.description, showTip: true, showActions: true }),
  )(`Render all`, async t => {
    const { title, description, chevron, tooltip, actions } = getSelectors();

    await t.expect(title.innerText).eql(MOCK_DATA.title);
    await t.expect(description.innerText).eql(MOCK_DATA.description);
    await t.expect(chevron.exists).ok();
    await t.expect(tooltip.exists).ok();
    await t.expect(actions.exists).ok();
  });

  test.page(getPageUrl({ title: MOCK_DATA.title, description: undefined, showTip: false, showActions: false }))(
    `Render only title with content`,
    async t => {
      const { title, description, chevron, tooltip, actions } = getSelectors();

      await t.expect(title.innerText).eql(MOCK_DATA.title);
      await t.expect(description.exists).notOk();
      await t.expect(chevron.exists).ok();
      await t.expect(tooltip.exists).notOk();
      await t.expect(actions.exists).notOk();
    },
  );

  test.page(getPageUrl({ title: MOCK_DATA.title, description: MOCK_DATA.description, expanded: false }))(
    `Controlled hidden content by click chevron`,
    async t => {
      const { chevron, content, collapseBlock } = getSelectors();

      await t.expect(collapseBlock.getAttribute('aria-expanded')).eql('false');
      await t.expect(content.getAttribute('aria-hidden')).eql('true');

      await t.click(chevron);

      await t.expect(collapseBlock.getAttribute('aria-expanded')).eql('true');
      await t.expect(content.getAttribute('aria-hidden')).eql('false');

      await t.click(chevron);

      await t.expect(collapseBlock.getAttribute('aria-expanded')).eql('false');
      await t.expect(content.getAttribute('aria-hidden')).eql('true');
    },
  );

  test.page(getPageUrl({ title: MOCK_DATA.title, description: MOCK_DATA.description, expanded: false }))(
    `Controlled hidden content by click header`,
    async t => {
      const { header, content, collapseBlock } = getSelectors();

      await t.expect(collapseBlock.getAttribute('aria-expanded')).eql('false', 'fuck 1');
      await t.expect(content.getAttribute('aria-hidden')).eql('true', 'fuck 2');

      await t.click(header);

      await t.expect(collapseBlock.getAttribute('aria-expanded')).eql('true');
      await t.expect(content.getAttribute('aria-hidden')).eql('false');

      await t.click(header);

      await t.expect(collapseBlock.getAttribute('aria-expanded')).eql('false');
      await t.expect(content.getAttribute('aria-hidden')).eql('true');
    },
  );
});
