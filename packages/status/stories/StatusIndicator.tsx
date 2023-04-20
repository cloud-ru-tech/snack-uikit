import { Meta, StoryFn } from '@storybook/react';
import cn from 'classnames';
import { Fragment } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { StatusIndicator, StatusIndicatorProps } from '../src';
import styles from './styles.module.scss';

export default {
  title: 'Components/Status/Status Indicator',
  component: StatusIndicator,
} as Meta;

const Template: StoryFn<StatusIndicatorProps> = ({ ...args }) => {
  const sizes = Object.values(StatusIndicator.sizes);
  const appearances = Object.values(StatusIndicator.appearances);
  const headerCellClassnames = cn(styles.cell, styles.headerCell);

  return (
    <>
      <div className={styles.wrapper}>
        Controlled:
        <StatusIndicator {...args} />
      </div>

      <div className={styles.table} style={{ '--columns': 6 }}>
        <div className={headerCellClassnames} />
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
                <StatusIndicator size={size} appearance={appearance} />
              </div>
            ))}
          </Fragment>
        ))}
      </div>
    </>
  );
};

export const statusIndicator = Template.bind({});

statusIndicator.args = {
  size: StatusIndicator.sizes.S,
  appearance: StatusIndicator.appearances.Primary,
};

statusIndicator.argTypes = {
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

statusIndicator.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/IAjEuR29VlrI97WHCWnkDo/Status?t=uqvEEDS0RN7FPnu7-0',
  },
};
