import { Meta, Story } from '@storybook/react/types-6-0';
import cn from 'classnames';

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
  const headerCellClassnames = cn(styles.statusCell, styles.statusHeaderCell);
  const doubleHeaderCellClassnames = cn(styles.statusCell, styles.statusHeaderCell, styles.statusDoubleHeaderCell);

  return (
    <>
      <div className={styles.wrapper}>
        Controlled:
        <Status {...args} />
      </div>

      <div className={styles.statusTable}>
        <div className={styles.statusRow}>
          <div className={headerCellClassnames} />
          <div className={doubleHeaderCellClassnames}>No background</div>
          <div className={doubleHeaderCellClassnames}>Background</div>
        </div>
        <div className={styles.statusRow}>
          <div className={headerCellClassnames} />
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
        </div>
        {appearances.map(appearance => (
          <div key={appearance} className={styles.statusRow}>
            <div className={headerCellClassnames}>{appearance}</div>
            {sizes.map(size => (
              <div key={size} className={styles.statusCell}>
                <Status size={size} appearance={appearance} hasBackground={false} label='Label text' />
              </div>
            ))}
            {sizes.map(size => (
              <div key={size} className={styles.statusCell}>
                <Status size={size} appearance={appearance} hasBackground={true} label='Label text' />
              </div>
            ))}
          </div>
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
