import { Meta, StoryFn, StoryObj } from '@storybook/react';
import cn from 'classnames';
import { Fragment } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Typography, TypographyProps } from '../src';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Typography',
  component: Typography,
};
export default meta;

type StoryProps = TypographyProps;
const Template: StoryFn<StoryProps> = ({ ...args }) => {
  const families = Object.values(Typography.families);
  const sizes = Object.values(Typography.sizes);
  const roles = Object.values(Typography.roles);
  const headerCellClassnames = cn(styles.cell, styles.headerCell);
  const headerFirstCellClassnames = cn(styles.cell, styles.headerCell, styles.firstCell);
  const firstCellClassnames = cn(styles.cell, styles.firstCell);

  return (
    <>
      <div className={styles.wrapper}>
        <Typography {...args} />
      </div>
      <div className={styles.table}>
        <>
          <div className={headerCellClassnames}>Role</div>
          <div className={headerCellClassnames}>Size</div>
          {families.map(family => (
            <div key={family} className={headerCellClassnames}>
              {family}
            </div>
          ))}
        </>

        {roles.map(role => (
          <Fragment key={role}>
            {sizes.map((size, index) => (
              <Fragment key={`${role}_${size}`}>
                <div className={index === 0 ? headerFirstCellClassnames : headerCellClassnames}>{role}</div>
                <div className={index === 0 ? headerFirstCellClassnames : headerCellClassnames}>{size}</div>
                {families.map(family => (
                  <div key={family} className={index === 0 ? firstCellClassnames : styles.cell}>
                    <Typography family={family} role={role} size={size}>
                      {family.replace('-', ' ')}
                    </Typography>
                  </div>
                ))}
              </Fragment>
            ))}
          </Fragment>
        ))}
      </div>
    </>
  );
};

export const typography: StoryObj<StoryProps> = Template.bind({});

typography.args = {
  children: 'Some text',
  family: Typography.families.Sans,
  role: Typography.roles.Display,
  size: Typography.sizes.S,
  tag: Typography.tags.span,
};

typography.argTypes = {
  family: { control: { type: 'select' } },
  role: { control: { type: 'select' } },
  size: { control: { type: 'select' } },
  tag: { control: { type: 'select' } },
};

typography.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/evs7EwrZF4NikYiHp4Fydr/On-boarding-Typography?node-id=35-1948&t=bBnwJl7MOre5YUHS-0',
  },
};
