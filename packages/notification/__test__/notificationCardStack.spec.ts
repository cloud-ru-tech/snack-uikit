import { expect, test } from '../../../playwright/fixtures';
import { STORY_TEST_IDS } from '../stories/constants';
import { SELECTORS } from './helpers';

const STACK_TITLE = 'Card stack title';
const CARDS_AMOUNT = 4;

type CardStackStoryProps = {
  title: string;
  amount: number;
  showActions: boolean;
  defaultOpen?: boolean;
};

const defaultStoryProps: CardStackStoryProps = {
  title: STACK_TITLE,
  amount: CARDS_AMOUNT,
  showActions: false,
};

function getCardStackStoryOptions(propsOverride?: Partial<CardStackStoryProps>) {
  return {
    name: 'notification' as const,
    story: 'notification-card-stack' as const,
    props: { ...defaultStoryProps, ...propsOverride },
  };
}

test.describe('NotificationCardStack', () => {
  test('should render with the title that was passed', async ({ gotoStory, getByTestId }) => {
    await gotoStory(getCardStackStoryOptions());
    const { wrapper, title } = SELECTORS.getCardStack(getByTestId);
    const { card } = SELECTORS.getCard(getByTestId);

    await expect(wrapper, 'NotificationCardStack not exists').toBeVisible();
    await expect(title, 'Title not exists').toBeVisible();
    await expect(title).toHaveText(STACK_TITLE);
    await expect(card.first()).toBeVisible();
  });

  test('should render in closed state when defaultOpen=false', async ({ gotoStory, getByTestId }) => {
    await gotoStory(getCardStackStoryOptions({ defaultOpen: false }));
    const { wrapper } = SELECTORS.getCardStack(getByTestId);
    const { card } = SELECTORS.getCard(getByTestId);

    await expect(wrapper, 'NotificationCardStack not exists').toBeVisible();
    await expect(card, 'First card only should be visible').toHaveCount(1);
  });

  test('should render in open state when defaultOpen=true', async ({ gotoStory, getByTestId }) => {
    await gotoStory(getCardStackStoryOptions({ defaultOpen: true }));
    const { wrapper } = SELECTORS.getCardStack(getByTestId);
    const { card } = SELECTORS.getCard(getByTestId);

    await expect(wrapper, 'NotificationCardStack not exists').toBeVisible();
    await expect(card, 'All cards should be visible').toHaveCount(CARDS_AMOUNT);
  });

  test('should render with Actions button when actions are passed', async ({ gotoStory, getByTestId }) => {
    await gotoStory(getCardStackStoryOptions({ showActions: true }));
    const { wrapper, actionsTrigger } = SELECTORS.getCardStack(getByTestId);

    await expect(wrapper, 'NotificationCardStack not exists').toBeVisible();
    await expect(actionsTrigger, 'Actions button not exists').toBeVisible();
  });

  test('should render without Actions button when actions are not passed', async ({ gotoStory, getByTestId }) => {
    await gotoStory(getCardStackStoryOptions());
    const { wrapper, actionsTrigger } = SELECTORS.getCardStack(getByTestId);

    await expect(wrapper, 'NotificationCardStack not exists').toBeVisible();
    await expect(actionsTrigger, 'Actions button should not exist').not.toBeVisible();
  });

  test('should show one card, then all after open button click, then one again after second click', async ({
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory(getCardStackStoryOptions({ amount: CARDS_AMOUNT, defaultOpen: false }));
    const { wrapper, openButton } = SELECTORS.getCardStack(getByTestId);
    const card = getByTestId(STORY_TEST_IDS.card);

    await expect(wrapper, 'NotificationCardStack not exists').toBeVisible();
    await expect(card, 'First card only should be visible').toHaveCount(1);

    await openButton.click();
    await expect(card, 'All cards should be visible').toHaveCount(CARDS_AMOUNT);

    await openButton.click();
    await expect(card, 'First card only should be visible').toHaveCount(1);
  });
});
