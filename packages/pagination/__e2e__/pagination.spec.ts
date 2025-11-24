import { expect, test } from '../../../playwright/fixtures';

const TEST_ID = 'pagination';

test.describe('Pagination', () => {
  // eslint-disable-next-line
  const tests: Array<[any, Array<number | [number, number]>]> = [
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

    test(`renders ${sample} when total pages are ${props.total} and current page is ${props.page}`, async ({
      gotoStory,
      getByTestId,
    }) => {
      await gotoStory({
        name: 'pagination',
        group: 'pagination',
        props: {
          'data-test-id': TEST_ID,
          ...props,
        },
      });
      const pagination = getByTestId(TEST_ID);

      await expect(pagination).toBeVisible();

      const buttons = expectation.map(entry =>
        pagination.locator(
          `[data-test-id="${
            typeof entry === 'number' ? `page-number-button-${entry}` : `page-more-button-${entry[0]}-${entry[1]}`
          }"]`,
        ),
      );
      const exists = await Promise.all(buttons.map(button => button.isVisible()));

      await expect(exists.every(value => value)).toBeTruthy();
    });
  }

  test('disables prev button when current page is first page', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'pagination',
      group: 'pagination',
      props: {
        'data-test-id': TEST_ID,
        total: 7,
        page: 1,
      },
    });
    const prevArrowButton = getByTestId('page-prev-button');

    await expect(prevArrowButton).toHaveAttribute('data-disabled', 'true');
  });

  test('disables next button when current page is last page', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'pagination',
      group: 'pagination',
      props: {
        'data-test-id': TEST_ID,
        total: 7,
        page: 7,
      },
    });
    const nextArrowButton = getByTestId('page-next-button');

    await expect(nextArrowButton).toHaveAttribute('data-disabled', 'true');
  });

  test('goes to first page when click on first page number button', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'pagination',
      group: 'pagination',
      props: {
        'data-test-id': TEST_ID,
        total: 15,
        page: 15,
      },
    });
    const numberButton = getByTestId('page-number-button-1');

    await numberButton.click();
    await expect(numberButton).toHaveAttribute('data-activated', 'true');
  });

  test('goes to last page when click on last page number button', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'pagination',
      group: 'pagination',
      props: {
        'data-test-id': TEST_ID,
        total: 15,
        page: 1,
      },
    });
    const numberButton = getByTestId('page-number-button-15');

    await numberButton.click();
    await expect(numberButton).toHaveAttribute('data-activated', 'true');
  });

  test('goes to page when click on page number button', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'pagination',
      group: 'pagination',
      props: {
        'data-test-id': TEST_ID,
        total: 15,
        page: 7,
      },
    });
    const numberButton = getByTestId('page-number-button-6');

    await numberButton.click();
    await expect(numberButton).toHaveAttribute('data-activated', 'true');
  });

  test('goes to next page when click on next arrow button', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'pagination',
      group: 'pagination',
      props: {
        'data-test-id': TEST_ID,
        total: 15,
        page: 7,
      },
    });
    const nextArrowButton = getByTestId('page-next-button');
    const numberButton = getByTestId('page-number-button-8');

    await nextArrowButton.click();
    await expect(numberButton).toHaveAttribute('data-activated', 'true');
  });

  test('goes to prev page when click on prev arrow button', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'pagination',
      group: 'pagination',
      props: {
        'data-test-id': TEST_ID,
        total: 15,
        page: 7,
      },
    });
    const prevArrowButton = getByTestId('page-prev-button');
    const numberButton = getByTestId('page-number-button-6');

    await prevArrowButton.click();
    await expect(numberButton).toHaveAttribute('data-activated', 'true');
  });

  test('goes to middle page in range of break when click on more button', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      name: 'pagination',
      group: 'pagination',
      props: {
        'data-test-id': TEST_ID,
        total: 15,
        page: 1,
      },
    });
    const moreButton = getByTestId('page-more-button-6-14');
    const numberButton = getByTestId('page-number-button-10');

    await moreButton.click();
    await expect(numberButton).toHaveAttribute('data-activated', 'true');
  });

  test('goes to less page between two middle pages in range of break when click on more button', async ({
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory({
      name: 'pagination',
      group: 'pagination',
      props: {
        'data-test-id': TEST_ID,
        total: 16,
        page: 1,
      },
    });
    const moreButton = getByTestId('page-more-button-6-15');
    const numberButton = getByTestId('page-number-button-10');

    await moreButton.click();
    await expect(numberButton).toHaveAttribute('data-activated', 'true');
  });
});
