import { Meta, StoryFn, StoryObj } from '@storybook/react';
import cn from 'classnames';
import { Fragment } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { NotificationCard, NotificationCardProps } from '../src';
import { APPEARANCE } from '../src/components/NotificationCard/constants';
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

type StoryProps = NotificationCardProps & {
  showButtons: boolean;
};

const Template: StoryFn<StoryProps> = ({ showButtons, ...args }: StoryProps) => (
  <div className={styles.pageWrapper}>
    <div className={styles.controlledWrapper}>
      Controlled:
      <NotificationCard
        {...args}
        {...(showButtons
          ? {
              primaryButton: {
                label: 'Primary Button',
              },
              secondaryButton: {
                label: 'Secondary Button',
              },
            }
          : {})}
        className={styles.controlledCard}
      />
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

      {Object.values(APPEARANCE).map(appearance => (
        <Fragment key={appearance}>
          <div className={headerCellClassnames}>{appearance}</div>

          <Cards appearance={appearance} />
        </Fragment>
      ))}
    </div>
  </div>
);

export const notificationCard: StoryObj<StoryProps> = {
  render: Template,

  args: {
    ...NOTIFICATION_CARD_MOCK,
    actions: NOTIFICATION_CARD_MOCK.actions.map(action => ({ ...action, onClick: handleActionClick })),
    'data-test-id': STORY_TEST_IDS.card,
    showButtons: true,
  },

  argTypes: {
    appearance: {
      options: Object.values(APPEARANCE),
      control: {
        type: 'radio',
      },
    },
    showButtons: {
      name: '[Stories]: Show action buttons',
    },
    primaryButton: { table: { disable: true } },
    secondaryButton: { table: { disable: true } },
  },

  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=41%3A209668&mode=design',
    },
  },
};
