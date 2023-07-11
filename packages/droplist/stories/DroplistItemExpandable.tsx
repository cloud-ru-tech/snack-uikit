import { Meta, StoryFn, StoryObj } from '@storybook/react';
import cn from 'classnames';
import { Fragment } from 'react';

import { ButtonFilled } from '@snack-ui/button';
import { PlaceholderSVG } from '@snack-ui/icons';

import popoverPrivateReadme from '../../popover-private/README.md';
import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Droplist, ItemExpandableProps } from '../src';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Droplist',
  component: Droplist.ItemExpandable,
};
export default meta;

type StoryProps = ItemExpandableProps;

const STATE_TABLE_HEADERS = ['Default', 'Icon', 'Avatar', 'Disabled'];

const Template: StoryFn<StoryProps> = ({ ...args }) => {
  const headerCellClassnames = cn(styles.cell, styles.headerCell);
  const sizes = Object.values(Droplist.sizes);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.wrapper}>
        Controlled:
        <ul className={styles.list}>
          <Droplist
            content={<Droplist.ItemExpandable {...args} nested={[{ option: 'test', checked: false, onChange() {} }]} />}
          >
            <ButtonFilled className={styles.button} label='Reference button' data-test-id='button-with-droplist' />
          </Droplist>
        </ul>
      </div>

      <div className={styles.table} style={{ '--columns': STATE_TABLE_HEADERS.length }}>
        {STATE_TABLE_HEADERS.map(head => (
          <div key={head} className={headerCellClassnames}>
            {head}
          </div>
        ))}

        <div className={headerCellClassnames} style={{ gridRow: '1 / 2' }} />

        {sizes.map(size => (
          <Fragment key={size}>
            <div className={headerCellClassnames}>{size}</div>
            <div className={styles.cell}>
              <Droplist.ItemExpandable {...args} size={size} className={styles.dropListItem} disabled={false} />
            </div>
            <div className={styles.cell}>
              <Droplist.ItemExpandable
                {...args}
                icon={<PlaceholderSVG />}
                size={size}
                className={styles.dropListItem}
              />
            </div>
            <div className={styles.cell}>
              <Droplist.ItemExpandable
                {...args}
                avatar={{
                  name: 'Test Name',
                }}
                size={size}
                className={styles.dropListItem}
              />
            </div>
            <div className={styles.cell}>
              <Droplist.ItemExpandable {...args} size={size} className={styles.dropListItem} disabled />
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export const itemExpandable: StoryObj<StoryProps> = Template.bind({});

itemExpandable.args = {
  option: 'Option',
  caption: 'Caption',
  description: 'Description',
  tagLabel: 'Tag',
};

itemExpandable.argTypes = {};

itemExpandable.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, popoverPrivateReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/GZSkePkicPQbtrYIu1F8GQ/Dropdown?type=design&node-id=0%3A1&t=H7kVBUAPq83jxLpg-1',
  },
};
