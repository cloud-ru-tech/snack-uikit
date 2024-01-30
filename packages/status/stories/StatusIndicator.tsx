import { Meta, StoryFn, StoryObj } from '@storybook/react';
import cn from 'classnames';
import { Fragment } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { StatusIndicator, StatusIndicatorProps } from '../src';
import { SIZE } from '../src/components/StatusIndicator/constants';
import { APPEARANCE } from '../src/constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Status/Status Indicator',
  component: StatusIndicator,
};
export default meta;

type StoryProps = StatusIndicatorProps;
const Template: StoryFn<StoryProps> = ({ ...args }) => {
  const sizes = Object.values(SIZE);
  const appearances = Object.values(APPEARANCE);
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

export const statusIndicator: StoryObj<StoryProps> = Template.bind({});

statusIndicator.args = {
  size: SIZE.S,
  appearance: APPEARANCE.Primary,
};

statusIndicator.argTypes = {
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
};

statusIndicator.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=41%3A21940&mode=design',
  },
};
