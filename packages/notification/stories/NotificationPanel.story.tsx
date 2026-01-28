import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useMemo, useState } from 'react';

import { PlaceholderSVG } from '@snack-uikit/icons';
import { SegmentedControlProps } from '@snack-uikit/segmented-control';
import { ValueOf } from '@snack-uikit/utils';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { NotificationCard, NotificationCardProps, NotificationPanel, NotificationPanelProps } from '../src';
import { NOTIFICATION_PANEL_PROPS_MOCK, STORY_TEST_IDS } from './constants';
import { generateCards, handleActionClick } from './helpers';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Notification',
  component: NotificationPanel,
};
export default meta;

type StoryProps = Omit<NotificationPanelProps, 'segments' | 'footerButton'> & {
  amount: number;
  segments: Omit<SegmentedControlProps, 'onChange'>;
  footerButton?: {
    label: string;
  };
  showDivider: boolean;
  stackLength: number;
  stackTitle: string;
};

const SEGMENT_FILTER = {
  All: 'All',
  Unread: 'Unread',
} as const;

type SegmentFilter = ValueOf<typeof SEGMENT_FILTER>;

const Template: StoryFn<StoryProps> = ({
  amount,
  readAllButton,
  segments,
  footerButton,
  loading,
  showDivider,
  stackLength,
  ...args
}: StoryProps) => {
  const [segmentFilter, setSegmentFilter] = useState<SegmentFilter>(SEGMENT_FILTER.All);
  const [allRead, setAllRead] = useState(false);

  const notifications = useMemo(() => generateCards(amount), [amount]);

  const cards = useMemo(() => {
    if (segmentFilter === SEGMENT_FILTER.Unread) {
      return notifications.filter(card => card.unread);
    }

    if (allRead) {
      return notifications.map(card => ({ ...card, unread: false }));
    }

    return notifications.sort((a, b) => Number(b.unread ?? 0) - Number(a.unread ?? 0));
  }, [allRead, segmentFilter, notifications]);

  const filteredCards = useMemo(
    () => ({
      notRead: cards.filter(card => card.unread),
      read: cards.filter(card => !card.unread),
    }),
    [cards],
  );

  const showBlank = !cards.length && !loading;

  const toggleAllRead = () => {
    setAllRead(prev => !prev);
  };

  const renderCards = (cardsList: NotificationCardProps[]) =>
    cardsList.map(card => <NotificationCard {...card} data-test-id={STORY_TEST_IDS.card} key={card.id} />);

  return (
    <div className={styles.pageWrapper} data-resizable={true}>
      <NotificationPanel
        {...args}
        readAllButton={
          readAllButton && {
            ...readAllButton,
            onClick: toggleAllRead,
          }
        }
        segments={
          segments && {
            ...segments,
            value: segmentFilter,
            onChange: (value: string | number) => {
              setSegmentFilter(String(value) as SegmentFilter);
            },
          }
        }
        loading={loading}
        content={
          <>
            {stackLength > 0 && (
              <NotificationPanel.Stack title={args.stackTitle} actions={args.settings?.actions}>
                {renderCards(filteredCards.read.slice(-stackLength))}
              </NotificationPanel.Stack>
            )}
            {showBlank && (
              <NotificationPanel.Blank
                icon={{
                  icon: PlaceholderSVG,
                }}
                title='No notifications'
                description={'Here you will see new event notifications\nwhen something happens'}
                data-test-id={STORY_TEST_IDS.blank}
              />
            )}

            {!showBlank && (
              <>
                {showDivider && segmentFilter === SEGMENT_FILTER.All ? (
                  <>
                    {renderCards(filteredCards.notRead)}

                    {Boolean(filteredCards.notRead.length && filteredCards.read.length) && (
                      <NotificationPanel.Divider text='Readed' />
                    )}

                    {renderCards(filteredCards.read)}
                  </>
                ) : (
                  renderCards(cards)
                )}
              </>
            )}
          </>
        }
        footerButton={
          footerButton && {
            ...footerButton,
            onClick() {},
          }
        }
      />
    </div>
  );
};

export const notificationPanel: StoryObj<StoryProps> = {
  render: Template,

  args: {
    ...NOTIFICATION_PANEL_PROPS_MOCK,
    segments: {
      items: [
        {
          value: SEGMENT_FILTER.All,
          label: SEGMENT_FILTER.All,
          counter: { value: NOTIFICATION_PANEL_PROPS_MOCK.amount },
        },
        {
          value: SEGMENT_FILTER.Unread,
          label: SEGMENT_FILTER.Unread,
          counter: { value: NOTIFICATION_PANEL_PROPS_MOCK.amount },
        },
      ],
      value: SEGMENT_FILTER.All,
    },
    settings: {
      button: {
        onClick() {},
      },
      actions: [
        {
          content: { option: 'setting 1' },
          onClick: handleActionClick,
        },
        {
          content: { option: 'setting 2' },
          onClick: handleActionClick,
        },
      ],
    },
    showDivider: false,
    stackLength: 0,
    stackTitle: 'Card stack title',
  },

  argTypes: {
    amount: {
      name: '[Stories]: Amount of cards in the panel',
      control: {
        type: 'range',
        min: 0,
        max: 100,
        step: 1,
      },
    },
    showDivider: {
      name: '[Stories]: Show divider after unread cards',
    },
    stackLength: {
      name: '[Stories]: Card stack size',
      control: {
        type: 'range',
        min: 0,
        max: 5,
        step: 1,
      },
    },
    stackTitle: {
      name: 'Card stack title',
      if: { arg: 'stackLength', truthy: true },
    },
  },

  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=41%3A209587&mode=design',
    },
  },
};
