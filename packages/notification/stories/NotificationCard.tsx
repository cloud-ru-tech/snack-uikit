import { Meta, StoryFn, StoryObj } from '@storybook/react';
import cn from 'classnames';
import { Fragment } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { NotificationCard, NotificationCardProps } from '../src';
import { NOTIFICATION_CARD_MOCK, STORY_TEST_IDS } from './constants';
import { handleActionClick } from './helpers';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Notification',
  component: NotificationCard,
};
export default meta;

const STATE_TABLE_HEADERS = ['Default', 'Unread'];

function Cards(props: Pick<NotificationCardProps, 'appearance'>) {
  return (
    <>
      <div className={styles.cell}>
        <NotificationCard {...NOTIFICATION_CARD_MOCK} className={styles.card} {...props} />
      </div>

      <div className={styles.cell}>
        <NotificationCard {...NOTIFICATION_CARD_MOCK} className={styles.card} unread {...props} />
      </div>
    </>
  );
}

const headerCellClassnames = cn(styles.cell, styles.headerCell);

const Template: StoryFn<NotificationCardProps> = ({ ...args }: NotificationCardProps) => (
  <div className={styles.pageWrapper}>
    <div className={styles.controlledWrapper}>
      Controlled:
      <NotificationCard {...args} className={styles.controlledCard} />
    </div>

    <div className={styles.table}>
      <div className={headerCellClassnames} style={{ gridRow: '1 / 1' }} />
      {STATE_TABLE_HEADERS.map((head, index) => (
        <div
          key={head}
          className={headerCellClassnames}
          style={{ gridColumnStart: index + 2, gridColumnEnd: index + 3 }}
        >
          {head}
        </div>
      ))}

      {Object.values(NotificationCard.appearances).map(appearance => (
        <Fragment key={appearance}>
          <div className={headerCellClassnames}>{appearance}</div>

          <Cards appearance={appearance} />
        </Fragment>
      ))}
    </div>
  </div>
);

export const notificationCard: StoryObj<NotificationCardProps> = Template.bind({});

notificationCard.args = {
  ...NOTIFICATION_CARD_MOCK,
  actions: NOTIFICATION_CARD_MOCK.actions.map(action => ({ ...action, onClick: handleActionClick })),
  'data-test-id': STORY_TEST_IDS.card,
};

notificationCard.argTypes = {
  /*content: {
    defaultValue: NOTIFICATION_CARD_MOCK.content,
    control: {
      type: 'text',
    },
  },*/
};

notificationCard.parameters = {
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
