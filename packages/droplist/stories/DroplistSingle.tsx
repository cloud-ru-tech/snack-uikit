import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { KeyboardEvent, useState } from 'react';

import { ButtonFilled } from '@snack-ui/button';

import popoverPrivateReadme from '../../popover-private/README.md';
import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Droplist, DroplistProps } from '../src';
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
  const [needsFocus, setNeedsFocus] = useState(false);

  const onKeyDownButtonHandle = (e: KeyboardEvent<HTMLDivElement>) => {
    if (['Space', 'ArrowDown'].includes(e.key)) {
      e.preventDefault();
      setNeedsFocus(true);
      setIsOpen(true);
    }
  };

  const getProps = (option: string) => ({
    option,
    onClick: () => {
      setSelected(option);
      setIsOpen(false);
    },
    checked: selected === option,
  });

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.wrapper}>
        <Droplist
          {...args}
          firstElementRefCallback={el => {
            needsFocus && el?.focus();
            setNeedsFocus(false);
          }}
          open={isOpen}
          onOpenChange={setIsOpen}
          triggerElement={
            <ButtonFilled
              onKeyDown={onKeyDownButtonHandle}
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
  size: Droplist.sizes.S,
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
