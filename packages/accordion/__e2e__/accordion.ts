import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { STORY_TEST_IDS } from '../stories/constants';

const getPageUrlAccordionPrimary = (props: Record<string, unknown> = {}) =>
  getTestcafeUrl({
    name: 'accordionprimary',
    story: 'accordion-primary',
    props: {
      ...props,
    },
    group: 'accordion',
  });

const getPageUrlAccordionSecondary = (props: Record<string, unknown> = {}) =>
  getTestcafeUrl({
    name: 'accordionsecondary',
    story: 'accordion-secondary',
    props: {
      ...props,
    },
    group: 'accordion',
  });

fixture('Accordion');

function getSelectors() {
  return {
    collapseBlockFirst: Selector(dataTestIdSelector(STORY_TEST_IDS[0])),
    collapseBlockSecond: Selector(dataTestIdSelector(STORY_TEST_IDS[1])),
  };
}

[getPageUrlAccordionPrimary, getPageUrlAccordionSecondary].map(getPageUrl => {
  test.page(getPageUrl({ selectionMode: 'single' }))(`Single mode`, async t => {
    const { collapseBlockFirst, collapseBlockSecond } = getSelectors();

    await t.expect(collapseBlockFirst.getAttribute('aria-expanded')).eql('false');
    await t.expect(collapseBlockSecond.getAttribute('aria-expanded')).eql('false');

    await t.click(collapseBlockFirst);

    await t.expect(collapseBlockFirst.getAttribute('aria-expanded')).eql('true');
    await t.expect(collapseBlockSecond.getAttribute('aria-expanded')).eql('false');

    await t.click(collapseBlockSecond);

    await t.expect(collapseBlockFirst.getAttribute('aria-expanded')).eql('false');
    await t.expect(collapseBlockSecond.getAttribute('aria-expanded')).eql('true');
  });

  test.page(getPageUrl({ selectionMode: 'multiple' }))(`Multiple mode`, async t => {
    const { collapseBlockFirst, collapseBlockSecond } = getSelectors();

    await t.expect(collapseBlockFirst.getAttribute('aria-expanded')).eql('false');
    await t.expect(collapseBlockSecond.getAttribute('aria-expanded')).eql('false');

    await t.click(collapseBlockFirst);

    await t.expect(collapseBlockFirst.getAttribute('aria-expanded')).eql('true');
    await t.expect(collapseBlockSecond.getAttribute('aria-expanded')).eql('false');

    await t.click(collapseBlockSecond);

    await t.expect(collapseBlockFirst.getAttribute('aria-expanded')).eql('true');
    await t.expect(collapseBlockSecond.getAttribute('aria-expanded')).eql('true');
  });
});
