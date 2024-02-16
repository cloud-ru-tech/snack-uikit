import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useMemo, useState } from 'react';

import { ChipToggleProps } from '@snack-uikit/chips';
import { PlaceholderSVG } from '@snack-uikit/icons';
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

type StoryProps = Omit<NotificationPanelProps, 'chips' | 'readAllButton' | 'footerButton'> & {
  amount: number;
  chips: Omit<ChipToggleProps, 'onChange'>[];
  readAllButton: Omit<NotificationPanelProps['readAllButton'], 'onClick'>;
  footerButton?: {
    label: string;
  };
  showDivider: boolean;
};

const CHIP_FILTER = {
  All: 'all',
  Unread: 'unread',
} as const;

type ChipFilter = ValueOf<typeof CHIP_FILTER>;

const Template: StoryFn<StoryProps> = ({
  amount,
  readAllButton,
  chips,
  footerButton,
  loading,
  showDivider,
  ...args
}: StoryProps) => {
  const [chipFilter, setChipFilter] = useState<ChipFilter>(CHIP_FILTER.All);
  const [allRead, setAllRead] = useState(false);

  const notifications = useMemo(() => generateCards(amount), [amount]);

  const cards = useMemo(() => {
    if (chipFilter === CHIP_FILTER.Unread) {
      return notifications.filter(card => card.unread);
    }

    if (allRead) {
      return notifications.map(card => ({ ...card, unread: false }));
    }

    return notifications.sort((a, b) => Number(b.unread ?? 0) - Number(a.unread ?? 0));
  }, [allRead, chipFilter, notifications]);

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
        chips={chips?.map(chip => ({
          ...chip,
          checked: chip.label === chipFilter,
          onChange() {
            setChipFilter(chip.label as ChipFilter);
          },
        }))}
        loading={loading}
        content={
          <>
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
                {showDivider && chipFilter === 'all' ? (
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

export const notificationPanel: StoryObj<StoryProps> = Template.bind({});

notificationPanel.args = {
  ...NOTIFICATION_PANEL_PROPS_MOCK,
  chips: [
    {
      label: CHIP_FILTER.All,
      checked: true,
    },
    {
      label: CHIP_FILTER.Unread,
      checked: false,
    },
  ],
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
};

notificationPanel.argTypes = {
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
};

notificationPanel.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=41%3A209587&mode=design',
  },
};
