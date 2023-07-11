import { Meta, StoryFn, StoryObj } from '@storybook/react';
import cn from 'classnames';
import { Fragment, useState } from 'react';

import { ButtonFilled } from '@snack-ui/button';
import { PlaceholderSVG } from '@snack-ui/icons';

import popoverPrivateReadme from '../../popover-private/README.md';
import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Droplist, ItemMultipleProps } from '../src';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Droplist',
  component: Droplist.ItemMultiple,
};
export default meta;

const STATE_TABLE_HEADERS = ['Default', 'Icon', 'Avatar', 'Disabled', 'Checked', 'Disabled + Checked'];

const ITEMS_MOCK: Omit<ItemMultipleProps, 'onChange' | 'checked'>[] = [
  {
    option: 'First',
  },
  {
    option: 'Second',
  },
  {
    option: 'Third',
  },
];

type StoryProps = ItemMultipleProps & { showNoData?: boolean };

const Template: StoryFn<StoryProps> = ({ showNoData, ...args }) => {
  const headerCellClassnames = cn(styles.cell, styles.headerCell);
  const sizes = Object.values(Droplist.sizes);

  const [checked, setChecked] = useState([0]);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.wrapper}>
        Controlled:
        <Droplist
          content={
            <div className={styles.dropListMenu} data-size={args.size}>
              {showNoData ? (
                <Droplist.NoData size={args.size} label='No data' />
              ) : (
                ITEMS_MOCK.map((item, index) => (
                  <Droplist.ItemMultiple
                    {...args}
                    key={item.option}
                    option={args.option || item.option}
                    checked={args.checked ?? checked.includes(index)}
                    onChange={() => {
                      setChecked(prev => (prev.includes(index) ? prev.filter(val => val !== index) : [...prev, index]));
                    }}
                  />
                ))
              )}
            </div>
          }
        >
          <ButtonFilled className={styles.button} label='Reference button' data-test-id='button-with-droplist' />
        </Droplist>
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
                size={size}
                className={styles.dropListItem}
                checked={false}
                disabled={false}
              />
            </div>
            <div className={styles.cell}>
              <Droplist.ItemMultiple
                {...args}
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
              <Droplist.ItemMultiple {...args} size={size} className={styles.dropListItem} checked={false} disabled />
            </div>
            <div className={styles.cell}>
              <Droplist.ItemMultiple {...args} size={size} className={styles.dropListItem} checked disabled={false} />
            </div>
            <div className={styles.cell}>
              <Droplist.ItemMultiple {...args} size={size} className={styles.dropListItem} checked disabled />
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
  showNoData: false,
};

itemMultiple.argTypes = {
  showNoData: {
    name: '[Stories]: Show No data',
    control: {
      type: 'boolean',
    },
  },
};

itemMultiple.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, popoverPrivateReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/GZSkePkicPQbtrYIu1F8GQ/Dropdown?type=design&node-id=0%3A1&t=H7kVBUAPq83jxLpg-1',
  },
};
