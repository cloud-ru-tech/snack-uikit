import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useCallback, useMemo, useState } from 'react';

import { PlaceholderSVG } from '@snack-uikit/icons';
import { SegmentedControlProps } from '@snack-uikit/segmented-control';
import { ValueOf } from '@snack-uikit/utils';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { NotificationCard, NotificationCardProps, NotificationPanel, NotificationPanelProps } from '../src';
import { NOTIFICATION_PANEL_PROPS_MOCK, STORY_TEST_IDS } from './constants';
import { bunch, generateCards, handleActionClick } from './helpers';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Notification',
  component: NotificationPanel,
};
export default meta;

type StoryProps = Omit<NotificationPanelProps, 'segments' | 'footerButton'> & {
  amount: number;
  groupSize: number;
  stackSize: number;
  segments: Omit<SegmentedControlProps, 'onChange'>;
  footerButton?: {
    label: string;
  };
  showDivider: boolean;
  stackTitle: string;
};

const SEGMENT_FILTER = {
  All: 'All',
  Service: 'Service',
  System: 'System',
} as const;

type SegmentFilter = ValueOf<typeof SEGMENT_FILTER>;

const Template: StoryFn<StoryProps> = ({
  amount,
  readAllButton,
  segments,
  footerButton,
  loading,
  showDivider,
  groupSize,
  stackSize,
  ...args
}: StoryProps) => {
  const [segmentFilter, setSegmentFilter] = useState<SegmentFilter>(SEGMENT_FILTER.All);
  const [allRead, setAllRead] = useState(false);
  const [chipToggleChecked, setChipToggleChecked] = useState(false);

  const notifications = useMemo(
    () => generateCards(amount).map(card => ({ ...card, unread: allRead ? false : card.unread })),
    [amount, allRead],
  );

  const showBlank = !notifications.length && !loading;

  const toggleAllRead = () => {
    setAllRead(prev => !prev);
  };

  const renderListOfCards = useCallback(
    (cards: NotificationCardProps[]) =>
      bunch({
        bunchSize: groupSize,
        renderBunch: (bunch, groupIndex) => (
          <NotificationPanel.Group key={groupIndex} title={`0${groupIndex + 1}.03.2026`}>
            {bunch}
          </NotificationPanel.Group>
        ),
        items: bunch({
          bunchSize: stackSize,
          renderBunch: (chunk, groupIndex) => (
            <NotificationPanel.Stack key={groupIndex} title={args.stackTitle} actions={args.settings?.actions}>
              {chunk}
            </NotificationPanel.Stack>
          ),
          items: cards.map((card: NotificationCardProps) => (
            <NotificationCard {...card} data-test-id={STORY_TEST_IDS.card} key={card.id} />
          )),
        }),
      }),
    [args.settings?.actions, args.stackTitle, groupSize, stackSize],
  );

  const content = useMemo(() => {
    if (loading) {
      return null;
    }

    if (showBlank) {
      return (
        <NotificationPanel.Blank
          icon={{
            icon: PlaceholderSVG,
          }}
          title='No notifications'
          description={'Here you will see new event notifications\nwhen something happens'}
          data-test-id={STORY_TEST_IDS.blank}
        />
      );
    }

    if (showDivider) {
      const readCards = notifications.filter(card => !card.unread);
      const unreadCards = notifications.filter(card => card.unread);

      return (
        <>
          {renderListOfCards(unreadCards)}
          {Boolean(unreadCards.length && readCards.length) && <NotificationPanel.Divider text='Read' />}
          {renderListOfCards(readCards)}
        </>
      );
    }

    return renderListOfCards(notifications);
  }, [notifications, renderListOfCards, showDivider, loading, showBlank]);

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
        chipToggle={{
          label: 'Unread',
          checked: chipToggleChecked,
          onChange: setChipToggleChecked,
        }}
        loading={loading}
        content={content}
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
          value: SEGMENT_FILTER.Service,
          label: SEGMENT_FILTER.Service,
          counter: { value: NOTIFICATION_PANEL_PROPS_MOCK.amount },
        },
        {
          value: SEGMENT_FILTER.System,
          label: SEGMENT_FILTER.System,
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
    groupSize: {
      name: '[Stories]: Card groups size',
      control: {
        type: 'range',
        min: 0,
        max: 10,
        step: 1,
      },
    },
    stackSize: {
      name: '[Stories]: Card stack size',
      control: {
        type: 'range',
        min: 0,
        max: 5,
        step: 1,
      },
    },
    showDivider: {
      name: '[Stories]: Show divider after unread cards',
    },
    stackTitle: {
      name: 'Card stack title',
      if: { arg: 'stackSize', truthy: true },
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
