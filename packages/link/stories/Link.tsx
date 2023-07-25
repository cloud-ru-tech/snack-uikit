import { Meta, StoryFn, StoryObj } from '@storybook/react';
import cn from 'classnames';
import { Fragment } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Link, LinkProps } from '../src';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Link',
  component: Link,
};
export default meta;

const DEFAULT_TEXT = 'Link text';

type StoryProps = LinkProps;
const Template: StoryFn<StoryProps> = ({ ...args }) => {
  const sizes = Object.values(Link.sizes);
  const headerCellClassName = cn(styles.cell, styles.headerCell);

  return (
    <>
      <div className={styles.wrapper}>
        <Link {...args} />
      </div>
      <div className={styles.table}>
        <div className={headerCellClassName} style={{ gridRow: '1 / 3' }}></div>
        <div className={headerCellClassName} style={{ gridColumn: '2 / 4' }}>
          Neutral
        </div>
        <div className={headerCellClassName} style={{ gridColumn: '4 / 6' }}>
          Primary
        </div>
        <div className={headerCellClassName}>External</div>
        <div className={headerCellClassName}>Internal</div>
        <div className={headerCellClassName}>External</div>
        <div className={headerCellClassName}>Internal</div>
        {sizes.map(size => (
          <Fragment key={size}>
            <div className={headerCellClassName}>{size}</div>
            <div className={styles.cell}>
              <Link text={DEFAULT_TEXT} size={size} external={true} />
            </div>
            <div className={styles.cell}>
              <Link text={DEFAULT_TEXT} size={size} />
            </div>
            <div className={styles.cell}>
              <Link text={DEFAULT_TEXT} size={size} external={true} appearance={Link.appearances.Primary} />
            </div>
            <div className={styles.cell}>
              <Link text={DEFAULT_TEXT} size={size} appearance={Link.appearances.Primary} />
            </div>
          </Fragment>
        ))}
      </div>
    </>
  );
};

export const link: StoryObj<StoryProps> = Template.bind({});

link.args = {
  href: '#',
  text: DEFAULT_TEXT,
  size: Link.sizes.S,
  target: Link.targets.Blank,
  external: false,
};

link.argTypes = {
  size: { control: { type: 'select' } },
  target: {
    control: {
      type: 'select',
      options: Object.values(Link.targets),
    },
  },
};

link.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/RLJd0LDs7HqOVJIRxD6zUq/Link?t=R0iG5gNrqucXW2DE-0',
  },
};
