import { expect, test } from '../../../playwright/fixtures';

const TEST_IDS = {
  timeline: 'timeline',
  track: 'timeline-track',
  trackDot: 'timeline-track-dot',
  trackLine: 'timeline-track-line',
  trackItem: 'timeline-track-item',
  trackItemOpposite: 'timeline-track-item-opposite',
};

test.describe('Timeline', () => {
  test('Should be rendered', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      group: 'timeline',
      name: 'timeline',
      props: {
        'data-test-id': TEST_IDS.timeline,
        showOpposite: false,
      },
    });

    await expect(getByTestId(TEST_IDS.timeline)).toBeVisible();
    await expect(getByTestId(TEST_IDS.track).first()).toBeVisible();
    await expect(getByTestId(TEST_IDS.trackDot).first()).toBeVisible();
    await expect(getByTestId(TEST_IDS.trackLine).first()).toBeVisible();
    await expect(getByTestId(TEST_IDS.trackItem).first()).toBeVisible();
    await expect(getByTestId(TEST_IDS.trackItemOpposite).first()).not.toBeVisible();
  });

  test('Should be rendered with opposite content', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      group: 'timeline',
      name: 'timeline',
      props: {
        'data-test-id': TEST_IDS.timeline,
        showOpposite: true,
      },
    });

    await expect(getByTestId(TEST_IDS.timeline)).toBeVisible();
    await expect(getByTestId(TEST_IDS.track).first()).toBeVisible();
    await expect(getByTestId(TEST_IDS.trackDot).first()).toBeVisible();
    await expect(getByTestId(TEST_IDS.trackLine).first()).toBeVisible();
    await expect(getByTestId(TEST_IDS.trackItem).first()).toBeVisible();
    await expect(getByTestId(TEST_IDS.trackItemOpposite).first()).toBeVisible();
  });
});
