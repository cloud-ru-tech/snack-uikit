import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { ButtonFilled } from '@snack-uikit/button';

import popoverPrivateReadme from '../../popover-private/README.md';
import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Droplist, DroplistProps } from '../src';
import { DroplistItemSingleProps } from '../src/components/DroplistItem';
import { SIZE } from '../src/constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Droplist/Droplist Single',
  component: Droplist,
};
export default meta;

type StoryProps = DroplistProps;

const Sublist = ['Item 2-1', 'Item 2-2', 'Item 2-3', 'Item 2-4'];

const Template: StoryFn<StoryProps> = args => {
  const [selected, setSelected] = useState('Item 1');
  const [isOpen, setIsOpen] = useState(false);

  const {
    firstElementRefCallback,
    handleDroplistFocusLeave,
    handleDroplistItemClick,
    handleTriggerKeyDown,
    handleDroplistItemKeyDown,
    triggerElementRef,
  } = Droplist.useKeyboardNavigation<HTMLButtonElement>({ setDroplistOpen: setIsOpen });

  const getProps = (option: string): DroplistItemSingleProps => ({
    option,
    onClick: e => {
      handleDroplistItemClick(e, () => setSelected(option));
    },
    onKeyDown: handleDroplistItemKeyDown,
    checked: selected === option,
  });

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.wrapper}>
        <Droplist
          {...args}
          firstElementRefCallback={firstElementRefCallback}
          onFocusLeave={handleDroplistFocusLeave}
          open={isOpen}
          onOpenChange={setIsOpen}
          triggerRef={triggerElementRef}
          triggerElement={
            <ButtonFilled
              onKeyDown={handleTriggerKeyDown}
              className={styles.button}
              label='Click to see the droplist'
              data-test-id='button-with-droplist'
            />
          }
        >
          <Droplist.ItemSingle {...getProps('Item 1')} />
          <Droplist.ItemSingle option='Item 2' hasChecked={Sublist.includes(selected)}>
            <Droplist.ItemSingle {...getProps('Item 2-1')} />
            <Droplist.ItemSingle {...getProps('Item 2-2')} />
            <Droplist.ItemSingle {...getProps('Item 2-3')} />
            <Droplist.ItemSingle {...getProps('Item 2-4')} />
          </Droplist.ItemSingle>
          <Droplist.ItemSingle {...getProps('Item 3')} />
          <Droplist.ItemSingle {...getProps('Item 4')} />
          <Droplist.ItemSingle {...getProps('Item 5')} />
          <Droplist.ItemSingle {...getProps('Item 6')} />
          <Droplist.ItemSingle {...getProps('Item 7')} />
          <Droplist.ItemSingle {...getProps('Item 8')} />
          <Droplist.ItemSingle {...getProps('Item 9')} />
        </Droplist>
      </div>
      <div style={{ opacity: 0 }}>{selected}</div>
    </div>
  );
};

export const droplistSingle: StoryObj<StoryProps> = Template.bind({});

droplistSingle.args = {
  useScroll: true,
  size: SIZE.S,
};

droplistSingle.argTypes = {
  'data-test-id': { table: { disable: true } },
  open: { table: { disable: true } },
  className: { table: { disable: true } },
  triggerClassName: { table: { disable: true } },
  triggerRef: { table: { disable: true } },
  onFocusLeave: { table: { disable: true } },
  onOpenChange: { table: { disable: true } },
};

droplistSingle.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, popoverPrivateReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/GZSkePkicPQbtrYIu1F8GQ/Dropdown?type=design&node-id=0%3A1&t=H7kVBUAPq83jxLpg-1',
  },
};
