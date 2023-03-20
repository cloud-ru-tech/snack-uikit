import { Meta, Story } from '@storybook/react/types-6-0';
import cn from 'classnames';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { StatusIndicator, StatusIndicatorProps } from '../src';
import styles from './styles.module.scss';

export default {
  title: 'Components/Status/Status Indicator',
  component: StatusIndicator,
} as Meta;

const Template: Story<StatusIndicatorProps> = ({ ...args }) => {
  const sizes = Object.values(StatusIndicator.sizes);
  const appearances = Object.values(StatusIndicator.appearances);
  const headerCellClassnames = cn(styles.statusCell, styles.statusHeaderCell);

  return (
    <>
      <div className={styles.wrapper}>
        Controlled:
        <StatusIndicator {...args} />
      </div>

      <div className={styles.statusTable}>
        <div className={styles.statusRow}>
          <div className={headerCellClassnames} />
          {sizes.map(size => (
            <div key={size} className={headerCellClassnames}>
              {size}
            </div>
          ))}
        </div>
        {appearances.map(appearance => (
          <div key={appearance} className={styles.statusRow}>
            <div className={headerCellClassnames}>{appearance}</div>
            {sizes.map(size => (
              <div key={size} className={styles.statusCell}>
                <StatusIndicator size={size} appearance={appearance} />
              </div>
            ))}
          </div>
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
