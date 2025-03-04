import { Meta, StoryFn, StoryObj } from '@storybook/react';
import cn from 'classnames';
import { Fragment } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Status, StatusProps } from '../src';
import { SIZE } from '../src/components/Status/constants';
import { APPEARANCE } from '../src/constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Status/Status',
  component: Status,
};
export default meta;

type StoryProps = StatusProps;
const Template: StoryFn<StoryProps> = ({ ...args }) => {
  const sizes = Object.values(SIZE);
  const appearances = Object.values(APPEARANCE);
  const headerCellClassnames = cn(styles.cell, styles.headerCell);

  return (
    <>
      <div className={styles.wrapper}>
        Controlled:
        <Status {...args} />
      </div>

      <div className={styles.table} style={{ '--columns': 5 }}>
        <div className={headerCellClassnames} style={{ gridRow: '1 / 3' }} />
        <div className={headerCellClassnames} style={{ gridColumn: '2 / 4' }}>
          No background
        </div>
        <div className={headerCellClassnames} style={{ gridColumn: '4 / 6' }}>
          Background
        </div>
        {sizes.map(size => (
          <div key={size} className={headerCellClassnames}>
            {size}
          </div>
        ))}
        {sizes.map(size => (
          <div key={size} className={headerCellClassnames}>
            {size}
          </div>
        ))}
        {appearances.map(appearance => (
          <Fragment key={appearance}>
            <div className={headerCellClassnames}>{appearance}</div>
            {sizes.map(size => (
              <div key={size} className={styles.cell}>
                <Status size={size} appearance={appearance} hasBackground={false} label='Label text' />
              </div>
            ))}
            {sizes.map(size => (
              <div key={size} className={styles.cell}>
                <Status size={size} appearance={appearance} hasBackground={true} label='Label text' />
              </div>
            ))}
          </Fragment>
        ))}
      </div>
    </>
  );
};

export const status: StoryObj<StoryProps> = {
  render: Template,

  args: {
    size: SIZE.S,
    appearance: APPEARANCE.Primary,
    label: 'Label text',
    hasBackground: false,
    loading: false,
  },

  argTypes: {
    size: {
      options: Object.values(SIZE),
      control: {
        type: 'radio',
      },
    },
    appearance: {
      control: {
        type: 'select',
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
      url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=41%3A21940&mode=design',
    },
  },
};
