import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useMemo, useState } from 'react';

import { ButtonTonal } from '@snack-uikit/button';
import { ChipToggleProps } from '@snack-uikit/chips';
import { PlaceholderSVG } from '@snack-uikit/icons';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { NotificationCard, NotificationPanel, NotificationPanelProps } from '../src';
import { NOTIFICATION_PANEL_PROPS_MOCK, STORY_TEST_IDS } from './constants';
import { generateCards, handleActionClick } from './helpers';

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
};

enum ChipFilter {
  All = 'All',
  Unread = 'Unread',
}

const Template: StoryFn<StoryProps> = ({ amount, readAllButton, chips, footerButton, ...args }: StoryProps) => {
  const [chipFilter, setChipFilter] = useState<ChipFilter>(ChipFilter.All);
  const [allRead, setAllRead] = useState(false);

  const notifications = useMemo(() => generateCards(amount), [amount]);

  const cards = useMemo(() => {
    if (chipFilter === ChipFilter.Unread) {
      return notifications.filter(card => card.unread);
    }

    if (allRead) {
      return notifications.map(card => ({ ...card, unread: false }));
    }

    return notifications.sort((a, b) => Number(b.unread ?? 0) - Number(a.unread ?? 0));
  }, [allRead, chipFilter, notifications]);

  const toggleAllRead = () => {
    setAllRead(prev => !prev);
  };

  return (
    <NotificationPanel
      {...args}
      triggerElement={<ButtonTonal label='open' data-test-id={STORY_TEST_IDS.panelTrigger} />}
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
      content={
        !cards.length ? (
          <NotificationPanel.Blank
            icon={PlaceholderSVG}
            title='No notifications'
            description={'Here you will see new event notifications\nwhen something happens'}
            data-test-id={STORY_TEST_IDS.blank}
          />
        ) : (
          cards.map(card => <NotificationCard {...card} data-test-id={STORY_TEST_IDS.card} key={card.id} />)
        )
      }
      footerButton={
        footerButton && {
          ...footerButton,
          onClick() {},
        }
      }
    />
  );
};

export const notificationPanel: StoryObj<StoryProps> = Template.bind({});

notificationPanel.args = {
  ...NOTIFICATION_PANEL_PROPS_MOCK,
  chips: [
    {
      label: ChipFilter.All,
      checked: true,
    },
    {
      label: ChipFilter.Unread,
      checked: false,
    },
  ],
  settings: {
    button: {
      onClick() {},
    },
    actions: [
      {
        option: 'setting 1',
        onClick: handleActionClick,
      },
      {
        option: 'setting 2',
        onClick: handleActionClick,
      },
    ],
  },
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
};

notificationPanel.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/xfZEon4b7eNvK0FNK2KS4k/Notification-Panel?type=design&node-id=0%3A1&mode=design&t=5jLkyXnKAhmXfd60-1',
  },
};
