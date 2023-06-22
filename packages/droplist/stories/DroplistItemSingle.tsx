import { Meta, StoryFn, StoryObj } from '@storybook/react';
import cn from 'classnames';
import { Fragment, useEffect, useState } from 'react';

import { ButtonFilled } from '@snack-ui/button';
import { PlaceholderSVG } from '@snack-ui/icons';

import popoverPrivateReadme from '../../popover-private/README.md';
import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Droplist } from '../src';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Droplist',
  component: Droplist.ItemSingle,
};
export default meta;

type StoryProps = Droplist.ItemSingleProps;

const STATE_TABLE_HEADERS = ['Default', 'Icon', 'Avatar', 'Disabled', 'Checked', 'Disabled + Checked'];

const Template: StoryFn<StoryProps> = ({ ...args }) => {
  const headerCellClassnames = cn(styles.cell, styles.headerCell);
  const sizes = Object.values(Droplist.sizes);

  const [checked, setChecked] = useState(args.checked || false);

  useEffect(() => {
    setChecked(args.checked);
  }, [args.checked]);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.wrapper}>
        Controlled:
        <Droplist.Container
          content={
            <div className={styles.dropListMenu} data-size={args.size}>
              <Droplist.ItemSingle {...args} checked={checked} onChange={setChecked} />
            </div>
          }
        >
          <ButtonFilled className={styles.button} label='Reference button' data-test-id='button-with-droplist' />
        </Droplist.Container>
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
              <Droplist.ItemSingle
                {...args}
                size={size}
                className={styles.dropListItem}
                checked={false}
                disabled={false}
              />
            </div>
            <div className={styles.cell}>
              <Droplist.ItemSingle
                {...args}
                icon={<PlaceholderSVG />}
                size={size}
                className={styles.dropListItem}
                checked={false}
                disabled={false}
              />
            </div>
            <div className={styles.cell}>
              <Droplist.ItemSingle
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
              <Droplist.ItemSingle {...args} size={size} className={styles.dropListItem} checked={false} disabled />
            </div>
            <div className={styles.cell}>
              <Droplist.ItemSingle {...args} size={size} className={styles.dropListItem} checked disabled={false} />
            </div>
            <div className={styles.cell}>
              <Droplist.ItemSingle {...args} size={size} className={styles.dropListItem} checked disabled />
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export const itemSingle: StoryObj<StoryProps> = Template.bind({});

itemSingle.args = {
  label: 'Option',
  caption: 'Caption',
  description: 'Description',
  tagLabel: 'Tag',
  checked: false,
  size: Droplist.sizes.S,
};

itemSingle.argTypes = {};

itemSingle.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, popoverPrivateReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/GZSkePkicPQbtrYIu1F8GQ/Dropdown?type=design&node-id=0%3A1&t=H7kVBUAPq83jxLpg-1',
  },
};
