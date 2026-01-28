import { Meta, StoryFn, StoryObj } from '@storybook/react';
import cn from 'classnames';
import { useMemo } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { NotificationCard, NotificationCardProps, NotificationPanel } from '../src';
import { APPEARANCE } from '../src/components/NotificationCard/constants';
import { NOTIFICATION_CARD_MOCK, STORY_TEST_IDS } from './constants';
import { generateCards, handleActionClick } from './helpers';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Notification',
  component: NotificationPanel.Stack,
};
export default meta;

type StoryProps = Omit<NotificationPanel.StackProps, 'children'> &
  Pick<
    NotificationCardProps,
    'appearance' | 'label' | 'unread' | 'title' | 'content' | 'date' | 'link' | 'primaryButton' | 'secondaryButton'
  > & {
    amount: number;
    showActions: boolean;
    showButtons: boolean;
  };

const Template: StoryFn<StoryProps> = ({
  amount,
  title,
  actions,
  appearance,
  label,
  unread,
  content,
  date,
  link,
  primaryButton,
  secondaryButton,
  showButtons,
  showActions,
  ...args
}: StoryProps) => {
  const cards = useMemo(() => generateCards(amount - 1), [amount]);

  return (
    <div className={cn(styles.pageWrapper, styles.backdrop)} data-resizable='true' style={{ overflowY: 'auto' }}>
      <NotificationPanel.Stack {...args} title={title} actions={showActions ? actions : []}>
        <NotificationCard
          {...NOTIFICATION_CARD_MOCK}
          id='first-card'
          appearance={appearance}
          label={label}
          unread={unread}
          content={content}
          date={date}
          link={link}
          {...(showButtons
            ? {
                primaryButton,
                secondaryButton,
              }
            : {})}
          data-test-id={STORY_TEST_IDS.card}
        />
        {cards.map(card => (
          <NotificationCard {...NOTIFICATION_CARD_MOCK} {...card} key={card.id} data-test-id={STORY_TEST_IDS.card} />
        ))}
      </NotificationPanel.Stack>
    </div>
  );
};

export const notificationCardStack: StoryObj<StoryProps> = {
  render: Template,

  args: {
    amount: 4,
    showActions: true,
    title: 'Card stack title',
    appearance: NOTIFICATION_CARD_MOCK.appearance,
    label: NOTIFICATION_CARD_MOCK.label,
    unread: false,
    content: NOTIFICATION_CARD_MOCK.content,
    date: NOTIFICATION_CARD_MOCK.date,
    link: NOTIFICATION_CARD_MOCK.link,
    primaryButton: {
      label: 'Primary button',
      onClick: handleActionClick,
    },
    secondaryButton: {
      label: 'Secondary button',
      onClick: handleActionClick,
    },
    showButtons: true,
    actions: [
      {
        content: { option: 'action 1' },
        onClick: handleActionClick,
      },
      {
        content: { option: 'action 2' },
        onClick: handleActionClick,
      },
    ],
  },

  argTypes: {
    amount: {
      name: '[Stories]: Amount of cards in the stack',
      control: {
        type: 'range',
        min: 1,
        max: 10,
        step: 1,
      },
    },
    showActions: {
      name: '[Stories]: Show actions',
    },
    appearance: {
      options: Object.values(APPEARANCE),
      control: {
        type: 'radio',
      },
    },
    showButtons: {
      name: '[Stories]: Show action buttons',
    },
    content: {
      control: {
        type: 'text',
      },
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
