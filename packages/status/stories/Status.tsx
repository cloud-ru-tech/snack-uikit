import { Meta, Story } from '@storybook/react/types-6-0';
import cn from 'classnames';
import { Fragment } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Status, StatusProps } from '../src';
import styles from './styles.module.scss';

export default {
  title: 'Components/Status/Status',
  component: Status,
} as Meta;

const Template: Story<StatusProps> = ({ ...args }) => {
  const sizes = Object.values(Status.sizes);
  const appearances = Object.values(Status.appearances);
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

export const status = Template.bind({});

status.args = {
  size: Status.sizes.S,
  appearance: Status.appearances.Primary,
  label: 'Label text',
  hasBackground: false,
};

status.argTypes = {
  size: {
    control: {
      type: 'select',
    },
  },
  appearance: {
    control: {
      type: 'select',
    },
  },
};

status.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/IAjEuR29VlrI97WHCWnkDo/Status?t=uqvEEDS0RN7FPnu7-0',
  },
};
