import { fixture, Selector, test } from 'testcafe';

import { PaginationProps } from '@snack-ui/pagination';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

const TEST_ID = 'pagination';

function getPage(props: Partial<PaginationProps>) {
  return getTestcafeUrl({ group: 'pagination', name: 'pagination', props: { 'data-test-id': TEST_ID, ...props } });
}

fixture('Pagination');

const tests: Array<[Partial<PaginationProps>, Array<number | [number, number]>]> = [
  [{ total: 7, page: 1 }, [1, 2, 3, 4, 5, 6, 7]],
  [{ total: 7, page: 7 }, [1, 2, 3, 4, 5, 6, 7]],
  [{ total: 8, page: 1 }, [1, 2, 3, 4, 5, [6, 7], 8]],
  [{ total: 8, page: 4 }, [1, 2, 3, 4, 5, [6, 7], 8]],
  [{ total: 8, page: 5 }, [1, [2, 3], 4, 5, 6, 7, 8]],
  [{ total: 8, page: 8 }, [1, [2, 3], 4, 5, 6, 7, 8]],
  [{ total: 10, page: 1 }, [1, 2, 3, 4, 5, [6, 9], 10]],
  [{ total: 10, page: 2 }, [1, 2, 3, 4, 5, [6, 9], 10]],
  [{ total: 10, page: 3 }, [1, 2, 3, 4, 5, [6, 9], 10]],
  [{ total: 10, page: 4 }, [1, 2, 3, 4, 5, [6, 9], 10]],
  [{ total: 10, page: 5 }, [1, [2, 3], 4, 5, 6, [7, 9], 10]],
  [{ total: 10, page: 6 }, [1, [2, 4], 5, 6, 7, [8, 9], 10]],
  [{ total: 10, page: 7 }, [1, [2, 5], 6, 7, 8, 9, 10]],
  [{ total: 10, page: 8 }, [1, [2, 5], 6, 7, 8, 9, 10]],
  [{ total: 10, page: 9 }, [1, [2, 5], 6, 7, 8, 9, 10]],
  [{ total: 10, page: 10 }, [1, [2, 5], 6, 7, 8, 9, 10]],
];

for (const [props, expectation] of tests) {
  const sample = expectation.map(entry => (typeof entry === 'number' ? entry : `(${entry.join('...')})`)).join(' ');

  test.page(getPage(props))(
    `renders ${sample} when total pages are ${props.total} and current page is ${props.page}`,
    async t => {
      const pagination = Selector(dataTestIdSelector(TEST_ID));

      await t.expect(pagination.exists).ok();

      const buttons = [...expectation.entries()].map(([, entry]) =>
        pagination.find(
          dataTestIdSelector(
            typeof entry === 'number' ? `page-number-button-${entry}` : `page-more-button-${entry[0]}-${entry[1]}`,
          ),
        ),
      );
      const exists = await Promise.all(buttons.map(button => button.exists));

      await t.expect(exists.every(value => value)).ok();
    },
  );
}

test.page(getPage({ total: 7, page: 1 }))('disables prev button when current page is first page', async t => {
  const prevArrowButton = Selector(dataTestIdSelector('page-prev-button'));

  await t.expect(prevArrowButton.hasAttribute('data-disabled')).ok();
});

test.page(getPage({ total: 7, page: 7 }))('disables next button when current page is last page', async t => {
  const nextArrowButton = Selector(dataTestIdSelector('page-next-button'));

  await t.expect(nextArrowButton.hasAttribute('data-disabled')).ok();
});

test.page(getPage({ total: 15, page: 15 }))('goes to first page when click on first page number button', async t => {
  const numberButton = Selector(dataTestIdSelector('page-number-button-1'));

  await t.click(numberButton).expect(numberButton.hasAttribute('data-activated')).ok();
});

test.page(getPage({ total: 15, page: 1 }))('goes to last page when click on last page number button', async t => {
  const numberButton = Selector(dataTestIdSelector('page-number-button-15'));

  await t.click(numberButton).expect(numberButton.hasAttribute('data-activated')).ok();
});

test.page(getPage({ total: 15, page: 7 }))('goes to page when click on page number button', async t => {
  const numberButton = Selector(dataTestIdSelector('page-number-button-6'));

  await t.click(numberButton).expect(numberButton.hasAttribute('data-activated')).ok();
});

test.page(getPage({ total: 15, page: 7 }))('goes to next page when click on next arrow button', async t => {
  const nextArrowButton = Selector(dataTestIdSelector('page-next-button'));
  const numberButton = Selector(dataTestIdSelector('page-number-button-8'));

  await t.click(nextArrowButton).expect(numberButton.hasAttribute('data-activated')).ok();
});

test.page(getPage({ total: 15, page: 7 }))('goes to prev page when click on prev arrow button', async t => {
  const prevArrowButton = Selector(dataTestIdSelector('page-prev-button'));
  const numberButton = Selector(dataTestIdSelector('page-number-button-6'));

  await t.click(prevArrowButton).expect(numberButton.hasAttribute('data-activated')).ok();
});

test.page(getPage({ total: 15, page: 1 }))(
  'goes to middle page in range of break when click on more button',
  async t => {
    const moreButton = Selector(dataTestIdSelector('page-more-button-6-14'));
    const numberButton = Selector(dataTestIdSelector('page-number-button-10'));

    await t.click(moreButton).expect(numberButton.hasAttribute('data-activated')).ok();
  },
);

test.page(getPage({ total: 16, page: 1 }))(
  'goes to less page between two middle pages in range of break when click on more button',
  async t => {
    const moreButton = Selector(dataTestIdSelector('page-more-button-6-15'));
    const numberButton = Selector(dataTestIdSelector('page-number-button-10'));

    await t.click(moreButton).expect(numberButton.hasAttribute('data-activated')).ok();
  },
);
