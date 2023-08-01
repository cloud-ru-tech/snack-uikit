import { Meta, StoryFn, StoryObj } from '@storybook/react';
import cn from 'classnames';
import { Fragment } from 'react';

import { PlaceholderSVG } from '@snack-ui/icons';

import popoverPrivateReadme from '../../popover-private/README.md';
import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Droplist, ItemMultipleProps } from '../src';
import { Size } from '../src/constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Droplist',
  component: Droplist.ItemMultiple,
};
export default meta;

const STATE_TABLE_HEADERS = ['Default', 'Icon', 'Avatar', 'Disabled', 'Checked', 'Disabled + Checked'];

type StoryProps = ItemMultipleProps;

const Template: StoryFn<StoryProps> = args => {
  const headerCellClassnames = cn(styles.cell, styles.headerCell);
  const sizes = Object.values(Droplist.sizes);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.wrapper}>
        Controlled:
        <Droplist.ItemMultiple {...args} className={styles.dropListItem} />
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
              <Droplist.ItemMultiple
                {...args}
                data-test-id={undefined}
                size={size}
                className={styles.dropListItem}
                checked={false}
                disabled={false}
              />
            </div>
            <div className={styles.cell}>
              <Droplist.ItemMultiple
                {...args}
                data-test-id={undefined}
                icon={<PlaceholderSVG />}
                size={size}
                className={styles.dropListItem}
                checked={false}
                disabled={false}
              />
            </div>
            <div className={styles.cell}>
              <Droplist.ItemMultiple
                {...args}
                data-test-id={undefined}
                avatar={{
                  name: 'Test Name',
                }}
                size={size}
                className={styles.dropListItem}
                checked={false}
                disabled={false}
              />
            </div>
            <div className={styles.cell}>
              <Droplist.ItemMultiple
                {...args}
                data-test-id={undefined}
                size={size}
                className={styles.dropListItem}
                checked={false}
                disabled
              />
            </div>
            <div className={styles.cell}>
              <Droplist.ItemMultiple
                {...args}
                data-test-id={undefined}
                size={size}
                className={styles.dropListItem}
                checked
                disabled={false}
              />
            </div>
            <div className={styles.cell}>
              <Droplist.ItemMultiple
                {...args}
                data-test-id={undefined}
                size={size}
                className={styles.dropListItem}
                checked
                disabled
              />
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export const itemMultiple: StoryObj<StoryProps> = Template.bind({});

itemMultiple.args = {
  option: 'Option',
  caption: 'Caption',
  description: 'Description',
  tagLabel: 'Tag',
  checked: undefined,
  size: Size.S,
};

itemMultiple.argTypes = {};

itemMultiple.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, popoverPrivateReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/GZSkePkicPQbtrYIu1F8GQ/Dropdown?type=design&node-id=0%3A1&t=H7kVBUAPq83jxLpg-1',
  },
};
